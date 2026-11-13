import { useMemo, useRef, useState, type FormEvent } from 'react'
import {
  ArrowRight,
  BarChart3,
  Check,
  ChevronDown,
  CircleHelp,
  Droplets,
  Info,
  LoaderCircle,
  Ruler,
  Shirt,
  Sparkles,
  WandSparkles,
} from 'lucide-react'
import { PageHeader } from '../components/ui/LayoutPrimitives'
import { FormField, InfoNote, inputStyles } from '../components/ui/Form'
import { Button, ButtonLink } from '../components/ui/Button'
import { Badge } from '../components/ui/Badge'
import { QuantityStepper } from '../components/ui/Controls'
import { useWardrobe } from '../context/WardrobeContext'
import { useToast } from '../context/ToastContext'
import {
  CATEGORIES,
  MATERIALS,
  WATER_REFERENCE,
  formatLitres,
  type GarmentCategory,
  type GarmentMaterial,
} from '../data/garments'
import { estimateMidpoint, formatNumber } from '../lib/utils'

type CalculationResult = {
  name: string
  category: GarmentCategory
  material: GarmentMaterial
  quantity: number
  perItemMin: number
  perItemMax: number
  totalMin: number
  totalMax: number
}

type FormErrors = Partial<Record<'name' | 'category' | 'material' | 'quantity', string>>

