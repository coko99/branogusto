"use client"

import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, Phone, ShoppingBag } from "lucide-react"

import { useCart } from "@/components/cart-provider"
import { buttonVariants } from "@/components/ui/button"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { nav, site } from "@/lib/site"
import { cn } from "cn"

function isCurrent(pathname: string, href: string) {
  return pathname === href
}

export function SiteHeader() {
  const pathname = usePathname()
  const { count } = useCart()

  return (
    <header>
      <div className="mx-auto flex h-[4.5rem] w-full max-w-6xl items-center gap-3 px-4 sm:px-6">
        <Link href="/" className="shrink-0" aria-label="BraNo Gusto, početna">
          <Image
            src="/images/logo.png"
            alt=""
            width={1249}
            height={623}
            priority
            className="h-12 w-auto sm:h-14"
          />
        </Link>

        <nav className="ml-auto hidden items-center gap-3 xl:gap-4 lg:flex" aria-label="Glavni meni">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isCurrent(pathname, item.href) ? "page" : undefined}
              className={cn(
                "text-sm font-medium text-foreground/80 transition-colors hover:text-foreground",
                isCurrent(pathname, item.href) && "text-paprika"
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <Link
          href="/korpa"
          className={cn(
            buttonVariants({ variant: "outline", size: "icon" }),
            "relative ml-auto size-11"
          )}
          aria-label={count > 0 ? `Korpa, ${count} stavki` : "Korpa"}
          aria-current={pathname === "/korpa" ? "page" : undefined}
        >
          <ShoppingBag />
          {count > 0 ? (
            <span className="absolute -top-1 -right-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-paprika px-1 text-[0.65rem] font-semibold text-white">
              {count}
            </span>
          ) : null}
        </Link>

        <a
          href={site.phoneHref}
          className={cn(
            buttonVariants({ variant: "default" }),
            "hidden h-11 px-4 sm:inline-flex"
          )}
        >
          <Phone />
          {site.phoneDisplay}
        </a>

        <a
          href={site.phoneHref}
          className={cn(
            buttonVariants({ variant: "default", size: "icon" }),
            "size-11 sm:hidden"
          )}
          aria-label={`Pozovi ${site.phoneDisplay}`}
        >
          <Phone />
        </a>

        <Sheet>
          <SheetTrigger
            className={cn(
              buttonVariants({ variant: "outline", size: "icon" }),
              "size-11 lg:hidden"
            )}
            aria-label="Otvori meni"
          >
            <Menu />
          </SheetTrigger>
          <SheetContent side="right" className="w-[min(100%,22rem)] bg-background">
            <SheetHeader>
              <SheetTitle className="font-display text-2xl">BraNo Gusto</SheetTitle>
              <SheetDescription>Prirodno. Domaće. Naše.</SheetDescription>
            </SheetHeader>
            <nav className="flex flex-col px-4" aria-label="Mobilni meni">
              {nav.map((item) => (
                <SheetClose
                  key={item.href}
                  render={
                    <Link
                      href={item.href}
                      aria-current={isCurrent(pathname, item.href) ? "page" : undefined}
                      className={cn(
                        "border-b border-border py-3 text-lg",
                        isCurrent(pathname, item.href) && "text-paprika"
                      )}
                    />
                  }
                >
                  {item.label}
                </SheetClose>
              ))}
            </nav>
            <div className="mt-auto flex flex-col gap-3 p-4">
              <a href={site.phoneHref} className={cn(buttonVariants(), "h-11")}>
                <Phone />
                {site.phoneDisplay}
              </a>
              <a
                href={site.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(buttonVariants({ variant: "outline" }), "h-11")}
              >
                Instagram {site.instagramHandle}
              </a>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
