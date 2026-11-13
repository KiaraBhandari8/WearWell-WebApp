import { useMemo, useState } from 'react'
import {
  ArrowRight,
  Droplets,
  FilterX,
  Layers3,
  Plus,
  RotateCcw,
  Search,
  SearchX,
  Shirt,
  SlidersHorizontal,
  Sparkles,
  Wrench,
  X,
} from 'lucide-react'
import { PageHeader, EmptyState } from '../components/ui/LayoutPrimitives'
import { Button, ButtonLink } from '../components/ui/Button'
import { Badge } from '../components/ui/Badge'
import { InfoNote } from '../components/ui/Form'
import { GarmentCard } from '../components/wardrobe/GarmentCard'
import { GarmentFormModal } from '../components/wardrobe/GarmentFormModal'
import { GarmentDetailModal } from '../components/wardrobe/GarmentDetailModal'
import { ConfirmDialog } from '../components/ui/Form'
import { useWardrobe } from '../context/WardrobeContext'
import { useToast } from '../context/ToastContext'
import {
  CATEGORIES,
  SAMPLE_GARMENTS,
  STATUSES,
  garmentTotalFootprint,
  type Garment,
  type GarmentCategory,
  type GarmentMaterial,
  type GarmentStatus,
} from '../data/garments'
import { formatNumber, pluralise } from '../lib/utils'

const selectClass =
  'w-full appearance-none rounded-xl border border-border bg-white px-3.5 py-2.5 pr-9 text-sm text-charcoal outline-none transition focus:border-forest focus:ring-4 focus:ring-forest/10'

type SortOption = 'recent' | 'name' | 'footprint' | 'status'
type CategoryFilter = 'All categories' | GarmentCategory
type MaterialFilter = 'All materials' | GarmentMaterial
type StatusFilter = 'All statuses' | GarmentStatus

const statusOrder: Record<GarmentStatus, number> = {
  'Needs Repair': 0,
  'Ready to Donate': 1,
  'Rarely Used': 2,
  'Regular Use': 3,
}

