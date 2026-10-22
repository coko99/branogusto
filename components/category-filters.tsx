import Link from "next/link"

import { categories, type CategorySlug } from "@/lib/site"
import { cn } from "cn"

export function CategoryFilters({ active }: { active: CategorySlug | "sve" }) {
  const items: { href: string; label: string; key: CategorySlug | "sve" }[] = [
    { href: "/proizvodi", label: "Sve", key: "sve" },
    ...categories.map((category) => ({
      href: `/${category.slug}`,
      label: category.title,
      key: category.slug,
    })),
  ]

  return (
    <div className="flex flex-wrap gap-2" role="navigation" aria-label="Kategorije proizvoda">
      {items.map((item) => {
        const current = item.key === active
        return (
          <Link
            key={item.key}
            href={item.href}
            aria-current={current ? "page" : undefined}
            className={cn(
              "rounded-full border px-4 py-2 text-xs font-semibold tracking-[0.14em] uppercase transition-colors focus-visible:ring-3 focus-visible:ring-ring/50",
              current
                ? "border-foreground bg-foreground text-background"
                : "border-border bg-card text-foreground hover:border-foreground"
            )}
          >
            {item.label}
          </Link>
        )
      })}
    </div>
  )
}
