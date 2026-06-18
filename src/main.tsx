import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
// Self-hosted brand fonts (no external CDN — works reliably in mainland China)
// Inter (Latin/numerals) via fontsource; Noto Sans SC (CJK) is a build-time
// subset of only the glyphs this site uses — see src/assets/fonts/noto-sans-sc.css
import '@fontsource/inter/400.css'
import '@fontsource/inter/500.css'
import '@fontsource/inter/600.css'
import '@fontsource/inter/700.css'
import './assets/fonts/noto-sans-sc.css'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
)
