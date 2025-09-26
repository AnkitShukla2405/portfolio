import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "../../component/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://ankitshukla.dev"),
  title: {
    default: "Ankit Shukla | Portfolio",
    template: "%s | Ankit Shukla", // for other pages like Projects, About etc.
  },
  description:
    "Full Stack Developer Portfolio of Ankit Shukla — Building modern apps with Next.js, Tailwind CSS, and scalable backend systems.",
  keywords: [
    "Ankit Shukla",
    "Shukla",
    "Portfolio",
    "Full Stack Developer",
    "Backend Developer",
    "Next.js Developer",
  ],
  authors: [{ name: "Ankit Shukla" }],
  creator: "Ankit Shukla",
  publisher: "Ankit Shukla",
  alternates: {
    canonical: "https://ankitshukla.dev",
  },

  openGraph: {
    title: "Ankit Shukla | Portfolio",
    description:
      "Showcasing projects, skills, and achievements of Ankit Shukla — Full Stack Developer.",
    url: "https://ankitshukla.dev",
    siteName: "Ankit Shukla Portfolio",
    images: [
      {
        url: "https://ankitshukla.dev/_next/static/media/IMG_20250917_002438_025.35227f98.webp",
        width: 1200,
        height: 630,
        alt: "Ankit Shukla Portfolio Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Ankit Shukla | Full Stack Developer",
    description:
      "Portfolio of Ankit Shukla — Building scalable web apps with Next.js, React, and Node.js.",
    images: [
      "https://ankitshukla.dev/_next/static/media/IMG_20250917_002438_025.35227f98.webp",
    ],
    creator: "@yourtwitterhandle", // <-- yaha apna Twitter handle daal
  },

  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* ✅ JSON-LD Structured Data for Personal Branding */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Ankit Shukla",
              url: "https://ankitshukla.dev",
              sameAs: [
                "https://github.com/ankitshukla",
                "https://www.linkedin.com/in/ankitshukla",
                "https://twitter.com/yourtwitterhandle",
              ],
              jobTitle: "Full Stack Developer",
              worksFor: {
                "@type": "Organization",
                name: "Self-employed",
              },
            }),
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gradient-to-br from-gray-950 via-black to-gray-900 text-white min-h-screen`}
      >
        {/* Navbar Fixed on Top */}
        <Navbar />

        {/* Main Content */}
        <main className="pt-15">{children}</main>
      </body>
    </html>
  );
}