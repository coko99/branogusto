import Image from "next/image"

import { cn } from "cn"

export function BlurPhoto({
  src,
  tint = "dark",
}: {
  src: string
  tint?: "dark" | "light"
}) {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      <Image src={src} alt="" fill sizes="100vw" className="scale-110 object-cover blur-md" />
      <div
        className={cn(
          "absolute inset-0",
          tint === "dark" ? "bg-[#16324a]/78" : "bg-[#f6f1e7]/84"
        )}
      />
    </div>
  )
}
