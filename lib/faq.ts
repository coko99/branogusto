import { FREE_SHIPPING_RSD, packs } from "@/lib/commerce"
import { formatRsd, site } from "@/lib/site"

export type FaqPiece = string | { label: string; href: string }

export type FaqItem = {
  id: string
  question: string
  answer: FaqPiece[]
}

function joinSr(items: readonly string[]) {
  if (items.length <= 1) return items[0] ?? ""
  return `${items.slice(0, -1).join(", ")} i ${items[items.length - 1]}`
}

const packNames = joinSr(packs.map((pack) => pack.name))

export const faqs: FaqItem[] = [
  {
    id: "narudzba",
    question: "Kako naručujem?",
    answer: [
      "Složi ",
      { label: "korpu", href: "/korpa" },
      ". Na kraju ostane spisak. Slanje sa sajta još nije uključeno, pa porudžbinu ne šaljemo sami. Pozovi ",
      { label: site.phoneDisplay, href: site.phoneHref },
      " i pročitaj spisak, tako je potvrđujemo. Može i na ",
      { label: site.email, href: `mailto:${site.email}` },
      ". Forma na ",
      { label: "Kontaktu", href: "/kontakt" },
      " otvara tvoj program za poštu.",
    ],
  },
  {
    id: "dostava",
    question: "Kuda stiže tegla?",
    answer: [
      "Poštom, na adresu u Srbiji. Ili je preuzimaš lično u Kruševcu ili Beogradu. Ulicu magacina ne pišemo. Tačku preuzimanja kažemo kad potvrdimo porudžbinu.",
    ],
  },
  {
    id: "postarina",
    question: "Kad poštarina ćuti?",
    answer: [
      `Kad je iznos posle popusta najmanje ${formatRsd(FREE_SHIPPING_RSD)}. Traka iznad broji do toga. Ispod praga cenu dostave kažemo uz potvrdu. Na sajtu je ne naplaćujemo unapred.`,
    ],
  },
  {
    id: "popust",
    question: "Šta skida cenu?",
    answer: [
      "Tri različita proizvoda u korpi skidaju 8% na ceo zbir. Kupon ZIMNICA10 skida još 10% sa iznosa posle tih 8%. Važi jedan kupon. Besplatna dostava gleda iznos posle oba popusta.",
    ],
  },
  {
    id: "paketi",
    question: "Šta su paketi?",
    answer: [
      `${packNames}. Već složene tegle, jedan klik u korpu. Cena je zbir tegli u paketu. Ako u korpi imaš tri različite, onih 8% i dalje važi. Stoje u `,
      { label: "prodavnici", href: "/proizvodi#paketi" },
      ".",
    ],
  },
  {
    id: "asortiman",
    question: "Šta je u ponudi?",
    answer: [
      "Blagi i ljuti ajvar, 375 g i 700 g. Džem od šipurka, pekmez od šljive, džem od jagode i džem od kajsije. Matični sok od aronije i divlje borovnice, borovnica je 0,5 l, sok od paradajza je 1 l. Somborka, paprika fileti, peckana paprika, cvekla i kornišoni su tegle od 680 g. Cena na kartici je za jednu teglu ili flašu, u dinarima.",
    ],
  },
  {
    id: "placanje",
    question: "Da li se na sajtu plaća?",
    answer: [
      "Ne. Korpa ne skida novac i ne šalje porudžbinu. Spisak potvrđujemo pozivom na ",
      { label: site.phoneDisplay, href: site.phoneHref },
      ".",
    ],
  },
  {
    id: "osteceno",
    question: "Šta ako tegla stigne oštećena?",
    answer: [
      "Javi se na ",
      { label: site.email, href: `mailto:${site.email}` },
      " ili ",
      { label: site.phoneDisplay, href: site.phoneHref },
      ". Rokove iz propisa o zaštiti potrošača poštujemo. Sve piše u ",
      { label: "uslovima naručivanja", href: "/uslovi-narudzine" },
      ".",
    ],
  },
  {
    id: "podaci",
    question: "Gde ostaju moji podaci?",
    answer: [
      "U tvom pregledaču. Korpa i kupon ne idu na server dok slanje nije uključeno. Ime, telefon i adresa služe da pošaljemo teglu ili da se nađemo na preuzimanju. Ne prodajemo ih. Saglasnost povlačiš mejlom ili pozivom. Više piše u ",
      { label: "politici privatnosti", href: "/politika-privatnosti" },
      ".",
    ],
  },
  {
    id: "inostranstvo",
    question: "Šaljete li van Srbije?",
    answer: [
      "Ne. Pošta ide na adresu u Srbiji. Lično preuzimanje je Kruševac ili Beograd.",
    ],
  },
  {
    id: "recepti",
    question: "Ne znam šta da spremim.",
    answer: [
      "Na početnoj izaberi ",
      { label: "koliko vas je za sto", href: "/#sto" },
      ". Predložićemo jela iz asortimana. Tegle za ta jela mogu u korpu. Cela lista je na strani ",
      { label: "Recepti", href: "/recepti" },
      ".",
    ],
  },
]

export function faqPlain(answer: FaqPiece[]) {
  return answer.map((piece) => (typeof piece === "string" ? piece : piece.label)).join("")
}
