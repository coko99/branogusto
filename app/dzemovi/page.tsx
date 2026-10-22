import type { Metadata } from "next"

import { CategoryPage } from "@/components/category-page"
import { getCategory } from "@/lib/site"

const category = getCategory("dzemovi")

export const metadata: Metadata = {
  title: category.title,
  description: category.description,
  alternates: { canonical: "/dzemovi" },
}

export default function DzemoviPage() {
  return <CategoryPage slug="dzemovi" />
}
