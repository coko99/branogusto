import Image from "next/image"

const slides = [
  "/images/life/vocnjak.jpg",
  "/images/life/zalazak.jpg",
  "/images/life/terasa.jpg",
  "/images/life/sipurak.jpg",
  "/images/life/kajsija.jpg",
  "/images/life/njiva.jpg",
]

export function HeroSlides() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {slides.map((src, index) => (
        <div className="hero-slide" key={src}>
          <Image
            src={src}
            alt=""
            fill
            priority={index === 0}
            sizes="100vw"
            className="object-cover"
          />
        </div>
      ))}
      <div className="absolute inset-0 bg-[#16324a]/74" />
    </div>
  )
}
