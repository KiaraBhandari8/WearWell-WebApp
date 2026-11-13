import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Calculator,
  Check,
  Droplets,
  HeartHandshake,
  Info,
  Leaf,
  Recycle,
  RefreshCcw,
  Shirt,
  Sparkles,
  Sprout,
  WashingMachine,
} from 'lucide-react'
import { Button, ButtonLink } from '../components/ui/Button'
import { Badge } from '../components/ui/Badge'
import { Modal } from '../components/ui/Modal'
import { Eyebrow, SectionHeading } from '../components/ui/LayoutPrimitives'
import { InfoNote } from '../components/ui/Form'

type FigureKey = 'tee' | 'jeans'

const figureNotes: Record<
  FigureKey,
  { title: string; figure: string; body: string[]; note: string }
> = {
  tee: {
    title: 'About the 2,700-litre T-shirt figure',
    figure: '≈ 2,700 litres · one cotton T-shirt',
    body: [
      'This is an indicative estimate for a cotton T-shirt, used in WearWell to illustrate the scale of water involved across fibre growing, processing and production.',
      'It is not a universal measurement. Cotton’s water use varies with where and how it is grown, the weight of the fabric and the finishing processes used.',
    ],
    note: 'The verified source note for this figure is still being prepared. We will publish it alongside the stage-two calculation model.',
  },
  jeans: {
    title: 'About the jeans water estimate',
    figure: '≈ 7,600–9,506 litres · one pair of jeans',
    body: [
      'This range is an indicative reference for a pair of jeans. Denim uses more fabric than a light top and often passes through water-intensive finishing steps.',
      'The range exists because production is not uniform. Fibre origin, garment weight and the number of wet processes can all shift the result.',
    ],
    note: 'The verified source note for this figure is still being prepared. We will not attach a citation until it has been checked.',
  },
}

const features = [
  {
    number: '01',
    icon: Calculator,
    title: 'Calculate your clothing footprint',
    description:
      'Choose a garment, add its details and see an illustrative water estimate with a clear explanation of what sits behind it.',
    to: '/calculator',
    linkLabel: 'Open the calculator',
    image: '/images/water-3.jpg',
    imageAlt: 'Calm blue water',
    tone: 'water',
  },
  {
    number: '02',
    icon: Shirt,
    title: 'Build your digital wardrobe',
    description:
      'Bring your clothes into one considered view. Track materials, quantities, care needs and available estimates.',
    to: '/wardrobe',
    linkLabel: 'Explore your wardrobe',
    image: '/images/wardrobe-rack.jpg',
    imageAlt: 'Clothing hanging in a wardrobe',
    tone: 'sage',
  },
  {
    number: '03',
    icon: Sparkles,
    title: 'Discover sustainable alternatives',
    description:
      'Find practical ways to care, repair, swap and buy second-hand — and make the most of what is already yours.',
    to: '/tips',
    linkLabel: 'Browse practical tips',
    image: '/images/thrift.jpg',
    imageAlt: 'Second-hand clothing on rails',
    tone: 'sand',
  },
]

const sustainabilityActions = [
  {
    icon: WashingMachine,
    title: 'Care for clothes longer',
    text: 'Wash less often, choose cooler cycles and follow the care label.',
  },
  {
    icon: RefreshCcw,
    title: 'Repair before replacing',
    text: 'A button, a seam or a patch can add months — or years — of wear.',
  },
  {
    icon: Recycle,
    title: 'Reuse and swap',
    text: 'Pass on what no longer fits and borrow what you only need once.',
  },
  {
    icon: HeartHandshake,
    title: 'Donate with intention',
    text: 'Check what is actually needed, then pass items on clean and complete.',
  },
  {
    icon: Sprout,
    title: 'Choose second-hand first',
    text: 'Look for the already-made option before buying something new.',
  },
]

