export const site = {
  name: "BraNo Gusto",
  tagline: "domaći ukusi",
  description:
    "BraNo Gusto donosi pažljivo spremljene domaće proizvode: ajvar, džemove, matične sokove i papriku somborku.",
  url: "https://www.branogusto.rs",
  phoneDisplay: "062 820 70 69",
  phoneHref: "tel:+381628207069",
  phoneSchema: "+381628207069",
  smsHref: "sms:+381628207069",
  whatsappHref: "https://wa.me/381628207069",
  viberHref: "viber://chat?number=+381628207069",
  email: "info@branogusto.rs",
  instagram: "https://www.instagram.com/branogusto/",
  instagramHandle: "@branogusto",
  region: "Srbija",
} as const

export const nav = [
  { href: "/", label: "Početna" },
  { href: "/proizvodi", label: "Prodavnica" },
  { href: "/recepti", label: "Recepti" },
  { href: "/kontakt", label: "Kontakt" },
] as const

export type CategorySlug = "ajvari" | "dzemovi" | "sokovi" | "somborka"

export type Category = {
  slug: CategorySlug
  title: string
  eyebrow: string
  description: string
  image: string
  imageAlt: string
  scene?: string
  sceneAlt?: string
}

export type Product = {
  slug: string
  name: string
  category: CategorySlug
  description: string
  image: string
  imageAlt: string
  net?: string
  price: number
}

export const categories: Category[] = [
  {
    slug: "ajvari",
    title: "Ajvari",
    eyebrow: "Domaći specijalitet",
    description: "Blagi i ljuti ajvar, u teglama od 375 g i 700 g.",
    image: "/images/products/ajvar-ljuti-700.jpg",
    imageAlt: "Tegla ljutog BraNo Gusto ajvara od 700 g",
    scene: "/images/life/terasa.jpg",
    sceneAlt: "Blagi i ljuti ajvar na kamenoj terasi, među paprikama",
  },
  {
    slug: "dzemovi",
    title: "Džemovi",
    eyebrow: "Voćni ukusi",
    description: "Džemovi od šipurka, šljive, jagode i kajsije.",
    image: "/images/products/dzem-kajsija-700.jpg",
    imageAlt: "Tegla BraNo Gusto džema od kajsije, 700 g",
    scene: "/images/life/sipurak.jpg",
    sceneAlt: "Džem od šipurka i ajvar na klupi u voćnjaku",
  },
  {
    slug: "sokovi",
    title: "Sokovi",
    eyebrow: "Prirodno osveženje",
    description: "Matični sokovi od aronije i divlje borovnice.",
    image: "/images/products/sok-borovnica-05.jpg",
    imageAlt: "Flašica matičnog soka od divlje borovnice BraNo Gusto, 0,5 l",
  },
  {
    slug: "somborka",
    title: "Somborka",
    eyebrow: "Pasterizovani fileti",
    description: "Paprika somborka u filetima, pasterizovana po tradicionalnoj pripremi.",
    image: "/images/products/somborka.jpg",
    imageAlt: "Tegla BraNo Gusto paprike somborke, pasterizovani fileti, 680 g",
    scene: "/images/life/njiva.jpg",
    sceneAlt: "Ajvar blagi, ljuti i somborka na sanduku u paprici",
  },
]

