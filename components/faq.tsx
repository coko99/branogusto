"use client"

import { Accordion } from "@base-ui/react/accordion"
import { Plus } from "lucide-react"
import Link from "next/link"

import { Container } from "@/components/container"
import { faqPlain, faqs, type FaqPiece } from "@/lib/faq"

function Answer({ pieces }: { pieces: FaqPiece[] }) {
  return (
    <p>
      {pieces.map((piece, index) => {
        if (typeof piece === "string") return <span key={index}>{piece}</span>
        const className = "font-semibold text-foreground underline-offset-4 hover:underline"
        if (piece.href.startsWith("/")) {
          return (
            <Link key={index} href={piece.href} className={className}>
              {piece.label}
            </Link>
          )
        }
        return (
          <a key={index} href={piece.href} className={className}>
            {piece.label}
          </a>
        )
      })}
    </p>
  )
}

const faqLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faqPlain(item.answer),
    },
  })),
}

export function FaqSection({ heading = "h2" }: { heading?: "h1" | "h2" }) {
  const Title = heading
  return (
    <section id="pitanja" className="scroll-mt-32 border-t border-border bg-[#fffdf8] py-14 md:py-20">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <Container>
        <p className="text-xs font-semibold tracking-[0.2em] text-paprika uppercase">Pre nego što pozoveš</p>
        <Title className="mt-3 max-w-2xl text-4xl sm:text-5xl">Najčešća pitanja</Title>
        <p className="mt-3 max-w-xl text-base leading-7 text-muted-foreground">
          Porudžbina, poštarina, paketi i tegle. Ako odgovora nema ovde, javi se. Broj je na dnu.
        </p>
        <Accordion.Root
          multiple
          hiddenUntilFound
          defaultValue={["narudzba"]}
          className="mt-8 overflow-hidden rounded-3xl border border-border bg-card"
        >
          {faqs.map((item) => (
            <Accordion.Item key={item.id} value={item.id} className="border-t border-border first:border-t-0">
              <Accordion.Header className="text-xl leading-snug sm:text-2xl">
                <Accordion.Trigger className="group flex w-full items-center justify-between gap-4 px-5 py-5 text-left outline-none focus-visible:bg-[#fff8e4] sm:px-6">
                  {item.question}
                  <Plus
                    aria-hidden
                    className="size-5 shrink-0 text-paprika transition-transform duration-200 group-data-panel-open:rotate-45"
                  />
                </Accordion.Trigger>
              </Accordion.Header>
              <Accordion.Panel className="h-[var(--accordion-panel-height)] overflow-hidden transition-[height] duration-200 ease-out data-ending-style:h-0 data-starting-style:h-0">
                <div className="px-5 pb-5 text-sm leading-6 text-muted-foreground sm:px-6 sm:text-base sm:leading-7">
                  <Answer pieces={item.answer} />
                </div>
              </Accordion.Panel>
            </Accordion.Item>
          ))}
        </Accordion.Root>
      </Container>
    </section>
  )
}
