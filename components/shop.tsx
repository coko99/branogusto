"use client"

import Image from "next/image"
import { useSyncExternalStore } from "react"

import { Container } from "@/components/container"
import { ProductGrid } from "@/components/product-card"
import { DiscoverNew } from "@/components/recommend"
import {
  categories,
  productsByCategory,
  type CategorySlug,
} from "@/lib/site"
import { cn } from "cn"

type Filter = CategorySlug | "sve"

const filters: { key: Filter; label: string }[] = [
  { key: "sve", label: "Sve" },
  ...categories.map((category) => ({ key: category.slug, label: category.title })),
]

function isFilter(value: string | null): value is Filter {
  return value === "sve" || categories.some((category) => category.slug === value)
}

function readFilter(): Filter {
  const value = new URLSearchParams(window.location.search).get("kategorija")
  return isFilter(value) ? value : "sve"
}

function subscribe(onStoreChange: () => void) {
  window.addEventListener("popstate", onStoreChange)
  window.addEventListener("branogusto-filter", onStoreChange)
  return () => {
    window.removeEventListener("popstate", onStoreChange)
    window.removeEventListener("branogusto-filter", onStoreChange)
  }
}

export function Shop() {
  const active = useSyncExternalStore(subscribe, readFilter, () => "sve" as Filter)
  const visible =
    active === "sve" ? categories : categories.filter((category) => category.slug === active)

  function select(next: Filter) {
    const url = new URL(window.location.href)
    if (next === "sve") url.searchParams.delete("kategorija")
    else url.searchParams.set("kategorija", next)
    window.history.replaceState(null, "", url)
    window.dispatchEvent(new Event("branogusto-filter"))
  }

  return (
    <section className="pb-10 md:pb-14">
      <div className="relative overflow-hidden border-b border-border">
        <Image
          src="/images/life/zalazak.jpg"
          alt=""
          fill
          sizes="100vw"
          className="scale-110 object-cover blur-md"
        />
        <div className="absolute inset-0 bg-[#f6f1e7]/86" />
        <Container className="relative py-12 md:py-16">
          <p className="text-xs font-semibold tracking-[0.2em] text-paprika uppercase">
            Police su pune
          </p>
          <h1 className="mt-3 text-5xl sm:text-6xl">Prodavnica</h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
            Ajvar, džem, sok, somborka. Cene su u dinarima, tegle su stvarne. Kad korpa pređe 5.000 RSD,
            poštarina otpada — traka iznad broji umesto vas.
          </p>
        </Container>
      </div>
      <Container className="pt-6">
        <div
          className="sticky top-[var(--header-offset,4.5rem)] z-30 -mx-4 mt-6 flex gap-2 overflow-x-auto bg-background/95 px-4 py-3 backdrop-blur sm:mx-0 sm:px-0"
          role="navigation"
          aria-label="Filter proizvoda"
        >
          {filters.map((filter) => {
            const current = filter.key === active
            return (
              <button
                key={filter.key}
                type="button"
                aria-pressed={current}
                onClick={() => select(filter.key)}
                className={cn(
                  "shrink-0 rounded-full border px-4 py-2 text-xs font-semibold tracking-[0.14em] uppercase",
                  current
                    ? "border-foreground bg-foreground text-background"
                    : "border-border bg-card text-foreground"
                )}
              >
                {filter.label}
              </button>
            )
          })}
        </div>

        <div className="mt-6 grid gap-10">
          {visible.map((category) => (
            <section key={category.slug} aria-labelledby={`grupa-${category.slug}`}>
              <h2 id={`grupa-${category.slug}`} className="text-3xl sm:text-4xl">
                {category.title}
              </h2>
              <p className="mt-2 mb-4 max-w-xl text-sm leading-6 text-muted-foreground">
                {category.description}
              </p>
              <ProductGrid products={productsByCategory(category.slug)} />
            </section>
          ))}
        </div>
        <DiscoverNew />
      </Container>
    </section>
  )
}
