"use client"

import { useState, useSyncExternalStore, type FormEvent } from "react"

import { Button, buttonVariants } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { openMailto } from "@/lib/open-mailto"
import { products, site } from "@/lib/site"
import { cn } from "cn"

type Field = "ime" | "email" | "poruka"
type Errors = Partial<Record<Field, string>>

function emptySubscribe() {
  return () => {}
}

function buildMailto(ime: string, email: string, telefon: string, poruka: string) {
  const body = [
    `Ime: ${ime}`,
    `Email: ${email}`,
    telefon ? `Telefon: ${telefon}` : null,
    "",
    poruka,
  ]
    .filter((line) => line !== null)
    .join("\n")

  return `mailto:${site.email}?subject=${encodeURIComponent("Poruka sa sajta BraNo Gusto")}&body=${encodeURIComponent(body)}`
}

function productSlug() {
  return new URLSearchParams(window.location.search).get("proizvod") ?? ""
}

export function ContactForm() {
  const slug = useSyncExternalStore(emptySubscribe, productSlug, () => "")
  const product = products.find((item) => item.slug === slug)
  const suggested = product
    ? `Zdravo, zanima me ${product.name}. Molim vas informaciju o porudžbini.`
    : ""
  const [ime, setIme] = useState("")
  const [email, setEmail] = useState("")
  const [telefon, setTelefon] = useState("")
  const [draft, setDraft] = useState<string | null>(null)
  const poruka = draft ?? suggested
  const [errors, setErrors] = useState<Errors>({})
  const [mailto, setMailto] = useState("")
  const [ready, setReady] = useState(false)

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = new FormData(event.currentTarget)
    if (String(form.get("kompanija") || "").trim()) {
      setReady(true)
      return
    }

    const next: Errors = {}
    if (ime.trim().length < 2) next.ime = "Unesite ime i prezime."
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      next.email = "Unesite ispravnu email adresu."
    }
    if (poruka.trim().length < 10) {
      next.poruka = "Napišite poruku od bar deset karaktera."
    }
    setErrors(next)
    if (Object.keys(next).length > 0) {
      setReady(false)
      return
    }

    const href = buildMailto(ime.trim(), email.trim(), telefon.trim(), poruka.trim())
    setMailto(href)
    setReady(true)
    openMailto(href)
  }

  if (ready) {
    return (
      <div className="rounded-[1.75rem] border border-border bg-card p-6 sm:p-8" role="status">
        <p className="text-xs font-semibold tracking-[0.18em] text-paprika uppercase">
          Spremno
        </p>
        <h2 className="mt-3 text-4xl">Poruka je spremna.</h2>
        <p className="mt-4 leading-7 text-muted-foreground">
          Otvorili smo vaš program za email sa porukom za {site.email}. Ako se prozor nije
          pojavio, pošaljite poruku ručno ili nas pozovite na {site.phoneDisplay}.
        </p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          {mailto ? (
            <a href={mailto} className={cn(buttonVariants(), "h-11")}>
              Otvori email ponovo
            </a>
          ) : null}
          <a href={site.phoneHref} className={cn(buttonVariants({ variant: "outline" }), "h-11")}>
            Pozovi {site.phoneDisplay}
          </a>
          <Button variant="ghost" className="h-11" onClick={() => setReady(false)}>
            Nova poruka
          </Button>
        </div>
      </div>
    )
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-4" noValidate>
      <div className="absolute -left-[9999px] h-px w-px overflow-hidden" aria-hidden="true">
        <label htmlFor="kompanija">Kompanija</label>
        <input id="kompanija" name="kompanija" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="ime">Ime i prezime</Label>
        <Input
          id="ime"
          name="ime"
          value={ime}
          onChange={(event) => setIme(event.target.value)}
          autoComplete="name"
          aria-invalid={errors.ime ? true : undefined}
          aria-describedby={errors.ime ? "ime-greska" : undefined}
          className="h-11 bg-card px-3 text-base"
          placeholder="Vaše ime"
        />
        {errors.ime ? (
          <p id="ime-greska" className="text-sm text-paprika" role="alert">
            {errors.ime}
          </p>
        ) : null}
      </div>

      <div className="grid gap-2">
        <Label htmlFor="email">Email adresa</Label>
        <Input
          id="email"
          name="email"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          autoComplete="email"
          aria-invalid={errors.email ? true : undefined}
          aria-describedby={errors.email ? "email-greska" : undefined}
          className="h-11 bg-card px-3 text-base"
          placeholder="vasa@adresa.rs"
        />
        {errors.email ? (
          <p id="email-greska" className="text-sm text-paprika" role="alert">
            {errors.email}
          </p>
        ) : null}
      </div>

      <div className="grid gap-2">
        <Label htmlFor="telefon">Telefon</Label>
        <Input
          id="telefon"
          name="telefon"
          type="tel"
          value={telefon}
          onChange={(event) => setTelefon(event.target.value)}
          autoComplete="tel"
          className="h-11 bg-card px-3 text-base"
          placeholder="Opciono"
        />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="poruka">Vaša poruka</Label>
        <Textarea
          id="poruka"
          name="poruka"
          value={poruka}
          onChange={(event) => setDraft(event.target.value)}
          aria-invalid={errors.poruka ? true : undefined}
          aria-describedby={errors.poruka ? "poruka-greska" : undefined}
          className="min-h-36 bg-card px-3 py-3 text-base"
          placeholder="Porudžbina, saradnja ili pitanje"
        />
        {errors.poruka ? (
          <p id="poruka-greska" className="text-sm text-paprika" role="alert">
            {errors.poruka}
          </p>
        ) : null}
      </div>

      <Button type="submit" className="h-11 px-5">
        Pošalji poruku
      </Button>
      <p className="text-sm leading-6 text-muted-foreground">
        Poruka se otvara u vašem programu za email i ide na {site.email}.
      </p>
    </form>
  )
}
