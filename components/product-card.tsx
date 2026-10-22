"use client"

import Image from "next/image"

import { useCart } from "@/components/cart-provider"
import { buttonVariants } from "@/components/ui/button"
import { categoryTitle, formatRsd, type Product } from "@/lib/site"
import { cn } from "cn"

export function ProductCard({ product }: { product: Product }) {
  const { items, add } = useCart()
  const qty = items.find((item) => item.slug === product.slug)?.qty ?? 0

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-border/80 bg-card shadow-[0_10px_28px_rgba(48,28,14,0.05)]">
      <div className="relative aspect-[4/5] overflow-hidden bg-[#f3eadc]">
        <Image
          src={product.image}
          alt={product.imageAlt}
          fill
          sizes="(min-width: 1280px) 25vw, 50vw"
          className="object-cover"
        />
      </div>
      <div className="flex flex-1 flex-col p-3 sm:p-4">
        <p className="text-[0.65rem] font-semibold tracking-[0.14em] text-paprika uppercase sm:text-xs">
          {categoryTitle(product.category)}
        </p>
        <h3 className="mt-1 text-base leading-tight sm:text-2xl">{product.name}</h3>
        <p className="mt-1 text-xs font-semibold text-muted-foreground sm:text-sm">
          {product.net ? `${product.net} · ` : ""}
          {formatRsd(product.price)}
        </p>
        <p className="mt-2 hidden flex-1 text-sm leading-6 text-muted-foreground sm:line-clamp-2 sm:block">
          {product.description}
        </p>
        <button
          type="button"
          onClick={() => add(product.slug)}
          className={cn(buttonVariants({ size: "sm" }), "mt-3 h-9 w-full text-xs sm:text-sm")}
        >
          {qty > 0 ? `U korpi · ${qty}` : "U korpu"}
        </button>
      </div>
    </article>
  )
}

export function ProductGrid({ products }: { products: Product[] }) {
  return (
    <ul className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((product) => (
        <li key={product.slug}>
          <ProductCard product={product} />
        </li>
      ))}
    </ul>
  )
}
