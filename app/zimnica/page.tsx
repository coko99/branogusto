import type { Metadata } from "next"

import { CategoryPage } from "@/components/category-page"
import { getCategory } from "@/lib/site"

const category = getCategory("zimnica")

export const metadata: Metadata = {
  title: category.title,
  description: category.description,
  alternates: { canonical: "/zimnica" },
}

export default function ZimnicaPage() {
  return <CategoryPage slug="zimnica" />
}
