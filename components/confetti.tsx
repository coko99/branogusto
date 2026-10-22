"use client"

const pieces = Array.from({ length: 46 }, (_, index) => ({
  id: index,
  left: `${(index * 17) % 100}%`,
  delay: `${(index % 9) * 0.05}s`,
  duration: `${2.2 + (index % 5) * 0.16}s`,
  color: ["#b42318", "#e2b227", "#fffdf8", "#2f9a55", "#f6e4a4", "#16324a"][index % 6],
  drift: `${(index % 2 === 0 ? 1 : -1) * (18 + (index % 6) * 14)}px`,
  size: index % 4 === 0 ? 11 : 7,
}))

export function Confetti({ onDone }: { onDone: () => void }) {
  return (
    <div className="pointer-events-none fixed inset-0 z-[60] overflow-hidden" aria-hidden="true">
      {pieces.map((piece) => (
        <span
          key={piece.id}
          className="absolute top-0 block"
          style={{
            left: piece.left,
            width: piece.size,
            height: piece.size * 1.45,
            background: piece.color,
            borderRadius: piece.id % 2 === 0 ? 999 : 2,
            animation: `confetti-fall ${piece.duration} ${piece.delay} linear forwards`,
            ["--drift" as string]: piece.drift,
          }}
        />
      ))}
      <span
        className="absolute size-1"
        style={{ animation: "confetti-fall 2.8s linear forwards" }}
        onAnimationEnd={onDone}
      />
    </div>
  )
}
