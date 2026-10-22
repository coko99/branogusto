import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"

import { Container } from "@/components/container"
import { BuyProducts } from "@/components/recommend"
import { getRecipe, recipes } from "@/lib/commerce"
import { formatRsd, getProduct } from "@/lib/site"

type Props = { params: Promise<{ slug: string }> }

export function generateStaticParams() {
  return recipes.map((recipe) => ({ slug: recipe.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const recipe = getRecipe(slug)
  if (!recipe) return { title: "Recept" }
  return {
    title: recipe.title,
    description: recipe.lead,
    alternates: { canonical: `/recepti/${recipe.slug}` },
  }
}

export default async function RecipePage({ params }: Props) {
  const { slug } = await params
  const recipe = getRecipe(slug)
  if (!recipe) notFound()
  const used = recipe.productSlugs.flatMap((item) => {
    const product = getProduct(item)
    return product ? [product] : []
  })

  return (
    <section className="py-12 md:py-16">
      <Container className="grid items-start gap-10 lg:grid-cols-[minmax(0,1fr)_20rem]">
        <article>
          <p className="text-xs font-semibold tracking-[0.18em] text-paprika uppercase">
            <Link href="/recepti" className="hover:text-foreground">
              Recepti
            </Link>
          </p>
          <h1 className="mt-3 text-5xl sm:text-6xl">{recipe.title}</h1>
          <div className="relative mt-6 aspect-[4/3] overflow-hidden rounded-3xl bg-[#f3eadc]">
            <Image
              src={recipe.image}
              alt={recipe.imageAlt}
              fill
              priority
              sizes="(min-width: 1024px) 60vw, 100vw"
              className="object-cover"
            />
          </div>
          <p className="mt-3 text-sm text-muted-foreground">
            {recipe.minutes} min · {recipe.servings}
          </p>
          <p className="mt-4 max-w-xl text-lg leading-8">{recipe.lead}</p>
          <ol className="mt-8 grid gap-4">
            {recipe.steps.map((step, index) => (
              <li key={step} className="flex gap-4">
                <span className="font-display text-3xl text-paprika">{index + 1}</span>
                <p className="pt-1 leading-7">{step}</p>
              </li>
            ))}
          </ol>
        </article>
        <aside className="rounded-3xl border border-border bg-card p-4 lg:sticky lg:top-[calc(var(--header-offset,4.5rem)+0.75rem)]">
          <h2 className="text-2xl">Za ovaj recept</h2>
          <ul className="mt-4 grid gap-3">
            {used.map((product) => (
              <li key={product.slug} className="flex items-center gap-3">
                <div className="relative size-16 shrink-0 overflow-hidden rounded-xl bg-[#f3eadc]">
                  <Image src={product.image} alt="" fill sizes="64px" className="object-cover" />
                </div>
                <div>
                  <p className="text-sm font-medium">{product.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {product.net ? `${product.net} · ` : ""}
                    {formatRsd(product.price)}
                  </p>
                </div>
              </li>
            ))}
          </ul>
          <BuyProducts slugs={recipe.productSlugs} label="Stavi u korpu" className="mt-4 w-full" />
        </aside>
      </Container>
    </section>
  )
}
