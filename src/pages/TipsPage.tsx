import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowRight,
  Bookmark,
  BookmarkCheck,
  Check,
  CircleDollarSign,
  HeartHandshake,
  Scissors,
  ShoppingBag,
  Sparkles,
  UsersRound,
  WashingMachine,
  Wrench,
  type LucideIcon,
} from 'lucide-react'
import { PageHeader, EmptyState } from '../components/ui/LayoutPrimitives'
import { Badge } from '../components/ui/Badge'
import { Button, ButtonLink } from '../components/ui/Button'
import { InfoNote } from '../components/ui/Form'
import { useToast } from '../context/ToastContext'
import { TIPS, TIP_CATEGORIES, type Tip, type TipCategory } from '../data/tips'
import { cn, pluralise } from '../lib/utils'

const categoryIcons: Record<TipCategory, LucideIcon> = {
  'Clothing care': WashingMachine,
  'Repair & reuse': Scissors,
  'Second-hand shopping': ShoppingBag,
  'Swaps & sharing': UsersRound,
  'Responsible donation': HeartHandshake,
  'Buying less': CircleDollarSign,
}

const categoryStyles: Record<TipCategory, { badge: string; icon: string }> = {
  'Clothing care': { badge: 'bg-water text-water-deep', icon: 'bg-water text-water-deep' },
  'Repair & reuse': { badge: 'bg-sage text-forest', icon: 'bg-sage text-forest' },
  'Second-hand shopping': { badge: 'bg-sand text-[#78664D]', icon: 'bg-sand text-[#78664D]' },
  'Swaps & sharing': { badge: 'bg-sage text-forest', icon: 'bg-sage text-forest' },
  'Responsible donation': { badge: 'bg-water text-water-deep', icon: 'bg-water text-water-deep' },
  'Buying less': { badge: 'bg-sand text-[#78664D]', icon: 'bg-sand text-[#78664D]' },
}

