import type { Metadata } from "next"

import { CartPage } from "@/components/cart-page"
import { Container } from "@/components/container"

export const metadata: Metadata = {
  title: "Korpa",
  description: "Složite zimnicu, unesite adresu i izaberite poštu ili preuzimanje u Kruševcu i Beogradu.",
  alternates: { canonical: "/korpa" },
}

export default function KorpaRoute() {
  return (
    <section className="py-10 md:py-14">
      <Container>
        <CartPage />
      </Container>
    </section>
  )
}
