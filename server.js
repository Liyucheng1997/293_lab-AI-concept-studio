// 可选的本地静态服务器：站点本身是纯前端（浏览器直连 Gemini、图片存 IndexedDB），
// 线上部署在 GitHub Pages，不需要这个文件。本地 `npm start` 仅用于：
//   1. 静态托管 public/
//   2. 只读暴露旧版 data/gallery（若存在），页面首次打开时会自动把旧图导入浏览器 IndexedDB
import express from "express";
import path from "node:path";
import fs from "node:fs/promises";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT || 3000;
const DATA_DIR = path.join(__dirname, "data", "gallery");
const CATEGORIES = new Set(["fashion", "nails", "tattoo", "sushi", "barber", "supermarket", "department", "pet"]);

app.use(express.static(path.join(__dirname, "public")));
app.use("/files", express.static(DATA_DIR, { maxAge: "365d", immutable: true }));

// 旧版画廊只读列表（用于一次性迁移）
app.get("/api/gallery/:cat", async (req, res) => {
  const cat = req.params.cat;
  if (!CATEGORIES.has(cat)) return res.status(404).json({ error: "未知分类" });
  try {
    const files = (await fs.readdir(path.join(DATA_DIR, cat))).filter((f) => f.endsWith(".json"));
    const items = [];
    for (const f of files) {
      try { items.push(JSON.parse(await fs.readFile(path.join(DATA_DIR, cat, f), "utf8"))); } catch {}
    }
    items.sort((a, b) => b.createdAt - a.createdAt);
    res.json({ items });
  } catch {
    res.json({ items: [] });
  }
});

app.listen(PORT, () => {
  console.log(`AI Concept Studio（本地静态服务）: http://localhost:${PORT}`);
  console.log(`API Key 在页面右上角填写，只存浏览器 localStorage；图片存浏览器 IndexedDB。`);
});