export function WardrobePage() {
  const {
    garments,
    totalItems,
    categoryCount,
    estimatedTotal,
    careCount,
    settings,
    deleteGarment,
    resetWardrobe,
  } = useWardrobe()
  const { toast } = useToast()
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState<CategoryFilter>('All categories')
  const [material, setMaterial] = useState<MaterialFilter>('All materials')
  const [status, setStatus] = useState<StatusFilter>('All statuses')
  const [sort, setSort] = useState<SortOption>('recent')
  const [formOpen, setFormOpen] = useState(false)
  const [editingGarment, setEditingGarment] = useState<Garment | null>(null)
  const [detailGarment, setDetailGarment] = useState<Garment | null>(null)
  const [deleteTarget, setDeleteTarget] = useState<Garment | null>(null)

  const availableMaterials = useMemo(
    () => Array.from(new Set(garments.map((garment) => garment.material).filter(Boolean))),
    [garments],
  )

  const hasFilters =
    search.trim() !== '' ||
    category !== 'All categories' ||
    material !== 'All materials' ||
    status !== 'All statuses'

  const filtered = useMemo(() => {
    const needle = search.trim().toLowerCase()
    const result = garments.filter((garment) => {
      const matchesSearch =
        !needle ||
        [garment.name, garment.category, garment.material, garment.notes]
          .filter(Boolean)
          .some((value) => value!.toLowerCase().includes(needle))
      const matchesCategory = category === 'All categories' || garment.category === category
      const matchesMaterial = material === 'All materials' || garment.material === material
      const matchesStatus = status === 'All statuses' || garment.status === status
      return matchesSearch && matchesCategory && matchesMaterial && matchesStatus
    })

    return [...result].sort((a, b) => {
      if (sort === 'name') return a.name.localeCompare(b.name)
      if (sort === 'footprint') {
        return (garmentTotalFootprint(b) ?? 0) - (garmentTotalFootprint(a) ?? 0)
      }
      if (sort === 'status') return statusOrder[a.status] - statusOrder[b.status]
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    })
  }, [garments, search, category, material, status, sort])

  const clearFilters = () => {
    setSearch('')
    setCategory('All categories')
    setMaterial('All materials')
    setStatus('All statuses')
  }

  const openAdd = () => {
    setEditingGarment(null)
    setFormOpen(true)
  }

  const openEdit = (garment: Garment) => {
    setDetailGarment(null)
    setEditingGarment(garment)
    setFormOpen(true)
  }

  const handleDelete = (garment: Garment) => {
    setDeleteTarget(garment)
  }

  const confirmDelete = () => {
    if (!deleteTarget) return
    const name = deleteTarget.name
    deleteGarment(deleteTarget.id)
    if (detailGarment?.id === deleteTarget.id) setDetailGarment(null)
    setDeleteTarget(null)
    toast({
      title: 'Garment removed',
      description: `${name} is no longer in your wardrobe.`,
      tone: 'info',
    })
  }

  const handleLoadSample = () => {
    resetWardrobe()
    toast({
      title: 'Sample wardrobe restored',
      description: `${SAMPLE_GARMENTS.length} example garments are back in view.`,
      tone: 'info',
    })
  }

  return (
    <>
      <PageHeader
        eyebrow="My Wardrobe"
        title="A wardrobe you can actually see."
        description="Bring your clothes into one view. Track what you own, notice what needs care and connect each piece to its estimated footprint."
        aside={
          <div className="flex flex-col items-start gap-3 lg:items-end">
            <div className="flex items-center gap-2">
              <Badge tone="sage">
                <Sparkles className="size-3" aria-hidden="true" />
                Preview sample data
              </Badge>
              <Badge tone="outline">{totalItems} items</Badge>
            </div>
            <Button onClick={openAdd} size="lg">
              <Plus className="size-4" aria-hidden="true" />
              Add garment
            </Button>
          </div>
        }
      />

      <div className="container-page py-10 sm:py-14 lg:py-16">
        <div className="mb-6 flex flex-col gap-3 rounded-2xl border border-border bg-white/60 p-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-3">
            <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full bg-sage text-forest">
              <Shirt className="size-4" aria-hidden="true" />
            </span>
            <p className="text-xs leading-relaxed text-muted sm:text-sm">
              <strong className="font-semibold text-charcoal">This is a sample wardrobe.</strong>{' '}
              Add, edit and delete freely. In this stage-one preview, changes last for the current
              browser session only.
            </p>
          </div>
          <button
            type="button"
            onClick={handleLoadSample}
            className="inline-flex shrink-0 items-center gap-1.5 self-start text-xs font-semibold text-forest transition hover:text-forest-deep sm:self-auto"
          >
            <RotateCcw className="size-3.5" aria-hidden="true" />
            Restore sample
          </button>
        </div>

        <section aria-label="Wardrobe summary" className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <SummaryCard
            icon={<Shirt className="size-[18px]" aria-hidden="true" />}
            label="Total garments"
            value={String(totalItems)}
            note={`${garments.length} ${pluralise(garments.length, 'wardrobe entry', 'wardrobe entries')}`}
            tone="sage"
          />
          <SummaryCard
            icon={<Layers3 className="size-[18px]" aria-hidden="true" />}
            label="Categories"
            value={String(categoryCount)}
            note="different garment types"
            tone="ivory"
          />
          <SummaryCard
            icon={<Wrench className="size-[18px]" aria-hidden="true" />}
            label="Needs attention"
            value={String(careCount)}
            note="rarely worn or needs repair"
            tone="sand"
          />
          <SummaryCard
            icon={<Droplets className="size-[18px]" aria-hidden="true" />}
            label="Estimated footprint"
            value={settings.showEstimates ? `≈ ${formatNumber(estimatedTotal)} L` : 'Hidden'}
            note={settings.showEstimates ? 'illustrative, across available items' : 'change in settings'}
            tone="water"
          />
        </section>

        <section className="mt-7 rounded-3xl border border-border bg-white p-4 shadow-soft sm:p-5">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
            <div className="relative flex-1">
              <label htmlFor="wardrobe-search" className="sr-only">
                Search wardrobe
              </label>
              <Search
                className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted"
                aria-hidden="true"
              />
              <input
                id="wardrobe-search"
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search by name, category, material or note…"
                className="w-full rounded-xl border border-border bg-ivory/60 py-3 pl-10 pr-10 text-sm text-charcoal outline-none transition placeholder:text-muted/70 focus:border-forest focus:bg-white focus:ring-4 focus:ring-forest/10"
              />
              {search ? (
                <button
                  type="button"
                  onClick={() => setSearch('')}
                  className="absolute right-2.5 top-1/2 flex size-7 -translate-y-1/2 items-center justify-center rounded-full text-muted transition hover:bg-white hover:text-charcoal"
                  aria-label="Clear search"
                >
                  <X className="size-3.5" aria-hidden="true" />
                </button>
              ) : null}
            </div>

            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 lg:w-auto">
              <FilterSelect
                id="category-filter"
                label="Category"
                value={category}
                onChange={(value) => setCategory(value as CategoryFilter)}
                options={['All categories', ...CATEGORIES]}
              />
              <FilterSelect
                id="material-filter"
                label="Material"
                value={material}
                onChange={(value) => setMaterial(value as MaterialFilter)}
                options={['All materials', ...availableMaterials]}
              />
              <FilterSelect
                id="status-filter"
                label="Status"
                value={status}
                onChange={(value) => setStatus(value as StatusFilter)}
                options={['All statuses', ...STATUSES]}
              />
              <FilterSelect
                id="sort-filter"
                label="Sort by"
                value={sort}
                onChange={(value) => setSort(value as SortOption)}
                options={[
                  { value: 'recent', label: 'Recently added' },
                  { value: 'name', label: 'Name A–Z' },
                  { value: 'footprint', label: 'Largest footprint' },
                  { value: 'status', label: 'Care priority' },
                ]}
                icon
              />
            </div>
          </div>

          <div className="mt-4 flex flex-col gap-2 border-t border-border/70 pt-3.5 sm:flex-row sm:items-center sm:justify-between">
            <p className="flex items-center gap-1.5 text-xs text-muted">
              <SlidersHorizontal className="size-3.5" aria-hidden="true" />
              Showing <strong className="font-semibold text-charcoal">{filtered.length}</strong> of{' '}
              {garments.length} {pluralise(garments.length, 'entry', 'entries')}
            </p>
            {hasFilters ? (
              <button
                type="button"
                onClick={clearFilters}
                className="inline-flex items-center gap-1.5 self-start text-xs font-semibold text-forest transition hover:text-forest-deep sm:self-auto"
              >
                <FilterX className="size-3.5" aria-hidden="true" />
                Clear filters
              </button>
            ) : null}
          </div>
        </section>

        <section className="mt-6" aria-label="Garments">
          {filtered.length ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:gap-5">
              {filtered.map((garment) => (
                <GarmentCard
                  key={garment.id}
                  garment={garment}
                  onView={() => setDetailGarment(garment)}
                  onEdit={() => openEdit(garment)}
                  onDelete={() => handleDelete(garment)}
                />
              ))}
            </div>
          ) : garments.length === 0 ? (
            <EmptyState
              icon={<Shirt className="size-7" aria-hidden="true" />}
              title="Your wardrobe is ready for its first piece."
              description="Add a garment to begin building a clearer picture of what you own. The sample wardrobe is here if you want to explore the layout first."
              action={
                <div className="flex flex-col items-center gap-2 sm:flex-row">
                  <Button onClick={openAdd}>
                    <Plus className="size-4" aria-hidden="true" />
                    Add your first garment
                  </Button>
                  <Button variant="ghost" onClick={handleLoadSample}>
                    <RotateCcw className="size-4" aria-hidden="true" />
                    Load sample wardrobe
                  </Button>
                </div>
              }
            />
          ) : (
            <EmptyState
              icon={<SearchX className="size-7" aria-hidden="true" />}
              title="No garments match this view."
              description="Try a broader search or clear one of the filters. Your wardrobe is still here."
              action={
                <Button variant="secondary" onClick={clearFilters}>
                  <FilterX className="size-4" aria-hidden="true" />
                  Clear all filters
                </Button>
              }
            />
          )}
        </section>

        <div className="mt-8 grid gap-4 lg:grid-cols-[1fr_auto] lg:items-center">
          <InfoNote tone="water">
            <strong className="font-semibold">Estimates are indicative.</strong> Footprint values use
            stage-one reference ranges. They are not item-specific measurements yet, and verified
            sources will accompany the next calculation model.
          </InfoNote>
          <ButtonLink to="/calculator" variant="secondary" size="sm" className="justify-self-start lg:justify-self-end">
            Calculate a footprint
            <ArrowRight className="size-3.5" aria-hidden="true" />
          </ButtonLink>
        </div>
      </div>

      <GarmentFormModal
        open={formOpen}
        garment={editingGarment}
        onClose={() => {
          setFormOpen(false)
          setEditingGarment(null)
        }}
      />

      <GarmentDetailModal
        open={Boolean(detailGarment)}
        garment={detailGarment}
        onClose={() => setDetailGarment(null)}
        onEdit={openEdit}
        onDelete={(garment) => {
          setDetailGarment(null)
          handleDelete(garment)
        }}
      />

      <ConfirmDialog
        open={Boolean(deleteTarget)}
        onClose={() => setDeleteTarget(null)}
        onConfirm={confirmDelete}
        title="Remove this garment?"
        description={
          deleteTarget
            ? `${deleteTarget.name} will be removed from the preview wardrobe. This cannot be undone in this session.`
            : ''
        }
        confirmLabel="Remove garment"
        cancelLabel="Keep it"
      />
    </>
  )
}

