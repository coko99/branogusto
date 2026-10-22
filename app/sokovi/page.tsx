import type { Metadata } from "next"

import { CategoryPage } from "@/components/category-page"
import { getCategory } from "@/lib/site"

const category = getCategory("sokovi")

export const metadata: Metadata = {
  title: category.title,
  description: category.description,
  alternates: { canonical: "/sokovi" },
}

export default function SokoviPage() {
  return <CategoryPage slug="sokovi" />
}
