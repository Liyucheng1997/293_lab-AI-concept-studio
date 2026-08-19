# AI 概念图工作室（Nano Banana）

**在线地址：<https://liyucheng1997.github.io/293_lab-AI-concept-studio/>**

纯前端静态站点（GitHub Pages 托管，无后端）：浏览器直接调用 Google Gemini 图片生成 API，生成的图片存在你本机浏览器的 IndexedDB 里。

## 如何使用（填 Key）

1. 到 [Google AI Studio](https://aistudio.google.com/apikey) 免费创建一个 Gemini API Key（`AIza...`）。
2. 打开在线地址，首次会弹出「Gemini API Key」面板（也可点右上角 🔑 按钮），粘贴 Key 后点「保存」。
3. 选择行业模板、填写选项（可上传参考图），点「生成概念图」。

**隐私说明**：Key 只保存在你本机浏览器的 localStorage，生成时由浏览器直接发给 `generativelanguage.googleapis.com`，不经过任何第三方服务器，仓库里也不含任何 Key。公用电脑用完请在 Key 面板点「清除」。图片同样只存在本机浏览器（换浏览器 / 清站点数据会丢失，重要图片请下载）。

面向小型商家的 AI 概念图生成站，内置 8 个行业模板：

| 模板 | 用途 | 参考图玩法 |
|---|---|---|
| 👗 服装设计 | 款式概念图 / 三视图设计稿 / 走秀效果 | 上传灵感图、面料图案 |
| 💅 美甲 | 甲型 + 长度 + 风格 + 配色一键出款 | 上传顾客手部照片，直接"戴上"新款 |
| 🐉 刺青 | 题材 / 风格 / 部位 / 尺寸确认稿 | 上传身体部位照片，预览纹上效果 |
| 🍣 寿司摆盘 | 摆盘方案 / 菜单图 / 社媒配图 | 上传店内器皿延续风格 |
| 💈 理发店 | 剪前预览发型 + 发色 | 上传顾客正面照，保留五官换发型 |
| 🛒 超市 | **门店**：货架陈列 / 端架堆头 / 生鲜区 / 促销海报 / 门头 · **电商产品图**：水果生鲜零食日用品原图 → 上架图 | 上传店内照片，在原货架上预览新陈列 |
| 🏬 百货店 | **门店**：橱窗 / 专柜 / 中庭美陈 / 节日装饰 · **电商产品图**：服饰美妆箱包家居原图 → 上架图 | 上传商场现场照，在原空间上预览方案 |
| 🐶 宠物店 | **门店**：美容造型预览 / 宠物服饰 / 写真 / 门店空间 · **电商产品图**：罐头猫粮玩具用品原图 → 上架图 | 上传宠物照片，保留宠物本体换造型 |

图像生成调用 Google **Nano Banana**（`gemini-2.5-flash-image`），可切换 Nano Banana Pro（`gemini-3-pro-image-preview`）。

## 本地运行（可选）

站点是纯静态的，直接用任何静态服务器打开 `public/` 即可；也保留了一个极简 Express：

```bash
npm install
npm start          # http://localhost:3000
```

`server.js` 只做静态托管；若本机还有旧版（v1.x）的 `data/gallery/` 目录，页面首次打开会自动把旧图一次性导入浏览器 IndexedDB。

## 部署

推 `main` 分支即触发 `.github/workflows/deploy.yml`，用 `actions/upload-pages-artifact` 上传 `public/` 到 GitHub Pages（无构建步骤）。所有资源用相对路径，适配子目录。

## 结构

```
public/index.html          页面
public/app.js              行业模板、提示词拼装、参考图上传、Gemini 直连、IndexedDB 画廊
public/style.css           样式
server.js                  可选的本地静态服务器（含旧版画廊只读接口，用于迁移）
.github/workflows/deploy.yml  GitHub Pages 部署
```

## 说明

- **本地持久化**：每张生成的图片（Blob）连同标题、提示词、模型、画幅、尺寸、Token 与费用一起存在浏览器 IndexedDB（库名 `concept-studio`），刷新不丢失；请用下载按钮备份重要图片。
- **每个项目独立画廊**：标签页切换即切换画廊，标签上显示张数。
- **卡片信息可选显示**：画廊右上角勾选 标题 / 尺寸 / 价格 / Token / 模型 / 时间 / 提示词。
- **价格**：按 Google 官方定价由 `usageMetadata` 实时计算（gemini-2.5-flash-image 输出 $30/M token，一张约 1290 token ≈ $0.039；Pro 输出 $120/M）。人民币按汇率 7.2 换算（可在浏览器控制台 `localStorage.setItem("usdCny","7.3")` 覆盖）。
- **看图器**：点击图片打开，滚轮缩放（以鼠标位置为中心）、拖拽平移、双击复位、Esc 关闭。
- 卡片悬停：↩ 用作参考图继续迭代 / ⬇ 下载 / 🗑 删除（从浏览器本地库移除）；✎ 重命名。
- **电商产品图模式**（超市 / 百货 / 宠物店左上角切换）：上传商品原图，模型原样保留商品外观、包装文字和 Logo，只换背景 / 光线 / 构图，输出白底主图、场景图、海报、细节图、多角度组图等，帮门店把货搬到线上；各行业的背景、平台、道具选项按品类定制。
- **分辨率**：1K（默认）/ 2K / 4K，2K 与 4K 需要 Nano Banana Pro（选择时会提示自动切换）；打印海报建议 2K 以上。
- 提示词由表单自动拼成英文（模型效果更好），可在「查看 / 编辑最终提示词」中手改。
- 参考图在浏览器端压缩到最长边 1536px 后以 base64 inlineData 直接发给 Gemini，最多 3 张。
- 页面输入的 Key 只存浏览器 localStorage，由浏览器直接发给 Google，不经过任何服务器。
