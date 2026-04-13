import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AOSInit from "@/components/AOSInit";
import BackgroundBlobs from "@/components/BackgroundBlobs";
import Script from "next/script";


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
      <body className="min-h-screen relative" suppressHydrationWarning>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-28BTL9KQ5V"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-28BTL9KQ5V');
          `}
        </Script>
        <div className="bg-image-container fixed inset-0 z-[-2]">
          <div className="absolute inset-0 bg-black/60 z-10 backdrop-blur-[2px]"></div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={`${process.env.NODE_ENV === 'production' ? '/agentic-ai-hackathon' : ''}/bg_agentic.png`} alt="Futuristic AI Background" className="w-full h-full object-cover opacity-60" />
        </div>
        <div className="noise-overlay" aria-hidden="true" />
        <AOSInit />
        <BackgroundBlobs />
        <Navbar />
        <main className="relative z-0 mt-[80px]">{children}</main>

        <Footer />
      </body>
    </html>
  );
}
