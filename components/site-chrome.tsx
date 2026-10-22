"use client"

import { useLayoutEffect } from "react"

import { ShippingStrip } from "@/components/shipping-meter"
import { SiteHeader } from "@/components/site-header"
import { useQuote } from "@/components/use-quote"

export function SiteChrome() {
  const { lines } = useQuote()
  const offset = lines.length > 0 ? "7.65rem" : "4.5rem"

  useLayoutEffect(() => {
    document.documentElement.style.setProperty("--header-offset", offset)
  }, [offset])

  return (
    <div className="sticky top-0 z-40 border-b border-border/80 bg-background/95 backdrop-blur-md">
      <SiteHeader />
      <ShippingStrip />
    </div>
  )
}
