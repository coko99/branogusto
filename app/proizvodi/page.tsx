import type { Metadata } from "next"

import { Shop } from "@/components/shop"

export const metadata: Metadata = {
  title: "Prodavnica",
  description:
    "Ajvar, džem, matični sok i somborka, sa cenom u dinarima. Preko 5.000 RSD poštarina otpada.",
  alternates: { canonical: "/proizvodi" },
}

export default function ProductsPage() {
  return <Shop />
}
