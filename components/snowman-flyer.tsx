"use client"

import Link from "next/link"
import { X } from "lucide-react"

export function SnowmanFlyer({ onDismiss }: { onDismiss: () => void }) {
  function dismiss() {
    delete document.documentElement.dataset.pahulja
    onDismiss()
  }

  return (
    <div className="snowman-fly">
      <div className="flex items-center gap-1 rounded-full border border-white/15 bg-[#16324a] py-1 pr-1 pl-2 text-white shadow-[0_14px_36px_rgba(22,50,74,0.35)]">
        <Link
          href="/proizvodi"
          className="flex items-center gap-2 py-1 pr-2 pl-1"
          aria-label="Zima uskoro stiže. Otvori prodavnicu."
        >
          <span className="snowman-bob">
            <Snowman />
          </span>
          <span className="text-sm leading-tight font-semibold whitespace-nowrap">
            Zima uskoro stiže
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
