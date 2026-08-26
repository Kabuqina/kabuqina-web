# 项目长期记忆

## 导航栏
- 卡布奇娜主页与 about.html 共享 `src/components/AboutNavbar.tsx` 与 `src/site-header.css`，保持视觉与行为一致。
- `site-header.css` 中把头部相关样式从 `.about-page-v2` 下解耦，变量在 `.site-header` 上自包含，避免作用域依赖。
