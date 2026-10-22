import { cookies } from "next/headers"

import { ComingSoon } from "@/components/site-entry"
import { ENTRY_COOKIE } from "@/lib/entry"

export async function EntrySwitch({ children }: { children: React.ReactNode }) {
  const jar = await cookies()
  if (jar.get(ENTRY_COOKIE)?.value === "da") return children
  return <ComingSoon />
}
