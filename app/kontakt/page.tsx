import type { Metadata } from "next"
import Image from "next/image"

import { ContactForm } from "@/components/contact-form"
import { Container } from "@/components/container"
import { site } from "@/lib/site"

export const metadata: Metadata = {
  title: "Kontakt",
  description:
    "Porudžbine i saradnja sa BraNo Gusto. Pozovite 062 820 70 69 ili pošaljite poruku.",
  alternates: { canonical: "/kontakt" },
}

export default function ContactPage() {
  return (
    <section className="py-12 md:py-16">
      <Container>
        <p className="text-xs font-semibold tracking-[0.2em] text-paprika uppercase">
          Javite nam se
        </p>
        <h1 className="mt-3 text-5xl sm:text-6xl md:text-7xl">Kontakt</h1>
        <p className="mt-4 max-w-2xl text-lg leading-8 text-muted-foreground">
          Za porudžbine, saradnju i dodatne informacije pošaljite nam poruku.
        </p>

        <div className="mt-10 grid gap-6 lg:grid-cols-[.9fr_1.1fr] lg:gap-10">
          <aside className="relative overflow-hidden rounded-[1.75rem] bg-bark p-7 text-cream sm:p-8">
            <Image
              src="/images/life/kajsija.jpg"
              alt=""
              fill
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-[#1c1410]/72" />
            <div className="relative">
            <p className="text-xs font-semibold tracking-[0.2em] text-[#f6e7a8] uppercase">
              BraNo Gusto
            </p>
            <h2 className="mt-3 text-4xl text-white sm:text-5xl">Tu smo za vas.</h2>
            <a href={site.phoneHref} className="mt-6 block font-display text-3xl hover:text-[#f6e7a8]">
              {site.phoneDisplay}
            </a>
            <a href={`mailto:${site.email}`} className="mt-3 block text-lg hover:text-[#f6e7a8]">
              {site.email}
            </a>
            <a
              href={site.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 block text-lg text-white/80 hover:text-white"
            >
              Instagram {site.instagramHandle}
            </a>
            <p className="mt-6 text-sm text-white/70">{site.region}</p>
            </div>
          </aside>
          <ContactForm />
        </div>
      </Container>
    </section>
  )
}
