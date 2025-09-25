// app/components/ProjectCard.js

"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";

// This is the same component you wrote, now in its own file.
export const ProjectCard = ({ title, description, imgSrc, tags, liveLink, repoLink }) => {
    const itemVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
    };

    return (
        <motion.div 
            variants={itemVariants}
            className="group relative flex flex-col bg-gray-900 border border-gray-800 rounded-xl overflow-hidden hover:border-blue-600 transition-all duration-300"
        >
            <div className="overflow-hidden">
                <Image
                    src={imgSrc}
                    alt={`${title} project screenshot`}
                    width={1920}
                    height={1080}
                    className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                />
            </div>
            <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
                <p className="text-gray-400 text-sm flex-grow mb-4">{description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                    {tags.map(tag => (
                        <span key={tag} className="px-3 py-1 text-xs font-medium text-blue-300 bg-blue-900/50 rounded-full">
                            {tag}
                        </span>
                    ))}
                </div>
            </div>
            <div className="p-6 pt-0 mt-auto flex items-center gap-4">
                <Link 
                    href={liveLink} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="flex items-center gap-2 text-white font-semibold text-sm hover:text-blue-400 transition-colors"
                >
                    <FaExternalLinkAlt /> Live Demo
                </Link>
                <Link 
                    href={repoLink} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="flex items-center gap-2 text-white font-semibold text-sm hover:text-blue-400 transition-colors"
                >
                    <FaGithub /> View Code
                </Link>
            </div>
        </motion.div>
    );
}