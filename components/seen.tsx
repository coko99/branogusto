"use client"

import { useEffect, useSyncExternalStore } from "react"

import { categories, type CategorySlug } from "@/lib/site"

const KEY = "branogusto-vidjeno"
const EMPTY: CategorySlug[] = []

let cache: CategorySlug[] = EMPTY

function parse(raw: string): CategorySlug[] {
  try {
    const parsed = JSON.parse(raw) as unknown
    if (!Array.isArray(parsed)) return EMPTY
    return parsed.filter((item): item is CategorySlug =>
      categories.some((category) => category.slug === item)
    )
  } catch {
    return EMPTY
  }
}

function read() {
  try {
    return parse(localStorage.getItem(KEY) ?? "[]")
  } catch {
    return EMPTY
  }
}

function subscribe(onStoreChange: () => void) {
  window.addEventListener("branogusto-vidjeno", onStoreChange)
  window.addEventListener("storage", onStoreChange)
  return () => {
    window.removeEventListener("branogusto-vidjeno", onStoreChange)
    window.removeEventListener("storage", onStoreChange)
  }
}

function snapshot() {
  const next = read()
  const same = next.length === cache.length && next.every((item, index) => item === cache[index])
  if (!same) cache = next
  return cache
}

export function recordSeen(slug: CategorySlug) {
  const current = snapshot()
  if (current.includes(slug)) return
  const next = [...current, slug]
  cache = next
  localStorage.setItem(KEY, JSON.stringify(next))
  window.dispatchEvent(new Event("branogusto-vidjeno"))
}

export function useSeen() {
  return useSyncExternalStore(subscribe, snapshot, () => EMPTY)
}

export function RecordCategory({ slug }: { slug: CategorySlug }) {
  useEffect(() => {
    recordSeen(slug)
  }, [slug])
  return null
}
