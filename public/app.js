/* ========== 行业模板 ========== */
const CATEGORIES = {
  fashion: {
    name: "👗 服装设计",
    title: "服装设计概念图",
    desc: "生成服装款式概念图 / 设计稿 / 走秀效果，用于打样前的方向确认。",
    refHint: "可上传灵感图、面料图案或版型草图，模型会参考其风格与元素。",
    fields: [
      { key: "type", label: "服装类型", type: "select", options: ["连衣裙", "西装套装", "卫衣/街头装", "汉服/新中式", "婚纱/礼服", "运动装", "风衣/大衣", "衬衫+裤装", "针织衫", "泳装/度假装"] },
      { key: "style", label: "风格", type: "select", options: ["极简", "街头潮流", "复古 Vintage", "未来科技感", "波西米亚", "高级定制", "国风", "Y2K", "学院风", "工装"] },
      { key: "fabric", label: "面料", type: "select", options: ["丝绸", "棉麻", "牛仔", "皮革", "针织", "薄纱", "羊毛呢", "缎面", "PU/漆皮", "不限"] },
      { key: "color", label: "主色调 / 配色", type: "text", placeholder: "例：奶油白 + 鼠尾草绿" },
      { key: "gender", label: "适穿人群", type: "select", options: ["女装", "男装", "中性", "童装"] },
      { key: "view", label: "展示方式", type: "select", options: ["模特上身（T台/街拍）", "平铺产品图", "时装插画", "正/背面三视图设计稿", "面料细节特写"] },
    ],
    prompt: (v, hasRef) => `Fashion design concept: a ${v.gender} ${v.type} in ${v.style} style, made of ${v.fabric} fabric, color palette: ${v.color || "designer's choice"}. Presentation: ${v.view}. Professional fashion photography / illustration quality, clean background, accurate garment construction, realistic drape and texture.${hasRef ? " Use the reference image(s) for inspiration of style, print, or silhouette." : ""}`,
  },
  nails: {
    name: "💅 美甲",
    title: "美甲款式概念图",
    desc: "为顾客快速出款：甲型、长度、风格、配色一键预览。",
    refHint: "上传顾客的手部照片，可直接「戴上」新款美甲；也可上传款式参考图。",
    fields: [
      { key: "shape", label: "甲型", type: "select", options: ["方圆形", "杏仁形", "椭圆形", "方形", "尖形/水滴", "芭蕾/棺形"] },
      { key: "length", label: "长度", type: "select", options: ["短甲", "中长", "长甲", "超长"] },
      { key: "style", label: "风格", type: "select", options: ["法式", "渐变晕染", "猫眼", "镜面/极光", "碎钻/铆钉", "手绘卡通", "大理石纹", "极简裸色", "花朵/贴花", "彩绘几何", "3D 立体雕花"] },
      { key: "color", label: "主色 / 配色", type: "text", placeholder: "例：奶茶色 + 金箔" },
      { key: "theme", label: "主题", type: "select", options: ["日常通勤", "春季", "夏季", "秋季", "冬季", "新年/节日", "婚礼", "度假", "暗黑系"] },
      { key: "view", label: "展示方式", type: "select", options: ["手部近景（自然摆姿）", "甲片色板展示", "多角度组图", "拿咖啡/道具生活感"] },
    ],
    prompt: (v, hasRef) => `Nail art concept: ${v.length} ${v.shape} nails, ${v.style} style, colors: ${v.color || "harmonious palette"}, theme: ${v.theme}. Presentation: ${v.view}. Soft studio lighting, high detail on nail surface texture and finish, salon-quality realistic photo.${hasRef ? " If a hand photo is provided, keep the person's hand, skin and pose exactly the same and only apply the new nail design to the nails; otherwise use reference images for style." : ""}`,
  },
  tattoo: {
    name: "🐉 刺青",
    title: "刺青设计概念图",
    desc: "出稿前和客人确认题材、风格、部位与尺寸。",
    refHint: "上传客人身体部位照片，可直接预览纹上后的效果；也可上传参考图案。",
    fields: [
      { key: "subject", label: "题材", type: "text", placeholder: "例：盘龙绕月 / 玫瑰与匕首 / 狼头" },
      { key: "style", label: "风格", type: "select", options: ["Old School 传统", "New School 新传统", "写实", "黑灰素描", "几何", "水彩", "极简线条", "日式浮世绘", "点刺 Dotwork", "部落图腾", "暗黑 Blackwork", "Chicano"] },
      { key: "placement", label: "部位", type: "select", options: ["前臂", "上臂/花臂", "背部", "胸口", "小腿", "手腕", "肩膀", "锁骨", "脖颈", "大腿", "手背/手指"] },
      { key: "size", label: "尺寸", type: "select", options: ["小型（<8cm）", "中型", "大型", "满臂/满背"] },
      { key: "color", label: "色彩", type: "select", options: ["黑灰", "全彩", "黑 + 一点红", "单色线稿"] },
      { key: "view", label: "展示方式", type: "select", options: ["纹在皮肤上（近景实拍感）", "纹身手稿设计图（白纸）", "线稿 + 上皮肤效果对照"] },
    ],
    prompt: (v, hasRef) => `Tattoo design concept: subject "${v.subject || "custom motif"}", ${v.style} tattoo style, ${v.color}, ${v.size}, placement: ${v.placement}. Presentation: ${v.view}. Crisp line work, correct anatomy and perspective on the body, professional tattoo artist quality.${hasRef ? " If a body-part photo is provided, keep the person's skin, pose and background unchanged and realistically place the tattoo on it following the skin curvature; otherwise use references for motif/style." : ""}`,
  },
  sushi: {
    name: "🍣 寿司摆盘",
    title: "寿司摆盘概念图",
    desc: "菜单拍摄前先出摆盘方案，也可做菜单图 / 社媒配图。",
    refHint: "上传店里现有的器皿或菜品照片，让新方案延续店内风格。",
    fields: [
      { key: "dish", label: "菜品类型", type: "select", options: ["握寿司拼盘", "刺身拼盘", "卷物 / 加州卷", "Omakase 单品", "散寿司丼", "寿司船 / 宴会大拼", "手握套餐（午市）"] },
      { key: "ingredients", label: "主要食材", type: "text", placeholder: "例：金枪鱼大腹、海胆、三文鱼、甜虾" },
      { key: "plate", label: "器皿", type: "select", options: ["黑色石板", "白瓷长盘", "原木板", "竹叶/竹帘", "粗陶器", "冰盘", "漆器托盘"] },
      { key: "style", label: "风格", type: "select", options: ["传统日式", "现代 Fine Dining", "居酒屋轻松感", "怀石料理", "北欧极简融合"] },
      { key: "garnish", label: "装饰", type: "select", options: ["紫苏叶 + 萝卜丝", "食用花", "金箔", "柠檬/柚子皮", "山葵雕花", "极简无装饰"] },
      { key: "view", label: "视角", type: "select", options: ["俯拍（菜单图）", "45° 侧俯", "近景特写", "餐桌场景（有手/筷子）"] },
    ],
    prompt: (v, hasRef) => `Sushi plating concept: ${v.dish} featuring ${v.ingredients || "seasonal fish"}, served on ${v.plate}, ${v.style} presentation, garnish: ${v.garnish}. Camera: ${v.view}. Professional food photography, appetizing glossy fish texture, natural window light, shallow depth of field, restaurant-menu quality.${hasRef ? " Match the tableware and restaurant style shown in the reference image(s)." : ""}`,
  },
  barber: {
    name: "💈 理发店",
    title: "发型造型概念图",
    desc: "剪前预览：让顾客看到发型上头后的样子，减少沟通成本。",
    refHint: "上传顾客正面照片，可保留五官直接「换发型」；也可上传发型参考图。",
    fields: [
      { key: "gender", label: "顾客", type: "select", options: ["男士", "女士", "中性风", "儿童"] },
      { key: "length", label: "头发长度", type: "select", options: ["寸头/超短", "短发", "中长发", "长发"] },
      { key: "style", label: "发型", type: "select", options: ["渐变 Fade", "背头 Slick Back", "中分 / 三七分", "纹理烫", "狼尾 / 鲻鱼头", "羊毛卷", "波波头 Bob", "层次剪 Layer", "锡纸烫", "大波浪", "法式刘海", "脏辫 / 编发", "公主切"] },
      { key: "color", label: "发色", type: "select", options: ["自然黑", "深棕", "亚麻/奶茶色", "银灰/白金", "挑染 Highlight", "渐变染 Balayage", "红棕/酒红", "亮色（蓝/粉/紫）"] },
      { key: "extra", label: "附加", type: "select", options: ["无", "配络腮胡", "配山羊胡", "配眉上刘海", "配空气刘海", "湿发造型"] },
      { key: "view", label: "展示方式", type: "select", options: ["正面半身照", "侧面 45°", "正/侧/后三视图", "理发店场景（镜前）"] },
    ],
    prompt: (v, hasRef) => `Hairstyle concept: ${v.gender}, ${v.length}, ${v.style} haircut, hair color: ${v.color}${v.extra !== "无" ? `, ${v.extra}` : ""}. Presentation: ${v.view}. Realistic salon photography, sharp hair texture and strands, natural skin, neutral background.${hasRef ? " If a portrait photo is provided, keep the person's face, identity, skin tone and expression exactly the same and only change the hairstyle/hair color realistically; otherwise use reference images for the hairstyle." : ""}`,
  },
  supermarket: {
    name: "🛒 超市",
    title: "超市陈列 / 促销概念图",
    desc: "货架陈列、端架堆头、生鲜区布置、促销海报与门头，开店/改陈前先看效果。",
    refHint: "上传店内现场照片，可在原货架上预览新陈列；也可上传商品图或参考陈列。",
    fields: [
      { key: "scene", label: "场景类型", type: "select", options: ["货架陈列（整排）", "端架 / 堆头", "生鲜果蔬区", "冷藏 / 冷冻区", "烘焙 / 熟食区", "收银区 + 冲动购买带", "门头招牌 + 入口", "促销海报 / DM 单", "自助结账区", "整店俯视布局图"] },
      { key: "category", label: "商品品类", type: "text", placeholder: "例：进口零食 / 有机蔬果 / 饮料 / 日化" },
      { key: "format", label: "业态风格", type: "select", options: ["社区便利店", "精品超市（如 Ole'）", "仓储会员店（如 Costco）", "日式超市", "欧美大卖场", "生鲜市集风", "无人智慧超市"] },
      { key: "theme", label: "促销 / 季节主题", type: "select", options: ["无", "开业大吉", "周年庆", "春节年货", "中秋", "双十一 / 618", "夏日清凉", "圣诞", "会员日", "折扣清仓"] },
      { key: "color", label: "主色调", type: "text", placeholder: "例：清爽绿白 / 品牌红黄" },
      { key: "view", label: "视角", type: "select", options: ["顾客视角平视", "45° 斜俯", "过道纵深透视", "近景商品特写", "俯视平面图"] },
    ],
    prompt: (v, hasRef) => `Supermarket visual merchandising concept: ${v.scene}, products: ${v.category || "mixed grocery"}, store format: ${v.format}${v.theme !== "无" ? `, promotional theme: ${v.theme}` : ""}, color scheme: ${v.color || "clean and bright"}. Camera: ${v.view}. Neat, well-stocked, realistic retail interior photography with proper lighting, price tags and signage where appropriate, no readable text errors.${hasRef ? " If a store photo is provided, keep the store's architecture and fixtures and redo only the merchandising/decoration; otherwise use references for products or display style." : ""}`,
  },
  department: {
    name: "🏬 百货店",
    title: "百货商场美陈 / 橱窗概念图",
    desc: "橱窗、专柜、中庭美陈、节日装饰、导视——方案汇报前先出效果图。",
    refHint: "上传商场现场照片，可在原空间上预览美陈方案；也可上传品牌 VI 或参考图。",
    fields: [
      { key: "scene", label: "场景类型", type: "select", options: ["临街橱窗", "品牌专柜 / 中岛", "中庭大型美陈装置", "节日主题装饰", "扶梯 / 通道导视", "VIP 休息区", "化妆品区", "珠宝腕表区", "儿童 / 玩具区", "商场外立面 + 灯光"] },
      { key: "category", label: "商品 / 品牌品类", type: "text", placeholder: "例：轻奢女装 / 香水彩妆 / 家居生活" },
      { key: "theme", label: "主题", type: "select", options: ["春夏新品", "秋冬系列", "圣诞", "春节 / 新年", "情人节", "周年庆", "母亲节", "国庆", "艺术展联名", "无主题日常"] },
      { key: "style", label: "风格", type: "select", options: ["奢华金属感", "极简高级灰", "艺术装置 / 雕塑", "自然植物", "复古 Art Deco", "未来科技 / 灯光", "梦幻马卡龙", "东方美学"] },
      { key: "color", label: "主色调", type: "text", placeholder: "例：香槟金 + 白 / 圣诞红绿" },
      { key: "view", label: "视角", type: "select", options: ["顾客正面平视", "45° 斜俯", "低角度仰视（气势）", "近景细节", "全景大场景"] },
    ],
    prompt: (v, hasRef) => `Department store visual merchandising concept: ${v.scene} for ${v.category || "premium retail brands"}, theme: ${v.theme}, style: ${v.style}, color scheme: ${v.color || "elegant palette"}. Camera: ${v.view}. High-end retail interior rendering / photography quality, dramatic yet tasteful lighting, premium materials, polished floors, realistic scale of props and mannequins.${hasRef ? " If a photo of the actual space is provided, keep its architecture and only add the display design; otherwise use references for brand identity or style." : ""}`,
  },
  pet: {
    name: "🐶 宠物店",
    title: "宠物美容 / 宠物店概念图",
    desc: "宠物美容造型预览、店铺空间、宠物服饰周边、宠物写真——洗剪前先给主人看效果。",
    refHint: "上传顾客宠物的照片，可保留宠物本体直接「换造型」；也可上传店铺或商品参考图。",
    fields: [
      { key: "use", label: "用途", type: "select", options: ["宠物美容造型预览", "宠物服饰 / 配饰概念", "宠物摄影写真", "宠物店门店空间", "宠物用品陈列 / 商品海报", "宠物寄养 / 乐园区"] },
      { key: "animal", label: "宠物种类", type: "select", options: ["泰迪 / 贵宾", "比熊", "柴犬", "柯基", "金毛", "博美", "雪纳瑞", "边牧", "法斗", "布偶猫", "英短", "美短", "橘猫", "兔子", "仓鼠 / 龙猫", "其他（在补充描述里写）"] },
      { key: "style", label: "造型 / 风格", type: "select", options: ["泰迪熊装", "羊羔装", "贵宾装（欧陆式）", "运动装（短毛清爽）", "自然长毛修剪", "圆脸小熊头", "萌系染色（耳朵/尾巴）", "节日主题（蝴蝶结/围巾）", "无特定造型"] },
      { key: "mood", label: "氛围", type: "select", options: ["温馨可爱", "清新自然", "高级简约", "活泼卡通", "节日喜庆", "复古文艺"] },
      { key: "color", label: "主色调", type: "text", placeholder: "例：奶油白 + 薄荷绿" },
      { key: "view", label: "展示方式", type: "select", options: ["宠物正面全身照", "宠物侧面 45°", "美容前后对比", "怀抱 / 互动生活感", "店铺空间全景", "商品平铺 / 海报"] },
    ],
    prompt: (v, hasRef) => `Pet shop concept: purpose — ${v.use}; pet: ${v.animal}; grooming style / design: ${v.style}; mood: ${v.mood}; color scheme: ${v.color || "soft harmonious palette"}. Presentation: ${v.view}. Realistic photography, healthy fluffy fur with fine detail, correct animal anatomy, clean bright pet-salon lighting.${hasRef ? " If a photo of the customer's pet is provided, keep the same pet (breed, markings, face, eyes) and only change the grooming/outfit; if a store photo is provided keep its architecture and redo the decoration; otherwise use references for style." : ""}`,
  },
};

