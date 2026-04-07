import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Muhammad Awais — AI Engineer",
    template: "%s | Muhammad Awais",
  },
  description:
    "AI Engineer building production-grade AI systems. Specializing in LLMs, RAG pipelines, multi-agent systems, and automation.",
  keywords: [
    "AI Engineer",
    "LLM",
    "RAG",
    "Next.js",
    "Machine Learning",
    "Muhammad Awais",
  ],
  authors: [{ name: "Muhammad Awais" }],
  creator: "Muhammad Awais",
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Muhammad Awais — AI Engineer",
    title: "Muhammad Awais — AI Engineer",
    description:
      "AI Engineer building production-grade AI systems. Specializing in LLMs, RAG pipelines, multi-agent systems, and automation.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Muhammad Awais — AI Engineer",
    description:
      "AI Engineer building production-grade AI systems.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased bg-bg-primary text-text-primary`}
      >
        {/* Person JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Muhammad Awais",
              jobTitle: "AI Engineer",
              description:
                "AI Engineer building production-grade AI systems including LLMs, RAG pipelines, and multi-agent orchestration.",
            }),
          }}
        />
        {children}
      </body>
    </html>
  );
}
