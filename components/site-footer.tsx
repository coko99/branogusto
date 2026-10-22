import Image from "next/image"
import Link from "next/link"

import { Container } from "@/components/container"
import { categories, site } from "@/lib/site"

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-[#f3eadc]">
      <Container className="grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-[1.4fr_.8fr_.8fr]">
        <div>
          <Image
            src="/images/logo.png"
            alt="BraNo Gusto"
            width={1249}
            height={623}
            className="h-16 w-auto"
          />
          <p className="mt-4 max-w-sm text-sm leading-6 text-muted-foreground">
            Zima ne čeka da se odlučiš. Tegla čeka u korpi.
          </p>
        </div>
        <div>
          <p className="text-sm font-semibold tracking-[0.14em] uppercase">Proizvodi</p>
          <ul className="mt-4 space-y-2 text-sm">
            {categories.map((category) => (
              <li key={category.slug}>
                <Link
                  href={`/${category.slug}`}
                  className="text-muted-foreground hover:text-foreground"
                >
                  {category.title}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/proizvodi#paketi" className="text-muted-foreground hover:text-foreground">
                Paketi
              </Link>
            </li>
            <li>
              <Link href="/recepti" className="text-muted-foreground hover:text-foreground">
                Recepti
              </Link>
            </li>
            <li>
              <Link href="/korpa" className="text-muted-foreground hover:text-foreground">
                Korpa
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <p className="text-sm font-semibold tracking-[0.14em] uppercase">Kontakt</p>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <a href={site.phoneHref} className="hover:text-paprika">
                {site.phoneDisplay}
              </a>
            </li>
            <li>
              <a href={`mailto:${site.email}`} className="hover:text-paprika">
                {site.email}
              </a>
            </li>
            <li>
              <a
                href={site.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground"
              >
                Instagram {site.instagramHandle}
              </a>
            </li>
          </ul>
        </div>
      </Container>
      <Container className="flex flex-col gap-3 border-t border-border py-5 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
        <p>© 2026 BraNo Gusto. Sva prava zadržana.</p>
        <p className="flex gap-4">
          <Link href="/politika-privatnosti" className="hover:text-foreground">
            Politika privatnosti
          </Link>
          <Link href="/uslovi-narudzine" className="hover:text-foreground">
            Uslovi naručivanja
          </Link>
        </p>
      </Container>
      <div className="bg-black text-white">
        <Container className="flex justify-center py-2.5 pr-14 sm:pr-6">
          <a
            href="https://cokoladni.photo/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2.5 rounded-full outline-none focus-visible:ring-2 focus-visible:ring-[#7af7ff]"
            aria-label="Powered by čokoladni. Otvori cokoladni.photo"
          >
            <Image
              src="/images/cokoladni.png"
              alt=""
              width={320}
              height={320}
              unoptimized
              className="size-10"
            />
            <span className="leading-tight">
              <span className="block text-[0.6rem] font-medium tracking-[0.18em] text-[#9adfe6] uppercase">
                Powered by
              </span>
              <span className="text-sm font-medium tracking-wide text-white">čokoladni</span>
            </span>
          </a>
        </Container>
      </div>
    </footer>
  )
}
