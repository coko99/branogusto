"use client"

import Image from "next/image"
import Link from "next/link"
import { Minus, Plus, Trash2 } from "lucide-react"
import { useState, type FormEvent } from "react"

import { useCart } from "@/components/cart-provider"
import { BundleOffer, GapOffer, OftenTogether } from "@/components/recommend"
import { ShippingMeter } from "@/components/shipping-meter"
import { Button, buttonVariants } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useQuote } from "@/components/use-quote"
import { pickupSpots, type PickupId } from "@/lib/commerce"
import { formatRsd, site } from "@/lib/site"
import { cn } from "cn"

type Delivery = "posta" | "licno"

type ReadyOrder = {
  ime: string
  prezime: string
  telefon: string
  dostava: string
  lines: { name: string; net?: string; qty: number; amount: number }[]
  subtotal: number
  bundle: number
  couponCode: string
  couponOff: number
  total: number
  freeShipping: boolean
}

export function CartPage() {
  const { items, coupon, applyCoupon, setQty, remove, clear } = useCart()
  const quoted = useQuote()
  const [ime, setIme] = useState("")
  const [prezime, setPrezime] = useState("")
  const [telefon, setTelefon] = useState("")
  const [nacin, setNacin] = useState<Delivery>("posta")
  const [ulica, setUlica] = useState("")
  const [broj, setBroj] = useState("")
  const [grad, setGrad] = useState("")
  const [postanski, setPostanski] = useState("")
  const [mesto, setMesto] = useState<PickupId | "">("")
  const [saglasnost, setSaglasnost] = useState(false)
  const [kupon, setKupon] = useState("")
  const [kuponGreska, setKuponGreska] = useState("")
  const [greska, setGreska] = useState("")
  const [gotovo, setGotovo] = useState<ReadyOrder | null>(null)

  function onCoupon() {
    const result = applyCoupon(kupon)
    setKuponGreska(result === "invalid" ? "Taj kupon ne važi." : "")
    if (result === "ok" || result === "cleared") setKupon("")
  }

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (quoted.lines.length === 0) {
      setGreska("Korpa je prazna.")
      return
    }
    if (ime.trim().length < 2 || prezime.trim().length < 2) {
      setGreska("Unesite ime i prezime.")
      return
    }
    if (telefon.trim().length < 6) {
      setGreska("Unesite telefon da potvrdimo porudžbinu.")
      return
    }
    if (nacin === "posta" && (ulica.trim().length < 2 || broj.trim().length < 1 || grad.trim().length < 2)) {
      setGreska("Za poštu trebaju ulica, broj i grad.")
      return
    }
    if (nacin === "licno" && !mesto) {
      setGreska("Izaberite Kruševac ili Beograd.")
      return
    }
    if (!saglasnost) {
      setGreska("Potvrdite da možemo da koristimo podatke za slanje.")
      return
    }

    const spot = pickupSpots.find((item) => item.id === mesto)
    const dostava =
      nacin === "posta"
        ? `Pošta, ${ulica.trim()} ${broj.trim()}, ${postanski.trim()} ${grad.trim()}`.replace(/\s+/g, " ").trim()
        : `Lično preuzimanje, ${spot?.city ?? ""}`

    setGotovo({
      ime: ime.trim(),
      prezime: prezime.trim(),
      telefon: telefon.trim(),
      dostava,
      lines: quoted.lines.map((line) => ({
        name: line.product.name,
        net: line.product.net,
        qty: line.qty,
        amount: line.amount,
      })),
      subtotal: quoted.subtotal,
      bundle: quoted.bundle,
      couponCode: quoted.couponCode,
      couponOff: quoted.couponOff,
      total: quoted.total,
      freeShipping: quoted.freeShipping,
    })
    setGreska("")
    clear()
  }

  if (gotovo) {
    return (
      <div className="mx-auto max-w-xl">
        <p className="text-xs font-semibold tracking-[0.18em] text-paprika uppercase">Spremno</p>
        <h1 className="mt-3 text-5xl">Porudžbina je složena.</h1>
        <p className="mt-4 leading-7 text-muted-foreground">
          Slanje sa sajta još nije uključeno, pa je ne šaljemo automatski. Pozovite {site.phoneDisplay} i pročitajte ovaj spisak — tako je potvrđujemo.
        </p>
        <div className="mt-6 rounded-3xl border border-border bg-card p-5">
          <p className="font-medium">
            {gotovo.ime} {gotovo.prezime}
          </p>
          <p className="text-sm text-muted-foreground">{gotovo.telefon}</p>
          <p className="mt-2 text-sm">{gotovo.dostava}</p>
          <ul className="mt-4 grid gap-2 text-sm">
            {gotovo.lines.map((line) => (
              <li key={`${line.name}-${line.net}`} className="flex justify-between gap-3">
                <span>
                  {line.name}
                  {line.net ? `, ${line.net}` : ""} × {line.qty}
                </span>
                <span>{formatRsd(line.amount)}</span>
              </li>
            ))}
          </ul>
          <div className="mt-4 grid gap-1 border-t border-border pt-3 text-sm">
            {gotovo.bundle > 0 || gotovo.couponOff > 0 ? (
              <p className="flex justify-between text-muted-foreground">
                <span>Zbir</span>
                <span>{formatRsd(gotovo.subtotal)}</span>
              </p>
            ) : null}
            {gotovo.bundle > 0 ? (
              <p className="flex justify-between">
                <span>Paket −8%</span>
                <span>−{formatRsd(gotovo.bundle)}</span>
              </p>
            ) : null}
            {gotovo.couponOff > 0 ? (
              <p className="flex justify-between">
                <span>Kupon {gotovo.couponCode}</span>
                <span>−{formatRsd(gotovo.couponOff)}</span>
              </p>
            ) : null}
            <p className="flex justify-between font-medium">
              <span>Ukupno</span>
              <span>{formatRsd(gotovo.total)}</span>
            </p>
          </div>
          <p className="mt-2 text-sm text-muted-foreground">
            {gotovo.freeShipping ? "Besplatna dostava je u ovom iznosu." : "Dostava se dogovara uz potvrdu, prag od 5.000 RSD nije pređen."}
          </p>
        </div>
        <a href={site.phoneHref} className={cn(buttonVariants(), "mt-5 h-11 px-5")}>
          Pozovi da potvrdiš
        </a>
      </div>
    )
  }

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-xl">
        <h1 className="text-5xl">Korpa</h1>
        <p className="mt-4 leading-7 text-muted-foreground">
          Tegle još nisu u korpi. U prodavnici složite zimnicu, pa se vratite ovde na podatke za slanje.
        </p>
        <Link href="/proizvodi" className={cn(buttonVariants(), "mt-6 h-11 px-5")}>
          U prodavnicu
        </Link>
      </div>
    )
  }

  const slugs = items.map((item) => item.slug)

  return (
    <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,1fr)_22rem]">
      <div>
        <p className="text-xs font-semibold tracking-[0.18em] text-paprika uppercase">Vaša zimnica</p>
        <h1 className="mt-3 text-5xl">Korpa</h1>
        <div className="mt-6">
          <ShippingMeter prominent />
        </div>
        <ul className="mt-6 grid gap-3">
          {quoted.lines.map((line) => (
            <li key={line.product.slug} className="flex gap-3 rounded-2xl border border-border bg-card p-3">
              <div className="relative size-20 shrink-0 overflow-hidden rounded-xl bg-[#f3eadc]">
                <Image src={line.product.image} alt="" fill sizes="80px" className="object-cover" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate font-medium">{line.product.name}</p>
                <p className="text-xs text-muted-foreground">
                  {line.product.net ?? "tegla"} · {formatRsd(line.product.price)}
                </p>
                <p className="mt-1 text-sm font-semibold">{formatRsd(line.amount)}</p>
                <div className="mt-2 flex items-center gap-1">
                  <Button type="button" variant="outline" size="icon-sm" aria-label={`Smanji ${line.product.name}`} onClick={() => setQty(line.product.slug, line.qty - 1)}>
                    <Minus />
                  </Button>
                  <span className="w-6 text-center text-sm">{line.qty}</span>
                  <Button type="button" variant="outline" size="icon-sm" aria-label={`Povećaj ${line.product.name}`} onClick={() => setQty(line.product.slug, line.qty + 1)}>
                    <Plus />
                  </Button>
                  <Button type="button" variant="ghost" size="icon-sm" aria-label={`Ukloni ${line.product.name}`} onClick={() => remove(line.product.slug)}>
                    <Trash2 />
                  </Button>
                </div>
              </div>
            </li>
          ))}
        </ul>

        <BundleOffer />
        <OftenTogether slugs={slugs} />
        <GapOffer />
      </div>

      <form onSubmit={onSubmit} className="grid gap-4 rounded-3xl border border-border bg-card p-5 lg:sticky lg:top-[calc(var(--header-offset,4.5rem)+0.75rem)]" noValidate>
        <h2 className="text-2xl">Podaci za slanje</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          <Field id="ime" label="Ime" value={ime} onChange={setIme} autoComplete="given-name" />
          <Field id="prezime" label="Prezime" value={prezime} onChange={setPrezime} autoComplete="family-name" />
        </div>
        <Field id="telefon" label="Telefon" value={telefon} onChange={setTelefon} autoComplete="tel" />

        <fieldset className="grid gap-2">
          <legend className="text-sm font-medium">Način slanja</legend>
          <div className="grid gap-2">
            <Choice pressed={nacin === "posta"} onClick={() => setNacin("posta")} title="Šaljemo poštom" text="Na adresu u Srbiji" />
            <Choice pressed={nacin === "licno"} onClick={() => setNacin("licno")} title="Lično preuzimanje" text="Kruševac ili Beograd" />
          </div>
        </fieldset>

        {nacin === "posta" ? (
          <div className="grid gap-3">
            <p className="text-sm font-medium">Adresa</p>
            <div className="grid grid-cols-[1fr_6rem] gap-3">
              <Field id="ulica" label="Ulica" value={ulica} onChange={setUlica} autoComplete="address-line1" />
              <Field id="broj" label="Broj" value={broj} onChange={setBroj} autoComplete="off" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <Field id="grad" label="Grad" value={grad} onChange={setGrad} autoComplete="address-level2" />
              <Field id="postanski" label="Poštanski broj" value={postanski} onChange={setPostanski} autoComplete="postal-code" />
            </div>
          </div>
        ) : (
          <fieldset className="grid gap-2">
            <legend className="text-sm font-medium">Mesto preuzimanja</legend>
            {pickupSpots.map((spot) => (
              <Choice
                key={spot.id}
                pressed={mesto === spot.id}
                onClick={() => setMesto(spot.id)}
                title={spot.city}
                text={spot.note}
              />
            ))}
          </fieldset>
        )}

        <div className="grid gap-2 border-t border-border pt-4">
          <div className="flex gap-2">
            <div className="grid flex-1 gap-2">
              <Label htmlFor="kupon">Kupon</Label>
              <Input
                id="kupon"
                value={kupon}
                onChange={(event) => setKupon(event.target.value)}
                placeholder="Unesite kupon"
                className="h-11 bg-background px-3 text-base"
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    event.preventDefault()
                    onCoupon()
                  }
                }}
              />
            </div>
            <Button type="button" variant="outline" className="mt-7 h-11" onClick={onCoupon}>
              Primeni
            </Button>
          </div>
          {coupon ? <p className="text-sm text-leaf">Kupon {coupon} je uračunat.</p> : null}
          {kuponGreska ? (
            <p className="text-sm text-paprika" role="alert">
              {kuponGreska}
            </p>
          ) : (
            <p className="text-xs text-muted-foreground">Probajte ZIMNICA10 za 10%.</p>
          )}
        </div>

        <dl className="grid gap-1 text-sm">
          <Row label="Zbir" value={formatRsd(quoted.subtotal)} />
          {quoted.bundle > 0 ? <Row label="Paket −8%" value={`−${formatRsd(quoted.bundle)}`} /> : null}
          {quoted.couponOff > 0 ? <Row label="Kupon" value={`−${formatRsd(quoted.couponOff)}`} /> : null}
          <Row label="Dostava" value={quoted.freeShipping ? "Besplatno" : "Dogovor"} />
          <div className="mt-1 flex justify-between border-t border-border pt-2 text-base font-semibold">
            <dt>Ukupno</dt>
            <dd>{formatRsd(quoted.total)}</dd>
          </div>
        </dl>

        <label className="flex items-start gap-3 text-sm leading-6">
          <input
            type="checkbox"
            checked={saglasnost}
            onChange={(event) => setSaglasnost(event.target.checked)}
            className="mt-1 size-4 accent-[#b42318]"
          />
          <span>
            Slažem se da koristite moje podatke za slanje porudžbine.{" "}
            <Link href="/politika-privatnosti" className="font-semibold underline-offset-4 hover:underline">
              Politika privatnosti
            </Link>
          </span>
        </label>

        {greska ? (
          <p className="text-sm text-paprika" role="alert">
            {greska}
          </p>
        ) : null}

        <Button type="submit" className="h-11">
          Potvrdi porudžbinu
        </Button>
        <p className="text-xs leading-5 text-muted-foreground">
          Slanje emailom još nije povezano. Dugme slaže porudžbinu na ekranu da je potvrdite pozivom.{" "}
          <Link href="/uslovi-narudzine" className="font-semibold underline-offset-4 hover:underline">
            Uslovi naručivanja
          </Link>
        </p>
      </form>
    </div>
  )
}