/* ========== 状态 ========== */
const $ = (id) => document.getElementById(id);
let currentCat = "fashion";
let refImages = []; // {mimeType, data, url}
let promptDirty = false;
let serverConfig = { hasServerKey: false, defaultModel: "gemini-2.5-flash-image", models: [], usdCny: 7.2 };
let galleryItems = []; // 当前分类的持久化图片
let details = JSON.parse(localStorage.getItem("details") || '{"title":true,"size":true,"cost":true}');

/* ========== 初始化 ========== */
async function init() {
  try { serverConfig = await (await fetch("/api/config")).json(); } catch {}
  const ms = $("modelSelect");
  ms.innerHTML = "";
  for (const m of serverConfig.models) {
    const o = document.createElement("option");
    o.value = m;
    o.textContent = m.includes("3-pro") ? "Nano Banana Pro (gemini-3-pro-image)" : m.includes("preview") ? "Nano Banana (preview)" : "Nano Banana (gemini-2.5-flash-image)";
    ms.appendChild(o);
  }
  ms.value = localStorage.getItem("model") || serverConfig.defaultModel;
  ms.onchange = () => localStorage.setItem("model", ms.value);

  const tabs = $("tabs");
  for (const [key, c] of Object.entries(CATEGORIES)) {
    const b = document.createElement("button");
    b.className = "tab";
    b.innerHTML = `${c.name}<span class="cnt" data-cnt="${key}"></span>`;
    b.dataset.key = key;
    b.onclick = () => selectCategory(key);
    tabs.appendChild(b);
  }
  document.querySelectorAll("#detailToggles input").forEach((cb) => {
    cb.checked = Boolean(details[cb.dataset.d]);
    cb.onchange = () => { details[cb.dataset.d] = cb.checked; localStorage.setItem("details", JSON.stringify(details)); renderGallery(); };
  });
  bindEvents();
  updateKeyButton();
  await selectCategory(localStorage.getItem("cat") || "fashion");
  refreshCounts();
}

