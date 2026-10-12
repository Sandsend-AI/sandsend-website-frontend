# 沙尘彼岸 Sandsend · 官网

Next.js 16（App Router）+ React 19 + Tailwind CSS 4 + Motion + Lenis。全站静态预渲染，直接部署到 Vercel。

## 本地开发

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # 生产构建
```

Node ≥ 20.9。构建时 `next/font` 会从 Google Fonts 下载并自托管字体，因此构建机需要能访问外网（Vercel 默认可以）。

## 部署到 Vercel

在 Vercel 导入本仓库即可，框架自动识别为 Next.js，无需额外配置。

## 多语言

中文版在 `/`，英文版在 `/en`。两个语言各自是一个根布局（`src/app/(zh)/layout.tsx`、`src/app/(en)/en/layout.tsx`），共用 `components/layout/Document.tsx` 与 `components/HomePage.tsx`，全站仍是静态预渲染。页头和页脚都有语言切换入口，`<head>` 里已输出 `hreflang` 与 canonical。

英文字号比中文小一档（同字号下拉丁文本约宽一倍）：全局标题在 `globals.css` 的 `.h-hero:lang(en)` / `.h-section:lang(en)`，组件内用 Tailwind 自定义变体 `en:`（例如 `en:text-[...]`）。

## 改文案

- `src/content/zh.ts` / `src/content/en.ts`：中英文全部页面文案，两份结构必须一致（`en.ts` 以 `zh.ts` 的类型为准，漏字段会编译报错）。字段 `alt` 是另一种语言的装饰性副标签：中文版显示英文，英文版显示中文。
- `src/content/site.ts`：与语言无关的公司信息
  - `site.email`：联系邮箱，当前为 `haven@sandsend.ai`
  - `site.url`：正式域名，当前为 `https://sandsend.ai`，用于 SEO 元数据
  - `site.icp`：ICP 备案号，目前留空；拿到备案号后填入，页脚会自动显示并链接到工信部

## 品牌一致性

- 标识的图形与字标路径直接取自 `company-data/sandsend/brand/svg/`，由脚本生成到 `src/components/brand/paths.ts`，不要手改。
- 色板只用品牌四色及其色阶：Ink `#0B1A30`、Gold `#C2A26B`、Sand `#DFCDAA`、Paper `#FAF8F4`。
- 沙丘底纹 `DunePattern` 沿用 `brand/build.py` 的波形与 320×190 周期。

## 主要特效

| 位置 | 实现 |
| --- | --- |
| 开场 | 标识线稿绘制 → 填色 → 屏幕沿沙脊曲线裂开（`fx/Preloader.tsx`，每个会话只播一次） |
| 首屏 | WebGL2 实时沙丘等高线地形，鼠标抬起山丘、等高线绕行（`fx/DuneField.tsx`） |
| 三大业务 | 纵向滚动驱动横向平移的钉住式面板，每条业务线一个生成式动画（`visuals/`） |
| 体系 | CSS 3D 爆炸视图，随滚动展开，悬停业务线点亮其覆盖层级（`sections/Stack.tsx`） |
| 场景演示 | 终端式控制台，逐行打出 Agent 推理轨迹（`sections/ControlCenter.tsx`） |
| 收尾 | 数千颗沙粒沿正弦流线漂移，滚入时汇聚成品牌标志，鼠标可吹散（`fx/SandParticles.tsx`） |

所有动画均遵循 `prefers-reduced-motion`；WebGL 不可用时首屏回落到品牌底纹。
