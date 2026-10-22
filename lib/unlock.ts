"use server"

import { cookies } from "next/headers"

import { ENTRY_COOKIE, ENTRY_PIN } from "@/lib/entry"

export async function unlockSite(pin: string) {
  if (pin !== ENTRY_PIN) return false
  const jar = await cookies()
  jar.set(ENTRY_COOKIE, "da", {
    path: "/",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 30,
  })
  return true
}