async function selectCategory(key) {
  currentCat = key;
  localStorage.setItem("cat", key);
  const c = CATEGORIES[key];
  document.querySelectorAll(".tab").forEach((t) => t.classList.toggle("active", t.dataset.key === key));
  $("catTitle").textContent = c.title;
  $("catDesc").textContent = c.desc;
  $("refHint").textContent = c.refHint;
  $("galleryTitle").textContent = `${c.name} 画廊`;
  const wrap = $("fields");
  wrap.innerHTML = "";
  for (const f of c.fields) {
    const label = document.createElement("label");
    label.className = "field";
    const span = document.createElement("span");
    span.textContent = f.label;
    label.appendChild(span);
    let input;
    if (f.type === "select") {
      input = document.createElement("select");
      for (const opt of f.options) {
        const o = document.createElement("option");
        o.value = o.textContent = opt;
        input.appendChild(o);
      }
    } else {
      input = document.createElement("input");
      input.type = "text";
      input.placeholder = f.placeholder || "";
    }
    input.dataset.key = f.key;
    input.addEventListener("input", refreshPrompt);
    input.addEventListener("change", refreshPrompt);
    label.appendChild(input);
    wrap.appendChild(label);
  }
  promptDirty = false;
  refreshPrompt();
  await loadGallery();
}

