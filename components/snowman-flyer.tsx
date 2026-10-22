"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { X } from "lucide-react"

const lines = [
  "Zima uskoro stiže",
  "Ostava te gleda",
  "Ljuta još čeka",
  "Uzmi pre mraza",
  "Tegla je gladna",
  "Komšija već maže",
  "Blagi zove hleb",
  "Šipurak za šolju",
  "Korpa je prazna",
  "Somborka hoće hleb",
  "Ne čekaj prvi sneg",
  "Još jedna tegla",
]

const spots = [
  { top: "calc(var(--header-offset, 4.5rem) + 0.75rem)", left: "0.75rem" },
  { top: "24vh", left: "0.75rem" },
  { top: "42vh", left: "1rem" },
  { bottom: "7.5rem", left: "0.75rem" },
  { top: "calc(var(--header-offset, 4.5rem) + 1.5rem)", left: "min(34vw, 20rem)" },
  { top: "32vh", left: "min(26vw, 14rem)" },
  { bottom: "9rem", left: "min(30vw, 16rem)" },
  { top: "50vh", left: "0.5rem" },
]

function readIndex(key: string) {
  try {
    const raw = sessionStorage.getItem(key)
    const stored = raw == null ? NaN : Number(raw)
    return Number.isInteger(stored) ? stored : -1
  } catch {
    return -1
  }
}

function nextIndex(previous: number, length: number) {
  let next = Math.floor(Math.random() * length)
  if (length > 1 && next === previous) {
    const step = 1 + Math.floor(Math.random() * (length - 1))
    next = (previous + step) % length
  }
  return next
}

export function SnowmanFlyer({ onDismiss }: { onDismiss: () => void }) {
  const [appearance] = useState(() => {
    const lineIndex = nextIndex(readIndex("branogusto-snesko-tekst"), lines.length)
    const spotIndex = nextIndex(readIndex("branogusto-snesko-mesto"), spots.length)
    return { lineIndex, spotIndex, line: lines[lineIndex], spot: spots[spotIndex] }
  })

  useEffect(() => {
    try {
      sessionStorage.setItem("branogusto-snesko-tekst", String(appearance.lineIndex))
      sessionStorage.setItem("branogusto-snesko-mesto", String(appearance.spotIndex))
    } catch {
      /* sledeće otvaranje bira nasumično */
    }
  }, [appearance])

  function dismiss() {
    delete document.documentElement.dataset.pahulja
    onDismiss()
  }

  return (
    <div className="snowman-fly" style={appearance.spot}>
      <div className="flex items-center gap-1 rounded-full border border-white/15 bg-[#16324a] py-1 pr-1 pl-2 text-white shadow-[0_14px_36px_rgba(22,50,74,0.35)]">
        <Link
          href="/proizvodi"
          className="flex items-center gap-2 py-1 pr-2 pl-1"
          aria-label={`${appearance.line}. Otvori prodavnicu.`}
        >
          <span className="snowman-bob">
            <Snowman />
          </span>
          <span className="text-sm leading-tight font-semibold whitespace-nowrap">
            {appearance.line}
          </span>
        </Link>
        <button
          type="button"
          onClick={dismiss}
          className="flex size-8 items-center justify-center rounded-full text-white/80 hover:bg-white/10 hover:text-white"
          aria-label="Skloni sneška"
        >
          <X className="size-4" />
        </button>
      </div>
    </div>
  )
}

function Snowman() {
  return (
    <svg viewBox="0 0 48 48" aria-hidden="true" className="size-9">
      <circle cx="24" cy="34" r="10" fill="#fff" />
      <circle cx="24" cy="19" r="7" fill="#fff" />
      <circle cx="21.4" cy="18.2" r="1" fill="#16324a" />
      <circle cx="26.6" cy="18.2" r="1" fill="#16324a" />
      <path d="M23.2 20.2h1.8L24 22.2z" fill="#e07a3d" />
      <rect x="15" y="11.2" width="18" height="3" rx="1" fill="#1c1410" />
      <rect x="18.5" y="6.5" width="11" height="5.2" rx="1.2" fill="#b42318" />
      <circle cx="24" cy="31" r="1" fill="#16324a" />
      <circle cx="24" cy="35.5" r="1" fill="#16324a" />
    </svg>
  )
}
