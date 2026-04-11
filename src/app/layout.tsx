import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "IGNITRIX — Agentic AI Hackathon 2026 | KLE Technological University",
  description:
    "Build the future with autonomous AI systems. Join IGNITRIX for two days of amazing sessions and an exciting hackathon at KLE Tech — April 25–26, 2026.",
  keywords: [
    "IGNITRIX",
    "Agentic AI",
    "Hackathon",
    "KLE Tech",
    "AI Hackathon 2026",
    "Multi-Agent Systems",
    "LangChain",
    "LangGraph",
  ],
  openGraph: {
    title: "IGNITRIX — Agentic AI Hackathon 2026",
    description:
      "Two days of learning, building, and competing with autonomous AI systems.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} antialiased`}>
      <body className="min-h-screen" suppressHydrationWarning>
        <div className="noise-overlay" aria-hidden="true" />
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
