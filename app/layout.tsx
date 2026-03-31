import type React from "react"
import type { Metadata } from "next"

import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { Inter as V0_Font_Inter, Space_Grotesk as V0_Font_Space_Grotesk, Geist_Mono as V0_Font_Geist_Mono } from 'next/font/google'

// Initialize fonts
const _inter = V0_Font_Inter({ subsets: ["latin"], weight: ["300", "400", "500", "600", "700"], variable: "--font-inter" })
const _spaceGrotesk = V0_Font_Space_Grotesk({ subsets: ["latin"], weight: ["500", "600", "700"], variable: "--font-heading" })
const _geistMono = V0_Font_Geist_Mono({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-mono"
})

export const metadata: Metadata = {
  title: "CheerLoop - Support Your Runners",
  description: "Coordinate with friends and family to support runners at races",
  generator: "v0.app",
  viewport: {
    width: "device-width",
    initialScale: 1,
    viewportFit: "cover",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`font-sans antialiased ${_inter.variable} ${_spaceGrotesk.variable} ${_geistMono.variable}`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
