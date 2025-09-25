import Image from "next/image";
import AnkitShukla from "../../../public/IMG_20250917_002438_025.webp";
// Import icons
import { FaGithub, FaLinkedin, FaTwitter, FaNodeJs } from "react-icons/fa";
import { SiNextdotjs, SiTypescript, SiJavascript, SiMongodb, SiCplusplus } from "react-icons/si";
import Link from "next/link";
export default function About() {
    // Tech stack data for easy mapping
    const techStack = [
        { icon: <SiNextdotjs />, name: "Next.js" },
        { icon: <SiTypescript />, name: "TypeScript" },
        { icon: <SiJavascript />, name: "JavaScript" },
        { icon: <FaNodeJs />, name: "Node.js" },
        { icon: <SiMongodb />, name: "MongoDB" },
        { icon: <SiCplusplus />, name: "C++" },
    ];

    return (
        <section className="min-h-screen w-full flex items-center justify-center bg-black bg-grid-white/[0.05] relative overflow-hidden px-4 md:px-8 py-24">
            {/* Background radial gradient for a subtle glow */}
            <div className="absolute pointer-events-none inset-0 flex items-center justify-center bg-black [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>

            <div className="container mx-auto flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-16 z-10">
                
                {/* ====== Image Section ====== */}
                {/* Added an animation group for a staggered effect */}
                <div 
                    className="group relative flex-shrink-0 animate-fade-in-up"
                    style={{ animationDelay: '0.4s', animationFillMode: 'backwards' }}
                >
                    <div className="relative w-72 h-72 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-slate-800 shadow-2xl transition-all duration-500 group-hover:scale-105">
                        <Image
                            src={AnkitShukla}
                            alt="Ankit Shukla"
                            layout="fill"
                            objectFit="cover"
                            className="transition-transform duration-500 group-hover:scale-110"
                            priority
                        />
                    </div>
                    {/* Refined Glow Effect */}
                    <div className="absolute -inset-2 rounded-full bg-blue-500/50 blur-2xl opacity-40 group-hover:opacity-70 transition-opacity duration-500"></div>
                </div>

                {/* ====== Text Section ====== */}
                <div 
                    className="flex-1 max-w-xl text-center lg:text-left animate-fade-in-up" 
                    style={{ animationFillMode: 'backwards' }}
                >
                    <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-2">
                        Ankit Shukla
                    </h1>
                    <h2 className="text-xl md:text-2xl font-medium text-blue-400 mb-6">
                        Full Stack Developer
                    </h2>
                    
                    <p className="text-gray-300 text-base md:text-lg leading-relaxed mb-8">
                        I build modern, scalable, and efficient applications with a passion for clean code and user-centric design. From freelance projects to dynamic team environments, I thrive on solving diverse challenges and delivering high-value digital experiences.
                    </p>

                    {/* Tech Stack Icons */}
                    <div className="mb-8">
                        <h3 className="text-lg font-semibold text-gray-200 mb-4">My Tech Stack</h3>
                        <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
                            {techStack.map((tech) => (
                                <div key={tech.name} className="flex items-center gap-2 bg-gray-800/50 border border-gray-700 px-3 py-2 rounded-lg text-gray-300 hover:text-white hover:bg-gray-800 transition-colors">
                                    {tech.icon}
                                    <span>{tech.name}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                    
                    {/* Socials and CTA */}
                    <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                        <a 
                            href="/projects"
                            className="inline-block w-full sm:w-auto px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105"
                        >
                            View My Work
                        </a>
                        <div className="flex items-center gap-4 mt-4 sm:mt-0">
                            <Link href="https://github.com/AnkitShukla2405" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors text-2xl"><FaGithub /></Link>
                            <Link href="www.linkedin.com/in/ankit-shukla-a889b1343" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors text-2xl"><FaLinkedin /></Link>
                            <Link href="https://x.com/AnkitShukl5108" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors text-2xl"><FaTwitter /></Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}