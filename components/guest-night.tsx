"use client"

import Image from "next/image"
import Link from "next/link"
import { useState } from "react"

import { useCart } from "@/components/cart-provider"
import { Container } from "@/components/container"
import { buttonVariants } from "@/components/ui/button"
import { getRecipe } from "@/lib/commerce"
import { formatRsd, getProduct } from "@/lib/site"
import { cn } from "cn"

const nights = [
  {
    id: "sam",
    label: "Samo ja",
    line: "Jedan tanjir. Niko ne traži zalogaj.",
    tables: [
      [{ who: "Ti", recipe: "jaje-ljuti-ajvar-hleb", bite: "Ljuti ajvar, jaje i kvasni hleb. Večera bez društva." }],
      [{ who: "Ti", recipe: "sipurak-tonik", bite: "Jedna čaša šipurka. Ostatak večeri ostaje tih." }],
    ],
  },
  {
    id: "dvoje",
    label: "Nas dvoje",
    line: "Dva tanjira, jedan preko puta drugog.",
    tables: [
      [
        { who: "Ti", recipe: "somborka-krudo", bite: "Crvena paprika, limun, ulje. Tvoj tanjir." },
        { who: "Preko puta", recipe: "burrata-jagoda-biber", bite: "Jagoda, burrata i biber. Druga viljuška ide ovamo." },
      ],
      [
        { who: "Ti", recipe: "tikvice-feta-borovnica", bite: "Tikvica, feta i borovnica. Hladno, slano, tvoje." },
        { who: "Preko puta", recipe: "kajsija-halva-pistaci", bite: "Kajsija i halva. Taj tanjir se ne deli." },
      ],
    ],
  },
  {
    id: "drustvo",
    label: "Društvo",
    line: "Četiri mesta. Svako dobija svoje jelo.",
    tables: [
      [
        { who: "Domaćin", recipe: "humus-sa-ajvarom", bite: "Humus sa bunarom od ljutog. On maže prvi." },
        { who: "Komšija", recipe: "ban-mi-sa-somborkom", bite: "Somborka u lepinji. On ne čeka ostale." },
        { who: "Tetka", recipe: "topli-kamember-kajsija", bite: "Topli sir i kajsija. Njen tanjir, njen nož." },
        { who: "Klinac", recipe: "sipurak-spritz", bite: "Čaša šipurka sa ledom. On pije, ne jede šerpu." },
      ],
      [
        { who: "Domaćin", recipe: "karfiol-ajvar-aioli", bite: "Karfiol i ajvar aioli. Sredina stola, ali njegov zalogaj." },
        { who: "Kum", recipe: "somborka-krudo", bite: "Paprika u citrusu. On je tražio nešto što nije čorba." },
        { who: "Sa kraja", recipe: "aronija-gastric-na-cvekli", bite: "Cvekla i aronija. Ko sedne ovde, jede ovo." },
        { who: "Ko je doneo hleb", recipe: "ajvar-puter-na-kukuruzu", bite: "Kukuruz i ljuti puter. On deli klipove." },
      ],
    ],
  },
  {
    id: "vikend",
    label: "Ceo vikend",
    line: "Isti sto, četiri obroka. Svako jede u svoje vreme.",
    tables: [
      [
        { who: "Ti, petak uveče", recipe: "kremasta-pasta-sa-ajvarom", bite: "Pasta i blagi ajvar. Prva večera je tvoja." },
        { who: "On, subota ujutru", recipe: "palacinke-sa-pekmezom", bite: "Palačinke i šljiva. On ustaje pre tebe." },
        { who: "Gost, subota", recipe: "somborka-u-citrusu", bite: "Somborka u citrusu. Gost jede ovo, ne ostatke." },
        { who: "Svi, nedelja", recipe: "panakota-sa-aronijom", bite: "Panakota i aronija. Poslednji tanjir deli se na odlasku." },
      ],
      [
        { who: "Ti, petak", recipe: "tortilja-sa-ajvarom", bite: "Tortilja, ljuti i somborka. Petak bez šerpe." },
        { who: "Ona, subota", recipe: "kajsija-preko-sira", bite: "Mlad sir i kajsija. Njen doručak, tvoja kafa." },
        { who: "Komšija, uveče", recipe: "labneh-sa-ajvarom", bite: "Labneh i blagi ajvar. On seda kasno." },
        { who: "Ko ostane, nedelja", recipe: "gazpacho-od-jagode", bite: "Hladna jagoda u čaši. Ko ostane, pije ovo." },
      ],
    ],
  },
] as const

