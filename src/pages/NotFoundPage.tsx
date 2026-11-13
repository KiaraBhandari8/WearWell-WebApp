import { Link } from 'react-router-dom'
import { ArrowLeft, Compass, Droplets } from 'lucide-react'
import { ButtonLink } from '../components/ui/Button'

export function NotFoundPage() {
  return (
    <section className="container-page flex min-h-[65vh] items-center justify-center py-16">
      <div className="relative max-w-xl text-center">
        <div className="pointer-events-none absolute left-1/2 top-0 -z-10 size-72 -translate-x-1/2 rounded-full bg-sage/60 blur-3xl" />
        <span className="mx-auto flex size-16 items-center justify-center rounded-3xl bg-sage text-forest shadow-soft">
          <Compass className="size-7" aria-hidden="true" />
        </span>
        <p className="mt-6 text-[11px] font-semibold uppercase tracking-[0.18em] text-forest">
          404 · Off the rail
        </p>
        <h1 className="mt-3 text-balance font-display text-4xl font-semibold tracking-[-0.045em] text-charcoal sm:text-5xl">
          This page isn&apos;t in the wardrobe.
        </h1>
        <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-muted sm:text-base">
          The link may be out of date, or the page may not exist yet. Let&apos;s get you back to
          something useful.
        </p>
        <div className="mt-7 flex flex-col justify-center gap-2 sm:flex-row">
          <ButtonLink to="/">
            <ArrowLeft className="size-4" aria-hidden="true" />
            Back home
          </ButtonLink>
          <ButtonLink to="/calculator" variant="secondary">
            <Droplets className="size-4" aria-hidden="true" />
            Try the calculator
          </ButtonLink>
        </div>
        <p className="mt-8 text-xs text-muted">
          Looking for research?{' '}
          <Link
            to="/learn"
            className="font-semibold text-forest underline decoration-forest/30 underline-offset-4"
          >
            Visit Research &amp; Learn
          </Link>
        </p>
      </div>
    </section>
  )
}
