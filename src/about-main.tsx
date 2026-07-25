import { createRoot } from 'react-dom/client'
import './assets/fonts/inter-local.css'
import './assets/fonts/noto-sans-sc.css'
import './index.css'
import './about.css'
import About from './pages/About.tsx'

createRoot(document.getElementById('root')!).render(<About />)
