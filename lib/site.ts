export const site = {
  name: "BraNo Gusto",
  tagline: "domaći ukusi",
  description:
    "Blagi i ljuti ajvar, džemovi, sokovi, somborka i zimnica. Složi tegle pre nego što zima stigne.",
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
  { href: "/pitanja", label: "Najčešća pitanja" },
  { href: "/kontakt", label: "Kontakt" },
] as const

export type CategorySlug = "ajvari" | "dzemovi" | "sokovi" | "somborka" | "zimnica"

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
    eyebrow: "Od njive do kašike",
    description: "Blagi za hleb, ljuti za one koji ne mere. 375 da probaš, 700 da ostava ne ostane kratka.",
    image: "/images/products/ajvar-ljuti-700.jpg",
    imageAlt: "Tegla ljutog BraNo Gusto ajvara od 700 g",
    scene: "/images/life/terasa.jpg",
    sceneAlt: "Blagi i ljuti ajvar na kamenoj terasi, među paprikama",
  },
  {
    slug: "dzemovi",
    title: "Džemovi",
    eyebrow: "Voće koje je stalo",
    description: "Šipurak, šljiva, jagoda, kajsija. Uzmi voće dok je još u staklu, ne na priči.",
    image: "/images/products/dzem-kajsija-700.jpg",
    imageAlt: "Tegla BraNo Gusto džema od kajsije, 700 g",
    scene: "/images/life/sipurak.jpg",
    sceneAlt: "Džem od šipurka i ajvar na klupi u voćnjaku",
  },
  {
    slug: "sokovi",
    title: "Sokovi",
    eyebrow: "Gutljaj, ne sok",
    description: "Aronija, divlja borovnica i sok od paradajza. Gutljaj koji se ne traži pored kase.",
    image: "/images/products/sok-borovnica-05.jpg",
    imageAlt: "Flašica matičnog soka od divlje borovnice BraNo Gusto, 0,5 l",
    scene: "/images/life/sok-paradajz.jpg",
    sceneAlt: "Flaša soka od paradajza među paradajzom u bašti",
  },
  {
    slug: "somborka",
    title: "Somborka",
    eyebrow: "Filet iz letnje njive",
    description: "Pasterizovani fileti. Otvori, stavi u hleb, sendvič više nije običan.",
    image: "/images/products/somborka-680.jpg",
    imageAlt: "Tegla BraNo Gusto paprike somborke, pasterizovani fileti, 680 g",
    scene: "/images/life/somborka-basta.jpg",
    sceneAlt: "Tegla somborke među žutom i narandžastom paprikom",
  },
  {
    slug: "zimnica",
    title: "Zimnica",
    eyebrow: "Iz bašte u teglu",
    description: "Cvekla, kornišoni, fileti i peckana paprika. Tegle koje ostava traži pored ajvara.",
    image: "/images/products/cvekla-barena.jpg",
    imageAlt: "Tegla barene cvekle BraNo Gusto, 680 g",
    scene: "/images/life/cvekla.jpg",
    sceneAlt: "Tegla barene cvekle među cveklom u bašti",
  },
]

