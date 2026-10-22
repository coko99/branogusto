import type { MetadataRoute } from "next"

import { recipes } from "@/lib/commerce"
import { site } from "@/lib/site"

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    "",
    "/proizvodi",
    "/ajvari",
    "/dzemovi",
    "/sokovi",
    "/somborka",
    "/recepti",
    ...recipes.map((recipe) => `/recepti/${recipe.slug}`),
    "/korpa",
    "/politika-privatnosti",
    "/uslovi-narudzine",
    "/kontakt",
  ]

  return paths.map((path) => ({
    url: `${site.url}${path}`,
    changeFrequency: "monthly",
    priority: path === "" ? 1 : 0.7,
  }))
}