function Field({
  id,
  label,
  value,
  onChange,
  autoComplete,
}: {
  id: string
  label: string
  value: string
  onChange: (value: string) => void
  autoComplete: string
}) {
  return (
    <div className="grid gap-2">
      <Label htmlFor={id}>{label}</Label>
      <Input
        id={id}
        value={value}
        autoComplete={autoComplete}
        onChange={(event) => onChange(event.target.value)}
        className="h-11 bg-background px-3 text-base"
      />
    </div>
  )
}

function Choice({
  pressed,
  onClick,
  title,
  text,
}: {
  pressed: boolean
  onClick: () => void
  title: string
  text: string
}) {
  return (
    <button
      type="button"
      aria-pressed={pressed}
      onClick={onClick}
      className={cn(
        "rounded-2xl border px-3 py-3 text-left",
        pressed ? "border-foreground bg-foreground text-background" : "border-border bg-background"
      )}
    >
      <span className="block text-sm font-semibold">{title}</span>
      <span className={cn("mt-0.5 block text-xs", pressed ? "text-background/75" : "text-muted-foreground")}>
        {text}
      </span>
    </button>
  )
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-3 text-muted-foreground">
      <dt>{label}</dt>
      <dd className="text-foreground">{value}</dd>
    </div>
  )
}
