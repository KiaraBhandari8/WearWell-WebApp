import type { ReactNode } from 'react'
import { cn } from '../../lib/utils'
import { STATUS_STYLES, type GarmentStatus } from '../../data/garments'

type BadgeTone = 'sage' | 'water' | 'sand' | 'neutral' | 'outline'

const tones: Record<BadgeTone, string> = {
  sage: 'bg-sage text-forest',
  water: 'bg-water text-water-deep',
  sand: 'bg-sand text-[#7A684E]',
  neutral: 'bg-ivory text-muted',
  outline: 'border border-border bg-white/80 text-charcoal',
}

export function Badge({
  children,
  tone = 'neutral',
  className,
}: {
  children: ReactNode
  tone?: BadgeTone
  className?: string
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold leading-none tracking-[0.02em]',
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  )
}

export function StatusBadge({
  status,
  className,
}: {
  status: GarmentStatus
  className?: string
}) {
  const style = STATUS_STYLES[status]
  return (
    <Badge tone={style.tone} className={className}>
      <span className={cn('size-1.5 rounded-full', style.dot)} aria-hidden="true" />
      {status}
    </Badge>
  )
}
