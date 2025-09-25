"use client"; // Required for hooks like usePathname and useState

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react"; // Hamburger and Close icons

// You can keep this outside the component
const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      {/* Desktop Navbar */}
      <nav className="hidden sm:flex fixed top-4 left-1/2 -translate-x-1/2 z-50">
        <div
          className="flex items-center justify-center gap-8 px-8 py-3
                        bg-black/60 backdrop-blur-lg 
                        border border-white/10 rounded-full shadow-lg"
        >
          {links.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="relative px-3 py-1 text-sm font-medium text-gray-300 hover:text-white transition-colors duration-300"
            >
              {/* Animated highlight for the active link */}
              {pathname === href && (
                <motion.span
                  layoutId="active-pill"
                  className="absolute inset-0 bg-blue-500/20 rounded-full"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              <span className="relative z-10">{label}</span>
            </Link>
          ))}
        </div>
      </nav>

      {/* Mobile Navbar */}
      <nav className="sm:hidden fixed top-0 left-0 right-0 z-50 bg-black/60 backdrop-blur-lg">
        <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
          {/* Logo/Brand Name */}
          <Link href="/" className="text-xl font-bold text-white">
            AS
          </Link>
          {/* Mobile Menu Button */}
          <button
            onClick={toggleMobileMenu}
            className="p-2 text-white transition-colors hover:text-blue-400"
            aria-label="Toggle menu"
          >
            <AnimatePresence mode="wait">
              {isMobileMenuOpen ? (
                <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
                  <X size={24} />
                </motion.div>
              ) : (
                <motion.div key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
                  <Menu size={24} />
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </div>

        {/* Mobile Menu Panel */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="absolute top-full left-0 w-full bg-black/80 border-b border-white/10"
            >
              <ul className="flex flex-col items-center p-4">
                {links.map(({ href, label }) => (
                  <li key={href} className="w-full">
                    <Link
                      href={href}
                      onClick={() => setMobileMenuOpen(false)} // Close menu on click
                      className={`block w-full text-center py-3 text-lg font-medium transition-colors ${
                        pathname === href
                          ? "text-blue-400"
                          : "text-gray-300 hover:text-white"
                      }`}
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
}