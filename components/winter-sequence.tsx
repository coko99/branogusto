"use client"

import { usePathname } from "next/navigation"
import { useCallback, useState } from "react"

import { SnowmanFlyer } from "@/components/snowman-flyer"
import { WinterIntro } from "@/components/winter-intro"

function WinterBeat() {
  const [phase, setPhase] = useState<"intro" | "snowman" | "off">("intro")
  const showSnowman = useCallback(() => setPhase("snowman"), [])
  const hideSnowman = useCallback(() => setPhase("off"), [])

  if (phase === "off") return null
  if (phase === "intro") return <WinterIntro onDone={showSnowman} />
  return <SnowmanFlyer onDismiss={hideSnowman} />
}

export function WinterSequence() {
  const pathname = usePathname()
  return <WinterBeat key={pathname} />
}
