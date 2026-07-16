import { createRoot } from 'react-dom/client'
import '@fontsource/inter/400.css'
import '@fontsource/inter/500.css'
import '@fontsource/inter/600.css'
import '@fontsource/inter/700.css'
import './assets/fonts/noto-sans-sc.css'
import './index.css'
import About from './pages/About.tsx'

createRoot(document.getElementById('root')!).render(<About />)
