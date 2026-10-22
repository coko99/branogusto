"use client"

import {
  createContext,
  useContext,
  useSyncExternalStore,
  type ReactNode,
} from "react"

import { coupons } from "@/lib/commerce"

export type CartItem = {
  slug: string
  qty: number
}

const STORAGE_KEY = "branogusto-korpa"
const COUPON_KEY = "branogusto-kupon"
const EMPTY: CartItem[] = []

let cachedRaw = "[]"
let cachedItems: CartItem[] = EMPTY

function parseCart(raw: string): CartItem[] {
  try {
    const parsed = JSON.parse(raw) as unknown
    if (!Array.isArray(parsed)) return EMPTY
    return parsed.flatMap((item) => {
      if (!item || typeof item !== "object") return []
      const slug = "slug" in item ? String(item.slug) : ""
      const qty = "qty" in item ? Number(item.qty) : 0
      if (!slug || !Number.isFinite(qty) || qty < 1) return []
      return [{ slug, qty: Math.min(99, Math.floor(qty)) }]
    })
  } catch {
    return EMPTY
  }
}

function readRaw() {
  try {
    return localStorage.getItem(STORAGE_KEY) ?? "[]"
  } catch {
    return "[]"
  }
}

function subscribe(onStoreChange: () => void) {
  window.addEventListener("branogusto-korpa", onStoreChange)
  window.addEventListener("storage", onStoreChange)
  return () => {
    window.removeEventListener("branogusto-korpa", onStoreChange)
    window.removeEventListener("storage", onStoreChange)
  }
}

function getSnapshot() {
  const raw = readRaw()
  if (raw !== cachedRaw) {
    cachedRaw = raw
    cachedItems = parseCart(raw)
  }
  return cachedItems
}

function write(items: CartItem[]) {
  const raw = JSON.stringify(items)
  localStorage.setItem(STORAGE_KEY, raw)
  cachedRaw = raw
  cachedItems = items
  window.dispatchEvent(new Event("branogusto-korpa"))
}

type CouponResult = "ok" | "invalid" | "cleared"

type CartContextValue = {
  items: CartItem[]
  count: number
  coupon: string
  applyCoupon: (code: string) => CouponResult
  add: (slug: string) => void
  setQty: (slug: string, qty: number) => void
  remove: (slug: string) => void
  clear: () => void
}

let couponCache = ""

function readCoupon() {
  try {
    return (localStorage.getItem(COUPON_KEY) ?? "").trim().toUpperCase()
  } catch {
    return ""
  }
}

function subscribeCoupon(onStoreChange: () => void) {
  window.addEventListener("branogusto-kupon", onStoreChange)
  window.addEventListener("storage", onStoreChange)
  return () => {
    window.removeEventListener("branogusto-kupon", onStoreChange)
    window.removeEventListener("storage", onStoreChange)
  }
}

function getCouponSnapshot() {
  const raw = readCoupon()
  if (raw !== couponCache) couponCache = raw
  return couponCache
}

function writeCoupon(code: string) {
  localStorage.setItem(COUPON_KEY, code)
  couponCache = code
  window.dispatchEvent(new Event("branogusto-kupon"))
}

function applyCoupon(code: string): CouponResult {
  const normalized = code.trim().toUpperCase()
  if (!normalized) {
    writeCoupon("")
    return "cleared"
  }
  if (!coupons[normalized]) return "invalid"
  writeCoupon(normalized)
  return "ok"
}

const CartContext = createContext<CartContextValue | null>(null)

export function CartProvider({ children }: { children: ReactNode }) {
  const items = useSyncExternalStore(subscribe, getSnapshot, () => EMPTY)
  const coupon = useSyncExternalStore(subscribeCoupon, getCouponSnapshot, () => "")

  const count = items.reduce((sum, item) => sum + item.qty, 0)

  function add(slug: string) {
    const current = getSnapshot()
    const existing = current.find((item) => item.slug === slug)
    const next = existing
      ? current.map((item) =>
          item.slug === slug ? { ...item, qty: Math.min(99, item.qty + 1) } : item
        )
      : [...current, { slug, qty: 1 }]
    write(next)
  }

  return (
    <CartContext.Provider
      value={{
        items,
        count,
        coupon,
        applyCoupon,
        add,
        setQty: (slug, qty) => {
          if (qty < 1) {
            write(getSnapshot().filter((item) => item.slug !== slug))
            return
          }
          write(
            getSnapshot().map((item) =>
              item.slug === slug ? { ...item, qty: Math.min(99, qty) } : item
            )
          )
        },
        remove: (slug) => write(getSnapshot().filter((item) => item.slug !== slug)),
        clear: () => {
          write([])
          writeCoupon("")
        },
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error("useCart mora da stoji unutar CartProvider")
  }
  return context
}