function collectValues() {
  const v = {};
  document.querySelectorAll("#fields [data-key]").forEach((el) => (v[el.dataset.key] = el.value.trim()));
  return v;
}
function buildPrompt() {
  const c = CATEGORIES[currentCat];
  let p = c.prompt(collectValues(), refImages.length > 0);
  const extra = $("extra").value.trim();
  if (extra) p += ` Additional requirements: ${extra}.`;
  return p;
}
function refreshPrompt() { if (!promptDirty) $("prompt").value = buildPrompt(); }
function autoTitle() {
  const v = collectValues();
  const c = CATEGORIES[currentCat];
  // 取前三个有值的字段拼标题
  const parts = c.fields.map((f) => v[f.key]).filter((x) => x && x !== "无").slice(0, 3);
  return parts.join(" · ") || c.title;
}

/* ========== 事件 ========== */
function bindEvents() {
  $("extra").addEventListener("input", refreshPrompt);
  $("prompt").addEventListener("input", () => (promptDirty = true));
  $("resetPrompt").onclick = () => { promptDirty = false; refreshPrompt(); };

  const dz = $("dropzone"), fi = $("fileInput");
  dz.onclick = () => fi.click();
  fi.onchange = () => addFiles(fi.files);
  dz.ondragover = (e) => { e.preventDefault(); dz.classList.add("over"); };
  dz.ondragleave = () => dz.classList.remove("over");
  dz.ondrop = (e) => { e.preventDefault(); dz.classList.remove("over"); addFiles(e.dataTransfer.files); };
  document.addEventListener("paste", (e) => {
    const files = [...(e.clipboardData?.files || [])].filter((f) => f.type.startsWith("image/"));
    if (files.length) addFiles(files);
  });

  $("generate").onclick = generate;
  $("clearGallery").onclick = async () => {
    if (!galleryItems.length) return;
    if (!confirm(`确定删除「${CATEGORIES[currentCat].name}」项目的全部 ${galleryItems.length} 张图片？此操作会删除本地文件，不可恢复。`)) return;
    await fetch(`/api/gallery/${currentCat}`, { method: "DELETE" });
    await loadGallery();
    refreshCounts();
  };

  $("keyBtn").onclick = () => { $("keyInput").value = localStorage.getItem("apiKey") || ""; $("keyModal").classList.remove("hidden"); };
  $("keySave").onclick = () => { localStorage.setItem("apiKey", $("keyInput").value.trim()); $("keyModal").classList.add("hidden"); updateKeyButton(); };
  $("keyClear").onclick = () => { localStorage.removeItem("apiKey"); $("keyInput").value = ""; updateKeyButton(); };
  $("keyModal").onclick = (e) => { if (e.target === $("keyModal")) $("keyModal").classList.add("hidden"); };

  initLightbox();
}

