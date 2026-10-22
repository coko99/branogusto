"use client"

import Image from "next/image"
import { useState } from "react"

import { useCart } from "@/components/cart-provider"
import { Container } from "@/components/container"
import { buttonVariants } from "@/components/ui/button"
import { formatRsd, getProduct } from "@/lib/site"
import { cn } from "cn"

const nights = [
  {
    id: "sam",
    label: "Samo ja",
    line: "Jedna mala tegla. Hleb nestane pre nje.",
    slugs: ["ajvar-blagi-375"],
  },
  {
    id: "dvoje",
    label: "Nas dvoje",
    line: "Blagi za večeras, kajsija za sutra ujutru.",
    slugs: ["ajvar-blagi-700", "dzem-kajsija"],
  },
  {
    id: "drustvo",
    label: "Društvo",
    line: "Ljuti na sredinu stola, somborka u sendvič.",
    slugs: ["ajvar-ljuti-700", "somborka"],
  },
  {
    id: "vikend",
    label: "Ceo vikend",
    line: "Oba ajvara i šipurak. Zima može da kuca.",
    slugs: ["ajvar-blagi-700", "ajvar-ljuti-700", "dzem-sipurak"],
  },
] as const

export function GuestNight() {
  const [active, setActive] = useState<(typeof nights)[number]["id"]>("dvoje")
  const { add } = useCart()
  const night = nights.find((item) => item.id === active) ?? nights[1]
  const products = night.slugs.map((slug) => getProduct(slug)).filter((item) => item != null)
  const total = products.reduce((sum, product) => sum + product.price, 0)

  return (
    <section className="border-y border-border bg-[#eef3f7] py-12 md:py-16">
      <Container>
        <p className="text-xs font-semibold tracking-[0.2em] text-paprika uppercase">Igra za korpu</p>
        <h2 className="mt-3 max-w-2xl text-4xl sm:text-5xl">Ko ti večeras seda za sto?</h2>
        <p className="mt-3 max-w-xl text-base leading-7 text-muted-foreground">
          Izaberi društvo. Mi složimo tegle. Ti samo pritisneš da uđu u korpu.
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
        <div key={night.id} className="taste-swap mt-4 rounded-[1.75rem] border border-border bg-card p-4 sm:p-5">
          <p className="text-lg leading-7">{night.line}</p>
          <ul className="mt-4 grid gap-3 sm:grid-cols-3">
            {products.map((product) => (
              <li key={product.slug} className="flex items-center gap-3">
                <div className="relative size-16 shrink-0 overflow-hidden rounded-2xl bg-[#f3eadc]">
                  <Image src={product.image} alt="" fill sizes="64px" className="object-cover" />
                </div>
                <div className="min-w-0">
                  <p className="truncate font-medium">{product.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {product.net ? `${product.net} · ` : ""}
                    {formatRsd(product.price)}
                  </p>
                </div>
              </li>
            ))}
          </ul>
          <button
            type="button"
            onClick={() => products.forEach((product) => add(product.slug))}
            className={cn(buttonVariants(), "mt-5 h-11 px-5")}
          >
            Ubaci sve u korpu · {formatRsd(total)}
          </button>
        </div>
      </Container>
    </section>
  )
}
