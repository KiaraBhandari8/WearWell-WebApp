export const RESEARCH_TOPICS = [
  'Cotton',
  'Denim',
  'Fast fashion',
  'Dyeing',
  'Garment care',
  'Reuse & repair',
] as const

export type ResearchTopic = (typeof RESEARCH_TOPICS)[number]

export type ArticleSection = {
  heading: string
  body: string[]
  list?: string[]
  callout?: string
}

export type ResearchArticle = {
  slug: string
  title: string
  summary: string
  topic: ResearchTopic
  readTime: string
  image: string
  imageAlt: string
  featured?: boolean
  sample: true
  intro: string
  sections: ArticleSection[]
  takeaways: string[]
  sources: string[]
  methodology: string
}

export const RESEARCH_ARTICLES: ResearchArticle[] = [
  {
    slug: 'cotton-and-water',
    title: 'Cotton, water and the making of a T-shirt',
    summary:
      'A plain cotton tee begins in a field. Follow the fibre through growing, processing and production to understand why water sits at the heart of the story.',
    topic: 'Cotton',
    readTime: '6 min read',
    image: '/images/cotton.jpg',
    imageAlt: 'Close view of natural cotton fibres',
    featured: true,
    sample: true,
    intro:
      'A wardrobe staple can feel almost weightless. Yet the journey from a cotton field to a folded T-shirt involves water at nearly every stage: growing the plant, preparing the fibre, producing the yarn and finishing the cloth. This preview article explains the broad picture without presenting unverified numbers as settled science.',
    sections: [
      {
        heading: 'Why cotton has a water story',
        body: [
          'Cotton is a crop, and crops need water. Some of that water arrives as rain; some is supplied through irrigation. The balance depends on where the cotton is grown, the local climate and the farming methods used. That is one reason a single global figure for “a cotton T-shirt” can only ever be an estimate.',
          'Water also moves through the supply chain after the field. Fibre cleaning, yarn preparation, fabric production and wet finishing can all use water. When we talk about a garment’s water footprint, we are looking across that whole chain rather than at one tap.',
        ],
        callout:
          'The 2,700-litre T-shirt figure shown on WearWell is an indicative, commonly cited estimate — not a universal measurement. The verified source note for this article is still being prepared.',
      },
      {
        heading: 'From field to fibre',
        body: [
          'Cotton arrives at a textile mill as a raw agricultural product. It is cleaned and combed before being spun into yarn. Different spinning and processing routes use different amounts of energy and water, and the resulting yarn can vary in quality and weight.',
          'A heavier yarn may produce a denser fabric, while lighter yarns create finer cloth. Because a T-shirt is not a standard object, comparing two tees by weight, fibre origin and construction is more meaningful than comparing them by category alone.',
        ],
      },
      {
        heading: 'What the 2,700-litre estimate means',
        body: [
          'The figure is useful as a conversation starter, not a precise label. It helps make an invisible resource visible and gives us a sense of scale. It should not be read as “every cotton T-shirt uses exactly this much water.”',
          'A more honest estimate would account for where the cotton grew, how it was farmed, how much fabric the garment contains and how the fabric was finished. Those are the questions WearWell plans to bring into its calculation model in the next stage.',
        ],
      },
      {
        heading: 'A better way to think about it',
        body: [
          'The water story does not end when a T-shirt is made. How often you wash it, how you dry it and how long you keep it all shape its lifetime impact. Choosing well and wearing longer can matter more than chasing a perfect fibre label.',
        ],
        list: [
          'Treat estimates as ranges, not verdicts.',
          'Ask where a fibre came from when that information is available.',
          'Wear what you own more often, and repair it before replacing it.',
        ],
      },
    ],
    takeaways: [
      'A garment water footprint covers the whole supply chain.',
      'Rainfall, irrigation, geography and processing all change the result.',
      'The 2,700-litre figure is an indicative reference, not an exact measurement.',
    ],
    sources: [
      'Source verification is pending for this preview article. No external research has been cited as verified yet.',
    ],
    methodology:
      'This is clearly labelled sample editorial content. It introduces concepts and uses only the indicative figures supplied for the WearWell interface. It does not claim to be a literature review.',
  },
  {
    slug: 'denim-water',
    title: 'A pair of jeans and the water behind denim',
    summary:
      'Denim is heavy, durable and deeply loved. Its production journey explains why jeans usually carry a larger water estimate than a light cotton top.',
    topic: 'Denim',
    readTime: '5 min read',
    image: '/images/jeans.jpg',
    imageAlt: 'A pair of blue jeans',
    sample: true,
    intro:
      'Jeans are designed to last, which is part of their appeal. They also use more fabric than a T-shirt and pass through several water-intensive processing steps. This preview explores the shape of that impact and why ranges matter more than single numbers.',
    sections: [
      {
        heading: 'More fabric, more process',
        body: [
          'A pair of jeans typically uses more cotton cloth than a simple top. The weight and density of denim add to the resource story before any finishing begins. Indigo dyeing and the treatments used to create different washes add further steps.',
          'The commonly cited figure on WearWell is a range of roughly 7,600 to 9,506 litres for a pair of jeans. It is an indicative reference, not a universal result. Production methods, fibre origin and garment weight can move an estimate considerably.',
        ],
      },
      {
        heading: 'Why the wash matters',
        body: [
          'Denim finishing can involve repeated wet processes. Distressing, fading and softening are aesthetic choices as much as technical ones. A pair with fewer wet-finishing steps may have a different footprint from a heavily treated pair — but the exact difference depends on the mill and its methods.',
          'For consumers, precise mill-level data is rarely visible on a care label. That gap is exactly why we should avoid pretending a single number tells the whole story.',
        ],
      },
      {
        heading: 'Keeping denim in use',
        body: [
          'Durability is one of denim’s strongest sustainability advantages. Washing less often, airing between wears and repairing seams or hems can extend a pair’s useful life. When a pair no longer fits, resale or swapping keeps the material in circulation.',
        ],
        list: [
          'Air jeans between wears instead of washing automatically.',
          'Repair a worn hem or pocket seam early.',
          'Pass on pairs that no longer fit rather than leaving them unworn.',
        ],
      },
    ],
    takeaways: [
      'Denim’s weight and wet finishing help explain its larger indicative range.',
      'The same category can have very different impacts depending on production.',
      'Longevity and repair are practical ways to keep denim useful.',
    ],
    sources: [
      'Source verification is pending for this preview article. The 7,600–9,506 litre range is the indicative figure supplied for the WearWell interface.',
    ],
    methodology:
      'Sample editorial content for stage one. It does not attempt to rank brands or make product-specific claims.',
  },
  {
    slug: 'fast-fashion-water',
    title: 'Fast fashion’s less visible water bill',
    summary:
      'Low prices and rapid turnover can hide a larger pattern: more garments produced, more resources consumed and fewer clothes worn to their full potential.',
    topic: 'Fast fashion',
    readTime: '6 min read',
    image: '/images/store-rack.jpg',
    imageAlt: 'Clothing rails inside a store',
    sample: true,
    intro:
      'Fast fashion is less about one garment than about a system of speed. New styles arrive quickly, prices stay low and the pressure to buy can feel constant. Water is one of the resources carried through that system, from fibre production to laundering and disposal.',
    sections: [
      {
        heading: 'The impact of more',
        body: [
          'When clothing is produced in larger volumes and worn fewer times, the resources used to make each garment are spread across a shorter useful life. That is a simple idea with a complicated supply chain behind it.',
          'The water footprint of an individual item does not disappear because the price is low. It is simply moved off the shop floor and into farms, mills, dyehouses and laundries that most shoppers never see.',
        ],
      },
      {
        heading: 'Speed changes the questions',
        body: [
          'A slower wardrobe encourages different questions: Will I wear this thirty times? Can it be repaired? Does it work with what I already own? These questions do not require perfection. They create a pause between wanting something and buying it.',
          'Pausing is powerful because the most sustainable purchase is often the one not made. That is not a judgement about anyone’s budget or style. It is an invitation to use what is already in the wardrobe first.',
        ],
        callout:
          'WearWell does not claim that individual choices alone solve systemic water challenges. Consumer habits sit alongside how clothing is produced, priced and marketed.',
      },
      {
        heading: 'Small shifts that add up',
        body: [
          'You do not need to rebuild your wardrobe overnight. Start with one category where you tend to overbuy. Track what you actually wear for a month, then make a deliberate plan before adding anything new.',
        ],
        list: [
          'Use a waiting period before non-essential purchases.',
          'Shop your own wardrobe before looking for something new.',
          'Choose pieces that can be worn across seasons and settings.',
        ],
      },
    ],
    takeaways: [
      'Fast fashion is a production and consumption system, not a single product type.',
      'More clothes and fewer wears can dilute the value of the resources used.',
      'Pausing before buying is a practical first step.',
    ],
    sources: [
      'Source verification is pending for this preview article. No external research is presented as verified.',
    ],
    methodology:
      'Sample editorial content for stage one. No brand, retailer or country-level claims are made.',
  },
  {
    slug: 'textile-dyeing',
    title: 'Colour has a water cost too',
    summary:
      'Dyeing gives fabric its character, but wet processing can use water and create wastewater. Understanding the process helps us ask better questions about colour and care.',
    topic: 'Dyeing',
    readTime: '5 min read',
    image: '/images/water-2.jpg',
    imageAlt: 'Blue water rippling across a surface',
    sample: true,
    intro:
      'Colour feels instant and visual. Behind it sits a wet, technical process that can involve water, heat, salts and dyes. This preview looks at the broad relationship between textile colour and water without making mill-level claims.',
    sections: [
      {
        heading: 'Wet processing, explained simply',
        body: [
          'Dyeing and finishing often require fabric to pass through water-based baths. The exact recipe depends on the fibre, the desired shade and the equipment available. Some processes are more efficient than others, and some colours take more steps to achieve.',
          'After dyeing, water may need treatment before it returns to the environment. The quality of that treatment matters as much as the volume of water used. A discussion of water impact that ignores wastewater is incomplete.',
        ],
      },
      {
        heading: 'Why colour alone is not a guide',
        body: [
          'A dark garment is not automatically worse than a pale one. The full picture includes the dye chemistry, the fibre, the equipment and the local water treatment system. Without those details, a colour-based rule of thumb would be misleading.',
          'What consumers can do is look for clearer supply-chain information and support brands that publish meaningful detail. “Sustainable” alone is not enough; specifics build trust.',
        ],
      },
      {
        heading: 'Caring for colour',
        body: [
          'Washing less often and at lower temperatures can help clothes keep their colour while reducing the resources used in laundering. Following the care label protects the garment and helps it last.',
        ],
        list: [
          'Turn garments inside out before washing.',
          'Wash similar colours together and use a cooler cycle when suitable.',
          'Air-dry where possible to protect both colour and fabric.',
        ],
      },
    ],
    takeaways: [
      'Dyeing is a wet process whose impact depends on fibre, recipe and treatment.',
      'Colour alone is not a reliable sustainability signal.',
      'Better garment care can reduce laundering-related impacts.',
    ],
    sources: [
      'Source verification is pending for this preview article. No specific dyehouse, brand or regional data has been cited.',
    ],
    methodology:
      'Conceptual sample content. It avoids numerical wastewater claims until verified research is available.',
  },
  {
    slug: 'care-and-longevity',
    title: 'Care less, wear longer',
    summary:
      'The way you wash, dry and store your clothes shapes how long they stay in use. A few calm routines can make a real difference.',
    topic: 'Garment care',
    readTime: '4 min read',
    image: '/images/folded-clothes.jpg',
    imageAlt: 'Neatly folded clothing',
    sample: true,
    intro:
      'Caring for clothes is not about being precious with them. It is about making everyday wear easier: fewer rushed washes, faster repairs and a wardrobe you can actually see and use.',
    sections: [
      {
        heading: 'Wash with intention',
        body: [
          'Not every wear needs a full wash. Airing a garment between wears, spot-cleaning small marks and using a cooler cycle can keep clothes fresh while reducing unnecessary laundering. Always check the care label first, especially for wool, silk and structured pieces.',
          'Over-washing can wear fibres, fade colour and distort shape. A gentler routine helps clothes hold their character for longer.',
        ],
      },
      {
        heading: 'Dry and store better',
        body: [
          'Line drying is often gentle on fabric and uses less energy than a dryer. Knitwear is best dried flat to keep its shape. Hangers, drawers and dividers matter too: when you can see what you own, you are more likely to wear it.',
          'Store clean clothes in a dry, ventilated space. Repair small issues early rather than waiting for them to become reasons to replace the item.',
        ],
      },
      {
        heading: 'A simple weekly rhythm',
        body: [
          'Pick one small habit and repeat it. A five-minute repair check on Sunday can stop a loose button or hem from becoming a discarded garment.',
        ],
        list: [
          'Air worn-but-clean clothes before putting them away.',
          'Keep a small repair kit where you can see it.',
          'Set aside a monthly “wardrobe check” for anything that needs attention.',
        ],
      },
    ],
    takeaways: [
      'Less frequent, cooler washing helps protect garments.',
      'Drying and storage choices influence longevity.',
      'Small, repeatable care habits are more useful than perfect intentions.',
    ],
    sources: [
      'Source verification is pending for this preview article. Care guidance is general and should be checked against each garment label.',
    ],
    methodology:
      'Sample editorial content drawing on everyday care principles. No product-specific performance claims are made.',
  },
  {
    slug: 'secondhand-circulation',
    title: 'The second life of clothes',
    summary:
      'Swapping, resale, repair and responsible donation can keep garments moving. The key is matching the item to the next useful home.',
    topic: 'Reuse & repair',
    readTime: '5 min read',
    image: '/images/thrift.jpg',
    imageAlt: 'Clothing rails in a second-hand shop',
    sample: true,
    intro:
      'A garment that no longer works for you may still be useful to someone else. Circular habits extend the life of what already exists, but they are not a magic solution to overproduction.',
    sections: [
      {
        heading: 'Reuse is not disposal in disguise',
        body: [
          'Passing on clothes only creates value when the next owner actually wears them. A donation that ends up unsold or shipped long distances may not deliver the benefit we imagine. Thoughtful matching matters more than volume.',
          'Before passing something on, ask whether it is clean, complete and in a condition you would be happy to receive. If it needs a repair, fix it first when you can.',
        ],
      },
      {
        heading: 'Where clothes can go next',
        body: [
          'Swaps and sharing work well for seasonal pieces and occasion wear. Resale suits good-quality items with a clear audience. Local charities may need specific items rather than everything. Textile recycling is a last resort for worn-out fabric, not a first stop for wearable clothes.',
        ],
        list: [
          'Swap or lend occasion pieces instead of buying them.',
          'Check a charity’s current needs before donating.',
          'Use textile recycling only for items that cannot be worn again.',
        ],
      },
      {
        heading: 'Buying second-hand with care',
        body: [
          'Second-hand shopping is most useful when it replaces a planned new purchase rather than adding an extra one. Make a list, check measurements and inspect for wear. A good second-hand find should fit your life, not just your basket.',
        ],
      },
    ],
    takeaways: [
      'Keep wearable clothes in circulation through swaps, resale or donation.',
      'Match donations to real, current needs.',
      'Use recycling for unwearable textiles, not as a catch-all.',
    ],
    sources: [
      'Source verification is pending for this preview article. WearWell does not currently offer a live marketplace or recommendation service.',
    ],
    methodology:
      'Sample editorial content. No claims are made about the outcomes of specific resale or donation organisations.',
  },
]

export function getArticleBySlug(slug: string): ResearchArticle | undefined {
  return RESEARCH_ARTICLES.find((article) => article.slug === slug)
}
