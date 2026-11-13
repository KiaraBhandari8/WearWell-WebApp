import { Eye, Pencil, Shirt, Trash2 } from 'lucide-react'
import { GarmentImage } from '../ui/GarmentImage'
import { StatusBadge } from '../ui/Badge'
import type { Garment } from '../../data/garments'
import { formatLitres, footprintRange } from '../../data/garments'
import { cn, formatNumber, pluralise } from '../../lib/utils'
import { useWardrobe } from '../../context/WardrobeContext'

export function GarmentCard({
  garment,
  onView,
  onEdit,
  onDelete,
}: {
  garment: Garment
  onView: () => void
  onEdit: () => void
  onDelete: () => void
}) {
  const { settings } = useWardrobe()
  const range = footprintRange(garment)
  const estimate = range
    ? range.min === range.max
      ? formatLitres(range.min)
      : `${formatNumber(range.min)}–${formatNumber(range.max)} L`
    : null

  return (
    <article className="group flex flex-col overflow-hidden rounded-3xl border border-border bg-white shadow-soft transition duration-300 hover:-translate-y-1 hover:shadow-card">
      <div className="relative">
        <button
          type="button"
          onClick={onView}
          className="block w-full overflow-hidden text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-forest"
          aria-label={`View ${garment.name}`}
        >
          <GarmentImage
            src={garment.image}
            alt={garment.name}
            className="aspect-[4/3] w-full"
            imgClassName="group-hover:scale-[1.035]"
          />
        </button>
        <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-charcoal/25 to-transparent" />
        <div className="absolute left-3.5 top-3.5">
          <StatusBadge status={garment.status} />
        </div>
        <span className="absolute right-3.5 top-3.5 flex items-center gap-1 rounded-full bg-ivory/90 px-2.5 py-1.5 text-[10px] font-semibold text-charcoal backdrop-blur">
          <Shirt className="size-3 text-forest" aria-hidden="true" />
          {garment.quantity} {pluralise(garment.quantity, 'piece')}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <button type="button" onClick={onView} className="group/title text-left">
          <h3 className="line-clamp-1 font-display text-lg font-semibold tracking-[-0.025em] text-charcoal transition group-hover/title:text-forest">
            {garment.name}
          </h3>
        </button>
        <p className="mt-1 text-xs text-muted">
          {garment.category}
          {garment.material ? <span> · {garment.material}</span> : null}
        </p>

        <div className="mt-4 flex items-end justify-between gap-3 border-t border-border/70 pt-3.5">
          <div>
            <p className="text-[10px] font-medium uppercase tracking-[0.12em] text-muted">
              Footprint estimate
            </p>
            <p className={cn('mt-1 text-sm font-semibold text-charcoal', !settings.showEstimates && 'text-muted')}>
              {settings.showEstimates && estimate ? (
                <>
                  ≈ {estimate}
                  <span className="font-normal text-muted"> / item</span>
                </>
              ) : (
                'Hidden in settings'
              )}
            </p>
          </div>
          <div className="flex items-center gap-1">
            <ActionButton label={`View ${garment.name}`} onClick={onView}>
              <Eye className="size-4" aria-hidden="true" />
            </ActionButton>
            <ActionButton label={`Edit ${garment.name}`} onClick={onEdit}>
              <Pencil className="size-4" aria-hidden="true" />
            </ActionButton>
            <ActionButton label={`Delete ${garment.name}`} onClick={onDelete} danger>
              <Trash2 className="size-4" aria-hidden="true" />
            </ActionButton>
          </div>
        </div>
      </div>
    </article>
  )
}

function ActionButton({
  children,
  label,
  onClick,
  danger = false,
}: {
  children: React.ReactNode
  label: string
  onClick: () => void
  danger?: boolean
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className={cn(
        'flex size-8 items-center justify-center rounded-full text-muted transition hover:bg-ivory hover:text-charcoal focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest',
        danger && 'hover:bg-[#F8EAE5] hover:text-[#99503C]',
      )}
    >
      {children}
    </button>
  )
}
