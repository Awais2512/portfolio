"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";

const stats = [
  { value: 4,   suffix: "+", label: "Years Experience" },
  { value: 50,  suffix: "+", label: "APIs Integrated" },
  { value: 90,  suffix: "%", label: "Automation Achieved" },
  { value: 10,  suffix: "+", label: "Production Systems" },
];

function AnimatedCounter({
  value,
  suffix,
  trigger,
}: {
  value: number;
  suffix: string;
  trigger: boolean;
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!trigger) return;
    const duration = 1800;
    const steps    = 60;
    const inc      = value / steps;
    let current    = 0;
    let step       = 0;

    const timer = setInterval(() => {
      step++;
      current += inc;
      setCount(parseFloat(Math.min(current, value).toFixed(1)));
      if (step >= steps) clearInterval(timer);
    }, duration / steps);

    return () => clearInterval(timer);
  }, [trigger, value]);

  return (
    <span>
      {value % 1 !== 0 ? count.toFixed(1) : Math.round(count)}
      {suffix}
    </span>
  );
}

export default function About() {
  const ref     = useRef<HTMLDivElement>(null);
  const inView  = useInView(ref, { once: true, margin: "-100px" });

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    show:   { opacity: 1, y: 0, transition: { duration: 0.6, type: "tween" as const } },
  };

  return (
    <section id="about" className="section-padding bg-bg-primary">
      <div className="container-max" ref={ref}>
        {/* Section header */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          className="text-center mb-16"
        >
          <span className="text-accent-primary text-sm font-medium tracking-widest uppercase">
            Who I Am
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-text-primary mt-2">
            About Me
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Text */}
          <motion.div
            variants={{
              hidden: { opacity: 0, x: -30 },
              show:   { opacity: 1, x: 0, transition: { duration: 0.6 } },
            }}
            initial="hidden"
            animate={inView ? "show" : "hidden"}
          >
            <p className="text-text-secondary text-base sm:text-lg leading-relaxed mb-5">
              I&apos;m an AI Engineer with
              4+ years building production-grade AI systems. I specialize in turning
              cutting-edge LLM research into reliable, scalable software that ships.
            </p>
            <p className="text-text-secondary text-base sm:text-lg leading-relaxed mb-5">
              My work spans the full AI pipeline — from designing{" "}
              <span className="text-accent-primary font-medium">RAG architectures</span> and
              <span className="text-accent-primary font-medium"> fine-tuning models</span>, to orchestrating{" "}
              <span className="text-accent-primary font-medium">multi-agent systems</span> and deploying them behind
              production APIs. I&apos;ve integrated 50+ third-party APIs and built automation
              workflows achieving 90%+ reduction in manual work.
            </p>
            <p className="text-text-secondary text-base sm:text-lg leading-relaxed">
              My philosophy: AI should solve real problems, not just demo well. Every system I
              build is designed for{" "}
              <span className="text-text-primary font-medium">reliability, observability,
              and measurable business impact</span>.
            </p>
          </motion.div>

          {/* Photo + Stats */}
          <motion.div
            variants={{
              hidden: { opacity: 0, x: 30 },
              show:   { opacity: 1, x: 0, transition: { duration: 0.6, delay: 0.1 } },
            }}
            initial="hidden"
            animate={inView ? "show" : "hidden"}
            className="flex flex-col items-center gap-8"
          >
            {/* Photo */}
            <div className="relative">
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-br from-accent-primary/20 via-accent-secondary/10 to-transparent blur-lg" />
              <div className="relative w-56 h-56 sm:w-64 sm:h-64 rounded-2xl overflow-hidden border-2 border-accent-primary/20 shadow-xl">
                <Image
                  src="/images/awais.png"
                  alt="Muhammad Awais"
                  fill
                  className="object-cover object-top"
                  sizes="256px"
                />
              </div>
            </div>

            {/* Stats grid */}
            <div className="grid grid-cols-2 gap-4 w-full">
              {stats.map(({ value, suffix, label }) => (
                <div
                  key={label}
                  className="card-base p-5 text-center hover:border-accent-primary/30 hover:accent-glow transition-all duration-300"
                >
                  <div className="text-2xl sm:text-3xl font-extrabold text-accent-primary mb-1">
                    <AnimatedCounter value={value} suffix={suffix} trigger={inView} />
                  </div>
                  <div className="text-text-secondary text-xs sm:text-sm font-medium">{label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
