"use client"

import Image from "next/image"
import Link from "next/link"

import { useCart } from "@/components/cart-provider"
import { useSeen } from "@/components/seen"
import { useQuote } from "@/components/use-quote"
import { buttonVariants } from "@/components/ui/button"
import {
  BUNDLE_RATE,
  bundleSuggestion,
  freshCategory,
  gapSuggestions,
  oftenTogether,
  recipesForCategory,
  togetherForCategory,
  type Recipe,
} from "@/lib/commerce"
import { formatRsd, productsByCategory, type CategorySlug, type Product } from "@/lib/site"
import { cn } from "cn"

export function BuyProducts({
  slugs,
  label,
  className,
}: {
  slugs: string[]
  label: string
  className?: string
}) {
  const { add } = useCart()
  return (
    <button
      type="button"
      className={cn(buttonVariants(), "h-11 px-4", className)}
      onClick={() => slugs.forEach((slug) => add(slug))}
    >
      {label}
    </button>
  )
}

function MiniProduct({
  product,
  note,
  action,
}: {
  product: Product
  note?: string
  action: string
}) {
  const { add } = useCart()
  return (
    <li className="flex items-center gap-3 rounded-2xl border border-border bg-card p-2.5">
      <div className="relative size-16 shrink-0 overflow-hidden rounded-xl bg-[#f3eadc]">
        <Image src={product.image} alt="" fill sizes="64px" className="object-cover" />
      </div>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium">{product.name}</p>
        <p className="text-xs text-muted-foreground">
          {product.net ? `${product.net} · ` : ""}
          {formatRsd(product.price)}
        </p>
        {note ? <p className="mt-0.5 text-xs text-paprika">{note}</p> : null}
      </div>
      <button
        type="button"
        className={cn(buttonVariants({ size: "sm" }), "h-9 shrink-0 px-3")}
        onClick={() => add(product.slug)}
      >
        {action}
      </button>
    </li>
  )
}

export function OftenTogether({
  slugs,
  category,
}: {
  slugs?: string[]
  category?: CategorySlug
}) {
  const picks = category ? togetherForCategory(category) : oftenTogether(slugs ?? [])
  if (picks.length === 0) return null

  return (
    <section className="mt-10" aria-labelledby="zajedno">
      <h2 id="zajedno" className="text-3xl sm:text-4xl">
        Kupci često biraju zajedno
      </h2>
      <p className="mt-2 max-w-xl text-sm leading-6 text-muted-foreground">
        Parovi nisu slučajni: ajvar voli somborku, džem voli sir, sok voli jogurt.
      </p>
      <ul className="mt-4 grid gap-2 sm:grid-cols-2">
        {picks.map((product) => (
          <MiniProduct key={product.slug} product={product} action="Dodaj" />
        ))}
      </ul>
    </section>
  )
}

export function CookingToday({ category }: { category: CategorySlug }) {
  const list = recipesForCategory(category).slice(0, 2)
  if (list.length === 0) return null

  return (
    <section className="mt-12" aria-labelledby="sprema">
      <p className="text-xs font-semibold tracking-[0.18em] text-paprika uppercase">Iz ostave na sto</p>
      <h2 id="sprema" className="mt-2 text-3xl sm:text-4xl">
        Šta danas spremamo?
      </h2>
      <ul className="mt-4 grid gap-3 lg:grid-cols-2">
        {list.map((recipe) => (
          <RecipeOffer key={recipe.slug} recipe={recipe} />
        ))}
      </ul>
    </section>
  )
}

function RecipeOffer({ recipe }: { recipe: Recipe }) {
  return (
    <li className="overflow-hidden rounded-2xl border border-border bg-card">
      <div className="relative aspect-[4/3] bg-[#f3eadc]">
        <Image src={recipe.image} alt={recipe.imageAlt} fill sizes="(min-width: 1024px) 40vw, 100vw" className="object-cover" />
      </div>
      <div className="p-4">
        <h3 className="text-2xl">{recipe.title}</h3>
        <p className="mt-1 text-sm leading-6 text-muted-foreground">{recipe.lead}</p>
        <div className="mt-3 flex flex-wrap gap-2">
          <BuyProducts slugs={recipe.productSlugs} label="Stavi u korpu" className="h-9" />
          <Link
            href={`/recepti/${recipe.slug}`}
            className={cn(buttonVariants({ variant: "outline" }), "h-9 px-3")}
          >
            Recept
          </Link>
        </div>
      </div>
    </li>
  )
}

export function DiscoverNew() {
  const seen = useSeen()
  const category = freshCategory(seen)
  if (!category) return null
  const product = productsByCategory(category.slug)[0]
  if (!product) return null

  return (
    <section className="mt-12 rounded-3xl border border-border bg-[#eef3f7] p-5 sm:p-6" aria-labelledby="novo">
      <p className="text-xs font-semibold tracking-[0.18em] text-[#1c3144] uppercase">Još niste svratili</p>
      <h2 id="novo" className="mt-2 text-3xl">
        Otkrij nešto novo
      </h2>
      <p className="mt-2 max-w-xl text-sm leading-6 text-muted-foreground">
        Razgledali ste {seen.length === 1 ? "jednu policu" : "samo deo ostave"}. {category.title} vam još nisu bili na redu.
      </p>
      <ul className="mt-4 max-w-xl">
        <MiniProduct product={product} action="Dodaj" note={category.title} />
      </ul>
      <Link href={`/${category.slug}`} className="mt-3 inline-block text-sm font-semibold text-paprika">
        Otvori {category.title.toLowerCase()}
      </Link>
    </section>
  )
}

export function BundleOffer() {
  const { items } = useCart()
  const slugs = items.map((item) => item.slug)
  const pick = bundleSuggestion(slugs)
  if (!pick) return null

  return (
    <section className="mt-8 rounded-3xl border border-[#e2b227]/70 bg-[#fff8e4] p-4" aria-labelledby="paket">
      <h2 id="paket" className="text-2xl">
        Upotpuni svoj paket
      </h2>
      <p className="mt-1 text-sm leading-6 text-muted-foreground">
        Dva proizvoda su u korpi. Dodajte treći i ceo komplet je {Math.round(BUNDLE_RATE * 100)}% povoljniji.
      </p>
      <ul className="mt-3">
        <MiniProduct product={pick} action="Dodaj" note="Deo paketa" />
      </ul>
    </section>
  )
}

export function GapOffer() {
  const { items } = useCart()
  const quoted = useQuote()
  if (quoted.freeShipping || quoted.lines.length === 0) return null
  const picks = gapSuggestions(
    quoted.gap,
    items.map((item) => item.slug)
  )
  if (picks.length === 0) return null

  return (
    <section className="mt-8" aria-labelledby="prag">
      <h2 id="prag" className="text-2xl">
        Još malo do besplatne dostave
      </h2>
      <p className="mt-1 text-sm leading-6 text-muted-foreground">
        Fali {formatRsd(quoted.gap)}. Ovo su tegle najbliže toj razlici.
      </p>
      <ul className="mt-3 grid gap-2">
        {picks.map(({ product }) => (
          <MiniProduct key={product.slug} product={product} action="Dodaj" />
        ))}
      </ul>
    </section>
  )
}
