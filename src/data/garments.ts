export const CATEGORIES = [
  'T-shirt',
  'Jeans',
  'Shirt',
  'Dress',
  'Knitwear',
  'Jacket / Coat',
  'Shorts',
  'Skirt',
  'Other',
] as const

export type GarmentCategory = (typeof CATEGORIES)[number]

export const MATERIALS = [
  'Cotton',
  'Organic cotton',
  'Cotton denim',
  'Linen',
  'Linen blend',
  'Wool',
  'Merino wool',
  'Polyester',
  'Silk',
  'Viscose',
  'Mixed fibres',
  'Not sure',
] as const

export type GarmentMaterial = (typeof MATERIALS)[number]

export const STATUSES = [
  'Regular Use',
  'Rarely Used',
  'Needs Repair',
  'Ready to Donate',
] as const

export type GarmentStatus = (typeof STATUSES)[number]

export type Garment = {
  id: string
  name: string
  category: GarmentCategory
  material: GarmentMaterial | ''
  quantity: number
  image?: string
  status: GarmentStatus
  purchaseDate?: string
  purchasePrice?: string
  notes?: string
  footprintPerItem?: number | null
  createdAt: string
}

export type WaterRange = {
  min: number
  max: number
  label: string
}

/**
 * Stage-one interface reference ranges.
 * These are deliberately labelled as illustrative and are not a verified
 * research dataset. A sourced calculation model will replace them in stage two.
 */
export const WATER_REFERENCE: Record<GarmentCategory, WaterRange> = {
  'T-shirt': { min: 2700, max: 2700, label: 'cotton T-shirt reference' },
  Jeans: { min: 7600, max: 9506, label: 'pair of jeans reference' },
  Shirt: { min: 2200, max: 3200, label: 'interface test range' },
  Dress: { min: 3500, max: 5500, label: 'interface test range' },
  Knitwear: { min: 3000, max: 4800, label: 'interface test range' },
  'Jacket / Coat': { min: 4500, max: 7000, label: 'interface test range' },
  Shorts: { min: 1500, max: 2500, label: 'interface test range' },
  Skirt: { min: 2000, max: 3500, label: 'interface test range' },
  Other: { min: 2000, max: 4000, label: 'interface test range' },
}

export const CATEGORY_IMAGES: Record<GarmentCategory, string> = {
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

export type StatusTone = 'sage' | 'sand' | 'water' | 'neutral'

export const STATUS_STYLES: Record<
  GarmentStatus,
  { tone: StatusTone; dot: string; description: string }
> = {
  'Regular Use': {
    tone: 'sage',
    dot: 'bg-forest',
    description: 'In regular rotation',
  },
  'Rarely Used': {
    tone: 'sand',
    dot: 'bg-[#A88A5F]',
    description: 'Could be worn more',
  },
  'Needs Repair': {
    tone: 'sand',
    dot: 'bg-[#A56A4D]',
    description: 'Needs a little care',
  },
  'Ready to Donate': {
    tone: 'water',
    dot: 'bg-water-deep',
    description: 'Ready for a new home',
  },
}

export const SAMPLE_GARMENTS: Garment[] = [
  {
    id: 'sample-1',
    name: 'The everyday tee',
    category: 'T-shirt',
    material: 'Organic cotton',
    quantity: 2,
    image: '/images/tshirt.jpg',
    status: 'Regular Use',
    purchaseDate: '2024-05-18',
    purchasePrice: '32',
    notes: 'Soft crew neck, worn most weeks.',
    footprintPerItem: 2700,
    createdAt: '2026-09-12T10:00:00.000Z',
  },
  {
    id: 'sample-2',
    name: 'Weekend denim',
    category: 'Jeans',
    material: 'Cotton denim',
    quantity: 1,
    image: '/images/jeans.jpg',
    status: 'Regular Use',
    purchaseDate: '2023-11-03',
    purchasePrice: '78',
    notes: 'Straight leg, repaired the hem once.',
    footprintPerItem: 7600,
    createdAt: '2026-09-18T10:00:00.000Z',
  },
  {
    id: 'sample-3',
    name: 'Cloud knit',
    category: 'Knitwear',
    material: 'Merino wool',
    quantity: 1,
    image: '/images/sweater.jpg',
    status: 'Rarely Used',
    purchaseDate: '2022-12-10',
    purchasePrice: '65',
    footprintPerItem: 3900,
    createdAt: '2026-10-02T10:00:00.000Z',
  },
  {
    id: 'sample-4',
    name: 'Market shirt',
    category: 'Shirt',
    material: 'Linen',
    quantity: 1,
    image: '/images/shirt.jpg',
    status: 'Regular Use',
    purchaseDate: '2025-04-22',
    purchasePrice: '48',
    footprintPerItem: 2700,
    createdAt: '2026-10-09T10:00:00.000Z',
  },
  {
    id: 'sample-5',
    name: 'Studio dress',
    category: 'Dress',
    material: 'Viscose',
    quantity: 1,
    image: '/images/dress.jpg',
    status: 'Needs Repair',
    purchaseDate: '2023-07-14',
    purchasePrice: '56',
    notes: 'Small seam opening at the waist — fix before rewearing.',
    footprintPerItem: 4500,
    createdAt: '2026-08-27T10:00:00.000Z',
  },
  {
    id: 'sample-6',
    name: 'Field jacket',
    category: 'Jacket / Coat',
    material: 'Cotton',
    quantity: 1,
    image: '/images/jacket.jpg',
    status: 'Regular Use',
    purchaseDate: '2024-02-02',
    purchasePrice: '120',
    footprintPerItem: 5600,
    createdAt: '2026-09-30T10:00:00.000Z',
  },
  {
    id: 'sample-7',
    name: 'Sunday skirt',
    category: 'Skirt',
    material: 'Linen blend',
    quantity: 1,
    image: '/images/skirt.jpg',
    status: 'Ready to Donate',
    purchaseDate: '2021-06-11',
    footprintPerItem: 2600,
    createdAt: '2026-07-15T10:00:00.000Z',
  },
  {
    id: 'sample-8',
    name: 'City coat',
    category: 'Jacket / Coat',
    material: 'Wool',
    quantity: 1,
    image: '/images/coat.jpg',
    status: 'Rarely Used',
    purchaseDate: '2020-01-20',
    footprintPerItem: 6800,
    createdAt: '2026-06-21T10:00:00.000Z',
  },
]

export function formatLitres(value: number): string {
  return `${Math.round(value).toLocaleString('en-US')} L`
}

export function footprintRange(garment: Garment): { min: number; max: number } | null {
  if (garment.footprintPerItem) {
    return { min: garment.footprintPerItem, max: garment.footprintPerItem }
  }
  const reference = WATER_REFERENCE[garment.category]
  if (!reference) return null
  return { min: reference.min, max: reference.max }
}

export function garmentTotalFootprint(garment: Garment): number | null {
  const range = footprintRange(garment)
  if (!range) return null
  return Math.round(((range.min + range.max) / 2) * garment.quantity)
}
