"use client"

import Image from "next/image"
import Link from "next/link"
import { useState } from "react"

import { useCart } from "@/components/cart-provider"
import { Container } from "@/components/container"
import { buttonVariants } from "@/components/ui/button"
import { formatRsd, getProduct } from "@/lib/site"
import { cn } from "cn"

const moods = [
  {
    id: "blago",
    label: "Blago",
    line: "Za hleb koji nestane pre nego što se ohladi.",
    slug: "ajvar-blagi-700",
    tone: "bg-[#f6e7a8] text-ink",
  },
  {
    id: "ljuto",
    label: "Ljuto",
    line: "Uzmi ako ti je mirno već dosadilo.",
    slug: "ajvar-ljuti-700",
    tone: "bg-paprika text-white",
  },
  {
    id: "slatko",
    label: "Slatko",
    line: "Kajsija na sir. Doručak gotov, bez šerpe.",
    slug: "dzem-kajsija",
    tone: "bg-[#e7a15a] text-ink",
  },
  {
    id: "oporo",
    label: "Oporo",
    line: "Jedan gutljaj, pa ti se vrati dan.",
    slug: "sok-aronija",
    tone: "bg-[#16324a] text-white",
  },
] as const

export function TastePick() {
  const [active, setActive] = useState<(typeof moods)[number]["id"]>("blago")
  const { add, items } = useCart()
  const mood = moods.find((item) => item.id === active) ?? moods[0]
  const product = getProduct(mood.slug)
  const qty = items.find((item) => item.slug === mood.slug)?.qty ?? 0

  if (!product) return null

  return (
    <section className="py-14 md:py-20">
      <Container>
        <p className="text-xs font-semibold tracking-[0.2em] text-paprika uppercase">Jedan dodir</p>
        <h2 className="mt-3 text-4xl sm:text-5xl">Kakav ti je danas ukus?</h2>
        <div className="mt-8 grid items-center gap-6 lg:grid-cols-[.9fr_1.1fr]">
          <div className="grid grid-cols-2 gap-3" role="radiogroup" aria-label="Izbor ukusa">
            {moods.map((item) => {
              const on = item.id === mood.id
              return (
                <button
                  key={item.id}
                  type="button"
                  role="radio"
                  aria-checked={on}
                  onClick={() => setActive(item.id)}
                  className={cn(
                    "h-20 rounded-3xl border text-lg font-semibold transition",
                    on ? item.tone : "border-border bg-card hover:bg-muted"
                  )}
                >
                  {item.label}
                </button>
              )
            })}
          </div>
          <div key={mood.id} className="taste-swap flex items-center gap-4 rounded-[1.75rem] border border-border bg-card p-4 sm:gap-6 sm:p-5">
            <div className="relative size-28 shrink-0 overflow-hidden rounded-2xl bg-[#f3eadc] sm:size-36">
              <Image src={product.image} alt={product.imageAlt} fill sizes="144px" className="object-cover" />
            </div>
            <div className="min-w-0">
              <p className="text-xs font-semibold tracking-[0.16em] text-paprika uppercase">{mood.label}</p>
              <h3 className="mt-1 text-2xl sm:text-3xl">{product.name}</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                {mood.line} {product.net ? `${product.net} · ` : ""}
                {formatRsd(product.price)}
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => add(product.slug)}
                  className={cn(buttonVariants({ size: "sm" }), "h-9 px-3")}
                >
                  {qty > 0 ? `U korpi · ${qty}` : "U korpu"}
                </button>
                <Link
                  href={`/proizvodi?kategorija=${product.category}`}
                  className={cn(buttonVariants({ variant: "outline", size: "sm" }), "h-9 px-3")}
                >
                  Vidi policu
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
