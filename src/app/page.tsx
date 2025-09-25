// app/page.js

"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import { FaArrowDown, FaGithub, FaExternalLinkAlt, FaDownload } from "react-icons/fa";
import { Briefcase } from "lucide-react";

// --- COMPONENT IMPORT ---
import { ProjectCard } from "../../component/ProjectCard"

// --- IMAGE IMPORTS ---
import Ebookhub from "../../public/Screenshot 2025-09-23 at 10.38.18 AM.png"
import AnkitShukla from "../../public/IMG_20250917_002438_025.webp";
import ReactLogo from "../../public/react-1.svg";
import TypeScriptLogo from "../../public/typescriptlogo.svg";
import JavaScriptLogo from "../../public/javascript.png";
import NextJSLogo from "../../public/nextjs.png";
import CPLogo from "../../public/c.svg";
import NodeJSLogo from "../../public/1012817_code_development_logo_nodejs_icon.png";
import MongoDBLogo from "../../public/mongodb.svg";

const InfiniteScroller = ({ items }) => {
  // (Your InfiniteScroller component code remains unchanged)
  return (
    <div className="w-full inline-flex flex-nowrap overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)]">
      <ul className="flex items-center justify-center md:justify-start [&_li]:mx-8 [&_img]:max-w-none animate-infinite-scroll">
        {items.map((item, index) => (
          <li key={index}>
            <Image src={item.src} alt={item.alt} width={64} height={64} className="h-16 w-16 transition-transform duration-300 hover:scale-110" />
          </li>
        ))}
      </ul>
      <ul className="flex items-center justify-center md:justify-start [&_li]:mx-8 [&_img]:max-w-none animate-infinite-scroll" aria-hidden="true">
        {items.map((item, index) => (
          <li key={index}>
            <Image src={item.src} alt={item.alt} width={64} height={64} className="h-16 w-16 transition-transform duration-300 hover:scale-110" />
          </li>
        ))}
      </ul>
    </div>
  );
};

