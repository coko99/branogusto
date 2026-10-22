import type { Metadata } from "next"
import Link from "next/link"

import { Container } from "@/components/container"
import { site } from "@/lib/site"

export const metadata: Metadata = {
  title: "Politika privatnosti",
  description: "Koje podatke BraNo Gusto traži za slanje porudžbine i čemu služe.",
  alternates: { canonical: "/politika-privatnosti" },
}

export default function PrivacyPage() {
  return (
    <section className="py-12 md:py-16">
      <Container className="max-w-3xl">
        <p className="text-xs font-semibold tracking-[0.18em] text-paprika uppercase">Dokument</p>
        <h1 className="mt-3 text-5xl">Politika privatnosti</h1>
        <div className="mt-8 grid gap-6 text-base leading-7 text-muted-foreground">
          <p>
            BraNo Gusto, {site.region}. Za pitanja o podacima: {site.email} ili {site.phoneDisplay}.
          </p>
          <h2 className="text-3xl text-foreground">Šta tražimo</h2>
          <p>
            Ime, prezime, telefon, adresu za poštu (ulica, broj, grad, poštanski broj) ili izbor preuzimanja u Kruševcu ili Beogradu, sadržaj korpe i kupon ako ga unesete.
          </p>
          <h2 className="text-3xl text-foreground">Čemu to služi</h2>
          <p>
            Samo da složimo i pošaljemo porudžbinu, ili da dogovorimo lično preuzimanje. Podatke ne prodajemo i ne koristimo za tuđi marketing.
          </p>
          <h2 className="text-3xl text-foreground">Gde ostaju dok slanje nije uključeno</h2>
          <p>
            Korpa i kupon ostaju u pregledaču, na vašem uređaju. Obrazac za slanje još ne ide na server niti na email. Kad slanje uključimo, koristićemo iste podatke samo za tu porudžbinu.
          </p>
          <h2 className="text-3xl text-foreground">Saglasnost</h2>
          <p>
            Porudžbinu možete da potvrdite tek kad označite da se slažete da podatke koristimo za slanje. Saglasnost povlačite porukom na {site.email} ili pozivom.
          </p>
          <p>
            Uslovi kupovine su na stranici{" "}
            <Link href="/uslovi-narudzine" className="font-semibold text-foreground underline-offset-4 hover:underline">
              uslovi naručivanja
            </Link>
            .
          </p>
        </div>
      </Container>
    </section>
  )
}
