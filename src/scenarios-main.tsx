import { createRoot } from 'react-dom/client'
import { useState } from 'react'
import '@fontsource/inter/400.css'
import '@fontsource/inter/500.css'
import '@fontsource/inter/600.css'
import '@fontsource/inter/700.css'
import './assets/fonts/noto-sans-sc.css'
import './index.css'
import './site-header.css'
import AboutNavbar from './components/AboutNavbar'
import Scenarios from './sections/Scenarios'
import Footer from './sections/Footer'
import { getInitialLocale } from './lib/locale'
import type { SiteLocale } from './lib/locale'

export function ScenariosPage() {
  const [locale, setLocale] = useState<SiteLocale>(getInitialLocale)
  return (
    <div className="home-shell relative min-h-screen">
      <AboutNavbar page="scenarios" locale={locale} onLocaleChange={setLocale} />
      <main>
        <Scenarios locale={locale} />
      </main>
      <Footer locale={locale} />
    </div>
  )
}

createRoot(document.getElementById('root')!).render(<ScenariosPage />)
