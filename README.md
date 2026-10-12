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

## 改文案

全站文案集中在 `src/content/site.ts`，包括：

- `site.email`：联系邮箱（目前是占位值 `hello@sandsend.ai`，上线前请替换）
- `site.url`：正式域名，用于 SEO 元数据
- `site.icp`：ICP 备案号，填写后页脚自动显示并链接到工信部

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
