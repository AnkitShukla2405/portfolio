"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Code2 } from "lucide-react";

const links = [
  { href: "#hero", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#project", label: "Project" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleAnchor = (href: string) => {
    setIsOpen(false);
    if (href.startsWith("#")) {
      const el = document.querySelector(href);
      el?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      {/* Desktop */}
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`hidden sm:flex fixed top-4 left-1/2 -translate-x-1/2 z-50 transition-all duration-300`}
      >
        <div
          className={`flex items-center gap-1 px-5 py-2 rounded-full transition-all duration-300 ${
            scrolled
              ? "bg-black/80 backdrop-blur-xl border border-white/10 shadow-2xl shadow-black/50"
              : "bg-black/40 backdrop-blur-md border border-white/5"
          }`}
        >
          {/* Logo */}
          <Link
            href="#hero"
            onClick={() => handleAnchor("#hero")}
            className="flex items-center gap-2 mr-4 group"
          >
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Code2 size={14} className="text-white" />
            </div>
            <span className="text-sm font-bold text-white">AS</span>
          </Link>

          {links.map(({ href, label }) => (
            <button
              key={href}
              onClick={() => handleAnchor(href)}
              className="relative px-4 py-1.5 text-sm font-medium text-gray-400 hover:text-white transition-colors duration-200 rounded-full hover:bg-white/5"
            >
              {label}
            </button>
          ))}

          <a
            href="/resume.pdf"
            download
            className="ml-3 px-4 py-1.5 text-sm font-semibold text-white rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:opacity-90 hover:shadow-lg hover:shadow-indigo-500/30 transition-all"
          >
            Resume
          </a>
        </div>
      </motion.nav>

      {/* Mobile */}
      <nav className="sm:hidden fixed top-0 left-0 right-0 z-50">
        <div className="flex items-center justify-between px-4 py-3 bg-black/80 backdrop-blur-xl border-b border-white/5">
          <button
            onClick={() => handleAnchor("#hero")}
            className="flex items-center gap-2"
          >
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
              <Code2 size={14} className="text-white" />
            </div>
            <span className="font-bold text-white text-sm">Ankit Shukla</span>
          </button>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 text-gray-400 hover:text-white transition-colors"
          >
            <AnimatePresence mode="wait" initial={false}>
              {isOpen ? (
                <motion.div key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
                  <X size={22} />
                </motion.div>
              ) : (
                <motion.div key="m" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
                  <Menu size={22} />
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </div>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden bg-black/90 backdrop-blur-xl border-b border-white/5"
            >
              <ul className="flex flex-col gap-1 p-4">
                {links.map(({ href, label }) => (
                  <li key={href}>
                    <button
                      onClick={() => handleAnchor(href)}
                      className="w-full text-left py-3 px-4 text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-all font-medium"
                    >
                      {label}
                    </button>
                  </li>
                ))}
                <li className="mt-2">
                  <a
                    href="/resume.pdf"
                    download
                    className="block text-center py-3 px-4 text-white font-semibold rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600"
                  >
                    Download Resume
                  </a>
                </li>
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
}