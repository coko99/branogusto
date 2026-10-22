import {
  categories,
  getProduct,
  products,
  productsByCategory,
  type CategorySlug,
  type Product,
} from "@/lib/site"

export const FREE_SHIPPING_RSD = 5000
export const BUNDLE_RATE = 0.08
export const BUNDLE_MIN_KINDS = 3

export const coupons: Record<string, { label: string; rate: number }> = {
  ZIMNICA10: { label: "ZIMNICA10 · 10%", rate: 0.1 },
}

export const pickupSpots = [
  {
    id: "krusevac",
    city: "Kruševac",
    note: "Tačno mesto preuzimanja dogovaramo kad potvrdimo porudžbinu.",
  },
  {
    id: "beograd",
    city: "Beograd",
    note: "Tačno mesto preuzimanja dogovaramo kad potvrdimo porudžbinu.",
  },
] as const

export type PickupId = (typeof pickupSpots)[number]["id"]

/** Ručno izabrani parovi. Kasnije mogu da dođu iz stvarnih porudžbina. */
const boughtTogether: Record<string, string[]> = {
  "ajvar-blagi-700": ["somborka", "sok-borovnica", "dzem-kajsija"],
  "ajvar-blagi-375": ["somborka", "dzem-sipurak", "sok-aronija"],
  "ajvar-ljuti-700": ["somborka", "sok-aronija", "pekmez-sljiva"],
  "ajvar-ljuti-375": ["somborka", "dzem-jagoda", "sok-borovnica"],
  "dzem-sipurak": ["ajvar-blagi-700", "sok-aronija"],
  "pekmez-sljiva": ["ajvar-blagi-375", "sok-borovnica"],
  "dzem-jagoda": ["ajvar-ljuti-375", "sok-borovnica"],
  "dzem-kajsija": ["ajvar-blagi-700", "somborka"],
  "sok-aronija": ["dzem-sipurak", "ajvar-ljuti-700"],
  "sok-borovnica": ["dzem-jagoda", "ajvar-blagi-700"],
  somborka: ["ajvar-blagi-700", "ajvar-ljuti-700", "dzem-kajsija"],
}

export type Recipe = {
  slug: string
  title: string
  minutes: number
  servings: string
  lead: string
  image: string
  imageAlt: string
  steps: string[]
  productSlugs: string[]
  category: CategorySlug
}

export const recipes: Recipe[] = [
  {
    slug: "kremasta-pasta-sa-ajvarom",
    title: "Kremasta pasta sa ajvarom",
    minutes: 25,
    servings: "2 osobe",
    category: "ajvari",
    image: "/images/recipes/pasta-ajvar.jpg",
    imageAlt: "Činija paste prelivene kremastim ajvarom",
    lead: "Ajvar umesto sosa: kratko se krčka sa pavlakom i ide preko tople paste.",
    steps: [
      "Skuvajte pastu u slanoj vodi, odvojite malo vode od kuvanja.",
      "Na tiganju zagrejte 4–5 kašika blagog ajvara.",
      "Umešajte 100 ml kiselog mleka ili pavlake i kašiku vode od paste.",
      "Prelijte pastu, posolite i, ako volite, dodajte malo ljutog ajvara.",
    ],
    productSlugs: ["ajvar-blagi-700"],
  },
  {
    slug: "tortilja-sa-ajvarom",
    title: "Tortilja sa ajvarom i somborkom",
    minutes: 15,
    servings: "2 osobe",
    category: "ajvari",
    image: "/images/recipes/tortilja-ajvar.jpg",
    imageAlt: "Tortilja presečena na pola, sa ajvarom, somborkom i salatom",
    lead: "Ljuti ajvar, somborka i nešto sveže zeleno. Večera bez šerpe.",
    steps: [
      "Zagrejte tortilju na suvom tiganju.",
      "Premažite je ljutim ajvarom.",
      "Poređajte filete somborke, kriške sira i list zelene salate.",
      "Uvijte je i presećite na pola.",
    ],
    productSlugs: ["ajvar-ljuti-375", "somborka"],
  },
  {
    slug: "palacinke-sa-pekmezom",
    title: "Palačinke sa pekmezom od šljive",
    minutes: 30,
    servings: "4 osobe",
    category: "dzemovi",
    image: "/images/recipes/palacinke-sljiva.jpg",
    imageAlt: "Složene palačinke prelivene pekmezom od šljive",
    lead: "Tanke palačinke i kašika gustog pekmeza. Doručak koji miriše na ostavu.",
    steps: [
      "Smutite testo od 2 jaja, 250 ml mleka, 120 g brašna i prstohvat soli.",
      "Ispržite tanke palačinke na malo ulja.",
      "Svaku premažite pekmezom od šljive dok je još topla.",
      "Presavijte i poslužite odmah.",
    ],
    productSlugs: ["pekmez-sljiva"],
  },
  {
    slug: "zimski-caj-od-sipurka",
    title: "Zimski napitak od šipurka",
    minutes: 10,
    servings: "2 šolje",
    category: "dzemovi",
    image: "/images/recipes/caj-sipurak.jpg",
    imageAlt: "Dve šolje vrućeg napitka od šipurka, sa limunom pored prozora",
    lead: "Kašika džema od šipurka u vrućoj vodi. Kad napolju steže, ovo greje.",
    steps: [
      "Prokuvajte vodu i sipajte je u šolje.",
      "Umešajte punu kašiku džema od šipurka.",
      "Po želji dodajte krišku limuna.",
      "Sačekajte minut da se džem rastvori.",
    ],
    productSlugs: ["dzem-sipurak"],
  },
  {
    slug: "kajsija-preko-sira",
    title: "Kajsija preko mladog sira",
    minutes: 5,
    servings: "2 osobe",
    category: "dzemovi",
    image: "/images/recipes/kajsija-sir.jpg",
    imageAlt: "Mlad sir sa džemom od kajsije i orasima",
    lead: "Slatko i slano na jednom tanjiru. Džem od kajsije ne traži kuvanje.",
    steps: [
      "Izrežite mladi sir na kriške.",
      "Preko stavite kašiku džema od kajsije.",
      "Dodajte malo oraha ako ih imate.",
      "Poslužite kao doručak ili uz čaj.",
    ],
    productSlugs: ["dzem-kajsija"],
  },
  {
    slug: "borovnica-u-jogurtu",
    title: "Borovnica u jogurtu",
    minutes: 5,
    servings: "1 osoba",
    category: "sokovi",
    image: "/images/recipes/borovnica-jogurt.jpg",
    imageAlt: "Činija jogurta sa borovnicom i džemom od jagode",
    lead: "Matični sok od divlje borovnice u gustom jogurtu. Mali dezert posle ručka.",
    steps: [
      "U činiju stavite gust jogurt.",
      "Prelijte ga kašikom matičnog soka od borovnice.",
      "Ako želite slađe, dodajte kašičicu džema od jagode.",
      "Izmešajte tek toliko da ostanu šare.",
    ],
    productSlugs: ["sok-borovnica", "dzem-jagoda"],
  },
]

