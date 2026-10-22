import type { Metadata } from "next"

import { FaqSection } from "@/components/faq"

export const metadata: Metadata = {
  title: "Najčešća pitanja",
  description:
    "Porudžbina, poštarina, paketi i tegle. Kako se naručuje BraNo Gusto i kuda stiže.",
  alternates: { canonical: "/pitanja" },
}

export default function QuestionsPage() {
  return <FaqSection heading="h1" />
}
