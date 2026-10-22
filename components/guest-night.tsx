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
    line: "Jedno jelo, za tebe.",
    recipes: ["jaje-ljuti-ajvar-hleb", "sipurak-tonik"],
  },
  {
    id: "dvoje",
    label: "Nas dvoje",
    line: "Dva jela za vas dvoje.",
    recipes: ["somborka-krudo", "burrata-jagoda-biber"],
  },
  {
    id: "drustvo",
    label: "Društvo",
    line: "Četiri jela za ceo sto.",
    recipes: ["humus-sa-ajvarom", "ban-mi-sa-somborkom", "topli-kamember-kajsija", "sipurak-spritz"],
  },
  {
    id: "vikend",
    label: "Ceo vikend",
    line: "Četiri jela, od petka do nedelje.",
    recipes: ["kremasta-pasta-sa-ajvarom", "palacinke-sa-pekmezom", "somborka-u-citrusu", "panakota-sa-aronijom"],
  },
] as const

export function GuestNight() {
  const [active, setActive] = useState<(typeof nights)[number]["id"]>("dvoje")
  const { add } = useCart()
  const night = nights.find((item) => item.id === active) ?? nights[1]
  const recipes = night.recipes.flatMap((slug) => {
    const recipe = getRecipe(slug)
    return recipe ? [recipe] : []
  })
  const products = [
    ...new Map(
      recipes
        .flatMap((recipe) => recipe.productSlugs)
        .map((slug) => getProduct(slug))
        .filter((product) => product != null)
        .map((product) => [product.slug, product])
    ).values(),
  ]
  const total = products.reduce((sum, product) => sum + product.price, 0)

  return (
    <section className="border-y border-border bg-[#eef3f7] py-12 md:py-16">
      <Container>
        <p className="text-xs font-semibold tracking-[0.2em] text-paprika uppercase">Igra za korpu</p>
        <h2 className="mt-3 max-w-2xl text-4xl sm:text-5xl">Ko ti večeras seda za sto?</h2>
        <p className="mt-3 max-w-xl text-base leading-7 text-muted-foreground">
          Izaberi koliko vas je. Predložićemo šta da spremite. Tegle za ta jela idu u korpu.
        </p>
        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4" role="radiogroup" aria-label="Koliko vas je">
          {nights.map((item) => {
            const on = item.id === night.id
            return (
              <button
                key={item.id}
                type="button"
                role="radio"
                aria-checked={on}
                onClick={() => setActive(item.id)}
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
        <div key={night.id} className="taste-swap mt-5">
          <p className="text-lg leading-7">{night.line}</p>
          <ul className="mt-4 grid grid-cols-2 gap-3 sm:gap-4" aria-live="polite" aria-label="Predlog jela">
            {recipes.map((recipe, index) => (
              <li
                key={recipe.slug}
                className="dish-pop overflow-hidden rounded-[1.75rem] border border-border bg-card"
                style={{ animationDelay: `${index * 0.08}s` }}
              >
                <Link href={`/recepti/${recipe.slug}`} className="group block">
                  <div className="relative aspect-[4/3] bg-[#f3eadc]">
                    <Image
                      src={recipe.image}
                      alt={recipe.imageAlt}
                      fill
                      sizes="(min-width: 768px) 40vw, 50vw"
                      className="object-cover transition duration-300 group-hover:scale-[1.03]"
                    />
                  </div>
                  <h3 className="p-3 text-lg leading-tight sm:p-4 sm:text-2xl">{recipe.title}</h3>
                </Link>
              </li>
            ))}
          </ul>
          <button
            type="button"
            onClick={() => products.forEach((product) => add(product.slug))}
            className={cn(buttonVariants(), "mt-4 h-11 px-5")}
          >
            Ubaci tegle · {formatRsd(total)}
          </button>
        </div>
      </Container>
    </section>
  )
}
