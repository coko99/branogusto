"use client"

import { useState } from "react"
import { MessageSquare, Phone, X } from "lucide-react"

import { site } from "@/lib/site"
import { cn } from "cn"

const actions = [
  { href: "/kontakt", label: "Poruka", external: false },
  { href: site.smsHref, label: "SMS", external: false },
  { href: site.phoneHref, label: "Poziv", external: false },
  { href: site.whatsappHref, label: "WhatsApp", external: true },
  { href: site.viberHref, label: "Viber", external: false },
]

export function ChatFab() {
  const [open, setOpen] = useState(false)

  return (
    <div className="fixed right-4 bottom-4 z-40 flex flex-col items-end gap-2 sm:right-6 sm:bottom-6">
      {open ? (
        <ul className="mb-1 grid gap-2 rounded-3xl border border-border bg-card p-3 shadow-[0_18px_50px_rgba(28,20,16,0.18)]">
          {actions.map((action) => (
            <li key={action.label}>
              <a
                href={action.href}
                {...(action.external
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
                className="flex items-center gap-3 rounded-2xl px-3 py-2 text-sm font-medium hover:bg-muted"
                onClick={() => setOpen(false)}
              >
                <ActionIcon label={action.label} />
                {action.label}
              </a>
            </li>
          ))}
        </ul>
      ) : null}
      <button
        type="button"
        className={cn(
          "flex size-14 items-center justify-center rounded-full bg-paprika text-white shadow-[0_12px_30px_rgba(180,35,24,0.35)]",
          "focus-visible:ring-3 focus-visible:ring-ring/50"
        )}
        aria-expanded={open}
        aria-label={open ? "Zatvori razgovor" : "Otvori razgovor"}
        onClick={() => setOpen((value) => !value)}
      >
        {open ? <X /> : <MessageSquare />}
      </button>
    </div>
  )
}

function ActionIcon({ label }: { label: string }) {
  if (label === "SMS") return <SmsIcon />
  if (label === "Poziv") return <Phone className="size-4" />
  if (label === "WhatsApp") return <WhatsAppIcon />
  if (label === "Viber") return <ViberIcon />
  return <MessageSquare className="size-4" />
}

function SmsIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="size-4 fill-current">
      <path d="M4 5.5A2.5 2.5 0 0 1 6.5 3h11A2.5 2.5 0 0 1 20 5.5v8A2.5 2.5 0 0 1 17.5 16H9.2L5 19.4c-.4.3-1 .1-1-.5V5.5Zm3.2 3.2v1.6h9.6V8.7H7.2Zm0 3.2v1.5h6.4v-1.5H7.2Z" />
    </svg>
  )
}

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="size-4 fill-[#128C7E]">
      <path d="M12.04 3C7.31 3 3.48 6.83 3.48 11.56c0 1.5.39 2.96 1.14 4.25L3 21l5.34-1.4a8.5 8.5 0 0 0 3.7.84h.01c4.73 0 8.56-3.83 8.56-8.56C20.6 6.83 16.77 3 12.04 3Zm4.96 12.12c-.2.58-1.18 1.1-1.64 1.16-.42.06-.96.08-1.55-.1-.36-.1-.82-.26-1.41-.51-2.48-1.07-4.1-3.57-4.22-3.74-.12-.16-1-1.33-1-2.54s.63-1.8.86-2.05c.22-.24.48-.3.64-.3h.46c.15 0 .35-.06.54.41.2.5.68 1.72.74 1.84.06.12.1.27.02.43-.08.16-.12.27-.24.41-.12.14-.25.32-.36.43-.12.12-.24.24-.1.47.14.24.62 1.02 1.33 1.66.92.82 1.69 1.07 1.93 1.19.24.12.38.1.52-.06.14-.16.6-.7.76-.94.16-.24.32-.2.54-.12.22.08 1.4.66 1.64.78.24.12.4.18.46.28.06.1.06.58-.14 1.16Z" />
    </svg>
  )
}

function ViberIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="size-4 fill-[#7360F2]">
      <path d="M12.1 2.2c-4.7.3-8.3 3.6-8.6 8.3-.2 2.4.5 4.5 1.8 6.2L4.2 21.2c-.2.5.3 1 .8.8l4.4-1.6c.9.3 1.8.5 2.8.5 5 0 9.1-4 9.1-9.1 0-4.6-3.4-8.6-8-9.4-.4-.1-.8-.1-1.2-.2Zm.5 3.2c3.4.4 6.1 3.3 6.2 6.8.1 3.6-2.7 6.6-6.3 6.6-.9 0-1.7-.2-2.5-.5l-.4-.2-2.6 1 .8-2.5-.2-.4c-1.1-1.4-1.6-3-1.5-4.7.3-3.6 3.2-6.5 6.5-6.1Zm-2.2 2.8c-.2 0-.4.1-.6.3-.3.4-.9 1.1-.9 2.2 0 1.1.7 2.2.8 2.4.1.2 1.5 2.4 3.7 3.3 1.8.7 2.2.6 2.6.5.4-.1 1.2-.5 1.4-1 .2-.5.2-.9.1-1-.1-.1-.3-.2-.6-.3l-1.2-.6c-.3-.1-.5-.1-.7.2l-.5.6c-.1.2-.3.2-.5.1-.3-.1-1.1-.4-2-1.3-.8-.7-1.3-1.6-1.4-1.9-.1-.2 0-.4.1-.5l.4-.5c.1-.2.2-.3.2-.5 0-.2-.6-1.5-.8-2-.2-.4-.4-.4-.6-.4h-.5Z" />
    </svg>
  )
}
