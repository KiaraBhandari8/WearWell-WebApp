import { useEffect } from 'react'
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
import { Header } from './components/layout/Header'
import { Footer } from './components/layout/Footer'
import { ToastProvider } from './context/ToastContext'
import { WardrobeProvider } from './context/WardrobeContext'
import { HomePage } from './pages/HomePage'
import { CalculatorPage } from './pages/CalculatorPage'
import { WardrobePage } from './pages/WardrobePage'
import { ResearchPage } from './pages/ResearchPage'
import { ArticlePage } from './pages/ArticlePage'
import { TipsPage } from './pages/TipsPage'
import { SettingsPage } from './pages/SettingsPage'
import { NotFoundPage } from './pages/NotFoundPage'

function ScrollToTop() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (hash) {
      window.setTimeout(() => {
        const target = document.querySelector(hash)
        target?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }, 10)
      return
    }
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname, hash])
  return null
}

function SiteLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      <a
        href="#main-content"
        className="sr-only z-[100] rounded-full bg-white px-5 py-3 text-sm font-semibold text-charcoal focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Skip to main content
      </a>
      <Header />
      <main id="main-content" className="flex-1">
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/calculator" element={<CalculatorPage />} />
          <Route path="/wardrobe" element={<WardrobePage />} />
          <Route path="/learn" element={<ResearchPage />} />
          <Route path="/learn/:slug" element={<ArticlePage />} />
          <Route path="/tips" element={<TipsPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export function App() {
  return (
    <BrowserRouter>
      <ToastProvider>
        <WardrobeProvider>
          <SiteLayout />
        </WardrobeProvider>
      </ToastProvider>
    </BrowserRouter>
  )
}
