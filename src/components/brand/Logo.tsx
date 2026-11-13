import { Link } from 'react-router-dom'
import { cn } from '../../lib/utils'

export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 44 44"
      className={cn('size-10', className)}
      role="img"
      aria-label="WearWell droplet and leaf mark"
    >
      <rect width="44" height="44" rx="14" fill="#54745A" />
      <path
        d="M22 9c4.4 5.9 8.7 10.9 8.7 16.7A8.7 8.7 0 0 1 22 34.4a8.7 8.7 0 0 1-8.7-8.7C13.3 19.9 17.6 14.9 22 9Z"
        fill="#DCE8D9"
      />
      <path
        d="M18.1 22.2c-1.2 2.8-.4 6.2 2.6 8.1"
        stroke="#396C7A"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M24.1 16.7c2.7.2 4.9 1.3 6.1 3.1-2.2.7-4.5.2-6.1-1.2-.5-.6-.5-1.3 0-1.9Z"
        fill="#54745A"
      />
    </svg>
  )
}

export function Logo({
  className,
  light = false,
  onClick,
}: {
  className?: string
  light?: boolean
  onClick?: () => void
}) {
  return (
    <Link
      to="/"
      onClick={onClick}
      className={cn(
        'group inline-flex items-center gap-2.5 rounded-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-forest',
        className,
      )}
      aria-label="WearWell home"
    >
      <LogoMark className="size-9 transition-transform duration-300 group-hover:-rotate-3" />
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            'font-display text-[21px] font-semibold tracking-[-0.045em]',
            light ? 'text-ivory' : 'text-charcoal',
          )}
        >
          WearWell
        </span>
        <span
          className={cn(
            'mt-1 hidden text-[8px] font-semibold uppercase tracking-[0.22em] sm:block',
            light ? 'text-ivory/55' : 'text-muted',
          )}
        >
          Know your clothes
        </span>
      </span>
    </Link>
  )
}
