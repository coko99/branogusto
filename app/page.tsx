import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { AjvarProcess } from "@/components/ajvar-process"
import { Container } from "@/components/container"
import { GuestNight } from "@/components/guest-night"
import { HeroSlides } from "@/components/hero-slides"
import { PantryGap } from "@/components/pantry-gap"
import { TastePick } from "@/components/taste-pick"
import { buttonVariants } from "@/components/ui/button"
import { recipes } from "@/lib/commerce"
import { categories, site } from "@/lib/site"
import { cn } from "cn"

const ticker =
  "Uzmi blagi · Uzmi ljuti · Šipurak u šolju · Somborka u sendvič · Preko 5.000 dostava ćuti · "

const words = ["Je", "l'", "ste", "spremili", "zimnicu?"]

export default function HomePage() {
  return (
    <>
      <section className="relative overflow-hidden text-white">
        <HeroSlides />
        <Container className="relative z-10 py-16 md:py-24">
          <p className="hero-drop text-xs font-semibold tracking-[0.22em] text-[#d7e6f5] uppercase">
            Hladno je napolju. Mi nismo.
          </p>
          <h1 className="mt-4 max-w-xl text-5xl text-white sm:text-6xl md:text-7xl">
            {words.map((word, index) => (
              <span key={word}>
                <span
                  className="hero-word"
                  style={{ animationDelay: `${0.12 + index * 0.12}s` }}
                >
                  {word}
                </span>{" "}
              </span>
            ))}
          </h1>
          <p className="hero-walk mt-5 max-w-lg text-lg leading-8 text-white/80">
            Sneg sme da pada. Tvoja korpa ne sme da čeka. Ajvar, džem, sok i somborka su već u
            tegli — ostaje samo da ih uzmeš.
          </p>
          <div className="hero-walk mt-8 flex flex-col gap-3 sm:flex-row" style={{ animationDelay: "0.7s" }}>
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
        </Container>
        <div className="relative z-10 overflow-hidden border-t border-white/15 py-3" aria-hidden="true">
          <p className="hero-ticker-track flex text-sm font-semibold tracking-[0.18em] text-white/75 uppercase">
            <span className="px-4">{ticker}</span>
            <span className="px-4">{ticker}</span>
          </p>
        </div>
      </section>

      <section>
        <div className="relative aspect-[16/9] w-full">
          <Image
            src="/images/life/njiva.jpg"
            alt="Ajvar blagi, ljuti i somborka na sanduku usred paprike"
            fill
            sizes="100vw"
            className="object-cover"
          />
        </div>
      </section>

      <AjvarProcess />
      <TastePick />
      <GuestNight />
      <PantryGap />

      <section className="py-14 md:py-20">
        <Container>
          <p className="text-xs font-semibold tracking-[0.2em] text-paprika uppercase">
            Tri razloga da korpa ne ostane prazna
          </p>
          <h2 className="mt-3 max-w-2xl text-4xl sm:text-5xl">Uzmi pre nego što zima uzme reč.</h2>
          <ul className="mt-8 grid gap-4 sm:grid-cols-3">
            <li className="rounded-3xl border border-border bg-card p-6">
              <p className="font-heading text-6xl text-paprika">2</p>
              <h3 className="mt-3 text-2xl">lica ajvara</h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                Blagi za hleb. Ljuti za one koji ne mere. Uzmi oba, pa vidi koji nestane prvi.
              </p>
            </li>
            <li className="rounded-3xl border border-border bg-card p-6">
              <p className="font-heading text-6xl text-paprika">4</p>
              <h3 className="mt-3 text-2xl">voća u tegli</h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                Šipurak, šljiva, jagoda, kajsija. Jedan džem je navika. Četiri su ostava.
              </p>
            </li>
            <li className="rounded-3xl border border-border bg-[#16324a] p-6 text-white">
              <p className="font-heading text-6xl text-[#f6e7a8]">5.000</p>
              <h3 className="mt-3 text-2xl">dinara, pa pošta ćuti</h3>
              <p className="mt-2 text-sm leading-6 text-white/75">
                Kad korpa pređe ovo, poštarina otpada. Traka iznad broji umesto tebe.
              </p>
            </li>
          </ul>
        </Container>
      </section>

      <section className="border-y border-border bg-[#eef3f7] py-10">
        <Container className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <p className="max-w-xl text-lg leading-8 text-[#1c3144]">
            Ne čekaj prvi mraz da se setiš. Ko ostavi korpu praznu, jede tuđu zimnicu.
          </p>
          <Link href="/proizvodi" className={cn(buttonVariants(), "h-11 px-5")}>
            U prodavnicu
          </Link>
        </Container>
      </section>

      <section className="py-14 md:py-20">
        <Container>
          <p className="text-xs font-semibold tracking-[0.2em] text-paprika uppercase">
            Četiri police
          </p>
          <h2 className="mt-3 text-4xl sm:text-5xl">Izaberi policu. Tegla neće sama u korpu.</h2>
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
          <p className="text-xs font-semibold tracking-[0.2em] text-paprika uppercase">
            Šta danas spremamo
          </p>
          <h2 className="mt-3 max-w-2xl text-4xl sm:text-5xl">Ne znaš šta da kuvaš? Kupi teglu. Recept ide uz nju.</h2>
          <ul className="mt-8 grid gap-3 sm:grid-cols-3">
            {recipes.slice(0, 3).map((recipe) => {
              return (
                <li key={recipe.slug}>
                  <Link
                    href={`/recepti/${recipe.slug}`}
                    className="block overflow-hidden rounded-2xl border border-border bg-card"
                  >
                    <div className="relative aspect-[4/3] bg-[#f3eadc]">
                      <Image
                        src={recipe.image}
                        alt={recipe.imageAlt}
                        fill
                        sizes="(min-width: 640px) 30vw, 100vw"
                        className="object-cover"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="text-2xl">{recipe.title}</h3>
                      <p className="mt-1 line-clamp-2 text-sm leading-6 text-muted-foreground">
                        {recipe.lead}
                      </p>
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