// --- MAIN HOME PAGE COMPONENT ---
export default function Home() {
  const techStack = [
    { src: ReactLogo, alt: "React" },
    { src: TypeScriptLogo, alt: "TypeScript" },
    { src: NextJSLogo, alt: "Next.js" },
    { src: JavaScriptLogo, alt: "JavaScript" },
    { src: CPLogo, alt: "C++" },
    { src: NodeJSLogo, alt: "Node.js" },
    { src: MongoDBLogo, alt: "MongoDB" },
  ];

  // We only feature one project on the home page now
  const featuredProject = {
      title: "EbookHub - Digital Novel Publishing",
      description: "A full-featured web platform to read novels, upload your own stories, and unlock premium features for authors.",
      imgSrc: Ebookhub,
      tags: ["Node js", "React", "MongoDB", "Stripe API", "Tailwind CSS", "Express js"],
      liveLink: "#",
      repoLink: "#",
  };

  // Animation variants
  const fadeIn = (delay) => ({
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay } },
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
  };

  return (
    <main className="flex flex-col bg-black">
      {/* ===== Hero Section ===== */}
      <section className="relative w-full min-h-screen flex items-center justify-center bg-black text-white px-4 sm:px-6 overflow-hidden">
        {/* Background Glows */}
        <motion.div
          animate={{ x: [-100, 100, -100], y: [-50, 50, -50], rotate: [0, 180, 0] }}
          transition={{ duration: 40, repeat: Infinity, repeatType: "mirror" }}
          className="absolute top-0 left-0 w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[150px]"
        />
        <motion.div
          animate={{ x: [100, -100, 100], y: [50, -50, 50], rotate: [0, -180, 0] }}
          transition={{ duration: 35, repeat: Infinity, repeatType: "mirror", delay: 5 }}
          className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[150px]"
        />

        <div className="relative z-10 max-w-7xl w-full grid grid-cols-1 md:grid-cols-12 items-center gap-8">
          {/* Left Content */}
          <div className="md:col-span-8 flex flex-col items-center md:items-start text-center md:text-left">
            <motion.h1
              variants={fadeIn(0.2)}
              initial="hidden"
              animate="visible"
              className="font-extrabold text-4xl sm:text-5xl md:text-6xl lg:text-7xl bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500 pb-2"
            >
              Ankit Shukla
            </motion.h1>

            <motion.div variants={fadeIn(0.4)} initial="hidden" animate="visible" className="h-10 sm:h-12 mt-2">
              <TypeAnimation
                sequence={[ "Full Stack Developer", 2000, "Creative Problem Solver", 2000, "Lifelong Learner", 2000 ]}
                wrapper="h2"
                speed={50}
                className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-300"
                repeat={Infinity}
              />
            </motion.div>

            <motion.p variants={fadeIn(0.6)} initial="hidden" animate="visible" className="text-gray-400 text-base md:text-lg max-w-xl mt-4 leading-relaxed">
              Building seamless digital experiences from concept to deployment. I specialize in turning complex problems into elegant, high-performance web applications.
            </motion.p>

            <motion.div variants={fadeIn(0.8)} initial="hidden" animate="visible" className="flex flex-col sm:flex-row gap-4 mt-8">
              <Link
                href="/projects" // <-- UPDATED LINK
                className="flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold transition-all transform hover:scale-105 shadow-lg shadow-blue-600/30"
              >
                <Briefcase size={20} />
                View My Work
              </Link>
              <Link
                href="/resume.pdf"
                download
                className="flex items-center justify-center gap-2 px-6 py-3 rounded-lg border border-gray-700 bg-gray-900/50 hover:bg-gray-800/50 text-gray-300 font-bold transition-all transform hover:scale-105"
              >
                <FaDownload />
                Download Resume
              </Link>
            </motion.div>
          </div>

          {/* Right Image */}
          <motion.div variants={fadeIn(0.5)} initial="hidden" animate="visible" className="md:col-span-4 flex justify-center items-center">
            <div className="relative group w-[250px] h-[250px] sm:w-[300px] sm:h-[300px] md:w-[350px] md:h-[350px]">
              <div className="absolute -inset-1 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full blur-lg opacity-60 group-hover:opacity-90 transition-opacity duration-500 animate-pulse"></div>
              <Image
                src={AnkitShukla}
                alt="Ankit Shukla"
                layout="fill"
                objectFit="cover"
                className="relative rounded-full border-4 border-gray-800"
                priority
              />
            </div>
          </motion.div>
        </div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0], y: 20 }}
          transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <FaArrowDown className="text-gray-500" />
        </motion.div>
      </section>

      {/* ===== Tech Stack Section ===== */}
      <section className="py-24 bg-gray-950">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <h2 className="font-bold text-3xl sm:text-4xl text-white mb-4">The Tools I Use</h2>
              <p className="text-gray-400 md:text-lg max-w-2xl mx-auto mb-12">
                My expertise spans across the MERN stack and beyond, enabling me to build robust and scalable applications.
              </p>
            </motion.div>
            <InfiniteScroller items={techStack} />
          </div>
      </section>

      {/* ===== Featured Projects Section ===== */}
      <section id="projects" className="py-24 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="font-bold text-3xl sm:text-4xl text-white mb-4">Featured Project</h2>
              <p className="text-gray-400 md:text-lg max-w-2xl mx-auto">
                Here is one of my recent projects. Want to see more?
              </p>
            </motion.div>

            {/* Displaying only the featured project */}
            <div className="max-w-2xl mx-auto">
                <ProjectCard {...featuredProject} />
            </div>

            {/* Button to view all projects */}
            <motion.div 
                className="text-center mt-12"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
            >
                <Link 
                    href="/projects"
                    className="inline-block px-8 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold transition-all transform hover:scale-105 shadow-lg shadow-blue-600/30"
                >
                    View All Projects
                </Link>
            </motion.div>
        </div>
      </section>
    </main>
  );
}