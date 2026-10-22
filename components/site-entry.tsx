"use client"

import Image from "next/image"
import { useRouter } from "next/navigation"
import { useRef, useState, useTransition, type ClipboardEvent, type FormEvent, type KeyboardEvent } from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ENTRY_PIN } from "@/lib/entry"
import { unlockSite } from "@/lib/unlock"

export function ComingSoon() {
  const router = useRouter()
  const [, startTransition] = useTransition()
  const boxes = useRef<Array<HTMLInputElement | null>>([])
  const [digits, setDigits] = useState(["", "", "", ""])
  const [wrong, setWrong] = useState(false)

  function reject() {
    setWrong(true)
    setDigits(["", "", "", ""])
    boxes.current[0]?.focus()
  }

  function openWith(value: string) {
    if (value !== ENTRY_PIN) {
      reject()
      return
    }
    startTransition(async () => {
      const ok = await unlockSite(value)
      if (!ok) {
        reject()
        return
      }
      document.documentElement.dataset.ulaz = "da"
      router.refresh()
    })
  }

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    openWith(digits.join(""))
  }

  function onPaste(event: ClipboardEvent<HTMLInputElement>) {
    const text = event.clipboardData.getData("text").replace(/\D/g, "").slice(0, 4)
    if (!text) return
    event.preventDefault()
    const next = ["", "", "", ""]
    for (let index = 0; index < text.length; index += 1) next[index] = text[index]
    setDigits(next)
    setWrong(false)
    boxes.current[Math.min(text.length, 3)]?.focus()
    if (text.length === 4) openWith(text)
  }

  function onDigit(index: number, raw: string) {
    const digit = raw.replace(/\D/g, "").slice(-1)
    const next = [...digits]
    next[index] = digit
    setDigits(next)
    setWrong(false)
    if (digit && index < 3) boxes.current[index + 1]?.focus()
    if (digit && next.every((item) => item.length === 1)) openWith(next.join(""))
  }

  function onKeyDown(index: number, event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Backspace" && !digits[index] && index > 0) {
      boxes.current[index - 1]?.focus()
    }
  }

  return (
    <div className="site-gate flex min-h-dvh flex-col bg-[#f6f1e7] text-ink">
      <div className="flex flex-1 flex-col items-center justify-center px-4 py-16 text-center">
        <Image src="/images/logo.png" alt="BraNo Gusto" width={1249} height={623} priority className="h-16 w-auto" />
        <p className="mt-8 text-xs font-semibold tracking-[0.22em] text-paprika uppercase">Uskoro</p>
        <h1 className="mt-3 text-5xl sm:text-6xl">Još nije otvoreno.</h1>
        <p className="mt-4 max-w-sm text-lg leading-8 text-muted-foreground">
          Sajt je na dolasku. Ukucaj pin, pa uđi.
        </p>
        <form onSubmit={onSubmit} className="mt-8 flex flex-col items-center gap-4">
          <div className="flex gap-2" role="group" aria-label="Pin">
            {digits.map((digit, index) => (
              <Input
                key={index}
                ref={(node) => {
                  boxes.current[index] = node
                }}
                value={digit}
                onChange={(event) => onDigit(index, event.target.value)}
                onKeyDown={(event) => onKeyDown(index, event)}
                onPaste={onPaste}
                inputMode="numeric"
                autoComplete="off"
                autoFocus={index === 0}
                maxLength={1}
                aria-label={`Broj ${index + 1}`}
                aria-invalid={wrong}
                className="h-14 w-12 rounded-2xl bg-white text-center text-2xl md:text-2xl"
              />
            ))}
          </div>
          {wrong ? (
            <p role="alert" className="text-sm font-medium text-paprika">
              Taj pin ne otvara.
            </p>
          ) : (
            <p className="text-sm text-muted-foreground">Četiri broja.</p>
          )}
          <Button type="submit" className="h-12 px-6">
            Ulazim
          </Button>
        </form>
      </div>
      <div className="bg-black text-white">
        <div className="flex justify-center px-4 py-3">
          <a
            href="https://cokoladni.photo/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2.5 rounded-full outline-none focus-visible:ring-2 focus-visible:ring-[#7af7ff]"
            aria-label="Powered by čokoladni aj ti. Otvori cokoladni.photo"
          >
            <Image
              src="/images/cokoladni.png"
              alt=""
              width={320}
              height={320}
              unoptimized
              className="size-10"
            />
            <span className="leading-tight text-left">
              <span className="block text-[0.6rem] font-medium tracking-[0.18em] text-[#9adfe6] uppercase">
                Powered by
              </span>
              <span className="text-sm font-medium tracking-wide text-white">čokoladni aj ti</span>
            </span>
          </a>
        </div>
      </div>
    </div>
  )
}