export function TipsPage() {
  const [activeCategory, setActiveCategory] = useState<'All tips' | 'Saved' | TipCategory>('All tips')
  const [saved, setSaved] = useState<string[]>([])
  const { toast } = useToast()

  const filtered = useMemo(() => {
    if (activeCategory === 'All tips') return TIPS
    if (activeCategory === 'Saved') return TIPS.filter((tip) => saved.includes(tip.id))
    return TIPS.filter((tip) => tip.category === activeCategory)
  }, [activeCategory, saved])

  const toggleSaved = (tip: Tip) => {
    setSaved((current) => {
      const isSaved = current.includes(tip.id)
      if (isSaved) {
        toast({
          title: 'Removed from saved tips',
          description: `“${tip.title}” is no longer on your shortlist.`,
          tone: 'info',
        })
        return current.filter((id) => id !== tip.id)
      }
      toast({
        title: 'Tip saved',
        description: `“${tip.title}” is on your shortlist for later.`,
        tone: 'success',
      })
      return [...current, tip.id]
    })
  }

  return (
    <>
      <PageHeader
        eyebrow="Tips & Tricks"
        title="Small habits. Longer-lasting clothes."
        description="Practical ways to care, repair, swap, donate and buy less. Start with one thing this week — not a perfect overhaul."
        aside={
          <div className="flex flex-col items-start gap-3 lg:items-end">
            <Badge tone="sage">
              <Sparkles className="size-3" aria-hidden="true" />
              Practical, not preachy
            </Badge>
            <div className="rounded-2xl border border-border bg-white/70 px-4 py-3">
              <p className="text-[10px] font-semibold uppercase tracking-[0.13em] text-muted">
                Your shortlist
              </p>
              <p className="mt-1 font-display text-xl font-semibold tracking-[-0.03em] text-charcoal">
                {saved.length} saved {pluralise(saved.length, 'tip')}
              </p>
            </div>
          </div>
        }
      />

      <div className="container-page py-10 sm:py-14 lg:py-16">
        <section className="relative overflow-hidden rounded-[2rem] bg-sage/65">
          <div className="grid lg:grid-cols-[1.12fr_0.88fr]">
            <div className="relative z-10 flex flex-col justify-center p-6 sm:p-9 lg:p-12">
              <div className="flex items-center gap-2">
                <Badge tone="outline" className="border-forest/15 bg-white/70">
                  <Wrench className="size-3" aria-hidden="true" />
                  Start here
                </Badge>
                <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-forest/65">
                  A five-minute reset
                </span>
              </div>
              <h2 className="mt-4 max-w-xl text-balance font-display text-3xl font-semibold leading-[1.12] tracking-[-0.04em] text-charcoal sm:text-4xl">
                Before you replace it, take one more look.
              </h2>
              <p className="mt-4 max-w-lg text-sm leading-relaxed text-muted sm:text-[15px]">
                Find one garment you have stopped wearing because of a loose button, a small seam
                or a missing hem. Put it somewhere visible and give it five minutes — or a place on
                your repair list.
              </p>
              <div className="mt-6 flex flex-col gap-2.5 sm:flex-row">
                <ButtonLink to="/wardrobe" size="md">
                  Find a repair candidate
                  <ArrowRight className="size-4" aria-hidden="true" />
                </ButtonLink>
                <Link
                  to="/learn/care-and-longevity"
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-4 text-sm font-semibold text-forest transition hover:bg-white/50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest"
                >
                  Read the care guide
                </Link>
              </div>
            </div>
            <div className="relative min-h-[18rem] lg:min-h-full">
              <img
                src="/images/sewing.jpg"
                alt="A sewing setup ready for a small clothing repair"
                loading="lazy"
                className="absolute inset-0 size-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/25 via-transparent to-transparent lg:bg-gradient-to-r lg:from-sage/65 lg:via-transparent lg:to-transparent" />
              <div className="absolute bottom-4 right-4 rounded-2xl border border-white/50 bg-ivory/90 px-4 py-3 backdrop-blur-md lg:bottom-6 lg:right-6">
                <div className="flex items-center gap-2.5">
                  <span className="flex size-8 items-center justify-center rounded-full bg-forest text-white">
                    <Check className="size-4" aria-hidden="true" />
                  </span>
                  <div>
                    <p className="text-[10px] font-medium uppercase tracking-[0.12em] text-muted">One small win</p>
                    <p className="text-xs font-semibold text-charcoal">Repair before replace</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-10 sm:mt-14" aria-labelledby="tips-heading">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.17em] text-forest">
                A practical library
              </p>
              <h2
                id="tips-heading"
                className="mt-2 font-display text-3xl font-semibold tracking-[-0.04em] text-charcoal"
              >
                Choose a place to begin
              </h2>
            </div>
            <p className="max-w-sm text-xs leading-relaxed text-muted sm:text-right">
              Every tip is designed to fit a real routine. Save a few to come back to later.
            </p>
          </div>

          <div className="no-scrollbar mt-6 flex gap-2 overflow-x-auto pb-1" role="group" aria-label="Filter tips">
            <CategoryChip
              label="All tips"
              active={activeCategory === 'All tips'}
              onClick={() => setActiveCategory('All tips')}
              count={TIPS.length}
            />
            {TIP_CATEGORIES.map((category) => {
              const Icon = categoryIcons[category]
              return (
                <CategoryChip
                  key={category}
                  label={category}
                  active={activeCategory === category}
                  onClick={() => setActiveCategory(category)}
                  icon={<Icon className="size-3.5" aria-hidden="true" />}
                  count={TIPS.filter((tip) => tip.category === category).length}
                />
              )
            })}
            <CategoryChip
              label="Saved"
              active={activeCategory === 'Saved'}
              onClick={() => setActiveCategory('Saved')}
              icon={<Bookmark className="size-3.5" aria-hidden="true" />}
              count={saved.length}
            />
          </div>

          {filtered.length ? (
            <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((tip) => (
                <TipCard
                  key={tip.id}
                  tip={tip}
                  saved={saved.includes(tip.id)}
                  onToggleSaved={() => toggleSaved(tip)}
                />
              ))}
            </div>
          ) : (
            <div className="mt-7">
              <EmptyState
                icon={<Bookmark className="size-7" aria-hidden="true" />}
                title="No saved tips yet."
                description="Tap the bookmark on any tip to keep it on your shortlist. Your saved tips stay here for this browser session."
                action={
                  <Button variant="secondary" onClick={() => setActiveCategory('All tips')}>
                    Browse all tips
                  </Button>
                }
              />
            </div>
          )}
        </section>

        <section className="mt-12 grid gap-5 rounded-3xl border border-border bg-white p-6 sm:p-8 lg:grid-cols-[1fr_auto] lg:items-center">
          <div className="flex items-start gap-4">
            <span className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-sage text-forest">
              <WashingMachine className="size-5" aria-hidden="true" />
            </span>
            <div>
              <h2 className="font-display text-xl font-semibold tracking-[-0.025em] text-charcoal">
                Connect the habit to the wardrobe.
              </h2>
              <p className="mt-1 max-w-2xl text-sm leading-relaxed text-muted">
                Notice which pieces need care, which are rarely worn and which are ready for a new
                home. My Wardrobe gives you one calm view.
              </p>
            </div>
          </div>
          <ButtonLink to="/wardrobe" variant="secondary" className="justify-self-start lg:justify-self-end">
            Open My Wardrobe
            <ArrowRight className="size-4" aria-hidden="true" />
          </ButtonLink>
        </section>

        <div className="mt-6">
          <InfoNote tone="sand" icon="alert">
            <strong className="font-semibold">No live marketplace here.</strong> WearWell does not
            currently offer second-hand recommendations or a resale service. These tips are general
            guidance, not personalised listings or availability.
          </InfoNote>
        </div>
      </div>
    </>
  )
}

