import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "../../component/Navbar";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://ankitshukla.dev"),
  title: {
    default: "Ankit Shukla — Full-Stack Engineer",
    template: "%s | Ankit Shukla",
  },
  description:
    "Portfolio of Ankit Shukla — Full-Stack Engineer specializing in Next.js, GraphQL, MongoDB, Redis, TypeScript, and cloud-native architectures. Creator of Zynora, a production-grade multi-vendor e-commerce platform.",
  keywords: [
    "Ankit Shukla",
    "Full Stack Developer",
    "Full Stack Engineer",
    "Next.js Developer",
    "GraphQL Developer",
    "TypeScript",
    "MongoDB",
    "Redis",
    "Zynora",
    "Backend Engineer",
    "React Developer",
    "Node.js",
    "AWS S3",
    "Stripe",
    "Portfolio",
  ],
  authors: [{ name: "Ankit Shukla" }],
  creator: "Ankit Shukla",
  publisher: "Ankit Shukla",
  alternates: { canonical: "https://ankitshukla.dev" },
  openGraph: {
    title: "Ankit Shukla | Full-Stack Engineer",
    description:
      "Full-Stack Engineer specialized in GraphQL, Next.js, and scalable backend systems. Creator of Zynora — production-grade multi-vendor e-commerce platform.",
    url: "https://ankitshukla.dev",
    siteName: "Ankit Shukla Portfolio",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ankit Shukla | Full-Stack Engineer",
    description:
      "Portfolio of Ankit Shukla — building production-grade systems with Next.js, GraphQL, Redis, and beyond.",
  },
  icons: { icon: "/favicon.ico" },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Ankit Shukla",
              url: "https://ankitshukla.dev",
              sameAs: [
                "https://github.com/AnkitShukla2405",
                "https://www.linkedin.com/in/ankitshukladev",
              ],
              jobTitle: "Full-Stack Engineer",
              description:
                "Full-Stack Engineer specializing in Next.js, GraphQL, MongoDB, Redis, TypeScript, AWS S3, and Stripe integrations.",
              knowsAbout: [
                "Next.js",
                "React",
                "GraphQL",
                "MongoDB",
                "Redis",
                "TypeScript",
                "Node.js",
                "AWS S3",
                "Stripe",
                "Docker",
              ],
            }),
          }}
        />
      </head>
      <body className="antialiased">
        <Navbar />
        <div className="pt-0">{children}</div>
      </body>
    </html>
  );
}