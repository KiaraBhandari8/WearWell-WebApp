import {
  Palette,
  RefreshCcw,
  ShoppingBag,
  Shirt,
  Sprout,
  WashingMachine,
  type LucideIcon,
} from 'lucide-react'

export const TOPIC_ICONS: Record<string, LucideIcon> = {
  Cotton: Sprout,
  Denim: Shirt,
  'Fast fashion': ShoppingBag,
  Dyeing: Palette,
  'Garment care': WashingMachine,
  'Reuse & repair': RefreshCcw,
}