export const products: Product[] = [
  {
    slug: "ajvar-blagi-700",
    name: "Ajvar blagi",
    category: "ajvari",
    net: "700 g",
    price: 990,
    description: "Pečena paprika bez vatre. Tegla koja nestane na hlebu.",
    image: "/images/products/ajvar-blagi-700.jpg",
    imageAlt: "Tegla blagog BraNo Gusto ajvara, 700 g",
  },
  {
    slug: "ajvar-blagi-375",
    name: "Ajvar blagi",
    category: "ajvari",
    net: "375 g",
    price: 590,
    description: "Mala, da probaš. Velika te čeka čim se ova isprazni.",
    image: "/images/products/ajvar-blagi-375.jpg",
    imageAlt: "Tegla blagog BraNo Gusto ajvara, 375 g",
  },
  {
    slug: "ajvar-ljuti-700",
    name: "Ajvar ljuti",
    category: "ajvari",
    net: "700 g",
    price: 1050,
    description: "Ista paprika, samo što ovde ne ostaje mirno.",
    image: "/images/products/ajvar-ljuti-700.jpg",
    imageAlt: "Tegla ljutog BraNo Gusto ajvara, 700 g",
  },
  {
    slug: "ajvar-ljuti-375",
    name: "Ajvar ljuti",
    category: "ajvari",
    net: "375 g",
    price: 640,
    description: "Mala tegla da vidiš da li ti ljuto leži — pa se vraćaš po veliku.",
    image: "/images/products/ajvar-ljuti-375.jpg",
    imageAlt: "Tegla ljutog BraNo Gusto ajvara, 375 g",
  },
  {
    slug: "dzem-sipurak",
    name: "Džem od šipurka",
    category: "dzemovi",
    net: "700 g",
    price: 890,
    description: "Taman i kiseo. Za šolju kad prozor pobeli.",
    image: "/images/products/dzem-sipurak-700.jpg",
    imageAlt: "Tegla BraNo Gusto džema od šipurka, 700 g",
  },
  {
    slug: "pekmez-sljiva",
    name: "Pekmez od šljive",
    category: "dzemovi",
    net: "700 g",
    price: 820,
    description: "Gust pekmez. Palačinka nema šta više da čeka.",
    image: "/images/products/dzem-sljiva-700.jpg",
    imageAlt: "Tegla BraNo Gusto pekmeza od šljive, 700 g",
  },
  {
    slug: "dzem-jagoda",
    name: "Džem od jagode",
    category: "dzemovi",
    price: 860,
    description: "Leto u tegli. Maže se dok je hleb još topao.",
    image: "/images/products/dzem-jagoda.jpg",
    imageAlt: "Tegla BraNo Gusto džema od jagode",
  },
  {
    slug: "dzem-kajsija",
    name: "Džem od kajsije",
    category: "dzemovi",
    net: "700 g",
    price: 900,
    description: "Preko sira, bez kuvanja. Doručak rešen jednom kašikom.",
    image: "/images/products/dzem-kajsija-700.jpg",
    imageAlt: "Tegla BraNo Gusto džema od kajsije, 700 g",
  },
  {
    slug: "sok-aronija",
    name: "Matični sok od aronije",
    category: "sokovi",
    price: 740,
    description: "Opor gutljaj. Budi bolje od izgovora da nemaš ništa.",
    image: "/images/products/sok-aronija.jpg",
    imageAlt: "Flašica matičnog soka od aronije BraNo Gusto",
  },
  {
    slug: "sok-borovnica",
    name: "Matični sok od divlje borovnice",
    category: "sokovi",
    net: "0,5 l",
    price: 980,
    description: "Pola litra divlje borovnice. U jogurt, u vodu, u čašu.",
    image: "/images/products/sok-borovnica-05.jpg",
    imageAlt: "Flašica matičnog soka od divlje borovnice BraNo Gusto, 0,5 l",
  },
  {
    slug: "somborka",
    name: "Paprika somborka",
    category: "somborka",
    net: "680 g",
    price: 720,
    description: "Žuti i narandžasti fileti, 680 g. Sendvič koji više nije običan.",
    image: "/images/products/somborka-680.jpg",
    imageAlt: "Tegla BraNo Gusto paprike somborke, pasterizovani fileti, 680 g",
  },
  {
    slug: "paprika-fileti",
    name: "Paprika fileti",
    category: "zimnica",
    net: "680 g",
    price: 740,
    description: "Crveni fileti, 680 g. U hleb, na sir, bez kuvanja.",
    image: "/images/products/paprika-fileti.jpg",
    imageAlt: "Tegla BraNo Gusto fileta crvene paprike, 680 g",
  },
  {
    slug: "peckana-paprika",
    name: "Peckana paprika ljuta",
    category: "zimnica",
    net: "680 g",
    price: 820,
    description: "Ljuta, 680 g. Pečena paprika koja ne ostaje mirna.",
    image: "/images/products/peckana-paprika.jpg",
    imageAlt: "Tegla ljute peckane paprike BraNo Gusto, 680 g",
  },
  {
    slug: "cvekla-barena",
    name: "Cvekla barena",
    category: "zimnica",
    net: "680 g",
    price: 690,
    description: "Barena, 680 g. Salata koja ne traži šerpu.",
    image: "/images/products/cvekla-barena.jpg",
    imageAlt: "Tegla barene cvekle BraNo Gusto, 680 g",
  },
  {
    slug: "kornisoni-i",
    name: "Kornišoni I klasa",
    category: "zimnica",
    net: "680 g",
    price: 760,
    description: "I klasa, 680 g. Sitni krastavčići za tanjir koji se meri.",
    image: "/images/products/kornisoni-i.jpg",
    imageAlt: "Tegla kornišona I klase BraNo Gusto, 680 g",
  },
  {
    slug: "kornisoni-ii",
    name: "Kornišoni II klasa",
    category: "zimnica",
    net: "680 g",
    price: 640,
    description: "II klasa, 680 g. Ista tegla, malo slobodniji krastavac.",
    image: "/images/products/kornisoni-ii.jpg",
    imageAlt: "Tegla kornišona II klase BraNo Gusto, 680 g",
  },
  {
    slug: "sok-paradajz",
    name: "Sok od paradajza",
    category: "sokovi",
    net: "1 l",
    price: 690,
    description: "Litar domaćeg soka. U čašu, bez razvodnjavanja.",
    image: "/images/products/sok-paradajz.jpg",
    imageAlt: "Flaša domaćeg soka od paradajza BraNo Gusto, 1 l",
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
