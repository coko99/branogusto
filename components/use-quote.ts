"use client"

import { useMemo } from "react"

import { useCart } from "@/components/cart-provider"
import { quote } from "@/lib/commerce"

export function useQuote() {
  const { items, coupon } = useCart()
  return useMemo(() => quote(items, coupon), [items, coupon])
}
