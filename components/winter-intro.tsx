"use client"

import { useEffect, useRef, useState, useSyncExternalStore } from "react"

const words = [
  "Ajvar",
  "Blagi",
  "Ljuti",
  "Paprika",
  "Džem",
  "Šipurak",
  "Šljiva",
  "Jagoda",
  "Kajsija",
  "Somborka",
  "Aronija",
  "Borovnica",
  "Pekmez",
  "Sok",
  "Matični",
  "Filet",
  "Tegla",
  "Zimnica",
  "Ostava",
  "Hleb",
  "Kašika",
  "Sir",
  "Sendvič",
  "Žar",
  "Njiva",
  "Vatra",
  "Kora",
  "Mlin",
  "Šerpa",
  "Gutljaj",
] as const

const spin = 16

function subscribe() {
  return () => {}
}

const flakes = Array.from({ length: 26 }, (_, index) => ({
  left: `${(index * 37) % 100}%`,
  delay: `${-1 * (index % 8) * 0.7}s`,
  duration: `${6.2 + (index % 5) * 0.9}s`,
  size: 16 + (index % 4) * 8,
  drift: `${(index % 2 === 0 ? -1 : 1) * (20 + (index % 6) * 14)}px`,
}))

export function WinterIntro({ onDone }: { onDone: () => void }) {
  const done = useRef(false)
  const onClient = useSyncExternalStore(subscribe, () => true, () => false)
  const [turn] = useState(() => Math.floor(Math.random() * words.length))

  useEffect(() => {
    const panel = document.getElementById("zimski-uvod")
    if (!panel) return
    delete document.documentElement.dataset.uvod
    let handoff = 0

    function finish() {
      if (done.current) return
      done.current = true
      panel?.classList.add("is-done")
      panel?.setAttribute("aria-hidden", "true")
      if (panel?.contains(document.activeElement)) {
        ;(document.activeElement as HTMLElement).blur()
      }
      handoff = window.setTimeout(onDone, 420)
    }

    function onEnd(event: AnimationEvent) {
      if (event.target !== panel || event.animationName !== "intro-life") return
      finish()
    }

    panel.addEventListener("animationend", onEnd)
    const skip = panel.querySelector<HTMLButtonElement>("[data-skip]")
    skip?.addEventListener("click", finish)
    const fallback = window.setTimeout(finish, 2800)
    const frame = window.requestAnimationFrame(() => {
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
      if (!reduced) return
      const style = window.getComputedStyle(panel)
      if (style.visibility === "hidden" || style.opacity === "0") finish()
    })
    return () => {
      window.clearTimeout(fallback)
      window.clearTimeout(handoff)
      window.cancelAnimationFrame(frame)
      panel.removeEventListener("animationend", onEnd)
      skip?.removeEventListener("click", finish)
    }
  }, [onDone])

  return (
    <div
      id="zimski-uvod"
      className="winter-intro"
      role="dialog"
      aria-modal="true"
      aria-label="Reči iz ostave"
    >
      <div className="snowfield" aria-hidden="true">
        {flakes.map((flake) => (
          <svg
            key={`${flake.left}-${flake.delay}`}
            viewBox="0 0 24 24"
            className="snowflake"
            style={{
              left: flake.left,
              width: flake.size,
              height: flake.size,
              animationDelay: flake.delay,
              animationDuration: flake.duration,
              ["--drift" as string]: flake.drift,
            }}
          >
            <path
              d="M12 1.2v21.6M1.2 12h21.6M4.1 4.1l15.8 15.8M19.9 4.1 4.1 19.9"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <circle cx="12" cy="12" r="1.3" fill="currentColor" />
          </svg>
        ))}
      </div>
      <div className="relative z-10 grid place-items-center">
        {onClient ? (
          <div
            className="word-ring"
            style={{ animationDelay: `${(-turn * spin) / words.length}s` }}
            aria-hidden="true"
          >
            {words.map((word, index) => {
              const outer = index % 2 === 0
              const slot = Math.floor(index / 2)
              const angle = slot * (360 / 15) + (outer ? 0 : 12)
              return (
              <span
                key={word}
                className={outer ? "word-spot" : "word-spot is-inner"}
                style={{ ["--angle" as string]: `${angle}deg` }}
              >
                <span
                  className="word-upright"
                  style={{ animationDelay: `${(-turn * spin) / words.length}s` }}
                >
                  <b>{word}</b>
                </span>
              </span>
              )
            })}
          </div>
        ) : null}
        <button
          type="button"
          data-skip
          className="relative z-10 inline-flex h-12 items-center rounded-full bg-white px-6 text-sm font-semibold text-[#16324a]"
        >
          Ulazim
        </button>
      </div>
    </div>
  )
}