export const products: Product[] = [
  {
    slug: "ajvar-blagi-700",
    name: "Ajvar blagi",
    category: "ajvari",
    net: "700 g",
    price: 990,
    description: "Pun ukus pečene paprike, u blažoj varijanti.",
    image: "/images/products/ajvar-blagi-700.jpg",
    imageAlt: "Tegla blagog BraNo Gusto ajvara, 700 g",
  },
  {
    slug: "ajvar-blagi-375",
    name: "Ajvar blagi",
    category: "ajvari",
    net: "375 g",
    price: 590,
    description: "Ista blaga varijanta, u manjoj tegli.",
    image: "/images/products/ajvar-blagi-375.jpg",
    imageAlt: "Tegla blagog BraNo Gusto ajvara, 375 g",
  },
  {
    slug: "ajvar-ljuti-700",
    name: "Ajvar ljuti",
    category: "ajvari",
    net: "700 g",
    price: 1050,
    description: "Domaći ajvar za ljubitelje intenzivnijeg ukusa.",
    image: "/images/products/ajvar-ljuti-700.jpg",
    imageAlt: "Tegla ljutog BraNo Gusto ajvara, 700 g",
  },
  {
    slug: "ajvar-ljuti-375",
    name: "Ajvar ljuti",
    category: "ajvari",
    net: "375 g",
    price: 640,
    description: "Ljuta varijanta u manjoj tegli.",
    image: "/images/products/ajvar-ljuti-375.jpg",
    imageAlt: "Tegla ljutog BraNo Gusto ajvara, 375 g",
  },
  {
    slug: "dzem-sipurak",
    name: "Džem od šipurka",
    category: "dzemovi",
    net: "700 g",
    price: 890,
    description: "Tradicionalni voćni namaz punog ukusa.",
    image: "/images/products/dzem-sipurak-700.jpg",
    imageAlt: "Tegla BraNo Gusto džema od šipurka, 700 g",
  },
  {
    slug: "pekmez-sljiva",
    name: "Pekmez od šljive",
    category: "dzemovi",
    net: "700 g",
    price: 820,
    description: "Klasičan domaći pekmez od šljive.",
    image: "/images/products/dzem-sljiva-700.jpg",
    imageAlt: "Tegla BraNo Gusto pekmeza od šljive, 700 g",
  },
  {
    slug: "dzem-jagoda",
    name: "Džem od jagode",
    category: "dzemovi",
    price: 860,
    description: "Prepoznatljiv ukus zrele jagode.",
    image: "/images/products/dzem-jagoda.jpg",
    imageAlt: "Tegla BraNo Gusto džema od jagode",
  },
  {
    slug: "dzem-kajsija",
    name: "Džem od kajsije",
    category: "dzemovi",
    net: "700 g",
    price: 900,
    description: "Nežan i aromatičan džem od kajsije.",
    image: "/images/products/dzem-kajsija-700.jpg",
    imageAlt: "Tegla BraNo Gusto džema od kajsije, 700 g",
  },
  {
    slug: "sok-aronija",
    name: "Matični sok od aronije",
    category: "sokovi",
    price: 740,
    description: "Prirodni matični sok od aronije.",
    image: "/images/products/sok-aronija.jpg",
    imageAlt: "Flašica matičnog soka od aronije BraNo Gusto",
  },
  {
    slug: "sok-borovnica",
    name: "Matični sok od divlje borovnice",
    category: "sokovi",
    net: "0,5 l",
    price: 980,
    description: "Prirodni matični sok od divlje borovnice.",
    image: "/images/products/sok-borovnica-05.jpg",
    imageAlt: "Flašica matičnog soka od divlje borovnice BraNo Gusto, 0,5 l",
  },
  {
    slug: "somborka",
    name: "Paprika somborka",
    category: "somborka",
    net: "680 g",
    price: 720,
    description: "Pasterizovani fileti. Neto plod 380 g.",
    image: "/images/products/somborka.jpg",
    imageAlt: "Tegla BraNo Gusto paprike somborke, pasterizovani fileti, 680 g",
  },
]

export function getCategory(slug: CategorySlug) {
  const category = categories.find((item) => item.slug === slug)
  if (!category) {
    throw new Error(`Nepoznata kategorija: ${slug}`)
  }
  return category
}

export function productsByCategory(slug: CategorySlug) {
  return products.filter((product) => product.category === slug)
}

export function categoryTitle(slug: CategorySlug) {
  return getCategory(slug).title
}

export function getProduct(slug: string) {
  return products.find((product) => product.slug === slug)
}

export function formatRsd(value: number) {
  return `${new Intl.NumberFormat("sr-RS", { maximumFractionDigits: 0 }).format(value)}\u00a0RSD`
}
