import Image from "next/image"
import Link from "next/link"

import { CategoryFilters } from "@/components/category-filters"
import { Container } from "@/components/container"
import { ProductGrid } from "@/components/product-card"
import { CookingToday, DiscoverNew, OftenTogether } from "@/components/recommend"
import { RecordCategory } from "@/components/seen"
import {
  getCategory,
  productsByCategory,
  site,
  type CategorySlug,
} from "@/lib/site"

export function CategoryPage({ slug }: { slug: CategorySlug }) {
  const category = getCategory(slug)
  const items = productsByCategory(slug)

  return (
    <>
      <RecordCategory slug={slug} />
      <section className="border-b border-border bg-[#f3eadc]">
        <Container className="grid items-center gap-8 py-12 md:grid-cols-[1.15fr_.85fr] md:py-16">
          <div>
            <p className="text-xs font-semibold tracking-[0.2em] text-paprika uppercase">
              {category.eyebrow}
            </p>
            <h1 className="mt-3 text-5xl sm:text-6xl md:text-7xl">{category.title}</h1>
            <p className="mt-4 max-w-xl text-lg leading-8 text-muted-foreground">
              {category.description}
            </p>
          </div>
          <div className="relative mx-auto aspect-[4/5] w-full max-w-56 overflow-hidden rounded-[1.5rem] bg-[#f3eadc] shadow-[0_12px_30px_rgba(48,28,14,0.1)] sm:max-w-xs">
            <Image
              src={category.image}
              alt={category.imageAlt}
              fill
              priority
              sizes="280px"
              className="object-cover"
            />
          </div>
        </Container>
      </section>

      <section className="py-12 md:py-16">
        <Container>
          <CategoryFilters active={slug} />
          <div className="mt-8">
            <ProductGrid products={items} />
          </div>
          <CookingToday category={slug} />
          <OftenTogether category={slug} />
          <DiscoverNew />
          <p className="mt-10 max-w-2xl text-sm leading-6 text-muted-foreground">
            Za porudžbinu pozovite{" "}
            <a href={site.phoneHref} className="font-semibold text-foreground">
              {site.phoneDisplay}
            </a>{" "}
            ili pišite na{" "}
            <Link href="/kontakt" className="font-semibold text-foreground underline-offset-4 hover:underline">
              kontakt stranicu
            </Link>
            . Na teglama piše: pasterizovano, tradicionalna priprema.
          </p>
        </Container>
      </section>
    </>
  )
}
