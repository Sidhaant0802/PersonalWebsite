import React, { useState, useEffect } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { 
  Terminal, Shield, Cpu, Code, Menu, X, 
  ArrowRight, Github, Linkedin, Mail, 
  Lock, Server, Globe, Wifi, Eye, 
  Send, MapPin, Phone, Zap 
} from "lucide-react";
// Removed unused form imports to clean up the entry file
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import * as z from "zod";
import * as ReactDOM from 'react-dom/client';


// --- Configuration (Injected Content) ---
const SIDHAANT_NAME = "SIDHAANT";
const SIDHAANT_EMAIL = "sidhaant99nmenon@gmail.com";
const GITHUB_URL = "https://github.com/Sidhaant0802";
const LINKEDIN_URL = "https://www.linkedin.com/in/sidhaant-menon-207585282";
const PROFILE_IMAGE_URL = "https://media.licdn.com/dms/image/v2/D4D03AQEH_Pmg_lZEug/profile-displayphoto-shrink_800_800/B4DZYg27RxG4Ag-/0/1744307992998?e=1766620800&v=beta&t=T2i3q6CSkr3TbEuUX2-F8u1-dvyhGFcL07C8my6UfMM";

// --- UI Components (Simplified versions for single-file portability) ---

const Button = React.forwardRef(({ className, variant = "default", size = "default", ...props }, ref) => {
  const baseStyles = "inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";
  const variants = {
    default: "bg-primary text-primary-foreground hover:bg-primary/90",
    destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
    outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
    secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
    ghost: "hover:bg-accent hover:text-accent-foreground",
    link: "text-primary underline-offset-4 hover:underline",
  };
  const sizes = {
    default: "h-10 px-4 py-2",
    sm: "h-9 rounded-md px-3",
    lg: "h-11 rounded-md px-8",
    icon: "h-10 w-10",
  };
  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      ref={ref}
      {...props}
    />
  );
});
Button.displayName = "Button";

// NOTE: Input/Textarea/Badge components are removed here since they are not used in the final version with the simplified Contact component.

// --- Main Components ---

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const links = [
    { name: "home", href: "#home" },
    { name: "about", href: "#about" },
    { name: "skills", href: "#skills" },
    { name: "projects", href: "#projects" },
    { name: "contact", href: "#contact" },
  ];

  const scrollToSection = (e, href) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsOpen(false);
    }
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${
        scrolled
          ? "bg-[#080c14]/80 backdrop-blur-md border-[#00ff41]/20 py-4"
          : "bg-transparent border-transparent py-6"
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <a 
          href="#home" 
          onClick={(e) => scrollToSection(e, "#home")}
          className="flex items-center gap-2 group cursor-pointer"
        >
          <div className="relative">
            <Shield className="w-8 h-8 text-[#00ff41] group-hover:text-[#00f3ff] transition-colors" />
            <div className="absolute inset-0 bg-[#00ff41]/20 blur-lg rounded-full group-hover:bg-[#00f3ff]/20" />
          </div>
          <span className="font-display font-bold text-xl tracking-wider text-white">
            // {SIDHAANT_NAME}
          </span>
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => scrollToSection(e, link.href)}
              className="font-mono text-sm uppercase tracking-widest text-gray-300 hover:text-[#00ff41] transition-colors relative group"
            >
              <span className="text-[#00ff41]/50 mr-1">&lt;</span>
              {link.name}
              <span className="text-[#00ff41]/50 ml-1">/&gt;</span>
              <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-[#00ff41] group-hover:w-full transition-all duration-300" />
            </a>
          ))}
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-white hover:text-[#00ff41]"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X /> : <Menu />}
        </button>

        {/* Mobile Nav */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute top-full left-0 right-0 bg-[#080c14]/95 backdrop-blur-xl border-b border-[#00ff41]/20 p-4 flex flex-col gap-4 md:hidden"
          >
            {links.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => scrollToSection(e, link.href)}
                className="font-mono text-lg uppercase tracking-widest text-gray-300 hover:text-[#00ff41] py-2 border-l-2 border-transparent hover:border-[#00ff41] pl-4 transition-all"
              >
                {link.name}
              </a>
            ))}
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
}

