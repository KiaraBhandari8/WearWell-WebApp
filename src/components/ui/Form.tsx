import type { ReactNode } from 'react'
import { AlertCircle, CheckCircle2, Info, XCircle } from 'lucide-react'
import { cn } from '../../lib/utils'
import { Button } from './Button'
import { Modal } from './Modal'

export function FormField({
  id,
  label,
  hint,
  error,
  required,
  optional,
  children,
  className,
}: {
  id: string
  label: string
  hint?: string
  error?: string
  required?: boolean
  optional?: boolean
  children: ReactNode
  className?: string
}) {
  return (
    <div className={cn('space-y-2', className)}>
      <div className="flex items-baseline justify-between gap-3">
        <label htmlFor={id} className="text-sm font-semibold text-charcoal">
          {label}
          {required ? <span className="ml-1 text-[#9A4C39]">*</span> : null}
          {optional ? <span className="ml-1.5 font-normal text-muted">(optional)</span> : null}
        </label>
        {hint ? <span className="text-[11px] text-muted">{hint}</span> : null}
      </div>
      {children}
      {error ? (
        <p id={`${id}-error`} className="flex items-center gap-1.5 text-xs font-medium text-[#99503C]">
          <AlertCircle className="size-3.5 shrink-0" aria-hidden="true" />
          {error}
        </p>
      ) : null}
    </div>
  )
}

export const inputStyles =
  'w-full rounded-xl border border-border bg-white px-3.5 py-3 text-sm text-charcoal shadow-[inset_0_1px_0_rgba(255,255,255,0.6)] outline-none transition placeholder:text-muted/75 focus:border-forest focus:ring-4 focus:ring-forest/10 disabled:cursor-not-allowed disabled:bg-ivory disabled:text-muted aria-[invalid=true]:border-[#B56A54] aria-[invalid=true]:ring-4 aria-[invalid=true]:ring-[#B56A54]/10'

export function InfoNote({
  children,
  tone = 'sage',
  icon = 'info',
  className,
}: {
  children: ReactNode
  tone?: 'sage' | 'water' | 'sand' | 'error'
  icon?: 'info' | 'check' | 'alert' | 'error'
  className?: string
}) {
  const styles = {
    sage: 'bg-sage/65 text-forest',
    water: 'bg-water/75 text-water-deep',
    sand: 'bg-sand/80 text-[#78664D]',
    error: 'bg-[#F8EAE5] text-[#99503C]',
  }
  const Icon =
    icon === 'check' ? CheckCircle2 : icon === 'alert' ? AlertCircle : icon === 'error' ? XCircle : Info
  return (
    <div className={cn('flex items-start gap-3 rounded-2xl px-4 py-3.5', styles[tone], className)}>
      <Icon className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
      <div className="text-sm leading-relaxed">{children}</div>
    </div>
  )
}

export function ConfirmDialog({
  open,
  onClose,
  onConfirm,
  title,
  description,
  confirmLabel,
  cancelLabel = 'Keep it',
  tone = 'danger',
}: {
  open: boolean
  onClose: () => void
  onConfirm: () => void
  title: string
  description: string
  confirmLabel: string
  cancelLabel?: string
  tone?: 'danger' | 'primary'
}) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      title={title}
      description={description}
      size="sm"
      footer={
        <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
          <Button variant="secondary" onClick={onClose}>
            {cancelLabel}
          </Button>
          <Button
            variant={tone === 'danger' ? 'danger' : 'primary'}
            onClick={() => {
              onConfirm()
              onClose()
            }}
          >
            {confirmLabel}
          </Button>
        </div>
      }
    >
      <div className="rounded-2xl bg-ivory p-4 text-sm leading-relaxed text-muted">
        This action takes effect immediately. In this preview build, wardrobe data is held for the
        current browser session only.
      </div>
    </Modal>
  )
}
