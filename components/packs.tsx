"use client"

import Image from "next/image"

import { useCart } from "@/components/cart-provider"
import { buttonVariants } from "@/components/ui/button"
import { packs, quote } from "@/lib/commerce"
import { formatRsd, getProduct } from "@/lib/site"
import { cn } from "cn"

function jarWord(count: number) {
  if (count === 1) return "tegla"
  if (count < 5) return "tegle"
  return "tegli"
}

export function Packs() {
  const { items, add } = useCart()

  return (
    <div id="paketi">
      <p className="text-xs font-semibold tracking-[0.2em] text-paprika uppercase">Složeno umesto tebe</p>
      <h2 className="mt-3 max-w-2xl text-4xl sm:text-5xl">Paketi. Nekoliko tegli, jedan klik.</h2>
      <p className="mt-3 max-w-xl text-base leading-7 text-muted-foreground">
        Cena je zbir tegli. Tri različite u korpi same skidaju 8%.
      </p>
      <ul className="mt-8 grid gap-4 sm:grid-cols-2">
        {packs.map((pack) => {
          const products = pack.productSlugs.flatMap((slug) => {
            const product = getProduct(slug)
            return product ? [product] : []
          })
          const quoted = quote(
            products.map((product) => ({ slug: product.slug, qty: 1 })),
            ""
          )
          const inCart = products.every((product) => items.some((item) => item.slug === product.slug))
          return (
            <li key={pack.slug} className="flex flex-col rounded-[1.75rem] border border-border bg-card p-4 sm:p-5">
              <div className="flex items-baseline justify-between gap-3">
                <h3 className="text-3xl">{pack.name}</h3>
                <p className="shrink-0 text-sm font-semibold text-muted-foreground">
                  {products.length} {jarWord(products.length)}
                </p>
              </div>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">{pack.line}</p>
              <ul
                className={cn(
                  "mt-4 grid gap-2",
                  products.length === 4 ? "grid-cols-4" : "grid-cols-3"
                )}
              >
                {products.map((product) => (
                  <li key={product.slug} className="min-w-0">
                    <div className="relative aspect-square overflow-hidden rounded-xl bg-[#f3eadc]">
                      <Image
                        src={product.image}
                        alt=""
                        fill
                        sizes="120px"
                        className="object-cover"
                      />
                    </div>
                    <p className="mt-1 line-clamp-2 text-[0.7rem] leading-4 font-medium">
                      {product.name}
                      {product.net ? ` ${product.net}` : ""}
                    </p>
                  </li>
                ))}
              </ul>
              {quoted.freeShipping ? (
                <p className="mt-3 text-sm font-semibold text-leaf">Poštarina ćuti.</p>
              ) : null}
              <button
                type="button"
                onClick={() => products.forEach((product) => add(product.slug))}
                className={cn(buttonVariants(), "mt-4 h-11 w-full sm:w-fit")}
              >
                {inCart ? "U korpi · dodaj još" : "Uzmi paket"} · {formatRsd(quoted.subtotal)}
              </button>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
