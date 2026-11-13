import { useEffect, useRef, useState, type FormEvent } from 'react'
import { ImagePlus, Loader2, Trash2, Upload } from 'lucide-react'
import { Modal } from '../ui/Modal'
import { Button } from '../ui/Button'
import { FormField, inputStyles } from '../ui/Form'
import { QuantityStepper } from '../ui/Controls'
import { GarmentImage } from '../ui/GarmentImage'
import { useWardrobe } from '../../context/WardrobeContext'
import { useToast } from '../../context/ToastContext'
import {
  CATEGORIES,
  MATERIALS,
  STATUSES,
  type Garment,
  type GarmentCategory,
  type GarmentMaterial,
  type GarmentStatus,
} from '../../data/garments'
import { safeFileSizeLabel } from '../../lib/utils'

type FormErrors = Partial<Record<'name' | 'category' | 'material' | 'quantity' | 'image', string>>

export function GarmentFormModal({
  open,
  onClose,
  garment,
}: {
  open: boolean
  onClose: () => void
  garment?: Garment | null
}) {
  const [name, setName] = useState('')
  const [category, setCategory] = useState<GarmentCategory>('T-shirt')
  const [material, setMaterial] = useState<GarmentMaterial | ''>('Cotton')
  const [quantity, setQuantity] = useState(1)
  const [status, setStatus] = useState<GarmentStatus>('Regular Use')
  const [purchaseDate, setPurchaseDate] = useState('')
  const [purchasePrice, setPurchasePrice] = useState('')
  const [notes, setNotes] = useState('')
  const [image, setImage] = useState<string | undefined>(undefined)
  const [errors, setErrors] = useState<FormErrors>({})
  const [saving, setSaving] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { addGarment, updateGarment } = useWardrobe()
  const { toast } = useToast()

  useEffect(() => {
    if (!open) return
    setName(garment?.name ?? '')
    setCategory(garment?.category ?? 'T-shirt')
    setMaterial(garment?.material ?? 'Cotton')
    setQuantity(garment?.quantity ?? 1)
    setStatus(garment?.status ?? 'Regular Use')
    setPurchaseDate(garment?.purchaseDate ?? '')
    setPurchasePrice(garment?.purchasePrice ?? '')
    setNotes(garment?.notes ?? '')
    setImage(garment?.image)
    setErrors({})
    setSaving(false)
  }, [open, garment])

  const handleImage = (file: File | undefined) => {
    if (!file) return
    if (!file.type.startsWith('image/')) {
      setErrors((current) => ({ ...current, image: 'Choose an image file such as JPG, PNG or WebP.' }))
      return
    }
    if (file.size > 4 * 1024 * 1024) {
      setErrors((current) => ({
        ...current,
        image: `That image is ${safeFileSizeLabel(file.size)}. Choose a file under 4 MB.`,
      }))
      return
    }
    const reader = new FileReader()
    reader.onload = () => {
      setImage(typeof reader.result === 'string' ? reader.result : undefined)
      setErrors((current) => ({ ...current, image: undefined }))
    }
    reader.readAsDataURL(file)
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const nextErrors: FormErrors = {}
    if (!name.trim()) nextErrors.name = 'Add a name for this garment.'
    else if (name.trim().length < 2) nextErrors.name = 'Use at least two characters.'
    if (!category) nextErrors.category = 'Choose a category.'
    if (!material) nextErrors.material = 'Choose a material or “Not sure”.'
    if (!Number.isFinite(quantity) || quantity < 1) nextErrors.quantity = 'Quantity must be at least one.'
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length) {
      const firstId = Object.keys(nextErrors)[0]
      document.getElementById(firstId)?.focus()
      return
    }

    setSaving(true)
    window.setTimeout(() => {
      if (garment) {
        updateGarment(garment.id, {
          name: name.trim(),
          category,
          material: material as GarmentMaterial,
          quantity,
          status,
          purchaseDate: purchaseDate || undefined,
          purchasePrice: purchasePrice || undefined,
          notes: notes.trim() || undefined,
          image,
        })
        toast({
          title: 'Garment updated',
          description: `${name.trim()} has been saved to your wardrobe.`,
          tone: 'success',
        })
      } else {
        addGarment({
          name: name.trim(),
          category,
          material: material as GarmentMaterial,
          quantity,
          status,
          purchaseDate: purchaseDate || undefined,
          purchasePrice: purchasePrice || undefined,
          notes: notes.trim() || undefined,
          image,
        })
        toast({
          title: 'Garment added',
          description: `${name.trim()} is now in your wardrobe.`,
          tone: 'success',
        })
      }
      setSaving(false)
      onClose()
    }, 420)
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={garment ? 'Edit garment' : 'Add a garment'}
      description={
        garment
          ? 'Update the details for this piece. Your changes stay in this preview session.'
          : 'A few details help you see your wardrobe more clearly. Only the name, category and quantity are required.'
      }
      size="lg"
      footer={
        <div className="flex flex-col-reverse gap-2 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[11px] text-muted">
            Footprint values are illustrative estimates from the stage-one model.
          </p>
          <div className="flex flex-col-reverse gap-2 sm:flex-row">
            <Button type="button" variant="secondary" onClick={onClose} disabled={saving}>
              Cancel
            </Button>
            <Button type="submit" form="garment-form" disabled={saving}>
              {saving ? (
                <>
                  <Loader2 className="size-4 animate-spin" aria-hidden="true" />
                  Saving…
                </>
              ) : garment ? (
                'Save changes'
              ) : (
                'Add to wardrobe'
              )}
            </Button>
          </div>
        </div>
      }
    >
      <form id="garment-form" onSubmit={handleSubmit} noValidate>
        <div className="grid gap-6 md:grid-cols-[0.85fr_1.15fr]">
          <div>
            <FormField id="garment-image" label="Garment image" optional error={errors.image}>
              <div className="relative overflow-hidden rounded-2xl border border-border bg-ivory">
                <GarmentImage
                  src={image}
                  alt={name ? `Photo of ${name}` : 'Garment preview'}
                  className="aspect-[4/5] w-full"
                />
                <div className="absolute inset-x-3 bottom-3 flex gap-2">
                  <Button
                    type="button"
                    size="sm"
                    variant="secondary"
                    className="flex-1 border-white/70 bg-white/90 backdrop-blur"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <Upload className="size-3.5" aria-hidden="true" />
                    {image ? 'Replace' : 'Upload'}
                  </Button>
                  {image ? (
                    <button
                      type="button"
                      onClick={() => setImage(undefined)}
                      className="flex size-9 items-center justify-center rounded-full border border-white/70 bg-white/90 text-[#99503C] backdrop-blur transition hover:bg-white"
                      aria-label="Remove garment image"
                    >
                      <Trash2 className="size-4" aria-hidden="true" />
                    </button>
                  ) : null}
                </div>
              </div>
              <input
                ref={fileInputRef}
                id="garment-image-input"
                type="file"
                accept="image/*"
                className="sr-only"
                onChange={(event) => {
                  handleImage(event.target.files?.[0])
                  event.target.value = ''
                }}
              />
              <div className="mt-2 flex items-start gap-2 rounded-xl bg-ivory px-3 py-2.5 text-[11px] leading-relaxed text-muted">
                <ImagePlus className="mt-0.5 size-3.5 shrink-0 text-forest" aria-hidden="true" />
                Images stay in this browser session and are never uploaded in this preview. Use a
                JPG, PNG or WebP under 4 MB.
              </div>
              {errors.image ? (
                <p className="mt-1 text-xs font-medium text-[#99503C]">{errors.image}</p>
              ) : null}
            </FormField>
          </div>

          <div className="space-y-5">
            <FormField id="name" label="Garment name" required error={errors.name}>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="e.g. Everyday cotton tee"
                className={inputStyles}
                aria-invalid={Boolean(errors.name)}
                aria-describedby={errors.name ? 'name-error' : undefined}
                maxLength={80}
                autoComplete="off"
              />
            </FormField>

            <div className="grid gap-5 sm:grid-cols-2">
              <FormField id="category" label="Category" required error={errors.category}>
                <div className="relative">
                  <select
                    id="category"
                    value={category}
                    onChange={(event) => setCategory(event.target.value as GarmentCategory)}
                    className={`${inputStyles} appearance-none pr-9`}
                    aria-invalid={Boolean(errors.category)}
                    aria-describedby={errors.category ? 'category-error' : undefined}
                  >
                    {CATEGORIES.map((option) => (
                      <option key={option}>{option}</option>
                    ))}
                  </select>
                  <ChevronDownIcon />
                </div>
              </FormField>

              <FormField id="material" label="Material" error={errors.material}>
                <div className="relative">
                  <select
                    id="material"
                    value={material}
                    onChange={(event) => setMaterial(event.target.value as GarmentMaterial | '')}
                    className={`${inputStyles} appearance-none pr-9`}
                    aria-invalid={Boolean(errors.material)}
                    aria-describedby={errors.material ? 'material-error' : undefined}
                  >
                    <option value="">Not recorded</option>
                    {MATERIALS.map((option) => (
                      <option key={option}>{option}</option>
                    ))}
                  </select>
                  <ChevronDownIcon />
                </div>
              </FormField>

              <FormField id="quantity" label="Quantity" required error={errors.quantity}>
                <QuantityStepper value={quantity} onChange={setQuantity} />
              </FormField>

              <FormField id="status" label="Status">
                <div className="relative">
                  <select
                    id="status"
                    value={status}
                    onChange={(event) => setStatus(event.target.value as GarmentStatus)}
                    className={`${inputStyles} appearance-none pr-9`}
                  >
                    {STATUSES.map((option) => (
                      <option key={option}>{option}</option>
                    ))}
                  </select>
                  <ChevronDownIcon />
                </div>
              </FormField>

              <FormField id="purchase-date" label="Purchase date" optional>
                <input
                  id="purchase-date"
                  type="date"
                  value={purchaseDate}
                  onChange={(event) => setPurchaseDate(event.target.value)}
                  className={inputStyles}
                />
              </FormField>

              <FormField id="purchase-price" label="Purchase price" optional hint="£">
                <input
                  id="purchase-price"
                  type="number"
                  inputMode="decimal"
                  min={0}
                  step="0.01"
                  value={purchasePrice}
                  onChange={(event) => setPurchasePrice(event.target.value)}
                  placeholder="e.g. 48"
                  className={inputStyles}
                />
              </FormField>
            </div>

            <FormField id="notes" label="Notes" optional>
              <textarea
                id="notes"
                rows={3}
                value={notes}
                onChange={(event) => setNotes(event.target.value)}
                placeholder="Care notes, repairs, where it came from…"
                className={`${inputStyles} resize-none`}
                maxLength={320}
              />
            </FormField>
          </div>
        </div>
      </form>
    </Modal>
  )
}

function ChevronDownIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="pointer-events-none absolute right-3.5 top-1/2 size-4 -translate-y-1/2 text-muted"
      aria-hidden="true"
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  )
}
