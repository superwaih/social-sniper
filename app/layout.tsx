import type React from "react"
import type { Metadata } from "next"
import { Pixelify_Sans, Space_Grotesk } from "next/font/google"
import "./globals.css"

const pixelifySans = Pixelify_Sans({
  variable: "--font-pixelify-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
})

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
})

export const metadata: Metadata = {
  title: "Social Sniper",
  description:
    "Detect viral meme tokens the moment they hit Twitter — and auto-buy them before the rest of the market catches on.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${pixelifySans.variable} ${spaceGrotesk.variable} antialiased font-sans`}>{children}</body>
    </html>
  )
}
 