function CategoryChip({
  label,
  active,
  onClick,
  icon,
  count,
}: {
  label: string
  active: boolean
  onClick: () => void
  icon?: React.ReactNode
  count: number
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        'inline-flex shrink-0 items-center gap-1.5 rounded-full border px-3.5 py-2 text-xs font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest',
        active
          ? 'border-forest bg-forest text-white'
          : 'border-border bg-white text-muted hover:border-forest/35 hover:text-charcoal',
      )}
    >
      {icon}
      {label}
      <span
        className={cn(
          'rounded-full px-1.5 py-0.5 text-[9px]',
          active ? 'bg-white/15 text-white/80' : 'bg-ivory text-muted',
        )}
      >
        {count}
      </span>
    </button>
  )
}

function TipCard({
  tip,
  saved,
  onToggleSaved,
}: {
  tip: Tip
  saved: boolean
  onToggleSaved: () => void
}) {
  const Icon = categoryIcons[tip.category]
  const style = categoryStyles[tip.category]
  return (
    <article className="group flex flex-col rounded-3xl border border-border bg-white p-5 shadow-soft transition duration-300 hover:-translate-y-1 hover:shadow-card">
      <div className="flex items-start justify-between gap-3">
        <span className={cn('flex size-10 items-center justify-center rounded-2xl', style.icon)}>
          <Icon className="size-[18px]" aria-hidden="true" />
        </span>
        <button
          type="button"
          onClick={onToggleSaved}
          aria-pressed={saved}
          aria-label={saved ? `Remove ${tip.title} from saved tips` : `Save ${tip.title}`}
          className={cn(
            'flex size-8 items-center justify-center rounded-full transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest',
            saved ? 'bg-sage text-forest' : 'text-muted hover:bg-ivory hover:text-charcoal',
          )}
        >
          {saved ? (
            <BookmarkCheck className="size-4" aria-hidden="true" />
          ) : (
            <Bookmark className="size-4" aria-hidden="true" />
          )}
        </button>
      </div>

      <div className="mt-4 flex-1">
        <span className={cn('inline-flex rounded-full px-2.5 py-1 text-[10px] font-semibold', style.badge)}>
          {tip.category}
        </span>
        <h3 className="mt-3 font-display text-lg font-semibold leading-snug tracking-[-0.025em] text-charcoal">
          {tip.title}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-muted">{tip.description}</p>
      </div>

      <div className="mt-5 flex items-center justify-between gap-3 border-t border-border/70 pt-3.5">
        <span className="text-[10px] font-medium uppercase tracking-[0.11em] text-muted">{tip.time}</span>
        {tip.actionTo && tip.actionLabel ? (
          <Link
            to={tip.actionTo}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-forest transition hover:text-forest-deep"
          >
            {tip.actionLabel}
            <ArrowRight className="size-3.5" aria-hidden="true" />
          </Link>
        ) : (
          <span className="inline-flex items-center gap-1 text-[10px] text-muted">
            <Check className="size-3 text-forest" aria-hidden="true" />
            Ready when you are
          </span>
        )}
      </div>
    </article>
  )
}
