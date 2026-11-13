import { Link } from 'react-router-dom'
import { ArrowUpRight, Droplets, Instagram, Mail } from 'lucide-react'
import { Logo } from '../brand/Logo'

const exploreLinks = [
  { label: 'Home', to: '/' },
  { label: 'Water Calculator', to: '/calculator' },
  { label: 'My Wardrobe', to: '/wardrobe' },
  { label: 'Research & Learn', to: '/learn' },
  { label: 'Tips & Tricks', to: '/tips' },
]

const aboutLinks = [
  { label: 'Privacy & Settings', to: '/settings' },
  { label: 'Sources & methodology', to: '/learn' },
  { label: 'Contact', to: '/settings#contact' },
]

export function Footer() {
  return (
    <footer className="mt-auto bg-[#3F5B46] text-ivory">
      <div className="container-page py-12 sm:py-16">
        <div className="grid gap-10 lg:grid-cols-[1.5fr_0.8fr_0.8fr_1fr] lg:gap-14">
          <div>
            <Logo light />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-ivory/65">
              A calmer, clearer way to understand the water behind your wardrobe — and to get more
              wear from what you already own.
            </p>
            <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-ivory/15 bg-ivory/[0.06] px-3.5 py-2 text-xs text-ivory/70">
              <Droplets className="size-3.5 text-[#B7D2C0]" aria-hidden="true" />
              Know your clothes. Use them better.
            </div>
          </div>

          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-ivory/40">Explore</p>
            <ul className="mt-4 space-y-3">
              {exploreLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-sm text-ivory/70 transition hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ivory"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-ivory/40">About</p>
            <ul className="mt-4 space-y-3">
              {aboutLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    className="text-sm text-ivory/70 transition hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ivory"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-[11px] leading-relaxed text-ivory/40">
              Contact details will be added before launch. No live inbox yet.
            </p>
          </div>

          <div className="rounded-2xl border border-ivory/15 bg-ivory/[0.07] p-5">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-ivory/40">Stage one preview</p>
            <p className="mt-3 text-sm leading-relaxed text-ivory/70">
              Estimates are illustrative. Research sources are being verified and will be published
              alongside the calculation model.
            </p>
            <Link
              to="/learn"
              className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-[#D7E8DB] transition hover:text-white"
            >
              Visit the research library
              <ArrowUpRight className="size-3.5" aria-hidden="true" />
            </Link>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-4 border-t border-ivory/15 pt-6 text-xs text-ivory/45 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} WearWell. A concept for more considered clothing.</p>
          <div className="flex items-center gap-4">
            <a
              href="https://unsplash.com"
              target="_blank"
              rel="noreferrer"
              className="transition hover:text-ivory/80"
            >
              Photography via Unsplash
            </a>
            <div className="flex items-center gap-2" aria-label="Social links coming soon">
              <span className="flex size-7 items-center justify-center rounded-full border border-ivory/15">
                <Instagram className="size-3.5" aria-hidden="true" />
              </span>
              <span className="flex size-7 items-center justify-center rounded-full border border-ivory/15">
                <Mail className="size-3.5" aria-hidden="true" />
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
