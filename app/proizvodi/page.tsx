import type { Metadata } from "next"

import { Shop } from "@/components/shop"

export const metadata: Metadata = {
  title: "Prodavnica",
  description:
    "Spremite zimnicu: ajvar, džemovi, matični sokovi i paprika somborka. Preko 5.000 RSD dostava je besplatna.",
  alternates: { canonical: "/proizvodi" },
}

export default function ProductsPage() {
  return <Shop />
}
