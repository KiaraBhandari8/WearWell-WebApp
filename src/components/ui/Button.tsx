import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { cn } from '../../lib/utils'

type ButtonVariant = 'primary' | 'secondary' | 'soft' | 'water' | 'ghost' | 'danger'
type ButtonSize = 'sm' | 'md' | 'lg'

const base =
  'inline-flex items-center justify-center gap-2 rounded-full font-semibold transition duration-200 ease-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest disabled:cursor-not-allowed disabled:opacity-55'

const variants: Record<ButtonVariant, string> = {
  primary:
    'bg-forest text-white shadow-soft hover:bg-forest-deep hover:shadow-card active:translate-y-px',
  secondary:
    'border border-border bg-white text-charcoal shadow-sm hover:border-forest/35 hover:bg-sage/30 active:translate-y-px',
  soft: 'bg-sage text-forest hover:bg-[#D2E2CF] active:translate-y-px',
  water: 'bg-water text-water-deep hover:bg-[#D7E7EC] active:translate-y-px',
  ghost: 'text-charcoal hover:bg-sage/55 active:translate-y-px',
  danger:
    'bg-[#9A4C39] text-white shadow-sm hover:bg-[#833E2F] active:translate-y-px focus-visible:outline-[#9A4C39]',
}

const sizes: Record<ButtonSize, string> = {
  sm: 'min-h-9 px-4 text-sm',
  md: 'min-h-11 px-5 text-sm',
  lg: 'min-h-[52px] px-6 text-[15px]',
}

export function buttonStyles(
  variant: ButtonVariant = 'primary',
  size: ButtonSize = 'md',
  fullWidth = false,
  className?: string,
): string {
  return cn(base, variants[variant], sizes[size], fullWidth && 'w-full', className)
}

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant
  size?: ButtonSize
  fullWidth?: boolean
  children: ReactNode
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { variant = 'primary', size = 'md', fullWidth = false, className, children, ...props },
  ref,
) {
  return (
    <button
      ref={ref}
      className={buttonStyles(variant, size, fullWidth, className)}
      {...props}
    >
      {children}
    </button>
  )
})

type ButtonLinkProps = {
  to: string
  variant?: ButtonVariant
  size?: ButtonSize
  fullWidth?: boolean
  className?: string
  children: ReactNode
  state?: unknown
  onClick?: () => void
}

export function ButtonLink({
  to,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  className,
  children,
  state,
  onClick,
}: ButtonLinkProps) {
  return (
    <Link
      to={to}
      state={state}
      onClick={onClick}
      className={buttonStyles(variant, size, fullWidth, className)}
    >
      {children}
    </Link>
  )
}