export function CalculatorPage() {
  const [category, setCategory] = useState<GarmentCategory>('T-shirt')
  const [name, setName] = useState('')
  const [material, setMaterial] = useState<GarmentMaterial | ''>('Cotton')
  const [quantity, setQuantity] = useState(1)
  const [weight, setWeight] = useState('')
  const [wearFrequency, setWearFrequency] = useState('')
  const [showDetails, setShowDetails] = useState(false)
  const [errors, setErrors] = useState<FormErrors>({})
  const [result, setResult] = useState<CalculationResult | null>(null)
  const [loading, setLoading] = useState(false)
  const [added, setAdded] = useState(false)
  const [methodOpen, setMethodOpen] = useState(false)
  const timerRef = useRef<number | null>(null)
  const { addGarment } = useWardrobe()
  const { toast } = useToast()

  const reference = WATER_REFERENCE[category]

  const previewRange = useMemo(() => {
    if (!result) return null
    return {
      perItem:
        result.perItemMin === result.perItemMax
          ? formatLitres(result.perItemMin)
          : `${formatNumber(result.perItemMin)}–${formatNumber(result.perItemMax)} L`,
      total:
        result.totalMin === result.totalMax
          ? formatLitres(result.totalMin)
          : `${formatNumber(result.totalMin)}–${formatNumber(result.totalMax)} L`,
    }
  }, [result])

  const validate = (): FormErrors => {
    const next: FormErrors = {}
    if (!name.trim()) next.name = 'Give this garment a name so you can find it later.'
    else if (name.trim().length < 2) next.name = 'Use at least two characters.'
    if (!category) next.category = 'Choose a garment category.'
    if (!material) next.material = 'Choose the closest material or select “Not sure”.'
    if (!Number.isFinite(quantity) || quantity < 1) next.quantity = 'Quantity must be at least one.'
    if (quantity > 99) next.quantity = 'Choose 99 items or fewer.'
    return next
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const nextErrors = validate()
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length) {
      const firstId = Object.keys(nextErrors)[0]
      document.getElementById(firstId)?.focus()
      return
    }

    if (timerRef.current) window.clearTimeout(timerRef.current)
    setLoading(true)
    setResult(null)
    setAdded(false)

    timerRef.current = window.setTimeout(() => {
      const totalMin = reference.min * quantity
      const totalMax = reference.max * quantity
      setResult({
        name: name.trim(),
        category,
        material: material as GarmentMaterial,
        quantity,
        perItemMin: reference.min,
        perItemMax: reference.max,
        totalMin,
        totalMax,
      })
      setLoading(false)
      window.setTimeout(() => {
        document.getElementById('calculator-result')?.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
        })
      }, 50)
    }, 850)
  }

  const handleAddToWardrobe = () => {
    if (!result || added) return
    addGarment({
      name: result.name,
      category: result.category,
      material: result.material,
      quantity: result.quantity,
      image: CATEGORY_IMAGES_BY_CATEGORY[result.category],
      status: 'Regular Use',
      footprintPerItem: estimateMidpoint(result.perItemMin, result.perItemMax),
    })
    setAdded(true)
    toast({
      title: 'Added to your wardrobe',
      description: `${result.quantity} × ${result.name} is now in My Wardrobe.`,
      tone: 'success',
    })
  }

  const handleReset = () => {
    setResult(null)
    setAdded(false)
    setName('')
    setQuantity(1)
    setWeight('')
    setWearFrequency('')
    setShowDetails(false)
    setErrors({})
    document.getElementById('name')?.focus()
  }

  return (
    <>
      <PageHeader
        eyebrow="Water Calculator"
        title="Put a little context around your clothes."
        description="Choose a garment and add a few details. WearWell will show an illustrative water estimate, explain the method and help you add the piece to your wardrobe."
        aside={
          <div className="flex flex-col items-start gap-2 rounded-2xl border border-border bg-white/70 p-4 shadow-sm lg:items-end">
            <Badge tone="water">
              <WandSparkles className="size-3" aria-hidden="true" />
              Preview calculation model
            </Badge>
            <p className="max-w-[15rem] text-xs leading-relaxed text-muted lg:text-right">
              Numbers are illustrative until verified research is added in stage two.
            </p>
          </div>
        }
      />

      <div className="container-page py-10 sm:py-14 lg:py-16">
        <div className="grid items-start gap-6 lg:grid-cols-[1.06fr_0.94fr] lg:gap-10">
          <form
            onSubmit={handleSubmit}
            className="rounded-3xl border border-border bg-white p-5 shadow-soft sm:p-7 lg:p-8"
            noValidate
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-forest">
                  Garment details
                </p>
                <h2 className="mt-2 font-display text-2xl font-semibold tracking-[-0.035em] text-charcoal">
                  Tell us what you&apos;re wearing
                </h2>
              </div>
              <span className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-sage text-forest">
                <Shirt className="size-5" aria-hidden="true" />
              </span>
            </div>

            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              <FormField
                id="category"
                label="Garment category"
                required
                error={errors.category}
                className="sm:col-span-2"
              >
                <div className="relative">
                  <select
                    id="category"
                    value={category}
                    onChange={(event) => setCategory(event.target.value as GarmentCategory)}
                    className={`${inputStyles} appearance-none pr-10`}
                    aria-invalid={Boolean(errors.category)}
                    aria-describedby={errors.category ? 'category-error' : undefined}
                  >
                    {CATEGORIES.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                  <ChevronDown
                    className="pointer-events-none absolute right-3.5 top-1/2 size-4 -translate-y-1/2 text-muted"
                    aria-hidden="true"
                  />
                </div>
              </FormField>

              <FormField
                id="name"
                label="Garment name"
                required
                hint="You can change this later"
                error={errors.name}
                className="sm:col-span-2"
              >
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  placeholder="e.g. My everyday cotton tee"
                  className={inputStyles}
                  aria-invalid={Boolean(errors.name)}
                  aria-describedby={errors.name ? 'name-error' : undefined}
                  autoComplete="off"
                  maxLength={80}
                />
              </FormField>

              <FormField id="material" label="Material or fabric" required error={errors.material}>
                <div className="relative">
                  <select
                    id="material"
                    value={material}
                    onChange={(event) => setMaterial(event.target.value as GarmentMaterial | '')}
                    className={`${inputStyles} appearance-none pr-10`}
                    aria-invalid={Boolean(errors.material)}
                    aria-describedby={errors.material ? 'material-error' : undefined}
                  >
                    <option value="">Select a material</option>
                    {MATERIALS.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                  <ChevronDown
                    className="pointer-events-none absolute right-3.5 top-1/2 size-4 -translate-y-1/2 text-muted"
                    aria-hidden="true"
                  />
                </div>
              </FormField>

              <FormField id="quantity" label="Quantity" required error={errors.quantity}>
                <QuantityStepper value={quantity} onChange={setQuantity} label="Quantity" />
              </FormField>
            </div>

            <div className="mt-5 rounded-2xl border border-border/80 bg-ivory/60">
              <button
                type="button"
                onClick={() => setShowDetails((open) => !open)}
                aria-expanded={showDetails}
                aria-controls="extra-details"
                className="flex w-full items-center justify-between gap-3 rounded-2xl px-4 py-3.5 text-left transition hover:bg-sage/25 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest"
              >
                <span className="flex items-center gap-2.5">
                  <span className="flex size-8 items-center justify-center rounded-lg bg-white text-forest">
                    <Ruler className="size-4" aria-hidden="true" />
                  </span>
                  <span>
                    <span className="block text-sm font-semibold text-charcoal">Add optional detail</span>
                    <span className="block text-xs text-muted">Weight and wear habits help with future estimates.</span>
                  </span>
                </span>
                <ChevronDown
                  className={`size-4 shrink-0 text-muted transition-transform ${showDetails ? 'rotate-180' : ''}`}
                  aria-hidden="true"
                />
              </button>

              {showDetails ? (
                <div className="grid gap-4 border-t border-border/70 px-4 py-4 sm:grid-cols-2" id="extra-details">
                  <FormField id="weight" label="Approximate weight" optional hint="grams">
                    <input
                      id="weight"
                      type="number"
                      inputMode="numeric"
                      min={0}
                      placeholder="e.g. 160"
                      value={weight}
                      onChange={(event) => setWeight(event.target.value)}
                      className={inputStyles}
                    />
                  </FormField>
                  <FormField id="wear-frequency" label="Wears per month" optional>
                    <input
                      id="wear-frequency"
                      type="number"
                      inputMode="numeric"
                      min={0}
                      placeholder="e.g. 6"
                      value={wearFrequency}
                      onChange={(event) => setWearFrequency(event.target.value)}
                      className={inputStyles}
                    />
                  </FormField>
                  <p className="text-xs leading-relaxed text-muted sm:col-span-2">
                    These details are captured in the preview but do not change the current estimate.
                    Material and weight adjustments arrive with the verified stage-two model.
                  </p>
                </div>
              ) : null}
            </div>

            <div className="mt-5">
              <InfoNote tone="sand" icon="alert">
                <strong className="font-semibold">Illustrative only.</strong> The calculation maps a
                category to a stage-one reference range. It is not yet a verified, item-specific
                water footprint.
              </InfoNote>
            </div>

            <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
              <button
                type="button"
                onClick={handleReset}
                className="text-sm font-medium text-muted transition hover:text-charcoal focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-forest"
              >
                Clear form
              </button>
              <Button type="submit" size="lg" disabled={loading} className="sm:min-w-[13rem]">
                {loading ? (
                  <>
                    <LoaderCircle className="size-4 animate-spin" aria-hidden="true" />
                    Calculating…
                  </>
                ) : (
                  <>
                    Calculate estimate
                    <ArrowRight className="size-4" aria-hidden="true" />
                  </>
                )}
              </Button>
            </div>
          </form>

          <aside className="lg:sticky lg:top-[100px]" id="calculator-result" aria-live="polite">
            {loading ? (
              <ResultSkeleton />
            ) : result && previewRange ? (
              <div className="animate-fade-up overflow-hidden rounded-3xl border border-border bg-white shadow-soft">
                <div className="relative overflow-hidden bg-water px-5 py-5 sm:px-6">
                  <div className="pointer-events-none absolute -right-10 -top-10 size-40 rounded-full border border-water-deep/10" />
                  <div className="relative flex items-start justify-between gap-4">
                    <div>
                      <Badge tone="outline" className="border-white/70 bg-white/60 text-water-deep">
                        <Sparkles className="size-3" aria-hidden="true" />
                        Illustrative estimate
                      </Badge>
                      <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.15em] text-water-deep/75">
                        {result.quantity} × {result.name}
                      </p>
                      <p className="mt-1 font-display text-[2.3rem] font-semibold leading-none tracking-[-0.05em] text-charcoal sm:text-[2.65rem]">
                        {previewRange.total}
                      </p>
                      <p className="mt-2 text-xs text-[#5F6F72]">Estimated water footprint · total</p>
                    </div>
                    <span className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-white/70 text-water-deep">
                      <Droplets className="size-5" aria-hidden="true" />
                    </span>
                  </div>
                </div>

                <div className="px-5 py-5 sm:px-6">
                  <div className="space-y-2.5 text-sm">
                    <ResultRow label="Garment" value={result.name} />
                    <ResultRow label="Category" value={result.category} />
                    <ResultRow label="Material" value={result.material} />
                    <ResultRow label="Quantity" value={String(result.quantity)} />
                    <ResultRow
                      label="Per item"
                      value={result.perItemMin === result.perItemMax
                        ? formatLitres(result.perItemMin)
                        : `${formatNumber(result.perItemMin)}–${formatNumber(result.perItemMax)} L`}
                    />
                  </div>

                  <div className="mt-5 rounded-2xl bg-ivory p-4">
                    <div className="flex items-center gap-2">
                      <BarChart3 className="size-4 text-forest" aria-hidden="true" />
                      <p className="text-xs font-semibold text-charcoal">One item, in context</p>
                    </div>
                    <div className="mt-4 space-y-3.5">
                      <ComparisonBar
                        label="Your item"
                        min={result.perItemMin}
                        max={result.perItemMax}
                        tone="water"
                      />
                      <ComparisonBar label="Cotton T-shirt" min={2700} max={2700} tone="forest" />
                      <ComparisonBar label="Pair of jeans" min={7600} max={9506} tone="sand" />
                    </div>
                    <p className="mt-3 text-[10px] leading-relaxed text-muted">
                      Indicative comparison only. The jeans bar shows the supplied reference range.
                    </p>
                  </div>

                  <div className="mt-5">
                    <button
                      type="button"
                      onClick={() => setMethodOpen((open) => !open)}
                      aria-expanded={methodOpen}
                      aria-controls="methodology"
                      className="flex w-full items-center justify-between gap-3 text-left"
                    >
                      <span className="flex items-center gap-2 text-xs font-semibold text-charcoal">
                        <CircleHelp className="size-3.5 text-forest" aria-hidden="true" />
                        How this estimate works
                      </span>
                      <ChevronDown
                        className={`size-3.5 text-muted transition-transform ${methodOpen ? 'rotate-180' : ''}`}
                        aria-hidden="true"
                      />
                    </button>
                    {methodOpen ? (
                      <div id="methodology" className="mt-3 rounded-2xl border border-border bg-ivory/70 p-4">
                        <p className="text-xs leading-relaxed text-muted">
                          This preview multiplies the stage-one reference for <strong>{result.category}</strong>{' '}
                          ({formatNumber(reference.min)}–{formatNumber(reference.max)} L per item) by quantity.
                          Material-specific adjustments are not applied yet.
                        </p>
                        <p className="mt-2 text-xs leading-relaxed text-muted">
                          Verified data, source notes and a more granular model will replace this in stage two.
                          No citation has been invented for the preview values.
                        </p>
                      </div>
                    ) : null}
                  </div>

                  <div className="mt-5 flex flex-col gap-2">
                    {added ? (
                      <>
                        <Button variant="soft" fullWidth disabled>
                          <Check className="size-4" aria-hidden="true" />
                          Added to wardrobe
                        </Button>
                        <ButtonLink to="/wardrobe" variant="secondary" fullWidth>
                          View in My Wardrobe
                          <ArrowRight className="size-4" aria-hidden="true" />
                        </ButtonLink>
                      </>
                    ) : (
                      <Button onClick={handleAddToWardrobe} fullWidth>
                        <Shirt className="size-4" aria-hidden="true" />
                        Add to My Wardrobe
                      </Button>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={handleReset}
                    className="mt-4 w-full text-center text-xs font-medium text-muted transition hover:text-charcoal"
                  >
                    Calculate another garment
                  </button>
                </div>
              </div>
            ) : (
              <CalculatorEmptyState />
            )}
          </aside>
        </div>

        <div className="mt-8 grid gap-4 rounded-3xl border border-border bg-white/55 p-5 sm:grid-cols-[auto_1fr] sm:items-start sm:p-6">
          <span className="flex size-10 items-center justify-center rounded-2xl bg-sage text-forest">
            <Info className="size-[18px]" aria-hidden="true" />
          </span>
          <div>
            <h2 className="text-sm font-semibold text-charcoal">What happens next?</h2>
            <p className="mt-1 max-w-4xl text-sm leading-relaxed text-muted">
              Stage two will connect this form to a sourced calculation model, persistent wardrobe
              storage and full validation tests. Until then, changes last only for this browser
              session and every estimate is explicitly labelled as illustrative.
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

function ResultRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-6 border-b border-border/60 pb-2.5 last:border-0 last:pb-0">
      <span className="text-xs text-muted">{label}</span>
      <span className="max-w-[65%] text-right text-xs font-semibold text-charcoal">{value}</span>
    </div>
  )
}

function ComparisonBar({
  label,
  min,
  max,
  tone,
}: {
  label: string
  min: number
  max: number
  tone: 'water' | 'forest' | 'sand'
}) {
  const scaleMax = 9506
  const width = Math.max(3, Math.min(100, (max / scaleMax) * 100))
  const lower = Math.max(0, Math.min(100, (min / scaleMax) * 100))
  const colours = {
    water: 'bg-water-deep',
    forest: 'bg-forest',
    sand: 'bg-[#B49B72]',
  }
  return (
    <div>
      <div className="mb-1.5 flex items-center justify-between gap-3 text-[10px]">
        <span className="font-medium text-charcoal">{label}</span>
        <span className="text-muted">
          {formatNumber(min)}
          {min !== max ? `–${formatNumber(max)}` : ''} L
        </span>
      </div>
      <div className="relative h-2.5 overflow-hidden rounded-full bg-white">
        <div
          className={`absolute inset-y-0 left-0 rounded-full ${colours[tone]}`}
          style={{ width: `${width}%` }}
        />
        {max !== min ? (
          <div
            className="absolute inset-y-0 rounded-r-full bg-white/40"
            style={{ left: `${lower}%`, width: `${width - lower}%` }}
          />
        ) : null}
      </div>
    </div>
  )
}

function CalculatorEmptyState() {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-border bg-sage/55 p-6 sm:p-8">
      <div className="pointer-events-none absolute -right-12 -top-12 size-52 rounded-full border border-forest/10" />
      <div className="pointer-events-none absolute -right-2 -top-2 size-32 rounded-full border border-forest/10" />
      <div className="relative">
        <span className="flex size-12 items-center justify-center rounded-2xl bg-white/75 text-forest">
          <Droplets className="size-6" aria-hidden="true" />
        </span>
        <h2 className="mt-5 font-display text-2xl font-semibold tracking-[-0.035em] text-charcoal">
          Your estimate will appear here.
        </h2>
        <p className="mt-3 max-w-sm text-sm leading-relaxed text-[#5B6B5D]">
          Fill in the garment details and choose “Calculate estimate.” You&apos;ll get a transparent
          range, a comparison and a clear note on what the model does and does not include.
        </p>

        <div className="mt-6 space-y-3">
          {[
            { icon: Shirt, text: 'A garment and material' },
            { icon: Ruler, text: 'A quantity — and optional detail' },
            { icon: BarChart3, text: 'A transparent context view' },
          ].map((step, index) => {
            const Icon = step.icon
            return (
              <div key={step.text} className="flex items-center gap-3">
                <span className="flex size-8 items-center justify-center rounded-xl bg-white/70 text-forest">
                  <Icon className="size-4" aria-hidden="true" />
                </span>
                <span className="text-sm text-charcoal">{step.text}</span>
                <span className="ml-auto font-display text-[10px] text-forest/40">0{index + 1}</span>
              </div>
            )
          })}
        </div>

        <div className="mt-6 rounded-2xl border border-forest/10 bg-white/45 px-4 py-3">
          <p className="text-xs leading-relaxed text-forest/80">
            Stage-one estimates are illustrative. We keep the uncertainty visible instead of
            presenting a single number as fact.
          </p>
        </div>
      </div>
    </div>
  )
}

function ResultSkeleton() {
  return (
    <div className="overflow-hidden rounded-3xl border border-border bg-white shadow-soft" aria-busy="true">
      <div className="bg-water px-5 py-5 sm:px-6">
        <div className="h-5 w-32 animate-pulse rounded-full bg-water-deep/15" />
        <div className="mt-5 h-3 w-40 animate-pulse rounded-full bg-water-deep/15" />
        <div className="mt-3 h-10 w-56 animate-pulse rounded-xl bg-water-deep/20" />
        <div className="mt-3 h-3 w-32 animate-pulse rounded-full bg-water-deep/15" />
      </div>
      <div className="space-y-4 px-5 py-5 sm:px-6">
        {Array.from({ length: 5 }).map((_, index) => (
          <div key={index} className="flex justify-between gap-4">
            <div className="h-3 w-20 animate-pulse rounded-full bg-border/70" />
            <div className="h-3 w-28 animate-pulse rounded-full bg-border/70" />
          </div>
        ))}
        <div className="h-40 animate-pulse rounded-2xl bg-ivory" />
        <div className="h-11 animate-pulse rounded-full bg-sage" />
      </div>
      <span className="sr-only">Calculating your estimate</span>
    </div>
  )
}

const CATEGORY_IMAGES_BY_CATEGORY: Record<GarmentCategory, string> = {
  'T-shirt': '/images/tshirt.jpg',
  Jeans: '/images/jeans.jpg',
  Shirt: '/images/shirt.jpg',
  Dress: '/images/dress.jpg',
  Knitwear: '/images/sweater.jpg',
  'Jacket / Coat': '/images/jacket.jpg',
  Shorts: '/images/tee-fold.jpg',
  Skirt: '/images/skirt.jpg',
  Other: '/images/folded-clothes.jpg',
}
