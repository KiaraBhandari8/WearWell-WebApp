import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { cn } from '../../lib/utils'

export function Eyebrow({
  children,
  className,
  tone = 'forest',
}: {
  children: ReactNode
  className?: string
  tone?: 'forest' | 'water' | 'muted'
}) {
  return (
    <p
      className={cn(
        'flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.19em]',
        tone === 'forest' && 'text-forest',
        tone === 'water' && 'text-water-deep',
        tone === 'muted' && 'text-muted',
        className,
      )}
    >
      <span className="h-px w-5 bg-current opacity-55" aria-hidden="true" />
      {children}
    </p>
  )
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  action,
  align = 'left',
  className,
}: {
  eyebrow?: string
  title: ReactNode
  description?: string
  action?: { label: string; to: string }
  align?: 'left' | 'center'
  className?: string
}) {
  return (
    <div
      className={cn(
        'flex flex-col gap-5 md:flex-row md:items-end md:justify-between',
        align === 'center' && 'md:flex-col md:items-center md:text-center',
        className,
      )}
    >
      <div className={cn('max-w-2xl', align === 'center' && 'mx-auto')}>
        {eyebrow ? <Eyebrow className={cn(align === 'center' && 'justify-center')}>{eyebrow}</Eyebrow> : null}
        <h2 className="mt-3 font-display text-3xl font-semibold leading-[1.14] tracking-[-0.035em] text-charcoal sm:text-4xl">
          {title}
        </h2>
        {description ? (
          <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-muted sm:text-base">{description}</p>
        ) : null}
      </div>
      {action ? (
        <Link
          to={action.to}
          className="group inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-forest transition hover:text-forest-deep focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-forest"
        >
          {action.label}
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
        </Link>
      ) : null}
    </div>
  )
}

export function PageHeader({
  eyebrow,
  title,
  description,
  aside,
}: {
  eyebrow: string
  title: ReactNode
  description: string
  aside?: ReactNode
}) {
  return (
    <div className="relative overflow-hidden border-b border-border/80 bg-ivory">
      <div className="pointer-events-none absolute -right-20 -top-28 size-[22rem] rounded-full bg-sage/50 blur-3xl" />
      <div className="pointer-events-none absolute -left-24 bottom-0 size-56 rounded-full bg-water/60 blur-3xl" />
      <div className="container-page relative flex flex-col gap-8 py-12 sm:py-16 lg:flex-row lg:items-end lg:justify-between lg:py-20">
        <div className="max-w-3xl">
          <Eyebrow>{eyebrow}</Eyebrow>
          <h1 className="mt-4 text-balance font-display text-4xl font-semibold leading-[1.06] tracking-[-0.045em] text-charcoal sm:text-5xl lg:text-[3.6rem]">
            {title}
          </h1>
          <p className="mt-5 max-w-2xl text-[15px] leading-relaxed text-muted sm:text-base">{description}</p>
        </div>
        {aside ? <div className="shrink-0">{aside}</div> : null}
      </div>
    </div>
  )
}

export function EmptyState({
  icon,
  title,
  description,
  action,
  className,
}: {
  icon: ReactNode
  title: string
  description: string
  action?: ReactNode
  className?: string
}) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center rounded-3xl border border-dashed border-border bg-white/55 px-6 py-14 text-center',
        className,
      )}
    >
      <div className="flex size-16 items-center justify-center rounded-2xl bg-sage text-forest">{icon}</div>
      <h3 className="mt-5 font-display text-xl font-semibold tracking-[-0.02em] text-charcoal">{title}</h3>
      <p className="mt-2 max-w-sm text-sm leading-relaxed text-muted">{description}</p>
      {action ? <div className="mt-6">{action}</div> : null}
    </div>
  )
}