function updateKeyButton() {
  const has = Boolean(localStorage.getItem("apiKey"));
  $("keyBtn").textContent = has ? "🔑 已设置 Key" : serverConfig.hasServerKey ? "🔑 使用服务器 Key" : "🔑 设置 API Key";
  $("keyBtn").style.borderColor = has || serverConfig.hasServerKey ? "var(--green)" : "var(--red)";
}

/* ========== 参考图 ========== */
async function addFiles(files) {
  for (const f of [...files]) {
    if (!f.type.startsWith("image/")) continue;
    if (refImages.length >= 3) break;
    const dataUrl = await downscale(f, 1536);
    const [head, data] = dataUrl.split(",");
    refImages.push({ mimeType: head.match(/data:(.*?);/)[1], data, url: dataUrl });
  }
  $("fileInput").value = "";
  renderThumbs();
  refreshPrompt();
}
function downscale(file, max) {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      const s = Math.min(1, max / Math.max(img.width, img.height));
      const c = document.createElement("canvas");
      c.width = Math.round(img.width * s); c.height = Math.round(img.height * s);
      c.getContext("2d").drawImage(img, 0, 0, c.width, c.height);
      resolve(c.toDataURL(file.type === "image/png" ? "image/png" : "image/jpeg", 0.92));
      URL.revokeObjectURL(img.src);
    };
    img.src = URL.createObjectURL(file);
  });
}
async function urlToRef(url) {
  const blob = await (await fetch(url)).blob();
  const dataUrl = await downscale(new File([blob], "ref", { type: blob.type }), 1536);
  const [head, data] = dataUrl.split(",");
  return { mimeType: head.match(/data:(.*?);/)[1], data, url: dataUrl };
}
function renderThumbs() {
  const t = $("thumbs");
  t.innerHTML = "";
  refImages.forEach((im, i) => {
    const d = document.createElement("div");
    d.className = "thumb";
    d.innerHTML = `<img src="${im.url}" alt="ref"><button title="移除">×</button>`;
    d.querySelector("button").onclick = () => { refImages.splice(i, 1); renderThumbs(); refreshPrompt(); };
    t.appendChild(d);
  });
}

