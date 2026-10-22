import type { Metadata } from "next"

import { CategoryPage } from "@/components/category-page"
import { getCategory } from "@/lib/site"

const category = getCategory("somborka")

export const metadata: Metadata = {
  title: category.title,
  description: category.description,
  alternates: { canonical: "/somborka" },
}

export default function SomborkaPage() {
  return <CategoryPage slug="somborka" />
}
