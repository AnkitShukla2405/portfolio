"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import {
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  ChevronDown,
  Database,
  Server,
  Globe,
  Shield,
  Zap,
  Code2,
  ArrowRight,
  Star,
  GitBranch,
  Package,
  Layers,
  Cloud,
  Lock,
  MessageSquare,
  CreditCard,
} from "lucide-react";
import AnkitShukla from "../../public/IMG_20250917_002438_025.webp";

// ─────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────
const useIsMounted = () => {
  const [m, setM] = useState(false);
  useEffect(() => setM(true), []);
  return m;
};

const RevealonScroll = ({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// ─────────────────────────────────────────────
// Data
// ─────────────────────────────────────────────
const skills = [
  {
    category: "Frontend",
    icon: <Globe size={20} />,
    color: "from-blue-500 to-cyan-400",
    items: ["Next.js 16", "React 19", "TypeScript 5", "TailwindCSS 4", "Apollo Client", "Framer Motion", "Radix UI", "React Hook Form"],
  },
  {
    category: "Backend",
    icon: <Server size={20} />,
    color: "from-indigo-500 to-purple-500",
    items: ["Node.js", "GraphQL Yoga", "Express.js", "JWT + Argon2", "Nodemailer", "Zod Validation", "TypeScript", "REST APIs"],
  },
  {
    category: "Database & Cache",
    icon: <Database size={20} />,
    color: "from-green-500 to-emerald-400",
    items: ["MongoDB", "Mongoose ODM", "Redis 5", "Stock Lock System", "Session Store", "OTP Store", "Normalized Caching"],
  },
  {
    category: "Cloud & Infrastructure",
    icon: <Cloud size={20} />,
    color: "from-orange-500 to-amber-400",
    items: ["AWS S3", "Docker Compose", "GitHub Actions CI/CD", "Nginx", "PM2 Cluster", "Let's Encrypt", "DuckDNS", "Turborepo"],
  },
  {
    category: "Payments & Security",
    icon: <Shield size={20} />,
    color: "from-pink-500 to-rose-400",
    items: ["Stripe SDK", "Razorpay", "Webhook Idempotency", "Argon2id Hashing", "HttpOnly Cookies", "FingerprintJS", "Zod Validation"],
  },
];

const challenges = [
  {
    icon: <Lock size={18} />,
    challenge: "Race conditions on stock",
    solution: "Atomic stock reservation with Redis-backed distributed locks — zero overselling across concurrent checkouts",
  },
  {
    icon: <Shield size={18} />,
    challenge: "Secure token rotation",
    solution: "Refresh token rotation with Argon2id hashing in MongoDB + Redis to prevent token replay attacks",
  },
  {
    icon: <Zap size={18} />,
    challenge: "OTP brute-force prevention",
    solution: "Rate-limited OTP service with TTL-based Redis storage for stateless, expiry-safe session validation",
  },
  {
    icon: <Database size={18} />,
    challenge: "Order integrity",
    solution: "Immutable order snapshot service — price & product state captured atomically at purchase time",
  },
  {
    icon: <CreditCard size={18} />,
    challenge: "Webhook idempotency",
    solution: "Stripe webhook handler with event deduplication to prevent double-processing of payment events",
  },
  {
    icon: <Cloud size={18} />,
    challenge: "Presigned media uploads",
    solution: "AWS S3 presigned URL generation — direct client-to-S3 uploads, backend never handles binary data",
  },
  {
    icon: <Layers size={18} />,
    challenge: "Type-safe monorepo",
    solution: "Shared packages/types used by both apps ensures compile-time safety across the monorepo boundary",
  },
  {
    icon: <Package size={18} />,
    challenge: "Monorepo scalability",
    solution: "Turborepo-compatible npm workspaces with shared models, types, utils — zero code duplication",
  },
];

const techPillsBackend = [
  { name: "Node.js", badge: "Runtime" },
  { name: "GraphQL Yoga", badge: "API" },
  { name: "MongoDB", badge: "DB" },
  { name: "Redis", badge: "Cache" },
  { name: "JWT + Argon2", badge: "Auth" },
  { name: "Stripe SDK", badge: "Payments" },
  { name: "AWS S3", badge: "Storage" },
  { name: "Nodemailer", badge: "Email" },
  { name: "Zod 4", badge: "Validation" },
];

const techPillsFrontend = [
  { name: "Next.js 16", badge: "Framework" },
  { name: "React 19", badge: "UI" },
  { name: "Apollo Client 4", badge: "GQL" },
  { name: "TailwindCSS 4", badge: "Styling" },
  { name: "Framer Motion", badge: "Anim" },
  { name: "Radix UI", badge: "Components" },
  { name: "Stripe React", badge: "Payments" },
  { name: "Razorpay JS", badge: "Payments" },
  { name: "FingerprintJS", badge: "Security" },
];

const apis = [
  { domain: "Auth", ops: ["signup", "login", "verifyOTP", "refreshToken", "logout"] },
  { domain: "Product", ops: ["getProduct", "listProducts", "searchProducts", "createProduct"] },
  { domain: "Cart", ops: ["getCart", "addToCart", "removeFromCart", "updateCartItem"] },
  { domain: "Order", ops: ["createOrder", "getOrders", "getOrderById"] },
  { domain: "Payment", ops: ["createPaymentIntent", "confirmPayment", "POST /webhook/stripe"] },
  { domain: "Seller", ops: ["registerSeller", "getSellerProfile", "getSellerOrders"] },
  { domain: "Upload", ops: ["getPresignedUrl → S3 direct upload"] },
  { domain: "UI / Home", ops: ["getHomepageData"] },
];

// ─────────────────────────────────────────────
// Section: Hero
// ─────────────────────────────────────────────
const HeroSection = () => {
  const mounted = useIsMounted();
  const [typedText, setTypedText] = useState("");
  const texts = ["Full-Stack Engineer", "System Design Enthusiast", "GraphQL Specialist", "Cloud-Native Builder"];
  const textIndex = useRef(0);
  const charIndex = useRef(0);
  const isDeleting = useRef(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(null!);

  useEffect(() => {
    const type = () => {
      const current = texts[textIndex.current];
      if (!isDeleting.current) {
        setTypedText(current.slice(0, charIndex.current + 1));
        charIndex.current++;
        if (charIndex.current === current.length) {
          isDeleting.current = true;
          timeoutRef.current = setTimeout(type, 2000);
          return;
        }
      } else {
        setTypedText(current.slice(0, charIndex.current - 1));
        charIndex.current--;
        if (charIndex.current === 0) {
          isDeleting.current = false;
          textIndex.current = (textIndex.current + 1) % texts.length;
        }
      }
      timeoutRef.current = setTimeout(type, isDeleting.current ? 45 : 80);
    };
    timeoutRef.current = setTimeout(type, 500);
    return () => clearTimeout(timeoutRef.current);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const scrollTo = (id: string) =>
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden px-4"
    >
      {/* Background blobs */}
      {mounted && (
        <>
          <div className="absolute w-[600px] h-[600px] rounded-full bg-indigo-600/10 blur-[130px] top-[-100px] left-[-200px] animate-blob pointer-events-none" />
          <div className="absolute w-[500px] h-[500px] rounded-full bg-purple-600/10 blur-[130px] bottom-[-100px] right-[-150px] animate-blob-delay-2 pointer-events-none" />
          <div className="absolute w-[300px] h-[300px] rounded-full bg-pink-600/5 blur-[100px] top-1/2 left-1/2 -translate-x-1/2 animate-blob-delay-4 pointer-events-none" />
        </>
      )}

      {/* Grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />

      <div className="relative z-10 max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 items-center gap-12 py-28">
        {/* Left */}
        <div className="lg:col-span-7 flex flex-col items-start">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-2 px-4 py-2 mb-6 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-sm font-medium"
          >
            <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse" />
            Open to Exciting Opportunities
          </motion.div>

          {/* Name */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl sm:text-6xl lg:text-7xl font-black text-white leading-none tracking-tight mb-4"
          >
            Ankit{" "}
            <span className="animate-shimmer">Shukla</span>
          </motion.h1>

          {/* Typewriter */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-xl sm:text-2xl font-semibold text-gray-400 mb-6 h-8 flex items-center"
          >
            <span>{typedText}</span>
            <span className="ml-0.5 w-0.5 h-6 bg-indigo-400 inline-block animate-blink" />
          </motion.div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-gray-400 text-base sm:text-lg max-w-xl leading-relaxed mb-8"
          >
            I engineer production-grade web systems from database schema to
            deployed frontend — with a relentless focus on correctness,
            performance, and developer experience.
          </motion.p>

          {/* Tags */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex flex-wrap gap-2 mb-8"
          >
            {["Next.js", "GraphQL", "MongoDB", "Redis", "Stripe", "AWS S3", "TypeScript"].map((t) => (
              <span
                key={t}
                className="px-3 py-1 text-xs font-mono font-semibold bg-white/5 border border-white/10 text-gray-300 rounded-full"
              >
                {t}
              </span>
            ))}
          </motion.div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <button
              onClick={() => scrollTo("#project")}
              className="btn-gradient flex items-center gap-2 px-7 py-3.5 text-sm"
            >
              View Zynora Project <ArrowRight size={16} />
            </button>
            <a
              href="https://github.com/AnkitShukla2405"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-7 py-3.5 text-sm font-bold rounded-lg border border-white/10 bg-white/5 text-white hover:bg-white/10 hover:border-white/20 transition-all"
            >
              <Github size={16} /> GitHub Profile
            </a>
          </motion.div>

          {/* Social links */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.75 }}
            className="flex items-center gap-5 mt-8"
          >
            <a
              href="https://github.com/AnkitShukla2405"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-white transition-colors"
            >
              <Github size={20} />
            </a>
            <a
              href="https://www.linkedin.com/in/ankitshukladev"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-white transition-colors"
            >
              <Linkedin size={20} />
            </a>
            <a
              href="mailto:ankitshukla24059918@gmail.com"
              className="text-gray-500 hover:text-white transition-colors"
            >
              <Mail size={20} />
            </a>
            <div className="h-4 w-px bg-white/10" />
            <span className="text-xs text-gray-600 font-mono">@AnkitShukla2405</span>
          </motion.div>
        </div>

        {/* Right: Avatar */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="lg:col-span-5 flex justify-center lg:justify-end"
        >
          <div className="relative">
            {/* Rotating ring */}
            <div className="absolute inset-[-20px] rounded-full border border-dashed border-indigo-500/20 animate-spin-slow" />
            {/* Glow */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-indigo-500/30 to-purple-600/30 blur-2xl animate-glow-pulse" />

            <div className="relative w-60 h-60 sm:w-72 sm:h-72 lg:w-80 lg:h-80 rounded-full overflow-hidden border-2 border-white/10">
              <Image
                src={AnkitShukla}
                alt="Ankit Shukla — Full-Stack Engineer"
                fill
                sizes="320px"
                className="object-cover"
                priority
              />
            </div>

            {/* Floating badges */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute -top-4 -right-4 flex items-center gap-1.5 px-3 py-2 bg-black/80 border border-white/10 rounded-full text-xs font-semibold text-white backdrop-blur-xl"
            >
              <Star size={12} className="text-yellow-400" fill="currentColor" /> Full-Stack
            </motion.div>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 3.5, repeat: Infinity, delay: 0.5 }}
              className="absolute -bottom-4 -left-4 flex items-center gap-1.5 px-3 py-2 bg-black/80 border border-white/10 rounded-full text-xs font-semibold text-white backdrop-blur-xl"
            >
              <Code2 size={12} className="text-indigo-400" /> TypeScript
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Scroll hint */}
      {mounted && (
        <motion.button
          onClick={() => scrollTo("#about")}
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0], y: [0, 8, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, delay: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-gray-600 hover:text-gray-400 transition-colors"
        >
          <ChevronDown size={26} />
        </motion.button>
      )}
    </section>
  );
};

// ─────────────────────────────────────────────
// Section: About
// ─────────────────────────────────────────────
const AboutSection = () => (
  <section id="about" className="py-28 px-4">
    <div className="max-w-5xl mx-auto">
      <RevealonScroll>
        <p className="text-indigo-400 text-sm font-mono mb-3">{"// about_me"}</p>
        <h2 className="text-3xl sm:text-4xl font-black text-white mb-12">
          Engineering-First Mindset
        </h2>
      </RevealonScroll>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          {
            icon: <Server size={22} />,
            title: "Backend Architecture",
            desc: "I design production-grade GraphQL APIs with domain-specific resolvers, service-layer separation, and strict type safety across the entire backend.",
          },
          {
            icon: <Layers size={22} />,
            title: "Monorepo Thinking",
            desc: "Shared packages for models, types, and utils eliminate duplication and enforce API contracts — all within a Turborepo-compatible workspace.",
          },
          {
            icon: <Zap size={22} />,
            title: "Performance by Default",
            desc: "Redis for caching, direct S3 uploads, RSC pages, and Apollo normalized cache — performance is a first-class concern, not an afterthought.",
          },
        ].map((item, i) => (
          <RevealonScroll key={item.title} delay={i * 0.1}>
            <div className="glass-card p-6 h-full">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 border border-indigo-500/20 flex items-center justify-center text-indigo-400 mb-4">
                {item.icon}
              </div>
              <h3 className="font-bold text-white text-lg mb-2">{item.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
            </div>
          </RevealonScroll>
        ))}
      </div>
    </div>
  </section>
);

// ─────────────────────────────────────────────
// Section: Skills
// ─────────────────────────────────────────────
const SkillsSection = () => (
  <section
    id="skills"
    className="py-28 px-4"
    style={{ background: "var(--surface-2)" }}
  >
    <div className="max-w-6xl mx-auto">
      <RevealonScroll>
        <p className="text-indigo-400 text-sm font-mono mb-3">{"// tech_stack"}</p>
        <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">
          Skills & Technologies
        </h2>
        <p className="text-gray-400 max-w-xl mb-12">
          Built across the full spectrum — from Auth flows to payment webhooks,
          spanning 5 technical domains.
        </p>
      </RevealonScroll>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {skills.map((skill, i) => (
          <RevealonScroll key={skill.category} delay={i * 0.08}>
            <div className="glass-card p-6 h-full group">
              <div className="flex items-center gap-3 mb-4">
                <div
                  className={`w-9 h-9 rounded-lg bg-gradient-to-br ${skill.color} bg-opacity-20 flex items-center justify-center text-white opacity-80`}
                >
                  {skill.icon}
                </div>
                <span className="font-bold text-white">{skill.category}</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {skill.items.map((item) => (
                  <span
                    key={item}
                    className="px-2.5 py-1 text-xs font-mono bg-white/5 border border-white/8 text-gray-300 rounded-md transition-all group-hover:border-indigo-500/20"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </RevealonScroll>
        ))}
      </div>
    </div>
  </section>
);

// ─────────────────────────────────────────────
// Section: Zynora Project
// ─────────────────────────────────────────────
const ProjectSection = () => (
  <section id="project" className="py-28 px-4">
    <div className="max-w-6xl mx-auto">

      {/* Header */}
      <RevealonScroll>
        <p className="text-indigo-400 text-sm font-mono mb-3">{"// featured_project"}</p>
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-14">
          <div>
            <h2 className="text-3xl sm:text-4xl font-black text-white mb-2">
              ⚡ Zynora
            </h2>
            <p className="text-gray-400 text-lg italic">Commerce, Redefined. Performance, Engineered.</p>
          </div>
          <div className="flex gap-3">
            <a
              href="https://github.com/AnkitShukla2405/Zynora"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 transition-all"
            >
              <Github size={16} /> GitHub
            </a>
            <a
              href="https://zynora.duckdns.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gradient flex items-center gap-2 px-5 py-2.5 text-sm"
            >
              <ExternalLink size={16} /> Live Demo
            </a>
          </div>
        </div>
      </RevealonScroll>

      {/* Hero banner */}
      <RevealonScroll>
        <div className="w-full rounded-2xl overflow-hidden bg-gradient-to-br from-indigo-900/30 via-purple-900/20 to-black border border-white/5 mb-12 relative">
          <div className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: "linear-gradient(rgba(99,102,241,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.05) 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />
          <div className="relative z-10 p-10 sm:p-16 text-center">
            <p className="text-sm text-indigo-400 font-mono mb-4">Production-grade · Multi-vendor · Monorepo</p>
            <h3 className="text-3xl sm:text-5xl font-black text-white mb-6">
              Full-Stack E-Commerce Platform
            </h3>
            <p className="text-gray-400 max-w-3xl mx-auto text-base sm:text-lg leading-relaxed mb-8">
              A multi-vendor marketplace built on a decoupled monorepo — TypeScript/GraphQL backend paired with a Next.js 16 React 19 frontend, connected via type-safe Apollo Client. Every design decision from atomic stock reservation to webhook-driven payment reconciliation was made with production reliability in mind.
            </p>
            {/* Tech badges */}
            <div className="flex flex-wrap justify-center gap-2">
              {["Next.js 16", "React 19", "GraphQL Yoga", "MongoDB", "Redis", "TypeScript 5", "Stripe", "AWS S3", "Argon2", "JWT", "Docker", "Turborepo"].map((t) => (
                <span key={t} className="px-3 py-1 text-xs font-mono rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300">
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </RevealonScroll>

      {/* Core challenges solved */}
      <RevealonScroll>
        <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
          <Zap size={18} className="text-indigo-400" /> What Made It Technically Hard
        </h3>
      </RevealonScroll>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
        {challenges.map((c, i) => (
          <RevealonScroll key={c.challenge} delay={i * 0.06}>
            <div className="glass-card p-5 h-full">
              <div className="flex items-center gap-2 mb-3 text-indigo-400">
                {c.icon}
                <span className="text-xs font-bold text-indigo-300 uppercase tracking-wide">{c.challenge}</span>
              </div>
              <p className="text-gray-400 text-xs leading-relaxed">{c.solution}</p>
            </div>
          </RevealonScroll>
        ))}
      </div>

      {/* Tech stack detail */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
        {/* Backend */}
        <RevealonScroll>
          <div className="glass-card p-6">
            <p className="text-xs font-mono text-purple-400 mb-4 uppercase tracking-widest">Backend Stack</p>
            <div className="flex flex-col gap-2">
              {techPillsBackend.map((p) => (
                <div key={p.name} className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
                  <span className="text-sm text-white font-medium">{p.name}</span>
                  <span className="px-2 py-0.5 text-xs rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300">{p.badge}</span>
                </div>
              ))}
            </div>
          </div>
        </RevealonScroll>

        {/* Frontend */}
        <RevealonScroll delay={0.1}>
          <div className="glass-card p-6">
            <p className="text-xs font-mono text-indigo-400 mb-4 uppercase tracking-widest">Frontend Stack</p>
            <div className="flex flex-col gap-2">
              {techPillsFrontend.map((p) => (
                <div key={p.name} className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
                  <span className="text-sm text-white font-medium">{p.name}</span>
                  <span className="px-2 py-0.5 text-xs rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300">{p.badge}</span>
                </div>
              ))}
            </div>
          </div>
        </RevealonScroll>
      </div>

      {/* API Domains */}
      <RevealonScroll>
        <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
          <GitBranch size={18} className="text-indigo-400" /> GraphQL API Domains
        </h3>
        <div className="glass-card p-6 overflow-x-auto">
          <table className="w-full text-sm min-w-[500px]">
            <thead>
              <tr className="border-b border-white/5">
                <th className="text-left text-xs text-gray-500 uppercase tracking-widest pb-3 w-32">Domain</th>
                <th className="text-left text-xs text-gray-500 uppercase tracking-widest pb-3">Operations</th>
              </tr>
            </thead>
            <tbody>
              {apis.map((a, i) => (
                <tr key={a.domain} className={i !== apis.length - 1 ? "border-b border-white/5" : ""}>
                  <td className="py-3 pr-4">
                    <span className="px-2 py-1 text-xs font-mono font-bold rounded bg-indigo-500/10 text-indigo-300">{a.domain}</span>
                  </td>
                  <td className="py-3">
                    <div className="flex flex-wrap gap-1.5">
                      {a.ops.map((op) => (
                        <code key={op} className="text-xs px-2 py-0.5 bg-white/5 text-gray-300 rounded border border-white/5">
                          {op}
                        </code>
                      ))}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </RevealonScroll>

      {/* Architecture note */}
      <RevealonScroll delay={0.1}>
        <div className="mt-8 glass-card p-6 bg-gradient-to-r from-indigo-900/10 to-purple-900/10">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="flex-1">
              <p className="text-white font-bold mb-1">Monorepo Architecture</p>
              <p className="text-gray-400 text-sm">
                <code className="text-indigo-300">packages/models</code> · <code className="text-indigo-300">packages/types</code> · <code className="text-indigo-300">packages/utils</code> — shared across both apps for compile-time safety and zero duplication.
              </p>
            </div>
            <div className="flex gap-2">
              <span className="px-3 py-1.5 text-xs font-mono rounded-lg bg-white/5 border border-white/10 text-gray-300">Turborepo</span>
              <span className="px-3 py-1.5 text-xs font-mono rounded-lg bg-white/5 border border-white/10 text-gray-300">npm workspaces</span>
            </div>
          </div>
        </div>
      </RevealonScroll>
    </div>
  </section>
);

// ─────────────────────────────────────────────
// Section: Contact
// ─────────────────────────────────────────────
const ContactSection = () => (
  <section
    id="contact"
    className="py-28 px-4 relative overflow-hidden"
    style={{ background: "var(--surface-2)" }}
  >
    <div className="absolute inset-0 pointer-events-none">
      <div className="absolute w-[500px] h-[500px] rounded-full bg-indigo-600/8 blur-[120px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
    </div>

    <div className="relative z-10 max-w-3xl mx-auto text-center">
      <RevealonScroll>
        <p className="text-indigo-400 text-sm font-mono mb-4">{"// get_in_touch"}</p>
        <h2 className="text-3xl sm:text-5xl font-black text-white mb-4">
          Let&apos;s Build Something <span className="gradient-text">Remarkable</span>
        </h2>
        <p className="text-gray-400 text-base sm:text-lg mb-12 leading-relaxed">
          I&apos;m open to exciting full-stack opportunities. Whether it&apos;s a conversation about
          a role, a project, or just engineering — my inbox is open.
        </p>
      </RevealonScroll>

      <RevealonScroll delay={0.15}>
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <a
            href="mailto:ankitshukla24059918@gmail.com"
            className="btn-gradient flex items-center justify-center gap-2 px-8 py-4 text-sm"
          >
            <Mail size={18} /> Say Hello
          </a>
          <a
            href="https://www.linkedin.com/in/ankitshukladev"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 px-8 py-4 text-sm font-bold rounded-lg border border-white/10 bg-white/5 text-white hover:bg-white/10 transition-all"
          >
            <Linkedin size={18} /> LinkedIn
          </a>
        </div>

        {/* Link cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mx-auto max-w-xl">
          {[
            { icon: <Github size={20} />, label: "GitHub", value: "@AnkitShukla2405", href: "https://github.com/AnkitShukla2405" },
            { icon: <Linkedin size={20} />, label: "LinkedIn", value: "in/ankitshukladev", href: "https://www.linkedin.com/in/ankitshukladev" },
            { icon: <MessageSquare size={20} />, label: "Email", value: "Let's talk", href: "mailto:ankitshukla24059918@gmail.com" },
          ].map((l) => (
            <a
              key={l.label}
              href={l.href}
              target={l.href.startsWith("mailto") ? undefined : "_blank"}
              rel="noopener noreferrer"
              className="glass-card p-5 flex flex-col items-center gap-2 text-center hover:scale-105 transition-transform"
            >
              <span className="text-indigo-400">{l.icon}</span>
              <span className="text-xs text-gray-500 uppercase tracking-wide">{l.label}</span>
              <span className="text-xs font-mono text-white">{l.value}</span>
            </a>
          ))}
        </div>
      </RevealonScroll>
    </div>
  </section>
);

// ─────────────────────────────────────────────
// Footer
// ─────────────────────────────────────────────
const Footer = () => (
  <footer className="py-8 px-4 border-t border-white/5">
    <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
      <div className="flex items-center gap-2">
        <div className="w-6 h-6 rounded-md bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
          <Code2 size={12} className="text-white" />
        </div>
        <span className="text-sm font-bold text-white">Ankit Shukla</span>
      </div>
      <p className="text-sm text-gray-600">
        Built with Next.js 15 · React 19 · TailwindCSS 4 · Framer Motion
      </p>
      <p className="text-sm text-gray-600">© 2026 · ISC License</p>
    </div>
  </footer>
);

// ─────────────────────────────────────────────
// Main export
// ─────────────────────────────────────────────
export default function Home() {
  return (
    <main className="flex flex-col">
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <ProjectSection />
      <ContactSection />
      <Footer />
    </main>
  );
}