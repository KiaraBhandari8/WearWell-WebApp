import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import {
  SAMPLE_GARMENTS,
  WATER_REFERENCE,
  garmentTotalFootprint,
  type Garment,
  type GarmentCategory,
  type GarmentMaterial,
  type GarmentStatus,
} from '../data/garments'

export type WardrobeSettings = {
  showEstimates: boolean
  reduceMotion: boolean
}

type NewGarment = {
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
}

type WardrobeContextValue = {
  garments: Garment[]
  totalItems: number
  categoryCount: number
  estimatedTotal: number
  careCount: number
  settings: WardrobeSettings
  addGarment: (garment: NewGarment) => Garment
  updateGarment: (id: string, updates: Partial<Garment>) => void
  deleteGarment: (id: string) => void
  clearWardrobe: () => void
  resetWardrobe: () => void
  updateSetting: <K extends keyof WardrobeSettings>(key: K, value: WardrobeSettings[K]) => void
}

const WardrobeContext = createContext<WardrobeContextValue | null>(null)

export function WardrobeProvider({ children }: { children: ReactNode }) {
  const [garments, setGarments] = useState<Garment[]>(SAMPLE_GARMENTS)
  const [settings, setSettings] = useState<WardrobeSettings>({
    showEstimates: true,
    reduceMotion: false,
  })

  useEffect(() => {
    document.documentElement.classList.toggle('reduce-motion', settings.reduceMotion)
    return () => document.documentElement.classList.remove('reduce-motion')
  }, [settings.reduceMotion])

  const addGarment = useCallback((garment: NewGarment) => {
    const id = `garment-${Date.now()}-${Math.random().toString(16).slice(2)}`
    const reference = WATER_REFERENCE[garment.category]
    const created: Garment = {
      ...garment,
      id,
      footprintPerItem:
        garment.footprintPerItem ??
        (garment.category === 'T-shirt' || garment.category === 'Jeans'
          ? reference.min
          : Math.round((reference.min + reference.max) / 2)),
      createdAt: new Date().toISOString(),
    }
    setGarments((current) => [created, ...current])
    return created
  }, [])

  const updateGarment = useCallback((id: string, updates: Partial<Garment>) => {
    setGarments((current) =>
      current.map((garment) => (garment.id === id ? { ...garment, ...updates } : garment)),
    )
  }, [])

  const deleteGarment = useCallback((id: string) => {
    setGarments((current) => current.filter((garment) => garment.id !== id))
  }, [])

  const clearWardrobe = useCallback(() => setGarments([]), [])

  const resetWardrobe = useCallback(() => setGarments(SAMPLE_GARMENTS), [])

  const updateSetting = useCallback(
    <K extends keyof WardrobeSettings>(key: K, value: WardrobeSettings[K]) => {
      setSettings((current) => ({ ...current, [key]: value }))
    },
    [],
  )

  const value = useMemo<WardrobeContextValue>(() => {
    const totalItems = garments.reduce((sum, garment) => sum + garment.quantity, 0)
    const categoryCount = new Set(garments.map((garment) => garment.category)).size
    const estimatedTotal = garments.reduce((sum, garment) => {
      const estimate = garmentTotalFootprint(garment)
      return sum + (estimate ?? 0)
    }, 0)
    const careCount = garments.filter(
      (garment) => garment.status === 'Needs Repair' || garment.status === 'Rarely Used',
    ).length

    return {
      garments,
      totalItems,
      categoryCount,
      estimatedTotal,
      careCount,
      settings,
      addGarment,
      updateGarment,
      deleteGarment,
      clearWardrobe,
      resetWardrobe,
      updateSetting,
    }
  }, [
    garments,
    settings,
    addGarment,
    updateGarment,
    deleteGarment,
    clearWardrobe,
    resetWardrobe,
    updateSetting,
  ])

  return <WardrobeContext.Provider value={value}>{children}</WardrobeContext.Provider>
}

export function useWardrobe(): WardrobeContextValue {
  const context = useContext(WardrobeContext)
  if (!context) throw new Error('useWardrobe must be used inside WardrobeProvider')
  return context
}