/* ========== 画廊（服务器持久化） ========== */
async function loadGallery() {
  try {
    const r = await fetch(`/api/gallery/${currentCat}`);
    galleryItems = (await r.json()).items || [];
  } catch { galleryItems = []; }
  renderGallery();
}
async function refreshCounts() {
  for (const key of Object.keys(CATEGORIES)) {
    try {
      const r = await fetch(`/api/gallery/${key}`);
      const n = ((await r.json()).items || []).length;
      const el = document.querySelector(`[data-cnt="${key}"]`);
      if (el) el.textContent = n ? `${n}` : "";
    } catch {}
  }
}

const fmtUsd = (n) => (n < 0.01 ? `$${n.toFixed(4)}` : `$${n.toFixed(3)}`);
const fmtCny = (n) => `¥${n.toFixed(3)}`;
const fmtBytes = (b) => (b > 1048576 ? `${(b / 1048576).toFixed(1)} MB` : `${Math.round(b / 1024)} KB`);
const fmtTime = (t) => new Date(t).toLocaleString("zh-CN", { month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit" });
const modelShort = (m) => (m.includes("3-pro") ? "Nano Banana Pro" : "Nano Banana");

function renderGallery() {
  const g = $("gallery");
  // 保留正在生成中的占位卡片
  const pending = [...g.querySelectorAll(".card.loading, .card.error")];
  g.innerHTML = "";
  pending.forEach((p) => g.appendChild(p));
  for (const item of galleryItems) g.appendChild(makeCard(item));
  $("emptyState").classList.toggle("hidden", galleryItems.length > 0 || pending.length > 0);
  const totalUsd = galleryItems.reduce((s, i) => s + (i.cost?.usd || 0), 0);
  $("galleryStats").textContent = galleryItems.length
    ? `${galleryItems.length} 张 · 累计花费 ${fmtUsd(totalUsd)} ≈ ${fmtCny(totalUsd * serverConfig.usdCny)} · 已保存到 data/gallery/${currentCat}/`
    : "";
}

function makeCard(item) {
  const card = document.createElement("div");
  card.className = "card";
  card.dataset.id = item.id;
  const dim = item.width ? `${item.width} × ${item.height}` : "—";
  const cost = item.cost || {};
  const lines = [];
  if (details.title) lines.push(`<div class="title"><span class="t">${escapeHtml(item.title)}</span><button class="rename" title="重命名">✎</button></div>`);
  if (details.size) lines.push(`<div class="line"><span>尺寸</span><b>${dim} · ${item.aspectRatio} · ${fmtBytes(item.bytes || 0)}</b></div>`);
  if (details.cost) lines.push(`<div class="line"><span>价格</span><b class="cost-tag">${fmtUsd(cost.usd || 0)} ≈ ${fmtCny(cost.cny || 0)}</b></div>`);
  if (details.tokens) lines.push(`<div class="line"><span>Token</span><b>入 ${cost.inputTokens ?? "—"} / 出 ${cost.outputTokens ?? "—"}</b></div>`);
  if (details.model) lines.push(`<div class="line"><span>模型</span><b>${modelShort(item.model)}</b></div>`);
  if (details.time) lines.push(`<div class="line"><span>时间</span><b>${fmtTime(item.createdAt)}</b></div>`);
  if (details.prompt) lines.push(`<div class="prompt">${escapeHtml(item.prompt)}</div>`);

  card.innerHTML = `
    <div class="img-wrap">
      <img src="${item.url}" alt="${escapeHtml(item.title)}" loading="lazy">
      <div class="hover-actions">
        <button class="use" title="用作参考图继续修改">↩</button>
        <a href="${item.url}" download="${item.title.replace(/[\\/:*?"<>|]/g, "_")}-${item.id}.${item.file.split(".").pop()}"><button title="下载">⬇</button></a>
        <button class="del" title="删除">🗑</button>
      </div>
    </div>
    ${lines.length ? `<div class="info">${lines.join("")}</div>` : ""}`;

  card.querySelector("img").onclick = () => openLightbox(item);
  card.querySelector(".use").onclick = async () => {
    if (refImages.length >= 3) refImages.shift();
    refImages.push(await urlToRef(item.url));
    renderThumbs(); refreshPrompt();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  card.querySelector(".del").onclick = async () => {
    if (!confirm(`删除「${item.title}」？本地文件也会被删除。`)) return;
    await fetch(`/api/gallery/${item.category}/${item.id}`, { method: "DELETE" });
    galleryItems = galleryItems.filter((i) => i.id !== item.id);
    renderGallery(); refreshCounts();
  };
  card.querySelector(".rename")?.addEventListener("click", async () => {
    const t = prompt("新标题：", item.title);
    if (t == null || !t.trim()) return;
    const r = await fetch(`/api/gallery/${item.category}/${item.id}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ title: t.trim() }) });
    if (r.ok) { item.title = t.trim(); renderGallery(); }
  });
  return card;
}

/* ========== 生成 ========== */
async function generate() {
  const prompt = $("prompt").value.trim();
  if (!prompt) return setStatus("提示词为空", true);
  const count = Number($("count").value);
  const aspectRatio = $("aspect").value;
  const model = $("modelSelect").value;
  const apiKey = localStorage.getItem("apiKey") || "";
  const category = currentCat;
  const title = $("title").value.trim() || autoTitle();
  if (!apiKey && !serverConfig.hasServerKey) { $("keyModal").classList.remove("hidden"); return setStatus("请先设置 API Key", true); }

  $("emptyState").classList.add("hidden");
  $("generate").disabled = true;
  setStatus(`正在生成 ${count} 张…`);

  const cards = [];
  for (let i = 0; i < count; i++) {
    const card = document.createElement("div");
    card.className = "card loading";
    card.innerHTML = `<div class="img-wrap"><div class="ph">生成中 ${i + 1}/${count}…</div></div>`;
    $("gallery").prepend(card);
    cards.push(card);
  }

  let ok = 0;
  await Promise.all(cards.map(async (card) => {
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json", ...(apiKey ? { "x-api-key": apiKey } : {}) },
        body: JSON.stringify({ prompt, category, title, images: refImages.map(({ mimeType, data }) => ({ mimeType, data })), aspectRatio, model }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || `HTTP ${res.status}`);
      ok++;
      if (category === currentCat) {
        galleryItems.unshift(data.item);
        card.replaceWith(makeCard(data.item));
      } else card.remove();
    } catch (err) {
      card.className = "card error";
      card.innerHTML = `<div class="img-wrap"><div class="ph">❌ ${escapeHtml(err.message)}</div></div>`;
      const close = document.createElement("button");
      close.className = "pill small"; close.textContent = "关闭"; close.style.margin = "8px";
      close.onclick = () => { card.remove(); renderGallery(); };
      card.appendChild(close);
      if (/api key/i.test(err.message)) $("keyModal").classList.remove("hidden");
    }
  }));

  $("generate").disabled = false;
  renderGallery(); refreshCounts();
  setStatus(ok === count ? `完成，成功生成 ${ok} 张，已保存到本地` : `完成：成功 ${ok} / ${count}`, ok === 0);
}

/* ========== 看图器：滚轮缩放 / 拖拽平移 ========== */
const lb = { scale: 1, x: 0, y: 0, natW: 0, natH: 0, dragging: false, sx: 0, sy: 0, ox: 0, oy: 0 };
function initLightbox() {
  const stage = $("lbStage"), img = $("lightboxImg");
  const close = () => $("lightbox").classList.add("hidden");
  $("lbClose").onclick = close;
  $("lbReset").onclick = () => fitLightbox();
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") { close(); $("keyModal").classList.add("hidden"); } });
  stage.addEventListener("wheel", (e) => {
    e.preventDefault();
    const rect = stage.getBoundingClientRect();
    const mx = e.clientX - rect.left, my = e.clientY - rect.top;
    const factor = Math.exp(-e.deltaY * 0.0015);
    const next = Math.min(20, Math.max(0.1, lb.scale * factor));
    const k = next / lb.scale;
    lb.x = mx - (mx - lb.x) * k;
    lb.y = my - (my - lb.y) * k;
    lb.scale = next;
    applyLightbox();
  }, { passive: false });
  stage.addEventListener("pointerdown", (e) => { lb.dragging = true; lb.sx = e.clientX; lb.sy = e.clientY; lb.ox = lb.x; lb.oy = lb.y; stage.classList.add("dragging"); stage.setPointerCapture(e.pointerId); });
  stage.addEventListener("pointermove", (e) => { if (!lb.dragging) return; lb.x = lb.ox + e.clientX - lb.sx; lb.y = lb.oy + e.clientY - lb.sy; applyLightbox(); });
  const up = () => { lb.dragging = false; stage.classList.remove("dragging"); };
  stage.addEventListener("pointerup", up); stage.addEventListener("pointercancel", up);
  stage.addEventListener("dblclick", () => fitLightbox());
  stage.addEventListener("click", (e) => { if (e.target === stage && Math.abs(e.clientX - lb.sx) < 3 && Math.abs(e.clientY - lb.sy) < 3) close(); });
  img.onload = () => { lb.natW = img.naturalWidth; lb.natH = img.naturalHeight; fitLightbox(); };
  window.addEventListener("resize", () => { if (!$("lightbox").classList.contains("hidden")) fitLightbox(); });
}
function openLightbox(item) {
  const img = $("lightboxImg");
  $("lightbox").classList.remove("hidden");
  const c = item.cost || {};
  $("lbInfo").textContent = `${item.title} · ${item.width || "?"}×${item.height || "?"} · ${fmtUsd(c.usd || 0)} ≈ ${fmtCny(c.cny || 0)} · ${modelShort(item.model)} · ${fmtTime(item.createdAt)}`;
  if (img.src.endsWith(item.url)) { fitLightbox(); } else img.src = item.url;
}
function fitLightbox() {
  const stage = $("lbStage");
  if (!lb.natW) return;
  const w = stage.clientWidth, h = stage.clientHeight;
  lb.scale = Math.min(1, (w - 40) / lb.natW, (h - 40) / lb.natH);
  lb.x = (w - lb.natW * lb.scale) / 2;
  lb.y = (h - lb.natH * lb.scale) / 2;
  applyLightbox();
}
function applyLightbox() {
  $("lightboxImg").style.transform = `translate(${lb.x}px, ${lb.y}px) scale(${lb.scale})`;
  $("lbZoom").textContent = `${Math.round(lb.scale * 100)}%`;
}

function setStatus(msg, isErr = false) { const s = $("status"); s.textContent = msg; s.classList.toggle("error", isErr); }
function escapeHtml(s) { return String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c])); }

init();
