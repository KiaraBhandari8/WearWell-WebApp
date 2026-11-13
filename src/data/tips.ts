export const TIP_CATEGORIES = [
  'Clothing care',
  'Repair & reuse',
  'Second-hand shopping',
  'Swaps & sharing',
  'Responsible donation',
  'Buying less',
] as const

export type TipCategory = (typeof TIP_CATEGORIES)[number]

export type Tip = {
  id: string
  title: string
  description: string
  category: TipCategory
  actionLabel?: string
  actionTo?: string
  time?: string
}

export const TIPS: Tip[] = [
  {
    id: 'cooler-washes',
    title: 'Turn the temperature down',
    description:
      'Wash at the coolest setting the care label allows. It is gentler on most fabrics and keeps colour richer for longer.',
    category: 'Clothing care',
    time: 'Every wash',
  },
  {
    id: 'air-between-wears',
    title: 'Let clothes breathe between wears',
    description:
      'Airing a garment overnight can refresh it enough for another day. Not every wear needs a full wash.',
    category: 'Clothing care',
    time: '1 minute',
  },
  {
    id: 'line-dry',
    title: 'Make room for line drying',
    description:
      'Hang or lay clothes flat to dry when you can. It is a calmer way to care for fabric and reduces dryer use.',
    category: 'Clothing care',
    time: 'A small habit',
    actionLabel: 'Read care guide',
    actionTo: '/learn/care-and-longevity',
  },
  {
    id: 'repair-kit',
    title: 'Keep a tiny repair kit',
    description:
      'A needle, thread, scissors and a few buttons turn a loose seam from a reason to replace into a five-minute fix.',
    category: 'Repair & reuse',
    time: '10 minutes to set up',
    actionLabel: 'Add a repair item',
    actionTo: '/wardrobe',
  },
  {
    id: 'patch-first',
    title: 'Patch before you replace',
    description:
      'Visible mending can add character as well as life. Repair a worn knee, elbow or hem before deciding the garment is finished.',
    category: 'Repair & reuse',
    time: 'An evening',
    actionLabel: 'Find repair candidates',
    actionTo: '/wardrobe',
  },
  {
    id: 'restyle',
    title: 'Try one small restyle',
    description:
      'Shorten a hem, move a button or take in a waist. A simple alteration can make an unworn piece feel new again.',
    category: 'Repair & reuse',
    time: '30 minutes',
  },
  {
    id: 'thrift-list',
    title: 'Make a second-hand list first',
    description:
      'Write down the exact gap in your wardrobe before you browse. A list helps a good find replace a planned purchase instead of becoming another extra.',
    category: 'Second-hand shopping',
    time: '5 minutes',
    actionLabel: 'Check your wardrobe gaps',
    actionTo: '/wardrobe',
  },
  {
    id: 'inspect-labels',
    title: 'Inspect seams, soles and labels',
    description:
      'Look closely at high-wear areas and check the fibre and care label. A little inspection now saves disappointment later.',
    category: 'Second-hand shopping',
    time: '2 minutes',
  },
  {
    id: 'measure',
    title: 'Know your measurements',
    description:
      'Keep your key measurements on your phone. It makes online second-hand shopping more accurate and reduces returns.',
    category: 'Second-hand shopping',
    time: '5 minutes',
  },
  {
    id: 'host-swap',
    title: 'Host a two-hour clothes swap',
    description:
      'Invite a few friends, set a one-bag limit and let everyone leave with something that feels new to them.',
    category: 'Swaps & sharing',
    time: 'An afternoon',
  },
  {
    id: 'borrow-shelf',
    title: 'Start a borrowing shelf',
    description:
      'Occasion wear, tools and statement pieces are perfect for sharing. A simple group chat is enough to begin.',
    category: 'Swaps & sharing',
    time: '10 minutes',
  },
  {
    id: 'donate-ready',
    title: 'Donate clean and season-ready',
    description:
      'Wash items, check pockets and pass them on in a condition you would be happy to receive. Complete items are more likely to be used.',
    category: 'Responsible donation',
    time: '20 minutes',
  },
  {
    id: 'check-needs',
    title: 'Check what is actually needed',
    description:
      'Call a local charity or shelter before donating. They may need specific sizes or seasonal items — and may not be able to use everything.',
    category: 'Responsible donation',
    time: '5 minutes',
  },
  {
    id: 'thirty-day-rule',
    title: 'Try a thirty-day pause',
    description:
      'Save the link or note the item down and revisit it later. The pause separates a passing urge from a piece you really want.',
    category: 'Buying less',
    time: '30 days',
  },
  {
    id: 'one-in-one-out',
    title: 'Try one in, one out',
    description:
      'For every new item, choose one thing to pass on or wear more. It keeps your wardrobe honest about its actual capacity.',
    category: 'Buying less',
    time: 'Per purchase',
  },
  {
    id: 'wear-thirty',
    title: 'Ask: will I wear it 30 times?',
    description:
      'A simple wear-count question helps reveal whether a piece fits your real life or just your imagination.',
    category: 'Buying less',
    time: '30 seconds',
    actionLabel: 'Calculate a footprint',
    actionTo: '/calculator',
  },
]

export function tipsForCategory(category: string): Tip[] {
  if (category === 'All tips') return TIPS
  return TIPS.filter((tip) => tip.category === category)
}
