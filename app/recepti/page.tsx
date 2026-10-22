import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"

import { Container } from "@/components/container"
import { recipes } from "@/lib/commerce"

export const metadata: Metadata = {
  title: "Recepti",
  description: "Ideje za ručak i doručak u kojima se koriste ajvar, džemovi, sokovi i somborka BraNo Gusto.",
  alternates: { canonical: "/recepti" },
}

export default function RecipesPage() {
  return (
    <section className="py-12 md:py-16">
      <Container>
        <p className="text-xs font-semibold tracking-[0.18em] text-paprika uppercase">Iz ostave</p>
        <h1 className="mt-3 text-5xl sm:text-6xl">Recepti</h1>
        <p className="mt-4 max-w-2xl text-lg leading-8 text-muted-foreground">
          Predlozi u kojima naši proizvodi rade posao. Pored svakog recepta možete odmah da stavite tegle u korpu.
        </p>
        <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {recipes.map((recipe) => {
            return (
              <li key={recipe.slug}>
                <Link href={`/recepti/${recipe.slug}`} className="block overflow-hidden rounded-2xl border border-border bg-card">
                  <div className="relative aspect-[4/3] bg-[#f3eadc]">
                    <Image src={recipe.image} alt={recipe.imageAlt} fill sizes="(min-width: 1024px) 30vw, 50vw" className="object-cover" />
                  </div>
                  <div className="p-4">
                    <p className="text-xs text-muted-foreground">
                      {recipe.minutes} min · {recipe.servings}
                    </p>
                    <h2 className="mt-1 text-2xl">{recipe.title}</h2>
                    <p className="mt-2 line-clamp-3 text-sm leading-6 text-muted-foreground">{recipe.lead}</p>
                  </div>
                </Link>
              </li>
            )
          })}
        </ul>
      </Container>
    </section>
  )
}