export function HomePage() {
  const [activeFigure, setActiveFigure] = useState<FigureKey | null>(null)
  const figure = activeFigure ? figureNotes[activeFigure] : null

  return (
    <>
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute -right-24 top-8 size-[32rem] rounded-full bg-sage/55 blur-[90px]" />
        <div className="pointer-events-none absolute -left-52 top-[28rem] size-[30rem] rounded-full bg-water/60 blur-[90px]" />
        <div className="container-page relative grid gap-10 pb-14 pt-10 sm:pb-20 sm:pt-14 lg:grid-cols-[1.04fr_0.96fr] lg:items-center lg:gap-16 lg:pb-24 lg:pt-16">
          <div className="relative z-10">
            <div className="flex flex-wrap items-center gap-2.5">
              <Badge tone="outline" className="border-forest/20 bg-white/70 py-1.5 pl-2 pr-3">
                <span className="flex size-5 items-center justify-center rounded-full bg-sage">
                  <Leaf className="size-3 text-forest" aria-hidden="true" />
                </span>
                Clothing, water &amp; conscious choices
              </Badge>
              <span className="text-[11px] font-medium uppercase tracking-[0.13em] text-muted">
                Stage-one preview
              </span>
            </div>

            <h1 className="mt-6 max-w-[13ch] text-balance font-display text-[2.9rem] font-semibold leading-[0.99] tracking-[-0.055em] text-charcoal sm:text-6xl lg:text-[4.45rem]">
              Your wardrobe has a{' '}
              <span className="relative inline-block text-forest">
                water footprint.
                <svg
                  viewBox="0 0 320 14"
                  className="absolute -bottom-1 left-0 w-full text-forest/25"
                  preserveAspectRatio="none"
                  aria-hidden="true"
                >
                  <path
                    d="M2 9.5c54-5 114-7 209-4.5 40 1 72 3 107 6"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </h1>

            <p className="mt-6 max-w-[34rem] text-pretty text-[15px] leading-[1.8] text-muted sm:text-lg sm:leading-relaxed">
              Every garment begins with water — in the field, the mill and the wash. Understanding
              that hidden cost can help you choose more thoughtfully, wear what you own and waste
              a little less.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ButtonLink to="/calculator" size="lg" className="group">
                Calculate your footprint
                <ArrowRight
                  className="size-4 transition-transform group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </ButtonLink>
              <ButtonLink to="/wardrobe" variant="secondary" size="lg">
                Explore your wardrobe
              </ButtonLink>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2.5 text-xs text-muted">
              <span className="inline-flex items-center gap-1.5">
                <Check className="size-3.5 text-forest" aria-hidden="true" />
                No account needed
              </span>
              <span className="h-1 w-1 rounded-full bg-border" aria-hidden="true" />
              <span className="inline-flex items-center gap-1.5">
                <Check className="size-3.5 text-forest" aria-hidden="true" />
                Estimates clearly labelled
              </span>
              <span className="h-1 w-1 rounded-full bg-border" aria-hidden="true" />
              <span className="inline-flex items-center gap-1.5">
                <Check className="size-3.5 text-forest" aria-hidden="true" />
                Built for everyday wardrobes
              </span>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-[34rem] lg:max-w-none">
            <div className="absolute -right-5 -top-5 hidden size-32 rounded-[2rem] border border-forest/10 bg-sand/75 sm:block" />
            <div className="absolute -bottom-7 -left-5 hidden size-44 rounded-full bg-sage/80 sm:block" />

            <div className="relative">
              <div className="grain relative aspect-[4/4.35] overflow-hidden rounded-[2rem] bg-sage shadow-lift sm:aspect-[4/4.25]">
                <img
                  src="/images/hero-rack.jpg"
                  alt="A considered wardrobe of natural-toned clothing on a rail"
                  className="size-full object-cover"
                  fetchPriority="high"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#24342A]/45 via-transparent to-[#F6F4ED]/5" />

                <div className="absolute left-4 top-4 flex items-center gap-2 rounded-full border border-white/45 bg-ivory/90 px-3 py-2 text-[11px] font-semibold text-charcoal shadow-sm backdrop-blur-md sm:left-5 sm:top-5">
                  <span className="relative flex size-2">
                    <span className="absolute inline-flex size-full animate-ping rounded-full bg-forest opacity-50" />
                    <span className="relative inline-flex size-2 rounded-full bg-forest" />
                  </span>
                  A wardrobe with intention
                </div>

                <div className="absolute inset-x-4 bottom-4 sm:inset-x-5 sm:bottom-5">
                  <div className="rounded-2xl border border-white/50 bg-ivory/93 p-4 shadow-soft backdrop-blur-md sm:p-5">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-muted">
                          A cotton T-shirt
                        </p>
                        <p className="mt-1 font-display text-3xl font-semibold tracking-[-0.045em] text-charcoal">
                          ≈ 2,700 <span className="text-lg font-medium">L</span>
                        </p>
                        <p className="mt-1 text-xs text-muted">Indicative water estimate</p>
                      </div>
                      <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-water text-water-deep">
                        <Droplets className="size-[18px]" aria-hidden="true" />
                      </span>
                    </div>
                    <div className="mt-4 flex items-center gap-1.5" aria-hidden="true">
                      {[32, 27, 38, 25, 35, 29, 40, 22, 31, 27, 34, 24, 30, 26, 33, 23, 35, 27].map(
                        (height, index) => (
                          <span
                            key={index}
                            className="flex-1 rounded-full bg-water-deep/65"
                            style={{ height: `${height / 2.2}px` }}
                          />
                        ),
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="absolute -right-2 top-[38%] hidden rounded-2xl border border-border bg-white p-3 shadow-card md:block lg:-right-7">
                <div className="flex items-center gap-2.5">
                  <span className="flex size-9 items-center justify-center rounded-xl bg-sage">
                    <Shirt className="size-4 text-forest" aria-hidden="true" />
                  </span>
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.12em] text-muted">Wardrobe view</p>
                    <p className="text-xs font-semibold text-charcoal">8 sample pieces</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-border/70 bg-white/55">
        <div className="container-page py-12 sm:py-16 lg:py-20">
          <SectionHeading
            eyebrow="The hidden reservoir"
            title={
              <>
                A familiar garment.
                <br className="hidden sm:block" /> A less familiar number.
              </>
            }
            description="These indicative figures help make the invisible visible. They are conversation starters, not verdicts — real footprints vary widely."
          />

          <div className="mt-8 grid gap-4 lg:grid-cols-[1fr_1fr_0.78fr] lg:gap-5">
            <article className="group relative overflow-hidden rounded-3xl bg-water p-6 shadow-soft transition duration-300 hover:-translate-y-1 hover:shadow-card sm:p-8">
              <div className="pointer-events-none absolute -right-10 -top-10 size-48 rounded-full border border-water-deep/10 bg-white/30" />
              <div className="pointer-events-none absolute -right-3 top-10 size-28 rounded-full border border-water-deep/10" />
              <div className="relative">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-water-deep/75">
                      One cotton T-shirt
                    </p>
                    <SupportingNumber />
                  </div>
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-white/70 text-water-deep">
                    <Shirt className="size-5" aria-hidden="true" />
                  </span>
                </div>
                <p className="mt-4 max-w-xs text-sm leading-relaxed text-[#566568]">
                  Water is used to grow the cotton, prepare the fibre and finish the cloth. A useful
                  scale reference, not an exact measurement.
                </p>
                <div className="mt-6 flex items-end gap-1.5" aria-hidden="true">
                  {Array.from({ length: 20 }).map((_, index) => (
                    <span
                      key={index}
                      className="w-full rounded-full bg-water-deep"
                      style={{
                        height: `${18 + (index % 5) * 7}px`,
                        opacity: index < 14 ? 0.72 : 0.2,
                      }}
                    />
                  ))}
                </div>
                <div className="mt-6 flex items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={() => setActiveFigure('tee')}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-water-deep underline decoration-water-deep/30 underline-offset-4 transition hover:decoration-water-deep focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-water-deep"
                  >
                    <Info className="size-3.5" aria-hidden="true" />
                    How this is estimated
                  </button>
                  <Link
                    to="/learn/cotton-and-water"
                    className="flex size-8 items-center justify-center rounded-full bg-white/60 text-water-deep transition group-hover:bg-white"
                    aria-label="Read about cotton and water"
                  >
                    <ArrowUpRight className="size-4" aria-hidden="true" />
                  </Link>
                </div>
              </div>
            </article>

            <article className="group relative overflow-hidden rounded-3xl bg-sage p-6 shadow-soft transition duration-300 hover:-translate-y-1 hover:shadow-card sm:p-8">
              <div className="pointer-events-none absolute -bottom-16 -right-10 size-52 rounded-full border border-forest/10" />
              <div className="pointer-events-none absolute -bottom-8 -right-4 size-36 rounded-full border border-forest/10" />
              <div className="relative">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-forest/75">
                      One pair of jeans
                    </p>
                    <p className="mt-2 font-display text-[2.6rem] font-semibold leading-none tracking-[-0.055em] text-charcoal sm:text-[3.2rem]">
                      7,600–9,506
                      <span className="ml-1 text-lg font-medium tracking-normal text-forest">L</span>
                    </p>
                  </div>
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-white/65 text-forest">
                    <Droplets className="size-5" aria-hidden="true" />
                  </span>
                </div>
                <p className="mt-4 max-w-xs text-sm leading-relaxed text-[#5B6B5D]">
                  Denim uses more fabric and often more wet finishing. The range reflects how much
                  production methods can vary.
                </p>
                <div className="mt-6 space-y-2" aria-hidden="true">
                  <div className="h-3 w-full rounded-full bg-white/55">
                    <div className="h-full w-full rounded-full bg-forest/70" />
                  </div>
                  <div className="h-3 w-[78%] rounded-full bg-white/55">
                    <div className="h-full w-full rounded-full bg-forest/35" />
                  </div>
                  <div className="flex items-center justify-between pt-1 text-[10px] font-medium text-forest/65">
                    <span>Lower reference</span>
                    <span>Upper reference</span>
                  </div>
                </div>
                <div className="mt-6 flex items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={() => setActiveFigure('jeans')}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-forest underline decoration-forest/30 underline-offset-4 transition hover:decoration-forest focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-forest"
                  >
                    <Info className="size-3.5" aria-hidden="true" />
                    How this is estimated
                  </button>
                  <Link
                    to="/learn/denim-water"
                    className="flex size-8 items-center justify-center rounded-full bg-white/60 text-forest transition group-hover:bg-white"
                    aria-label="Read about denim and water"
                  >
                    <ArrowUpRight className="size-4" aria-hidden="true" />
                  </Link>
                </div>
              </div>
            </article>

            <article className="flex flex-col justify-between rounded-3xl border border-border bg-sand/75 p-6 sm:p-8">
              <div>
                <span className="flex size-10 items-center justify-center rounded-2xl bg-white/70 text-[#7A684E]">
                  <BookOpen className="size-[18px]" aria-hidden="true" />
                </span>
                <h3 className="mt-4 font-display text-xl font-semibold tracking-[-0.03em] text-charcoal">
                  Why we show ranges
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-[#6D675D]">
                  A single number can look authoritative when it is really an average. Ranges keep
                  the uncertainty visible and leave room for better data.
                </p>
              </div>
              <div className="mt-6">
                <ButtonLink to="/learn" variant="secondary" size="sm" className="w-full">
                  Read our approach
                  <ArrowRight className="size-3.5" aria-hidden="true" />
                </ButtonLink>
                <p className="mt-3 text-[10px] leading-relaxed text-muted">
                  Source verification pending. No citations have been invented.
                </p>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className="container-page py-14 sm:py-20 lg:py-24">
        <SectionHeading
          eyebrow="A better wardrobe, practically"
          title={
            <>
              Less guesswork.
              <br className="hidden sm:block" /> More wearing.
            </>
          }
          description="Three simple tools to help you see your clothes clearly, understand their impact and keep them in use for longer."
        />

        <div className="mt-9 grid gap-5 md:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon
            return (
              <article
                key={feature.title}
                className="group flex flex-col overflow-hidden rounded-3xl border border-border bg-white shadow-soft transition duration-300 hover:-translate-y-1.5 hover:shadow-lift"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={feature.image}
                    alt={feature.imageAlt}
                    loading="lazy"
                    className="size-full object-cover transition duration-700 group-hover:scale-[1.035]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/35 via-charcoal/0 to-transparent" />
                  <span className="absolute left-4 top-4 flex items-center gap-1.5 rounded-full bg-ivory/90 px-2.5 py-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-charcoal backdrop-blur">
                    <Icon className="size-3 text-forest" aria-hidden="true" />
                    {feature.number}
                  </span>
                  <span className="absolute bottom-4 right-4 flex size-10 items-center justify-center rounded-2xl border border-white/35 bg-white/20 text-white backdrop-blur-md">
                    <Icon className="size-[18px]" aria-hidden="true" />
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="max-w-[16rem] font-display text-xl font-semibold leading-snug tracking-[-0.03em] text-charcoal">
                    {feature.title}
                  </h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">{feature.description}</p>
                  <Link
                    to={feature.to}
                    className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-forest transition hover:text-forest-deep"
                  >
                    {feature.linkLabel}
                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                  </Link>
                </div>
              </article>
            )
          })}
        </div>
      </section>

      <section className="bg-sage/55">
        <div className="container-page py-14 sm:py-20 lg:py-24">
          <div className="grid gap-10 lg:grid-cols-[0.88fr_1.12fr] lg:items-center lg:gap-16">
            <div className="relative">
              <div className="grain relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-sand shadow-card">
                <img
                  src="/images/folded-clothes.jpg"
                  alt="Folded neutral clothing in a calm, organised wardrobe"
                  loading="lazy"
                  className="size-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/25 to-transparent" />
              </div>
              <div className="absolute -bottom-5 right-4 max-w-[15rem] rounded-2xl border border-border bg-white p-4 shadow-lift sm:-right-5 sm:right-auto">
                <div className="flex items-center gap-2 text-forest">
                  <Leaf className="size-4" aria-hidden="true" />
                  <p className="text-[10px] font-semibold uppercase tracking-[0.15em]">The long view</p>
                </div>
                <p className="mt-2 text-sm font-medium leading-relaxed text-charcoal">
                  More wears per garment means fewer resources spent on the next one.
                </p>
              </div>
            </div>

            <div>
              <Eyebrow>Wear longer, waste less</Eyebrow>
              <h2 className="mt-3 text-balance font-display text-3xl font-semibold leading-[1.1] tracking-[-0.04em] text-charcoal sm:text-4xl">
                The most useful fashion choice is often already in your wardrobe.
              </h2>
              <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-muted">
                Sustainability is not a shopping category. It is a set of small, repeatable habits
                that keep the clothes you own in use for longer.
              </p>

              <div className="mt-7 divide-y divide-forest/10 border-y border-forest/10">
                {sustainabilityActions.map((action, index) => {
                  const Icon = action.icon
                  return (
                    <div key={action.title} className="flex items-start gap-4 py-3.5">
                      <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-xl bg-white/70 text-forest">
                        <Icon className="size-4" aria-hidden="true" />
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-semibold text-charcoal">{action.title}</p>
                        <p className="mt-0.5 text-sm leading-relaxed text-muted">{action.text}</p>
                      </div>
                      <span className="pt-1 font-display text-[10px] font-medium text-forest/40">
                        0{index + 1}
                      </span>
                    </div>
                  )
                })}
              </div>

              <div className="mt-7 flex flex-wrap items-center gap-3">
                <ButtonLink to="/tips">
                  Explore practical tips
                  <ArrowRight className="size-4" aria-hidden="true" />
                </ButtonLink>
                <ButtonLink to="/wardrobe" variant="ghost">
                  See my wardrobe
                </ButtonLink>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container-page py-14 sm:py-20">
        <div className="relative overflow-hidden rounded-[2rem] bg-[#3F5B46] px-6 py-10 text-ivory shadow-lift sm:px-10 sm:py-12 lg:px-14">
          <div className="pointer-events-none absolute -right-16 -top-24 size-80 rounded-full border border-ivory/10" />
          <div className="pointer-events-none absolute -right-4 -top-10 size-56 rounded-full border border-ivory/10" />
          <div className="pointer-events-none absolute -bottom-24 left-1/3 size-56 rounded-full bg-water/10 blur-3xl" />
          <div className="relative grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-ivory/50">
                Start where you are
              </p>
              <h2 className="mt-3 max-w-2xl text-balance font-display text-3xl font-semibold leading-[1.12] tracking-[-0.04em] sm:text-4xl">
                A clearer closet starts with one honest look at what you own.
              </h2>
              <p className="mt-3 max-w-xl text-sm leading-relaxed text-ivory/65">
                Add a garment, estimate its footprint and get a little more intentional about what
                comes next.
              </p>
            </div>
            <div className="flex flex-col gap-2.5 sm:flex-row lg:flex-col">
              <ButtonLink
                to="/wardrobe"
                variant="secondary"
                size="lg"
                className="border-transparent bg-white text-forest hover:bg-ivory"
              >
                Open my wardrobe
                <ArrowRight className="size-4" aria-hidden="true" />
              </ButtonLink>
              <ButtonLink
                to="/calculator"
                size="lg"
                className="border border-ivory/25 bg-ivory/0 text-ivory hover:bg-ivory/10"
              >
                Calculate a footprint
              </ButtonLink>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-border/70 bg-white/45">
        <div className="container-page flex flex-col gap-5 py-10 sm:flex-row sm:items-center sm:justify-between">
          <InfoNote tone="water" className="max-w-2xl">
            <strong className="font-semibold">A note on the numbers.</strong> WearWell is currently a
            stage-one preview. Water estimates are illustrative, and research sources will be added
            only after verification.
          </InfoNote>
          <ButtonLink to="/learn" variant="ghost" size="sm" className="shrink-0">
            Read the research
            <ArrowUpRight className="size-3.5" aria-hidden="true" />
          </ButtonLink>
        </div>
      </section>

      <Modal
        open={activeFigure !== null}
        onClose={() => setActiveFigure(null)}
        title={figure?.title ?? ''}
        description="What sits behind this illustrative figure"
        size="md"
        footer={
          <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
            <Button variant="secondary" onClick={() => setActiveFigure(null)}>
              Close
            </Button>
            <ButtonLink to={activeFigure === 'jeans' ? '/learn/denim-water' : '/learn/cotton-and-water'}>
              Read the full explainer
              <ArrowRight className="size-4" aria-hidden="true" />
            </ButtonLink>
          </div>
        }
      >
        {figure ? (
          <div className="space-y-5">
            <div className="rounded-2xl bg-water/70 px-4 py-3.5">
              <p className="text-sm font-semibold text-water-deep">{figure.figure}</p>
            </div>
            {figure.body.map((paragraph) => (
              <p key={paragraph} className="text-sm leading-relaxed text-muted">
                {paragraph}
              </p>
            ))}
            <InfoNote tone="sand" icon="alert">
              {figure.note}
            </InfoNote>
          </div>
        ) : null}
      </Modal>
    </>
  )
}

function SupportingNumber() {
  return (
    <p className="mt-2 font-display text-[2.6rem] font-semibold leading-none tracking-[-0.055em] text-charcoal sm:text-[3.2rem]">
      ≈ 2,700 <span className="text-lg font-medium tracking-normal text-water-deep">L</span>
    </p>
  )
}
