import { CalendarDays, Pencil, ShoppingBag, StickyNote, Trash2 } from 'lucide-react'
import { Modal } from '../ui/Modal'
import { Button } from '../ui/Button'
import { Badge, StatusBadge } from '../ui/Badge'
import { GarmentImage } from '../ui/GarmentImage'
import { useWardrobe } from '../../context/WardrobeContext'
import {
  formatLitres,
  footprintRange,
  type Garment,
} from '../../data/garments'
import { formatDate, formatNumber } from '../../lib/utils'

export function GarmentDetailModal({
  garment,
  open,
  onClose,
  onEdit,
  onDelete,
}: {
  garment: Garment | null
  open: boolean
  onClose: () => void
  onEdit: (garment: Garment) => void
  onDelete: (garment: Garment) => void
}) {
  const { settings } = useWardrobe()
  if (!garment) return null
  const range = footprintRange(garment)
  const perItem = range
    ? range.min === range.max
      ? formatLitres(range.min)
      : `${formatNumber(range.min)}–${formatNumber(range.max)} L`
    : null
  const total = range
    ? `${formatNumber(range.min * garment.quantity)}–${formatNumber(range.max * garment.quantity)} L`
    : null

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={garment.name}
      description={`${garment.category}${garment.material ? ` · ${garment.material}` : ''}`}
      size="lg"
      footer={
        <div className="flex flex-col-reverse gap-2 sm:flex-row sm:items-center sm:justify-between">
          <button
            type="button"
            onClick={() => onDelete(garment)}
            className="inline-flex items-center gap-1.5 self-start text-xs font-semibold text-[#99503C] transition hover:text-[#7E3D2E] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#99503C]"
          >
            <Trash2 className="size-3.5" aria-hidden="true" />
            Delete garment
          </button>
          <div className="flex flex-col-reverse gap-2 sm:flex-row">
            <Button variant="secondary" onClick={onClose}>
              Close
            </Button>
            <Button onClick={() => onEdit(garment)}>
              <Pencil className="size-4" aria-hidden="true" />
              Edit garment
            </Button>
          </div>
        </div>
      }
    >
      <div className="grid gap-6 md:grid-cols-[0.86fr_1.14fr]">
        <div>
          <GarmentImage
            src={garment.image}
            alt={garment.name}
            className="aspect-[4/5] w-full rounded-2xl"
          />
          <div className="mt-3 flex items-center justify-between gap-3">
            <StatusBadge status={garment.status} />
            <Badge tone="outline">Qty {garment.quantity}</Badge>
          </div>
        </div>

        <div>
          {settings.showEstimates && perItem ? (
            <div className="rounded-2xl bg-water/75 p-4">
              <div className="flex items-center justify-between gap-3">
                <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-water-deep/75">
                  Illustrative footprint
                </p>
                <Badge tone="water">Preview estimate</Badge>
              </div>
              <div className="mt-3 grid grid-cols-2 gap-4">
                <div>
                  <p className="text-[10px] text-[#5F6F72]">Per item</p>
                  <p className="mt-1 font-display text-lg font-semibold tracking-[-0.03em] text-charcoal">
                    ≈ {perItem}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] text-[#5F6F72]">For quantity</p>
                  <p className="mt-1 font-display text-lg font-semibold tracking-[-0.03em] text-charcoal">
                    {total}
                  </p>
                </div>
              </div>
              <p className="mt-3 text-[10px] leading-relaxed text-[#5F6F72]">
                Based on stage-one reference values. Material-specific adjustments and verified
                sources arrive in stage two.
              </p>
            </div>
          ) : (
            <div className="rounded-2xl bg-ivory p-4 text-sm text-muted">
              Footprint estimates are hidden in Privacy &amp; Settings.
            </div>
          )}

          <dl className="mt-5 divide-y divide-border/70 border-y border-border/70">
            <DetailRow label="Category" value={garment.category} />
            <DetailRow label="Material" value={garment.material || 'Not recorded'} />
            <DetailRow label="Quantity" value={`${garment.quantity}`} />
            <DetailRow label="Status" value={garment.status} />
            <DetailRow
              label="Purchased"
              value={formatDate(garment.purchaseDate)}
              icon={<CalendarDays className="size-3.5" aria-hidden="true" />}
            />
            <DetailRow
              label="Purchase price"
              value={garment.purchasePrice ? `£${garment.purchasePrice}` : 'Not recorded'}
              icon={<ShoppingBag className="size-3.5" aria-hidden="true" />}
            />
          </dl>

          {garment.notes ? (
            <div className="mt-5 rounded-2xl bg-sand/70 p-4">
              <p className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.13em] text-[#78664D]">
                <StickyNote className="size-3.5" aria-hidden="true" />
                Notes
              </p>
              <p className="mt-2 text-sm leading-relaxed text-[#655F56]">{garment.notes}</p>
            </div>
          ) : null}
        </div>
      </div>
    </Modal>
  )
}

function DetailRow({
  label,
  value,
  icon,
}: {
  label: string
  value: string
  icon?: React.ReactNode
}) {
  return (
    <div className="flex items-center justify-between gap-6 py-3">
      <dt className="flex items-center gap-1.5 text-xs text-muted">
        {icon}
        {label}
      </dt>
      <dd className="text-right text-xs font-semibold text-charcoal">{value}</dd>
    </div>
  )
}
