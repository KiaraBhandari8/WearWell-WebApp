import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { Calculator, Menu, Settings, X } from 'lucide-react'
import { Logo, LogoMark } from '../brand/Logo'
import { ButtonLink } from '../ui/Button'
import { cn } from '../../lib/utils'

const NAV_ITEMS = [
  { label: 'Home', to: '/' },
  { label: 'Water Calculator', to: '/calculator' },
  { label: 'My Wardrobe', to: '/wardrobe' },
  { label: 'Research & Learn', to: '/learn' },
  { label: 'Tips & Tricks', to: '/tips' },
]

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    setMenuOpen(false)
  }, [location.pathname])

  useEffect(() => {
    if (!menuOpen) return
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [menuOpen])

  const isActive = (to: string) =>
    to === '/' ? location.pathname === '/' : location.pathname.startsWith(to)

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-border/75 bg-ivory/92 backdrop-blur-xl">
        <div className="container-page flex h-[76px] items-center justify-between gap-5">
          <Logo />

          <nav aria-label="Primary navigation" className="hidden items-center gap-0.5 lg:flex">
            {NAV_ITEMS.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={cn(
                  'relative rounded-full px-3.5 py-2.5 text-[13px] font-medium text-muted transition duration-200 hover:bg-sage/45 hover:text-charcoal focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest',
                  isActive(item.to) && 'bg-sage/80 font-semibold text-forest',
                )}
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Link
              to="/settings"
              aria-label="Privacy and settings"
              className={cn(
                'hidden size-10 items-center justify-center rounded-full border border-transparent text-muted transition hover:border-border hover:bg-white hover:text-charcoal focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest sm:flex',
                location.pathname === '/settings' && 'border-border bg-white text-forest',
              )}
            >
              <Settings className="size-[18px]" strokeWidth={1.8} aria-hidden="true" />
            </Link>
            <ButtonLink to="/calculator" size="sm" className="hidden sm:inline-flex">
              <Calculator className="size-4" aria-hidden="true" />
              Calculate
            </ButtonLink>
            <button
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              className="flex size-10 items-center justify-center rounded-full border border-border bg-white text-charcoal transition hover:bg-sage/50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest lg:hidden"
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            >
              {menuOpen ? (
                <X className="size-5" aria-hidden="true" />
              ) : (
                <Menu className="size-5" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </header>

      {menuOpen ? (
        <div className="fixed inset-0 z-[60] lg:hidden" id="mobile-menu">
          <div
            className="absolute inset-0 bg-charcoal/30 backdrop-blur-sm"
            onClick={() => setMenuOpen(false)}
            aria-hidden="true"
          />
          <div className="absolute inset-x-0 top-0 max-h-[92dvh] animate-slide-up overflow-y-auto rounded-b-[2rem] border-b border-border bg-ivory p-5 shadow-lift">
            <div className="flex items-center justify-between">
              <Logo onClick={() => setMenuOpen(false)} />
              <button
                type="button"
                onClick={() => setMenuOpen(false)}
                className="flex size-10 items-center justify-center rounded-full bg-white text-charcoal"
                aria-label="Close menu"
              >
                <X className="size-5" aria-hidden="true" />
              </button>
            </div>

            <nav className="mt-8" aria-label="Mobile navigation">
              <ul className="space-y-1.5">
                {NAV_ITEMS.map((item, index) => (
                  <li key={item.to}>
                    <NavLink
                      to={item.to}
                      className={cn(
                        'flex items-center justify-between rounded-2xl px-4 py-3.5 text-base font-medium text-charcoal transition hover:bg-sage/60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-forest',
                        isActive(item.to) && 'bg-sage text-forest',
                      )}
                    >
                      <span>{item.label}</span>
                      <span className="font-display text-[11px] text-muted">0{index + 1}</span>
                    </NavLink>
                  </li>
                ))}
                <li>
                  <NavLink
                    to="/settings"
                    className={cn(
                      'flex items-center justify-between rounded-2xl px-4 py-3.5 text-base font-medium text-charcoal transition hover:bg-sage/60',
                      location.pathname === '/settings' && 'bg-sage text-forest',
                    )}
                  >
                    <span>Privacy & Settings</span>
                    <Settings className="size-4 text-muted" aria-hidden="true" />
                  </NavLink>
                </li>
              </ul>
            </nav>

            <div className="mt-6 rounded-2xl border border-border bg-white p-4">
              <div className="flex items-center gap-3">
                <LogoMark className="size-10" />
                <p className="text-sm font-medium leading-snug text-charcoal">
                  Know your clothes.
                  <br />
                  Use them better.
                </p>
              </div>
              <ButtonLink to="/calculator" fullWidth className="mt-4" onClick={() => setMenuOpen(false)}>
                Calculate your footprint
              </ButtonLink>
            </div>
          </div>
        </div>
      ) : null}
    </>
  )
}
