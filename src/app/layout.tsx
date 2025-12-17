import type { Metadata } from "next";
import { Bebas_Neue, Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";

const bebas = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space",
});

export const metadata: Metadata = {
  title: "Cinematic Movie Booking",
  description: "Premium movie ticket booking experience",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${bebas.variable} ${inter.variable} ${spaceGrotesk.variable} antialiased bg-background text-text-primary font-inter`}
      >
        {children}
      </body>
    </html>
  );
}
