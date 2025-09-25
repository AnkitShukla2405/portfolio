"use client";

import { motion } from "framer-motion";
import { ProjectCard } from "../../../component/ProjectCard"; 
import Image from "next/image";
import Ebookhub from "../../../public/Screenshot 2025-09-23 at 10.38.18 AM.png"

export default function ProjectsPage() {
  const projectsData = [
    {
      title: "EbookHub - Digital Novel Publishing",
      description: "A full-featured web platform to read novels, upload your own stories, and unlock premium features for authors.",
      imgSrc: Ebookhub, // ✅ use public path
      tags: ["Node js", "React", "MongoDB", "Stripe API", "Tailwind CSS", "Express js"],
      liveLink: "#",
      repoLink: "#",
    },
    
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  return (
    <main className="bg-black text-white">
      <section className="py-24 sm:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h1 className="font-extrabold text-4xl sm:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500 pb-2">
              My Portfolio
            </h1>
            <p className="text-gray-400 md:text-lg max-w-2xl mx-auto mt-4">
              Here's a collection of my best work. Each project is a piece of my journey as a developer.
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {projectsData.map((project, index) => (
              <ProjectCard key={index} {...project} />
            ))}
          </motion.div>
        </div>
      </section>
    </main>
  );
}