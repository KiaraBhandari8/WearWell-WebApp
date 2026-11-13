import { Minus, Plus } from 'lucide-react'
import { cn } from '../../lib/utils'

export function QuantityStepper({
  value,
  onChange,
  min = 1,
  max = 99,
  id = 'quantity',
  label = 'Quantity',
}: {
  value: number
  onChange: (value: number) => void
  min?: number
  max?: number
  id?: string
  label?: string
}) {
  const decrease = () => onChange(Math.max(min, value - 1))
  const increase = () => onChange(Math.min(max, value + 1))

  return (
    <div className="inline-flex h-12 items-center rounded-xl border border-border bg-white p-1 shadow-sm">
      <button
        type="button"
        onClick={decrease}
        disabled={value <= min}
        className="flex size-9 items-center justify-center rounded-lg text-charcoal transition hover:bg-ivory focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-forest disabled:cursor-not-allowed disabled:opacity-35"
        aria-label={`Decrease ${label.toLowerCase()}`}
      >
        <Minus className="size-4" aria-hidden="true" />
      </button>
      <label htmlFor={id} className="sr-only">
        {label}
      </label>
      <input
        id={id}
        type="number"
        inputMode="numeric"
        min={min}
        max={max}
        value={value}
        onChange={(event) => {
          const next = Number(event.target.value)
          if (!Number.isFinite(next)) return
          onChange(Math.min(max, Math.max(min, Math.round(next))))
        }}
        className="h-full w-12 border-0 bg-transparent p-0 text-center text-sm font-semibold text-charcoal outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
      />
      <button
        type="button"
        onClick={increase}
        disabled={value >= max}
        className="flex size-9 items-center justify-center rounded-lg text-charcoal transition hover:bg-ivory focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-forest disabled:cursor-not-allowed disabled:opacity-35"
        aria-label={`Increase ${label.toLowerCase()}`}
      >
        <Plus className="size-4" aria-hidden="true" />
      </button>
    </div>
  )
}

export function Toggle({
  checked,
  onChange,
  label,
  description,
  id,
}: {
  checked: boolean
  onChange: (checked: boolean) => void
  label: string
  description?: string
  id: string
}) {
  return (
    <div className="flex items-start justify-between gap-6 py-4">
      <div className="min-w-0">
        <label htmlFor={id} className="cursor-pointer text-sm font-semibold text-charcoal">
          {label}
        </label>
        {description ? <p className="mt-1 text-sm leading-relaxed text-muted">{description}</p> : null}
      </div>
      <button
        type="button"
        id={id}
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={cn(
          'relative mt-0.5 h-7 w-12 shrink-0 rounded-full border transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest',
          checked ? 'border-forest bg-forest' : 'border-border bg-[#E5E7E1]',
        )}
      >
        <span
          className={cn(
            'absolute top-0.5 size-5 rounded-full bg-white shadow-sm transition-transform',
            checked ? 'left-0.5 translate-x-5' : 'left-0.5 translate-x-0',
          )}
        />
      </button>
    </div>
  )
}