export type CartLine = {
  slug: string
  qty: number
}

export type QuoteLine = {
  product: Product
  qty: number
  amount: number
}

export type Quote = {
  lines: QuoteLine[]
  kinds: number
  subtotal: number
  bundle: number
  couponCode: string
  couponOff: number
  total: number
  gap: number
  progress: number
  freeShipping: boolean
}

export function quote(items: CartLine[], couponCode: string): Quote {
  const lines = items.flatMap((item) => {
    const product = getProduct(item.slug)
    if (!product) return []
    const qty = Math.min(99, Math.max(1, Math.floor(item.qty)))
    return [{ product, qty, amount: product.price * qty }]
  })
  const subtotal = lines.reduce((sum, line) => sum + line.amount, 0)
  const kinds = lines.length
  const bundle = kinds >= BUNDLE_MIN_KINDS ? Math.round(subtotal * BUNDLE_RATE) : 0
  const code = couponCode.trim().toUpperCase()
  const coupon = coupons[code]
  const couponOff = coupon ? Math.round((subtotal - bundle) * coupon.rate) : 0
  const total = Math.max(0, subtotal - bundle - couponOff)
  const gap = Math.max(0, FREE_SHIPPING_RSD - total)
  const progress = subtotal === 0 ? 0 : Math.min(1, total / FREE_SHIPPING_RSD)
  return {
    lines,
    kinds,
    subtotal,
    bundle,
    couponCode: coupon ? code : "",
    couponOff,
    total,
    gap,
    progress,
    freeShipping: total >= FREE_SHIPPING_RSD && total > 0,
  }
}

function uniqueProducts(slugs: string[], skip: Set<string>) {
  const seen = new Set<string>()
  const list: Product[] = []
  for (const slug of slugs) {
    if (skip.has(slug) || seen.has(slug)) continue
    const product = getProduct(slug)
    if (!product) continue
    seen.add(slug)
    list.push(product)
  }
  return list
}

export function oftenTogether(slugs: string[], limit = 3) {
  const skip = new Set(slugs)
  const paired = slugs.flatMap((slug) => boughtTogether[slug] ?? [])
  return uniqueProducts(paired, skip).slice(0, limit)
}

export function togetherForCategory(slug: CategorySlug, limit = 3) {
  const own = productsByCategory(slug).map((product) => product.slug)
  const skip = new Set(own)
  const paired = own.flatMap((item) => boughtTogether[item] ?? [])
  return uniqueProducts(paired, skip)
    .filter((product) => product.category !== slug)
    .slice(0, limit)
}

export function bundleSuggestion(slugs: string[]) {
  if (slugs.length < 2 || slugs.length >= BUNDLE_MIN_KINDS) return null
  const paired = oftenTogether(slugs, 1)[0]
  if (paired) return paired
  const skip = new Set(slugs)
  return products.find((product) => !skip.has(product.slug)) ?? null
}

export function gapSuggestions(gap: number, slugs: string[], limit = 3) {
  if (gap <= 0) return []
  const skip = new Set(slugs)
  return products
    .filter((product) => !skip.has(product.slug))
    .map((product) => ({
      product,
      distance: Math.abs(product.price - gap),
      closes: product.price <= gap * 1.15,
    }))
    .sort((a, b) => a.distance - b.distance)
    .slice(0, limit)
}

export function recipesForCategory(slug: CategorySlug) {
  return recipes.filter(
    (recipe) =>
      recipe.category === slug ||
      recipe.productSlugs.some((item) => getProduct(item)?.category === slug)
  )
}

export function getRecipe(slug: string) {
  return recipes.find((recipe) => recipe.slug === slug)
}

export function freshCategory(seen: CategorySlug[]) {
  if (seen.length === 0) return null
  return categories.find((category) => !seen.includes(category.slug)) ?? null
}
