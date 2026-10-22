import Link from "next/link"

import { Container } from "@/components/container"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "cn"

export default function NotFound() {
  return (
    <Container className="flex flex-col items-start py-24">
      <p className="text-xs font-semibold tracking-[0.2em] text-paprika uppercase">404</p>
      <h1 className="mt-3 text-5xl sm:text-6xl">Ova stranica ne postoji.</h1>
      <p className="mt-4 max-w-md text-lg leading-8 text-muted-foreground">
        Traženi ukus nije na ovoj adresi. Vratite se na ponudu ili nam se javite.
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Link href="/proizvodi" className={cn(buttonVariants(), "h-11 px-5")}>
          Naši proizvodi
        </Link>
        <Link href="/" className={cn(buttonVariants({ variant: "outline" }), "h-11 px-5")}>
          Početna
        </Link>
      </div>
    </Container>
  )
}
