"use client"

import Image from "next/image"
import { useState } from "react"
import { Check } from "lucide-react"

import { useCart } from "@/components/cart-provider"
import { Container } from "@/components/container"
import { buttonVariants } from "@/components/ui/button"
import { formatRsd, getProduct } from "@/lib/site"
import { cn } from "cn"

const shelves = [
  { id: "blagi", label: "Blagi ajvar", slug: "ajvar-blagi-700" },
  { id: "ljuti", label: "Ljuti ajvar", slug: "ajvar-ljuti-700" },
  { id: "dzem", label: "Džem", slug: "dzem-kajsija" },
  { id: "sok", label: "Matični sok", slug: "sok-borovnica" },
  { id: "somborka", label: "Somborka", slug: "somborka" },
] as const

export function PantryGap() {
  const [have, setHave] = useState<string[]>([])
  const { add } = useCart()
  const missing = shelves.filter((item) => !have.includes(item.id))
  const products = missing.map((item) => getProduct(item.slug)).filter((item) => item != null)
  const total = products.reduce((sum, product) => sum + product.price, 0)

  function toggle(id: string) {
    setHave((current) => (current.includes(id) ? current.filter((item) => item !== id) : [...current, id]))
  }

  return (
    <section className="py-14 md:py-20">
      <Container>
        <p className="text-xs font-semibold tracking-[0.2em] text-paprika uppercase">Igra za rupe</p>
        <h2 className="mt-3 max-w-2xl text-4xl sm:text-5xl">Šta ti već stoji na polici?</h2>
        <p className="mt-3 max-w-xl text-base leading-7 text-muted-foreground">
          Čekiraj ono što imaš. Što ostane prazno, to ti večeras fali — i može odmah u korpu.
        </p>
        <ul className="mt-8 flex flex-wrap gap-2">
          {shelves.map((item) => {
            const on = have.includes(item.id)
            return (
              <li key={item.id}>
                <button
                  type="button"
                  aria-pressed={on}
                  onClick={() => toggle(item.id)}
                  className={cn(
                    "inline-flex h-11 items-center gap-2 rounded-full border px-4 text-sm font-semibold",
                    on ? "border-transparent bg-leaf text-white" : "border-border bg-card"
                  )}
                >
                  <Check className={cn("size-4", on ? "opacity-100" : "opacity-30")} />
                  {on ? `Imam ${item.label.toLowerCase()}` : item.label}
                </button>
              </li>
            )
          })}
        </ul>
        {products.length > 0 ? (
          <div className="mt-6 rounded-[1.75rem] border border-border bg-card p-4 sm:p-5">
            <p className="text-sm font-semibold tracking-[0.14em] text-paprika uppercase">Ovo ti fali</p>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
              {products.map((product) => (
                <li key={product.slug} className="flex items-center gap-3">
                  <div className="relative size-14 shrink-0 overflow-hidden rounded-xl bg-[#f3eadc]">
                    <Image src={product.image} alt="" fill sizes="56px" className="object-cover" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-medium">{product.name}</p>
                    <p className="text-sm text-muted-foreground">{formatRsd(product.price)}</p>
                  </div>
                  <button type="button" onClick={() => add(product.slug)} className={cn(buttonVariants({ size: "sm" }), "h-9")}>
                    U korpu
                  </button>
                </li>
              ))}
            </ul>
            <button
              type="button"
              onClick={() => products.forEach((product) => add(product.slug))}
              className={cn(buttonVariants(), "mt-5 h-11 px-5")}
            >
              Stavi sve rupe u korpu · {formatRsd(total)}
            </button>
          </div>
        ) : (
          <p className="mt-6 max-w-xl text-lg leading-8">
            Polica je puna. Ako ipak sumnjaš, ljuti ajvar se ne kaje — uvek ima mesta za još jednu vatru.
          </p>
        )}
      </Container>
    </section>
  )
}
