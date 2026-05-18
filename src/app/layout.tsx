import type { Metadata } from "next";
import { Inter, EB_Garamond, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import "./custom.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const ebGaramond = EB_Garamond({
  variable: "--font-eb-garamond",
  subsets: ["latin"],
});

const ibmMono = IBM_Plex_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "Crown & Vice — DWTG",
  description:
    "Every move is intentional. Join The Gambit List for early access to Crown & Vice, the debut fragrance duo from Dami Wande The Great.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${ebGaramond.variable} ${ibmMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
