import { Blend, CookingPot, Flame, Hand, Package, Wheat } from "lucide-react"

import { Container } from "@/components/container"

const steps = [
  { icon: Wheat, title: "Njiva" },
  { icon: Flame, title: "Vatra" },
  { icon: Hand, title: "Kora" },
  { icon: Blend, title: "Mlin" },
  { icon: CookingPot, title: "Šerpa" },
  { icon: Package, title: "Tegla" },
]

export function AjvarProcess() {
  return (
    <section className="border-y border-border bg-cream py-8 md:py-10" aria-label="Od paprike do tegle">
      <Container>
        <h2 className="text-center text-2xl sm:text-3xl">Od paprike do tegle</h2>
        <ol className="mt-6 grid grid-cols-3 gap-4 sm:grid-cols-6">
          {steps.map((step) => (
            <li key={step.title} className="step-reveal flex flex-col items-center gap-2 text-center">
              <span className="flex size-14 items-center justify-center rounded-full bg-[#16324a] text-white shadow-[0_8px_20px_rgba(22,50,74,0.18)]">
                <step.icon className="size-5" aria-hidden="true" />
              </span>
              <span className="text-sm font-semibold">{step.title}</span>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  )
}
