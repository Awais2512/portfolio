"use client";

import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const roles = [
  "AI Engineer",
  "LLM Systems Builder",
  "RAG Architect",
  "Automation Engineer",
  "Production AI Developer",
];

export default function Hero() {
  const [displayText, setDisplayText] = useState("");
  const [roleIndex,   setRoleIndex]   = useState(0);
  const [charIndex,   setCharIndex]   = useState(0);
  const [deleting,    setDeleting]    = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Typing animation
  useEffect(() => {
    const current = roles[roleIndex];
    const speed   = deleting ? 50 : 90;
    const pause   = deleting ? 0 : 1800;

    const timeout = setTimeout(
      () => {
        if (!deleting && charIndex < current.length) {
          setDisplayText(current.slice(0, charIndex + 1));
          setCharIndex((c) => c + 1);
        } else if (!deleting && charIndex === current.length) {
          setTimeout(() => setDeleting(true), pause);
        } else if (deleting && charIndex > 0) {
          setDisplayText(current.slice(0, charIndex - 1));
          setCharIndex((c) => c - 1);
        } else {
          setDeleting(false);
          setRoleIndex((i) => (i + 1) % roles.length);
        }
      },
      speed
    );

    return () => clearTimeout(timeout);
  }, [charIndex, deleting, roleIndex]);

  // Matrix binary rain canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;

    const fontSize = 14;
    const columns  = Math.floor(canvas.width / fontSize);
    const drops: number[] = Array.from({ length: columns }, () =>
      Math.random() * -canvas.height / fontSize
    );

    // Characters: binary digits + some matrix-style symbols
    const chars = "01";

    let animId: number;

    const draw = () => {
      // Fade trail effect — dark overlay each frame
      ctx.fillStyle = "rgba(11, 15, 25, 0.04)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const char = chars[Math.floor(Math.random() * chars.length)];
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        // Head character — teal
        ctx.fillStyle = "rgba(20, 184, 166, 0.45)";
        ctx.fillText(char, x, y);

        // Trail characters — dim teal
        if (drops[i] > 1) {
          const trailChar = chars[Math.floor(Math.random() * chars.length)];
          ctx.fillStyle = "rgba(20, 184, 166, 0.08)";
          ctx.fillText(trailChar, x, y - fontSize);
        }

        // Reset drop to top when it goes off screen, with randomness
        if (y > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }

        drops[i] += 0.25 + Math.random() * 0.25;
      }

      animId = requestAnimationFrame(draw);
    };

    draw();

    const onResize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
      const newColumns = Math.floor(canvas.width / fontSize);
      drops.length = newColumns;
      for (let i = 0; i < newColumns; i++) {
        if (drops[i] === undefined) {
          drops[i] = Math.random() * -canvas.height / fontSize;
        }
      }
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.15 } },
  };

  const item = {
    hidden: { opacity: 0, y: 24 },
    show:   { opacity: 1, y: 0, transition: { duration: 0.6, type: "tween" as const } },
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ background: "linear-gradient(135deg, #141B2D 0%, #1C2A44 50%, #0B0F19 100%)" }}
    >
      {/* Matrix binary rain background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
      />

      {/* Content */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="container-max relative z-10 grid md:grid-cols-2 gap-12 items-center pt-16"
      >
        {/* Left: Text */}
        <div className="text-center md:text-left order-2 md:order-1">
          {/* Badge */}
          <motion.div variants={item}>
            <span className="inline-block text-xs font-medium text-accent-primary border border-accent-primary/30 bg-accent-primary/10 px-3 py-1 rounded-full mb-6 tracking-widest uppercase">
              Available for opportunities
            </span>
          </motion.div>

          {/* Name */}
          <motion.h1
            variants={item}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-text-primary mb-4 leading-tight"
          >
            Muhammad{" "}
            <span className="text-accent-primary">Awais</span>
          </motion.h1>

          {/* Typing subtitle */}
          <motion.div
            variants={item}
            className="text-xl sm:text-2xl md:text-3xl font-semibold text-text-secondary mb-6 h-9"
          >
            <span>{displayText}</span>
            <span className="inline-block w-0.5 h-7 bg-accent-primary ml-1 animate-blink align-middle" />
          </motion.div>

          {/* Description */}
          <motion.p
            variants={item}
            className="max-w-xl text-text-secondary text-base sm:text-lg leading-relaxed mb-10"
          >
            Building{" "}
            <span className="text-text-primary font-medium">production-grade AI systems</span>{" "}
            that ship and scale. Specializing in LLMs, RAG pipelines, and multi-agent
            orchestration.
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={item}
            className="flex flex-col sm:flex-row items-center md:items-start justify-center md:justify-start gap-4"
          >
            <button
              onClick={() => scrollTo("projects")}
              className="px-7 py-3 bg-accent-primary text-bg-primary font-semibold rounded-full hover:bg-accent-primary/90 transition-all hover:shadow-lg hover:shadow-accent-primary/25 active:scale-95"
            >
              View My Work
            </button>
            <button
              onClick={() => scrollTo("experience")}
              className="px-7 py-3 border border-white/20 text-text-primary font-semibold rounded-full hover:border-accent-primary hover:text-accent-primary transition-all active:scale-95"
            >
              My Experience
            </button>
          </motion.div>
        </div>

        {/* Right: Profile Photo */}
        <motion.div
          variants={item}
          className="flex justify-center order-1 md:order-2"
        >
          <div className="relative">
            {/* Glow ring behind photo */}
            <div className="absolute -inset-1 rounded-full bg-gradient-to-br from-accent-primary/30 via-accent-secondary/20 to-transparent blur-xl" />
            <div className="relative w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden border-2 border-accent-primary/20 shadow-2xl shadow-accent-primary/10">
              <Image
                src="/images/awais.png"
                alt="Muhammad Awais — AI Engineer"
                fill
                priority
                className="object-cover object-top"
                sizes="(max-width: 768px) 256px, (max-width: 1024px) 320px, 384px"
              />
            </div>
            {/* Decorative accent dot */}
            <div className="absolute bottom-4 right-4 w-5 h-5 bg-accent-primary rounded-full border-4 border-bg-primary" />
          </div>
        </motion.div>
      </motion.div>

    </section>
  );
}
