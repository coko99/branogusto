"use client"

import { useState } from "react"

import { Confetti } from "@/components/confetti"
import { useQuote } from "@/components/use-quote"
import { FREE_SHIPPING_RSD } from "@/lib/commerce"
import { formatRsd } from "@/lib/site"
import { cn } from "cn"

export function ShippingMeter({
  prominent = false,
  compact = false,
}: {
  prominent?: boolean
  compact?: boolean
}) {
  const { total, gap, progress, freeShipping, lines } = useQuote()
  if (lines.length === 0) return null

  const label = freeShipping
    ? "Besplatna dostava je aktivirana."
    : `Još ${formatRsd(gap)} do besplatne dostave.`

  const bar = (
    <div
      className={cn("overflow-hidden rounded-full bg-[#e7dccb]", compact ? "h-2 min-w-16 flex-1" : "mt-2 h-2.5")}
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={FREE_SHIPPING_RSD}
      aria-valuenow={Math.min(total, FREE_SHIPPING_RSD)}
      aria-label="Napredak do besplatne dostave"
    >
      <div
        className={cn("h-full rounded-full transition-[width] duration-500", freeShipping ? "bg-leaf" : "bg-paprika")}
        style={{ width: `${Math.round(progress * 100)}%` }}
      />
    </div>
  )

  if (compact) {
    return (
      <div className="flex items-center gap-3">
        <p className={cn("shrink-0 text-xs font-semibold whitespace-nowrap sm:text-sm", freeShipping ? "text-leaf" : "text-[#16324a]")}>
          {label}
        </p>
        {bar}
      </div>
    )
  }

  return (
    <div className={cn(prominent && "rounded-2xl border border-border bg-card p-4")}>
      <div className="flex items-baseline justify-between gap-3">
        <p className={cn("font-medium", freeShipping ? "text-leaf" : "text-foreground")}>{label}</p>
        <p className="shrink-0 text-xs text-muted-foreground">{formatRsd(FREE_SHIPPING_RSD)}</p>
      </div>
      {bar}
      <p className="mt-2 text-xs leading-5 text-muted-foreground">
        {freeShipping
          ? "Prag je pređen. Dostavu poštom ne računamo."
          : "Preko 5.000 RSD šaljemo poštom bez dostave. Traka gleda vrednost posle popusta."}
      </p>
    </div>
  )
}

export function ShippingStrip() {
  const { total, lines } = useQuote()
  const [seenTotal, setSeenTotal] = useState(total)
  const [burst, setBurst] = useState(false)

  if (total !== seenTotal) {
    setSeenTotal(total)
    if (seenTotal < FREE_SHIPPING_RSD && total >= FREE_SHIPPING_RSD) setBurst(true)
    if (total < FREE_SHIPPING_RSD) setBurst(false)
  }

  return (
    <>
      {burst ? <Confetti onDone={() => setBurst(false)} /> : null}
      {lines.length === 0 ? null : (
        <div className="border-t border-[#d5e2ee] bg-[#e7eef4]">
          <div className="mx-auto w-full max-w-6xl px-4 py-2 sm:px-6">
            <ShippingMeter compact />
          </div>
        </div>
      )}
    </>
  )
}
