import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { Container } from "@/components/container"
import { buttonVariants } from "@/components/ui/button"
import { recipes } from "@/lib/commerce"
import { categories, site } from "@/lib/site"
import { cn } from "cn"

const jars = [
  {
    src: "/images/products/ajvar-blagi-700.jpg",
    alt: "Tegla blagog BraNo Gusto ajvara, 700 g",
  },
  {
    src: "/images/products/dzem-sipurak-700.jpg",
    alt: "Tegla BraNo Gusto džema od šipurka, 700 g",
  },
  {
    src: "/images/products/sok-borovnica-05.jpg",
    alt: "Flašica matičnog soka od divlje borovnice, 0,5 l",
  },
  {
    src: "/images/products/somborka.jpg",
    alt: "Tegla paprike somborke, 680 g",
  },
]

export default function HomePage() {
  return (
    <>
      <section className="relative overflow-hidden bg-[#16324a] text-white">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
        >
          <span className="absolute top-8 left-[12%] size-1.5 rounded-full bg-white/70" />
          <span className="absolute top-24 left-[28%] size-1 rounded-full bg-white/50" />
          <span className="absolute top-16 right-[18%] size-2 rounded-full bg-white/40" />
          <span className="absolute top-40 right-[32%] size-1 rounded-full bg-white/60" />
          <span className="absolute bottom-24 left-[8%] size-1 rounded-full bg-white/40" />
          <span className="absolute top-1/2 right-[8%] size-1.5 rounded-full bg-white/50" />
        </div>
        <Container className="relative grid items-center gap-10 py-16 md:grid-cols-[1.15fr_.85fr] md:py-24">
          <div>
            <p className="text-xs font-semibold tracking-[0.22em] text-[#d7e6f5] uppercase">
              Hladno je napolju
            </p>
            <h1 className="mt-4 max-w-xl text-5xl text-white sm:text-6xl md:text-7xl">
              Je l&apos; ste spremili zimnicu?
            </h1>
            <p className="mt-5 max-w-lg text-lg leading-8 text-white/80">
              Sneg može da pada. Ostava ne mora da zjapi prazna. Mi jesmo spremni —
              ajvar, džemovi, sokovi i somborka već stoje u tegli.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/proizvodi" className={cn(buttonVariants(), "h-12 px-6")}>
                Spremi zimnicu odmah
                <ArrowRight />
              </Link>
              <a
                href={site.phoneHref}
                className={cn(
                  buttonVariants({ variant: "outline" }),
                  "h-12 border-white/30 bg-white/10 px-6 text-white hover:bg-white hover:text-ink"
                )}
              >
                Pozovi nas
              </a>
            </div>
          </div>
          <ul className="grid grid-cols-2 gap-3">
            {jars.map((jar) => (
              <li
                key={jar.src}
                className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-[#f3eadc] shadow-[0_16px_40px_rgba(0,0,0,0.25)]"
              >
                <Image
                  src={jar.src}
                  alt={jar.alt}
                  fill
                  priority
                  sizes="(min-width: 768px) 20vw, 45vw"
                  className="object-cover"
                />
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section className="border-b border-border bg-[#eef3f7] py-10">
        <Container className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <p className="max-w-xl text-lg leading-8 text-[#1c3144]">
            Mi držimo toplotu u tegli. Složite korpu — preko 5.000 RSD dostava je besplatna.
          </p>
          <Link href="/proizvodi" className={cn(buttonVariants(), "h-11 px-5")}>
            U prodavnicu
          </Link>
        </Container>
      </section>

      <section className="py-14 md:py-20">
        <Container>
          <p className="text-xs font-semibold tracking-[0.2em] text-paprika uppercase">
            Šta vas čeka
          </p>
          <h2 className="mt-3 text-4xl sm:text-5xl">Zimnica, već spremljena.</h2>
          <ul className="mt-8 grid grid-cols-2 gap-3 lg:grid-cols-4">
            {categories.map((category) => (
              <li key={category.slug}>
                <Link
                  href={`/proizvodi?kategorija=${category.slug}`}
                  className="group block overflow-hidden rounded-2xl border border-border bg-card"
                >
                  <div className="relative aspect-[4/5] bg-[#f3eadc]">
                    <Image
                      src={category.image}
                      alt={category.imageAlt}
                      fill
                      sizes="(min-width: 1024px) 25vw, 50vw"
                      className="object-cover"
                    />
                  </div>
                  <div className="p-3 sm:p-4">
                    <h3 className="text-xl sm:text-2xl">{category.title}</h3>
                    <p className="mt-1 line-clamp-2 text-xs leading-5 text-muted-foreground sm:text-sm">
                      {category.description}
                    </p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section className="border-t border-border bg-[#eef3f7] py-14 md:py-20">
        <Container>
          <p className="text-xs font-semibold tracking-[0.2em] text-paprika uppercase">Šta danas spremamo</p>
          <h2 className="mt-3 text-4xl sm:text-5xl">Recepti uz naše tegle.</h2>
          <ul className="mt-8 grid gap-3 sm:grid-cols-3">
            {recipes.slice(0, 3).map((recipe) => {
              return (
                <li key={recipe.slug}>
                  <Link href={`/recepti/${recipe.slug}`} className="block overflow-hidden rounded-2xl border border-border bg-card">
                    <div className="relative aspect-[4/3] bg-[#f3eadc]">
                      <Image src={recipe.image} alt={recipe.imageAlt} fill sizes="(min-width: 640px) 30vw, 100vw" className="object-cover" />
                    </div>
                    <div className="p-4">
                      <h3 className="text-2xl">{recipe.title}</h3>
                      <p className="mt-1 line-clamp-2 text-sm leading-6 text-muted-foreground">{recipe.lead}</p>
                    </div>
                  </Link>
                </li>
              )
            })}
          </ul>
          <Link href="/recepti" className={cn(buttonVariants({ variant: "outline" }), "mt-6 h-11 px-5")}>
            Svi recepti
          </Link>
        </Container>
      </section>
    </>
  )
}
