import "dotenv/config";
import express from "express";
import path from "node:path";
import fs from "node:fs/promises";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT || 3000;

// Nano Banana = gemini-2.5-flash-image；Nano Banana Pro = gemini-3-pro-image-preview
const DEFAULT_MODEL = process.env.GEMINI_IMAGE_MODEL || "gemini-2.5-flash-image";
const ALLOWED_MODELS = new Set([
  "gemini-2.5-flash-image",
  "gemini-2.5-flash-image-preview",
  "gemini-3-pro-image-preview",
]);
const API_BASE = "https://generativelanguage.googleapis.com/v1beta/models";

// 官方定价（美元 / 每百万 token）。可在 .env 覆盖 USD_CNY 汇率。
const PRICING = {
  "gemini-2.5-flash-image":         { input: 0.30, output: 30 },
  "gemini-2.5-flash-image-preview": { input: 0.30, output: 30 },
  "gemini-3-pro-image-preview":     { input: 2.00, output: 120 },
};
const USD_CNY = Number(process.env.USD_CNY || 7.2);

const CATEGORIES = new Set(["fashion", "nails", "tattoo", "sushi", "barber", "supermarket", "department", "pet", "product"]);
const IMAGE_SIZES = new Set(["1K", "2K", "4K"]);
const DATA_DIR = path.join(__dirname, "data", "gallery");
for (const c of CATEGORIES) await fs.mkdir(path.join(DATA_DIR, c), { recursive: true });

app.use(express.json({ limit: "30mb" }));
app.use(express.static(path.join(__dirname, "public")));
app.use("/files", express.static(DATA_DIR, { maxAge: "365d", immutable: true }));

/* ---------- 工具 ---------- */
function calcCost(model, usage = {}) {
  const p = PRICING[model] || PRICING[DEFAULT_MODEL];
  const inTok = usage.promptTokenCount || 0;
  const outTok = usage.candidatesTokenCount || 0;
  const usd = (inTok * p.input + outTok * p.output) / 1e6;
  return { inputTokens: inTok, outputTokens: outTok, totalTokens: usage.totalTokenCount || inTok + outTok, usd, cny: usd * USD_CNY };
}

// 从 PNG / JPEG / WebP 二进制头解析尺寸
function parseImageSize(buf) {
  try {
    if (buf[0] === 0x89 && buf.toString("ascii", 1, 4) === "PNG") {
      return { width: buf.readUInt32BE(16), height: buf.readUInt32BE(20) };
    }
    if (buf[0] === 0xff && buf[1] === 0xd8) {
      let i = 2;
      while (i < buf.length) {
        if (buf[i] !== 0xff) { i++; continue; }
        const marker = buf[i + 1];
        if (marker >= 0xc0 && marker <= 0xcf && ![0xc4, 0xc8, 0xcc].includes(marker)) {
          return { height: buf.readUInt16BE(i + 5), width: buf.readUInt16BE(i + 7) };
        }
        i += 2 + buf.readUInt16BE(i + 2);
      }
    }
    if (buf.toString("ascii", 0, 4) === "RIFF" && buf.toString("ascii", 8, 12) === "WEBP") {
      const chunk = buf.toString("ascii", 12, 16);
      if (chunk === "VP8X") return { width: 1 + buf.readUIntLE(24, 3), height: 1 + buf.readUIntLE(27, 3) };
      if (chunk === "VP8 ") return { width: buf.readUInt16LE(26) & 0x3fff, height: buf.readUInt16LE(28) & 0x3fff };
      if (chunk === "VP8L") { const b = buf.readUInt32LE(21); return { width: 1 + (b & 0x3fff), height: 1 + ((b >> 14) & 0x3fff) }; }
    }
  } catch {}
  return { width: null, height: null };
}

