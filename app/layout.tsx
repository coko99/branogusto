import type { Metadata } from "next"
import { Fraunces, Outfit } from "next/font/google"

import { CartProvider } from "@/components/cart-provider"
import { ChatFab } from "@/components/chat-fab"
import { SiteChrome } from "@/components/site-chrome"
import { SiteFooter } from "@/components/site-footer"
import { WinterSequence } from "@/components/winter-sequence"
import { site } from "@/lib/site"

import "./globals.css"

const sans = Outfit({
  subsets: ["latin", "latin-ext"],
  variable: "--font-sans",
  weight: ["400", "500", "600", "700"],
})

const display = Fraunces({
  subsets: ["latin", "latin-ext"],
  variable: "--font-display",
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
})

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "BraNo Gusto — domaći ukusi",
    template: "%s — BraNo Gusto",
  },
  description: site.description,
  applicationName: site.name,
  openGraph: {
    type: "website",
    locale: "sr_RS",
    siteName: site.name,
    title: "BraNo Gusto — domaći ukusi",
    description: site.description,
    url: site.url,
  },
  twitter: {
    card: "summary_large_image",
    title: "BraNo Gusto — domaći ukusi",
    description: site.description,
  },
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: site.name,
  url: site.url,
  logo: `${site.url}/images/logo.png`,
  email: site.email,
  telephone: site.phoneSchema,
  areaServed: "RS",
  sameAs: [site.instagram],
  description: site.description,
}

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="sr"
      className={`${sans.variable} ${display.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <CartProvider>
          <WinterSequence />
          <a
            href="#sadrzaj"
            className="absolute top-4 left-4 z-[70] -translate-y-24 rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground focus:translate-y-0"
          >
            Preskoči na sadržaj
          </a>
          <SiteChrome />
          <main id="sadrzaj" className="flex-1 pb-24">
            {children}
          </main>
          <SiteFooter />
          <ChatFab />
        </CartProvider>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  )
}
