import type { Metadata } from "next"
import Link from "next/link"

import { Container } from "@/components/container"
import { FREE_SHIPPING_RSD } from "@/lib/commerce"
import { formatRsd, site } from "@/lib/site"

export const metadata: Metadata = {
  title: "Uslovi naručivanja",
  description: "Pošta ili lično preuzimanje u Kruševcu i Beogradu, besplatna dostava preko 5.000 RSD.",
  alternates: { canonical: "/uslovi-narudzine" },
}

export default function TermsPage() {
  return (
    <section className="py-12 md:py-16">
      <Container className="max-w-3xl">
        <p className="text-xs font-semibold tracking-[0.18em] text-paprika uppercase">Dokument</p>
        <h1 className="mt-3 text-5xl">Uslovi naručivanja</h1>
        <div className="mt-8 grid gap-6 text-base leading-7 text-muted-foreground">
          <p>
            Cene na sajtu su u dinarima, za jednu teglu ili flašu. Porudžbina na sajtu je spisak koji potvrđujemo pozivom na {site.phoneDisplay}, jer automatsko slanje još nije uključeno.
          </p>
          <h2 className="text-3xl text-foreground">Slanje</h2>
          <p>
            Šaljemo poštom na adresu u Srbiji, ili porudžbinu preuzimate lično u Kruševcu ili Beogradu. Tačnu tačku preuzimanja dogovaramo kad potvrdimo porudžbinu — na sajtu nema ulice magacina.
          </p>
          <p>
            Dostava poštom je besplatna kad je vrednost porudžbine, posle popusta, najmanje {formatRsd(FREE_SHIPPING_RSD)}. Ispod tog praga cenu dostave kažemo uz potvrdu, ne naplaćujemo je unapred na sajtu.
          </p>
          <h2 className="text-3xl text-foreground">Popusti</h2>
          <p>
            Tri različita proizvoda u korpi otvaraju paket: 8% na ceo zbir. Kupon ZIMNICA10 skida još 10% sa iznosa posle paketa. Važi jedan kupon. Traka besplatne dostave gleda iznos posle oba popusta.
          </p>
          <h2 className="text-3xl text-foreground">Podaci</h2>
          <p>
            Ime, prezime, telefon i adresa služe samo za slanje. Potrebna je saglasnost, opisana u{" "}
            <Link href="/politika-privatnosti" className="font-semibold text-foreground underline-offset-4 hover:underline">
              politici privatnosti
            </Link>
            .
          </p>
          <h2 className="text-3xl text-foreground">Reklamacije</h2>
          <p>
            Ako tegla stigne oštećena ili sadržaj ne valja, javite se na {site.email} ili telefon. Rokove iz propisa o zaštiti potrošača poštujemo.
          </p>
        </div>
      </Container>
    </section>
  )
}