const extOf = (mime) => (mime.includes("png") ? "png" : mime.includes("webp") ? "webp" : "jpg");
const newId = () => `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
const safeCat = (c) => (CATEGORIES.has(c) ? c : null);
const safeId = (id) => (/^[a-z0-9-]+$/i.test(id) ? id : null);

async function readItem(cat, id) {
  try { return JSON.parse(await fs.readFile(path.join(DATA_DIR, cat, `${id}.json`), "utf8")); }
  catch { return null; }
}
async function writeItem(item) {
  await fs.writeFile(path.join(DATA_DIR, item.category, `${item.id}.json`), JSON.stringify(item, null, 2));
}

/* ---------- 配置 ---------- */
app.get("/api/config", (_req, res) => {
  res.json({ hasServerKey: Boolean(process.env.GEMINI_API_KEY), defaultModel: DEFAULT_MODEL, models: [...ALLOWED_MODELS], pricing: PRICING, usdCny: USD_CNY });
});

/* ---------- 画廊 ---------- */
app.get("/api/gallery/:cat", async (req, res) => {
  const cat = safeCat(req.params.cat);
  if (!cat) return res.status(404).json({ error: "未知分类" });
  const files = (await fs.readdir(path.join(DATA_DIR, cat))).filter((f) => f.endsWith(".json"));
  const items = (await Promise.all(files.map((f) => readItem(cat, f.replace(/\.json$/, ""))))).filter(Boolean);
  items.sort((a, b) => b.createdAt - a.createdAt);
  res.json({ items });
});

app.patch("/api/gallery/:cat/:id", async (req, res) => {
  const cat = safeCat(req.params.cat), id = safeId(req.params.id);
  const item = cat && id && (await readItem(cat, id));
  if (!item) return res.status(404).json({ error: "不存在" });
  if (typeof req.body?.title === "string") item.title = req.body.title.trim().slice(0, 120);
  await writeItem(item);
  res.json({ item });
});

app.delete("/api/gallery/:cat/:id", async (req, res) => {
  const cat = safeCat(req.params.cat), id = safeId(req.params.id);
  const item = cat && id && (await readItem(cat, id));
  if (!item) return res.status(404).json({ error: "不存在" });
  await Promise.allSettled([
    fs.unlink(path.join(DATA_DIR, cat, item.file)),
    fs.unlink(path.join(DATA_DIR, cat, `${id}.json`)),
  ]);
  res.json({ ok: true });
});

app.delete("/api/gallery/:cat", async (req, res) => {
  const cat = safeCat(req.params.cat);
  if (!cat) return res.status(404).json({ error: "未知分类" });
  const dir = path.join(DATA_DIR, cat);
  for (const f of await fs.readdir(dir)) await fs.unlink(path.join(dir, f)).catch(() => {});
  res.json({ ok: true });
});

/* ---------- 生成 ---------- */
/**
 * body: { prompt, category, title?, images?: [{mimeType,data}], aspectRatio?, model? }
 * header: x-api-key（可选）
 */
app.post("/api/generate", async (req, res) => {
  try {
    const apiKey = req.get("x-api-key") || process.env.GEMINI_API_KEY;
    if (!apiKey) return res.status(401).json({ error: "缺少 API Key：请在 .env 中设置 GEMINI_API_KEY，或在页面右上角填写。" });

    const { prompt, images = [], aspectRatio, imageSize, model, category, title } = req.body || {};
    if (!prompt || typeof prompt !== "string" || !prompt.trim()) return res.status(400).json({ error: "prompt 不能为空" });
    const cat = safeCat(category);
    if (!cat) return res.status(400).json({ error: "category 无效" });
    const useModel = ALLOWED_MODELS.has(model) ? model : DEFAULT_MODEL;

    const parts = [];
    for (const img of images.slice(0, 3)) {
      if (img?.data && img?.mimeType?.startsWith("image/")) parts.push({ inline_data: { mime_type: img.mimeType, data: img.data } });
    }
    parts.push({ text: prompt.trim() });

    const generationConfig = { responseModalities: ["IMAGE"] };
    if (aspectRatio) generationConfig.imageConfig = { aspectRatio };
    // 2K / 4K 只有 gemini-3-pro-image 支持；flash-image 固定约 1024px
    if (IMAGE_SIZES.has(imageSize) && imageSize !== "1K" && useModel.includes("3-pro")) {
      generationConfig.imageConfig = { ...(generationConfig.imageConfig || {}), imageSize };
    }

    const upstream = await fetch(`${API_BASE}/${useModel}:generateContent`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-goog-api-key": apiKey },
      body: JSON.stringify({ contents: [{ role: "user", parts }], generationConfig }),
    });
    const data = await upstream.json().catch(() => ({}));
    if (!upstream.ok) return res.status(upstream.status).json({ error: data?.error?.message || `上游返回 ${upstream.status}` });

    const outParts = data?.candidates?.[0]?.content?.parts || [];
    const first = outParts.find((p) => p.inlineData || p.inline_data);
    if (!first) {
      const reason = data?.candidates?.[0]?.finishReason || data?.promptFeedback?.blockReason;
      return res.status(502).json({ error: `模型没有返回图片${reason ? `（${reason}）` : ""}` });
    }
    const d = first.inlineData || first.inline_data;
    const mimeType = d.mimeType || d.mime_type || "image/png";
    const buf = Buffer.from(d.data, "base64");

    const id = newId();
    const file = `${id}.${extOf(mimeType)}`;
    await fs.writeFile(path.join(DATA_DIR, cat, file), buf);

    const item = {
      id, category: cat, file, url: `/files/${cat}/${file}`,
      title: (typeof title === "string" && title.trim().slice(0, 120)) || "未命名",
      prompt: prompt.trim(), model: useModel, aspectRatio: aspectRatio || "1:1", imageSize: generationConfig.imageConfig?.imageSize || "1K",
      refCount: parts.length - 1, mimeType, bytes: buf.length,
      ...parseImageSize(buf),
      cost: calcCost(useModel, data.usageMetadata),
      createdAt: Date.now(),
    };
    await writeItem(item);
    res.json({ item });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message || "服务器错误" });
  }
});

app.listen(PORT, () => {
  console.log(`AI Concept Studio 已启动: http://localhost:${PORT}`);
  console.log(`图片保存目录: ${DATA_DIR}`);
  console.log(`默认模型: ${DEFAULT_MODEL}  服务器端 Key: ${process.env.GEMINI_API_KEY ? "已配置" : "未配置（可在页面填写）"}`);
});