export function GuestNight() {
  const [active, setActive] = useState<(typeof nights)[number]["id"]>("dvoje")
  const [round, setRound] = useState(0)
  const { add } = useCart()
  const night = nights.find((item) => item.id === active) ?? nights[1]
  const table = night.tables[round % night.tables.length]
  const seats = table.flatMap((seat) => {
    const recipe = getRecipe(seat.recipe)
    return recipe ? [{ who: seat.who, bite: seat.bite, recipe }] : []
  })
  const products = [
    ...new Map(
      seats
        .flatMap((seat) => seat.recipe.productSlugs)
        .map((slug) => getProduct(slug))
        .filter((product) => product != null)
        .map((product) => [product.slug, product])
    ).values(),
  ]
  const total = products.reduce((sum, product) => sum + product.price, 0)

  function choose(id: (typeof nights)[number]["id"]) {
    if (id === active) {
      setRound((current) => current + 1)
      return
    }
    setActive(id)
    setRound(0)
  }

  return (
    <section className="border-y border-border bg-[#eef3f7] py-12 md:py-16">
      <Container>
        <p className="text-xs font-semibold tracking-[0.2em] text-paprika uppercase">Igra za korpu</p>
        <h2 className="mt-3 max-w-2xl text-4xl sm:text-5xl">Ko ti večeras seda za sto?</h2>
        <p className="mt-3 max-w-xl text-base leading-7 text-muted-foreground">
          Izaberi društvo. Izbacimo jela iz recepata i kažemo ko šta jede. Klik na isto društvo
          menja sto. Tegle za ta jela idu u korpu.
        </p>
        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4" role="radiogroup" aria-label="Ko seda za sto">
          {nights.map((item) => {
            const on = item.id === night.id
            return (
              <button
                key={item.id}
                type="button"
                role="radio"
                aria-checked={on}
                onClick={() => choose(item.id)}
                className={cn(
                  "h-16 rounded-3xl border text-lg font-semibold",
                  on ? "border-transparent bg-[#16324a] text-white" : "border-border bg-card hover:bg-muted"
                )}
              >
                {item.label}
              </button>
            )
          })}
        </div>
        <div key={`${night.id}-${round}`} className="taste-swap mt-4">
          <p className="text-lg leading-7">{night.line}</p>
          <ul
            className={cn(
              "mt-4 grid gap-3",
              seats.length > 1 && "sm:grid-cols-2",
              seats.length > 2 && "lg:grid-cols-4"
            )}
            aria-live="polite"
            aria-label="Ko šta jede"
          >
            {seats.map((seat, index) => (
              <li
                key={seat.who}
                className="dish-pop overflow-hidden rounded-[1.75rem] border border-border bg-card"
                style={{ animationDelay: `${index * 0.08}s` }}
              >
                <Link href={`/recepti/${seat.recipe.slug}`} className="group block">
                  <div className="relative aspect-[4/3] bg-[#f3eadc]">
                    <Image
                      src={seat.recipe.image}
                      alt={seat.recipe.imageAlt}
                      fill
                      sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover transition duration-300 group-hover:scale-[1.03]"
                    />
                    <span className="absolute top-3 left-3 rounded-full bg-white/95 px-3 py-1 text-sm font-semibold text-ink shadow-sm">
                      {seat.who}
                    </span>
                  </div>
                  <div className="p-4">
                    <p className="text-xs font-semibold tracking-[0.16em] text-paprika uppercase">Jede</p>
                    <h3 className="mt-1 text-2xl">{seat.recipe.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">{seat.bite}</p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-4 flex flex-col gap-4 rounded-[1.75rem] border border-border bg-card p-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm leading-6 text-muted-foreground">
              Za ovaj sto:{" "}
              {products
                .map((product) => (product.net ? `${product.name} ${product.net}` : product.name))
                .join(", ")}
              .
            </p>
            <button
              type="button"
              onClick={() => products.forEach((product) => add(product.slug))}
              className={cn(buttonVariants(), "h-11 shrink-0 px-5")}
            >
              Ubaci tegle za ovaj sto · {formatRsd(total)}
            </button>
          </div>
        </div>
      </Container>
    </section>
  )
}
