import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { CheckCircle2, Info, X, XCircle } from 'lucide-react'
import { cn } from '../lib/utils'

type ToastTone = 'success' | 'info' | 'error'

type ToastInput = {
  title: string
  description?: string
  tone?: ToastTone
}

type Toast = ToastInput & {
  id: string
  tone: ToastTone
}

type ToastContextValue = {
  toast: (input: ToastInput) => void
}

const ToastContext = createContext<ToastContextValue | null>(null)

const toneStyles: Record<ToastTone, { icon: typeof Info; iconWrap: string }> = {
  success: {
    icon: CheckCircle2,
    iconWrap: 'bg-sage text-forest',
  },
  info: {
    icon: Info,
    iconWrap: 'bg-water text-water-deep',
  },
  error: {
    icon: XCircle,
    iconWrap: 'bg-[#F6E8E3] text-[#99553F]',
  },
}

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([])

  const dismiss = useCallback((id: string) => {
    setToasts((current) => current.filter((item) => item.id !== id))
  }, [])

  const toast = useCallback((input: ToastInput) => {
    const id = `${Date.now()}-${Math.random().toString(16).slice(2)}`
    setToasts((current) => [
      ...current.slice(-2),
      { ...input, id, tone: input.tone ?? 'success' },
    ])
    window.setTimeout(() => {
      setToasts((current) => current.filter((item) => item.id !== id))
    }, 4600)
  }, [])

  useEffect(() => {
    if (!toasts.length) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setToasts([])
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [toasts.length])

  const value = useMemo(() => ({ toast }), [toast])

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div
        className="pointer-events-none fixed inset-x-0 bottom-4 z-[90] flex flex-col items-center gap-2 px-4 sm:bottom-6 sm:items-end sm:px-6"
        aria-live="polite"
        aria-atomic="false"
      >
        {toasts.map((item) => {
          const Icon = toneStyles[item.tone].icon
          return (
            <div
              key={item.id}
              className="pointer-events-auto w-full max-w-sm animate-slide-up rounded-2xl border border-border bg-white p-4 shadow-lift sm:animate-scale-in"
              role="status"
            >
              <div className="flex items-start gap-3">
                <span
                  className={cn(
                    'mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full',
                    toneStyles[item.tone].iconWrap,
                  )}
                >
                  <Icon className="size-4" aria-hidden="true" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-charcoal">{item.title}</p>
                  {item.description ? (
                    <p className="mt-0.5 text-sm leading-relaxed text-muted">{item.description}</p>
                  ) : null}
                </div>
                <button
                  type="button"
                  onClick={() => dismiss(item.id)}
                  className="flex size-7 shrink-0 items-center justify-center rounded-full text-muted transition hover:bg-ivory hover:text-charcoal focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest"
                  aria-label="Dismiss notification"
                >
                  <X className="size-4" aria-hidden="true" />
                </button>
              </div>
            </div>
          )
        })}
      </div>
    </ToastContext.Provider>
  )
}

export function useToast(): ToastContextValue {
  const context = useContext(ToastContext)
  if (!context) throw new Error('useToast must be used inside ToastProvider')
  return context
}
