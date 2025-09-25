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
  title: "Ankit Shukla | Portfolio",
  description:
    "Full Stack Developer Portfolio of Ankit Shukla — Building modern apps with Next.js, Tailwind CSS, and scalable backend systems.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
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