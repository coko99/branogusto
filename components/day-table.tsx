import Link from "next/link"
import { Coffee, Moon, Sandwich, UtensilsCrossed } from "lucide-react"

import { Container } from "@/components/container"

const beats = [
  {
    time: "Jutro",
    title: "Šipurak u šolji",
    href: "/recepti/zimski-caj-od-sipurka",
    icon: Coffee,
    tone: "bg-[#f6e7a8] text-ink",
  },
  {
    time: "Ručak",
    title: "Ajvar na pasti",
    href: "/recepti/kremasta-pasta-sa-ajvarom",
    icon: UtensilsCrossed,
    tone: "bg-paprika text-white",
  },
  {
    time: "Užina",
    title: "Somborka u tortilji",
    href: "/recepti/tortilja-sa-ajvarom",
    icon: Sandwich,
    tone: "bg-leaf text-white",
  },
  {
    time: "Veče",
    title: "Borovnica u jogurtu",
    href: "/recepti/borovnica-u-jogurtu",
    icon: Moon,
    tone: "bg-[#16324a] text-white",
  },
]

export function DayTable() {
  return (
    <section className="border-y border-border bg-[#eef3f7] py-12 md:py-16">
      <Container>
        <p className="text-xs font-semibold tracking-[0.2em] text-paprika uppercase">Jedan dan, četiri tegle</p>
        <h2 className="mt-3 text-4xl sm:text-5xl">Od šolje do jogurta.</h2>
        <ol className="mt-8 grid grid-cols-2 gap-3 lg:grid-cols-4">
          {beats.map((beat) => (
            <li key={beat.time}>
              <Link
                href={beat.href}
                className="flex h-full flex-col items-start rounded-3xl border border-border bg-card p-4 transition hover:-translate-y-1 hover:shadow-[0_12px_30px_rgba(28,20,16,0.08)]"
              >
                <span className={`flex size-12 items-center justify-center rounded-2xl ${beat.tone}`}>
                  <beat.icon className="size-5" aria-hidden="true" />
                </span>
                <p className="mt-4 text-xs font-semibold tracking-[0.16em] text-muted-foreground uppercase">
                  {beat.time}
                </p>
                <h3 className="mt-1 text-2xl">{beat.title}</h3>
              </Link>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  )
}