function SummaryCard({
  icon,
  label,
  value,
  note,
  tone,
}: {
  icon: React.ReactNode
  label: string
  value: string
  note: string
  tone: 'sage' | 'ivory' | 'sand' | 'water'
}) {
  const toneClass = {
    sage: 'bg-sage/70',
    ivory: 'bg-white/70',
    sand: 'bg-sand/75',
    water: 'bg-water/70',
  }[tone]
  const iconClass = {
    sage: 'bg-white/70 text-forest',
    ivory: 'bg-sage text-forest',
    sand: 'bg-white/70 text-[#78664D]',
    water: 'bg-white/70 text-water-deep',
  }[tone]
  return (
    <div className={`rounded-2xl border border-border/70 p-4 sm:p-5 ${toneClass}`}>
      <div className="flex items-start justify-between gap-3">
        <div className={`flex size-9 items-center justify-center rounded-xl ${iconClass}`}>{icon}</div>
        <span className="text-[10px] font-semibold uppercase tracking-[0.13em] text-muted">{label}</span>
      </div>
      <p className="mt-4 font-display text-2xl font-semibold tracking-[-0.04em] text-charcoal">{value}</p>
      <p className="mt-1 text-[11px] text-muted">{note}</p>
    </div>
  )
}

function FilterSelect({
  id,
  label,
  value,
  onChange,
  options,
  icon = false,
}: {
  id: string
  label: string
  value: string
  onChange: (value: string) => void
  options: Array<string | { value: string; label: string }>
  icon?: boolean
}) {
  return (
    <div className="relative min-w-0">
      <label htmlFor={id} className="mb-1.5 block text-[10px] font-semibold uppercase tracking-[0.12em] text-muted">
        {label}
      </label>
      <div className="relative">
        {icon ? (
          <SlidersHorizontal
            className="pointer-events-none absolute left-3 top-1/2 size-3.5 -translate-y-1/2 text-muted"
            aria-hidden="true"
          />
        ) : null}
        <select
          id={id}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className={`${selectClass} ${icon ? 'pl-8' : ''}`}
        >
          {options.map((option) => {
            const optionValue = typeof option === 'string' ? option : option.value
            const optionLabel = typeof option === 'string' ? option : option.label
            return (
              <option key={optionValue} value={optionValue}>
                {optionLabel}
              </option>
            )
          })}
        </select>
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="pointer-events-none absolute right-3 top-1/2 size-3.5 -translate-y-1/2 text-muted"
          aria-hidden="true"
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </div>
    </div>
  )
}