function Hero() {
  // Framer Motion variant for the flicker effect
  const flickerVariant = {
    initial: {
      opacity: 1,
      textShadow: "0 0 20px rgba(0,255,65,0.5)",
    },
    animate: {
      opacity: [1, 0.9, 1, 0.9, 1.1, 1], // Subtle, irregular flicker
      textShadow: [
        "0 0 20px rgba(0,255,65,0.5)",
        "0 0 25px rgba(0,255,65,0.7)",
        "0 0 15px rgba(0,255,65,0.3)",
        "0 0 22px rgba(0,255,65,0.6)",
        "0 0 20px rgba(0,255,65,0.5)",
      ],
      transition: {
        duration: 1.5,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background Overlay */}
      <div className="absolute inset-0 z-0 bg-[#080c14]">
        <div className="absolute inset-0 bg-gradient-to-b from-[#080c14]/80 via-[#080c14]/50 to-[#080c14]" />
        {/* Placeholder for generated background image */}
        <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80')] bg-cover bg-center" />
      </div>

      <div className="container mx-auto px-4 z-10 grid md:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-6"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#00ff41]/30 bg-[#00ff41]/10 text-[#00ff41] font-mono text-xs">
            <span className="w-2 h-2 rounded-full bg-[#00ff41] animate-pulse" />
            SYSTEM STATUS: CYBER-DEFENDER IN TRAINING
          </div>

          <h1 className="font-display text-5xl md:text-7xl font-bold leading-tight text-white">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/50">
              SECURING THE
            </span>
            <br />
            {/* Applied Flicker Animation */}
            <motion.span
              variants={flickerVariant}
              initial="initial"
              animate="animate"
              className="text-[#00ff41]"
            >
              DIGITAL FRONTIER
            </motion.span>
          </h1>

          <p className="text-gray-400 text-lg md:text-xl max-w-lg font-body">
            Bridging Computer Engineering principles with advanced Cybersecurity practices at <span className="text-white font-semibold">Bennett University</span>.
          </p>

          <div className="flex flex-wrap gap-4 pt-4">
            <Button size="lg" className="bg-[#00ff41] hover:bg-[#00ff41]/80 text-black font-bold font-mono group border-none"
                onClick={() => document.querySelector('#projects').scrollIntoView({ behavior: 'smooth' })}>
              VIEW PROJECTS
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button variant="outline" size="lg" className="border-[#00ff41]/50 text-[#00ff41] bg-transparent hover:bg-[#00ff41]/10 font-mono"
                onClick={() => document.querySelector('#contact').scrollIntoView({ behavior: 'smooth' })}>
              CONTACT ME
            </Button>
          </div>

          <div className="flex gap-6 pt-8">
            <motion.a href={GITHUB_URL} target="_blank" whileHover={{ scale: 1.1, color: "#00ff41" }} className="text-gray-500 transition-colors">
              <Github className="w-6 h-6" />
            </motion.a>
            <motion.a href={LINKEDIN_URL} target="_blank" whileHover={{ scale: 1.1, color: "#00ff41" }} className="text-gray-500 transition-colors">
              <Linkedin className="w-6 h-6" />
            </motion.a>
            <motion.a href={`mailto:${SIDHAANT_EMAIL}`} whileHover={{ scale: 1.1, color: "#00ff41" }} className="text-gray-500 transition-colors">
              <Mail className="w-6 h-6" />
            </motion.a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="hidden md:block relative"
        >
          {/* Decorative Code Block */}
          <div className="bg-[#0f1623]/80 backdrop-blur-md border border-[#00ff41]/20 rounded-lg p-6 font-mono text-sm shadow-2xl relative overflow-hidden group hover:border-[#00ff41]/50 transition-colors">
            <div className="flex items-center gap-2 mb-4 border-b border-white/10 pb-2">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <div className="w-3 h-3 rounded-full bg-green-500" />
              <span className="ml-2 text-xs text-gray-500">terminal — {SIDHAANT_NAME}.zsh</span>
            </div>
            <div className="space-y-2 font-mono">
              <div className="text-green-400">➜  ~  run info.sh</div>
              <div className="text-white">Profile: {SIDHAANT_NAME} Menon</div>
              <div className="text-green-400">➜  ~  list core-skills</div>
              <div className="text-blue-400">Loading modules...</div>
              <div className="pl-4 text-gray-400">
                [+] Network Security<br/>
                [+] Application Security<br/>
                [+] Python & C/C++<br/>
                [+] Linux/Kali Tools
              </div>
              <div className="text-green-400">➜  ~  <span className="animate-pulse">█</span></div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function About() {
    return (
        <section id="about" className="py-20 bg-black/50">
            <div className="container mx-auto px-4 max-w-5xl">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="font-display text-4xl font-bold mb-4 text-white text-center">
                        <span className="text-[#00ff41]">&lt;</span> PROFILE.INFO <span className="text-[#00ff41]">/&gt;</span>
                    </h2>
                    <div className="flex flex-col md:flex-row gap-8 items-center pt-8">
                        <div className="md:w-1/3 flex justify-center">
                            <motion.img
                                initial={{ rotate: 0 }}
                                whileHover={{ rotate: 5, scale: 1.05 }}
                                src={PROFILE_IMAGE_URL}
                                alt={`${SIDHAANT_NAME} Menon`}
                                className="w-48 h-48 object-cover rounded-full border-4 border-[#00ff41] shadow-2xl shadow-[#00ff41]/30 transition-shadow duration-300"
                            />
                        </div>
                        <div className="md:w-2/3 space-y-4 font-body text-gray-300 text-lg">
                            <p>
                                I am currently pursuing a B.Tech in Computer Engineering with a specialization in Cybersecurity at **Bennett University**. Beyond academics, I’ve gained hands-on industry exposure through a **6-month cybersecurity internship**, where I worked on real-world threat analysis and defense strategies.
                            </p>
                            <p>
                                One of my proudest moments was being invited to deliver a **Cybersecurity Awareness Seminar** at the Indian Air Force Station in Thane, educating officers and cadets on digital hygiene and modern cyber threats.
                            </p>
                            <p>
                                On campus, I serve as the **General Secretary** of Bennett University’s first and only Cybersecurity Club, where I lead workshops, organize CTF competitions, and mentor students passionate about ethical hacking and security research. I believe cybersecurity is not just a profession—it's a responsibility. My goal is to build systems that are secure by design, not as an afterthought.
                            </p>
                            <div className="font-mono text-sm text-[#00ff41]/80 pt-4">
                                &gt; STATUS: [INITIATING_DEFENSE_PROTOCOL]
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

function Skills() {
  // Merged and formatted skills from the HTML version
  const skills = [
    { category: "Network Security", icon: Wifi, items: ["Firewall Configuration (IPTables)", "Intrusion Detection Systems (IDS/IPS)", "OSI Model Analysis", "Wireshark Protocol Analysis"] },
    { category: "Application Security (AppSec)", icon: Lock, items: ["OWASP Top 10 Mitigation", "Secure Code Review (Python, C++)", "SQL Injection/XSS Prevention", "Penetration Testing (Tools like Burp Suite)"] },
    { category: "Operating Systems (OS)", icon: Cpu, items: ["Linux Command Line Proficiency", "Shell Scripting (Bash)", "OS Hardening Techniques", "Virtualization (VMware/VirtualBox)"] },
    { category: "Development & Tools", icon: Code, items: ["Python", "C/C++ (Low-level programming)", "Git & Version Control", "Kali Linux & Metasploit"] }
  ];

  return (
    <section id="skills" className="py-20 bg-[#080c14] relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-4xl font-bold mb-4 text-white">
            <span className="text-[#00ff41]">&lt;</span> CORE.CAPABILITIES <span className="text-[#00ff41]">/&gt;</span>
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {skills.map((skill, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative bg-[#0f1623] border border-[#00ff41]/10 p-6 rounded-lg hover:border-[#00ff41]/50 transition-all duration-300"
            >
              <div className="absolute top-0 right-0 p-3 opacity-20 group-hover:opacity-100 transition-opacity">
                <skill.icon className="w-12 h-12 text-[#00ff41]" />
              </div>
              <h3 className="font-display text-xl font-bold mb-4 text-white group-hover:text-[#00ff41] transition-colors">
                {skill.category}
              </h3>
              <ul className="space-y-2">
                {skill.items.map((item, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-gray-400 group-hover:text-white transition-colors font-mono">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00ff41]/50 group-hover:bg-[#00ff41]" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Projects() {
  // Injected projects from the user's latest HTML version
  const projects = [
    {
      title: "Ciphers Club Web Interface",
      description: "Designed and developed the official, fully responsive website for Ciphers Club @ Bennett University for the 2025-26 term. The site serves as the central hub for member engagement, CTF event promotion, and security content distribution.",
      tags: ["HTML5", "CSS3", "Web Design", "UI/UX"],
      icon: Globe,
      image: "https://placehold.co/800x400/0f1623/00ff41?text=Web+Interface+Design"
    },
    {
      title: "Subdomain Recon Tool (WebScraper)",
      description: "A powerful Python tool built for security researchers to rapidly scrape web assets for subdomains. It automatically categorizes discovered subdomains into Vulnerable or Safe classifications, expediting the identification of exposed attack surfaces during bug bounty hunting.",
      tags: ["Python", "Web Scraping", "Reconnaissance", "Bug Bounty"],
      icon: Eye,
      image: "https://placehold.co/800x400/0f1623/00ff41?text=Reconnaissance+Tool"
    },
    {
      title: "HydraVoice - Deepfake Synthesis",
      description: "Research project focusing on the security implications of Generative AI. Explores the fundamentals of voice cloning technology to understand how deepfakes are created, providing insight into detection mechanisms and defense strategies against social engineering attacks.",
      tags: ["Python", "Deep Learning", "AI Security", "Voice Cloning"],
      icon: Zap,
      image: "https://placehold.co/800x400/0f1623/00ff41?text=AI+Security+Research"
    },
    {
      title: "Home Network Attached Storage (NAS)",
      description: "Engineered a robust Python-based Network Attached Storage system for home use. Features a custom-made Graphical User Interface (GUI) for streamlined access management, file synchronization, and secure data handling across the local network.",
      tags: ["Python", "System Admin", "GUI Development", "Networking"],
      icon: Server,
      image: "https://placehold.co/800x400/0f1623/00ff41?text=Custom+NAS+Solution"
    }
  ];

  return (
    <section id="projects" className="py-20 bg-black/50">
      <div className="container mx-auto px-4">
        <motion.div className="flex flex-col items-center justify-center mb-12 text-center">
          <h2 className="font-display text-4xl font-bold mb-2 text-white">
            <span className="text-[#00ff41]">DEPLOYED</span> MODULES
          </h2>
          <p className="text-gray-400 font-mono text-sm mt-4">
             &gt; All source code and repositories for these projects can be accessed via my <a href={GITHUB_URL} target="_blank" className="text-[#00ff41] underline hover:text-white transition-colors">GitHub profile link</a>.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group rounded-xl overflow-hidden bg-[#0f1623] border border-[#00ff41]/10 hover:border-[#00ff41]/50 transition-all duration-300 cursor-pointer"
            >
              <div className="relative h-32 overflow-hidden bg-[#0f1623] flex items-center justify-center">
                <project.icon className="w-16 h-16 text-[#00ff41]/70 group-hover:text-[#00ff41] transition-colors duration-300" />
              </div>
              <div className="p-4">
                <h3 className="font-display text-lg font-bold mb-1 text-white group-hover:text-[#00ff41] transition-colors">{project.title}</h3>
                <p className="text-gray-400 text-xs mb-3 line-clamp-3 font-body">{project.description}</p>
                <div className="flex flex-wrap gap-1">
                  {project.tags.map((tag, i) => (
                    <span key={i} className="text-[10px] font-mono text-[#00ff41]/80 bg-[#00ff41]/10 px-1.5 py-0.5 rounded-full">{tag}</span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// --- Contact Component (Modified for Clickable Buttons Only) ---
function Contact() {
  
  const ContactButton = ({ href, icon: Icon, title, subtitle }) => (
    <motion.a
      href={href}
      target={href.startsWith('mailto:') ? "_self" : "_blank"}
      className="flex flex-col sm:flex-row items-center justify-center p-4 border-2 border-[#00ff41]/50 bg-[#0f1623]/70 rounded-xl hover:bg-[#0f1623] transition-all duration-300 group cursor-pointer w-full text-white"
      whileHover={{ scale: 1.05, boxShadow: "0 0 15px rgba(0,255,65,0.5)" }}
    >
      <div className="relative p-2 rounded-full bg-[#00ff41]/10 text-[#00ff41] mb-2 sm:mb-0 sm:mr-4">
        <Icon className="w-6 h-6" />
      </div>
      <div className="text-center sm:text-left">
        <h4 className="font-mono text-sm font-bold uppercase group-hover:text-[#00ff41]">{title}</h4>
        <p className="text-gray-400 text-xs font-mono">{subtitle}</p>
      </div>
    </motion.a>
  );

  return (
    <section id="contact" className="py-20 bg-[#080c14] relative">
      <div className="container mx-auto px-4 relative z-10 max-w-4xl">
        <motion.div className="text-center mb-16">
          <h2 className="font-display text-4xl font-bold mb-4 text-white">
            INITIATE <span className="text-[#00ff41]">COMMUNICATION</span>
          </h2>
          <p className="text-gray-400 font-body text-lg">
            Connect directly via the secure channels below.
          </p>
        </motion.div>
        
        {/* Contact Buttons Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-[#0f1623]/30 backdrop-blur-sm border border-[#00ff41]/20 p-8 rounded-xl">
          
          <ContactButton
            href={GITHUB_URL}
            icon={Github}
            title="GITHUB REPOSITORY"
            subtitle="Source Code Access"
          />

          <ContactButton
            href={LINKEDIN_URL}
            icon={Linkedin}
            title="LINKEDIN PROFILE"
            subtitle="Professional Network"
          />

          <ContactButton
            href={`mailto:${SIDHAANT_EMAIL}`}
            icon={Mail}
            title="ENCRYPTED EMAIL"
            subtitle="Direct Message Channel"
          />

        </div>
      </div>
    </section>
  );
}

// --- Main App Component ---

export default function App() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  return (
    <div className="min-h-screen bg-[#080c14] text-white selection:bg-[#00ff41] selection:text-black font-sans">
      <style>{`
        /* Import custom fonts for cyber theme */
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@100..800&family=Orbitron:wght@400..900&family=Rajdhani:wght@300..700&family=Space+Grotesk:wght@300..700&display=swap');
        .font-display { font-family: 'Orbitron', sans-serif; }
        .font-mono { font-family: 'JetBrains Mono', monospace; }
        .font-body { font-family: 'Space Grotesk', sans-serif; }
      `}</style>
      
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-[#00ff41] z-[100] origin-left"
        style={{ scaleX }}
      />
      
      <Navbar />
      
      <main>
        <Hero />
        <About /> 
        <Skills />
        <Projects />
        <Contact />
      </main>

      <footer className="py-8 text-center text-gray-500 text-sm font-mono border-t border-white/5">
        <p>&copy; {new Date().getFullYear()} {SIDHAANT_NAME} CyberSec Portfolio. All systems operational.</p>
      </footer>
    </div>
  );
}
