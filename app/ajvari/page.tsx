import type { Metadata } from "next"

import { CategoryPage } from "@/components/category-page"
import { getCategory } from "@/lib/site"

const category = getCategory("ajvari")

export const metadata: Metadata = {
  title: category.title,
  description: category.description,
  alternates: { canonical: "/ajvari" },
}

export default function AjvariPage() {
  return <CategoryPage slug="ajvari" />
}
