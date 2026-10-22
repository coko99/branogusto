"use client"

import { useEffect, useRef } from "react"

const flakes = Array.from({ length: 26 }, (_, index) => ({
  left: `${(index * 37) % 100}%`,
  delay: `${-1 * (index % 8) * 0.7}s`,
  duration: `${6.2 + (index % 5) * 0.9}s`,
  size: 16 + (index % 4) * 8,
  drift: `${(index % 2 === 0 ? -1 : 1) * (20 + (index % 6) * 14)}px`,
}))

export function WinterIntro({ onDone }: { onDone: () => void }) {
  const done = useRef(false)

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
      aria-labelledby="uvod-naslov"
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
      <div className="relative z-10 mx-auto max-w-xl px-6 text-center">
        <p className="text-xs font-semibold tracking-[0.22em] text-[#d7e6f5] uppercase">
          Pahulje već vežbaju
        </p>
        <h2 id="uvod-naslov" className="mt-4 text-5xl text-white sm:text-6xl">
          Zima uskoro stiže.
        </h2>
        <p className="mt-4 text-lg leading-8 text-white/85">
          Zimnica treba da se spremi pre nego što prozor pobeli. Ajvar, džem i somborka ne čekaju
          prvi mraz — mi jesmo spremni.
        </p>
        <button
          type="button"
          data-skip
          className="mt-8 inline-flex h-12 items-center rounded-full bg-white px-6 text-sm font-semibold text-[#16324a]"
        >
          Ulazim, ostava je spremna
        </button>
      </div>
    </div>
  )
}
