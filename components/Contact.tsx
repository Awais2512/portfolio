"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { FiGithub, FiLinkedin, FiMail, FiMapPin, FiSend, FiCheck, FiCopy } from "react-icons/fi";

type FormState = "idle" | "loading" | "success" | "error";

export default function Contact() {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [honey,  setHoney]  = useState("");
  const [status, setStatus] = useState<FormState>("idle");
  const [copied, setCopied] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (honey) return; // Honeypot triggered — silently do nothing
    setStatus("loading");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, _honey: honey }),
      });

      if (res.ok) {
        setStatus("success");
        setForm({ name: "", email: "", subject: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  const copyEmail = async () => {
    await navigator.clipboard.writeText("awaisjutt2512@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    show:   { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <section id="contact" className="section-padding bg-bg-primary">
      <div className="container-max" ref={ref}>
        {/* Header */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          className="text-center mb-16"
        >
          <span className="text-accent-primary text-sm font-medium tracking-widest uppercase">
            Let&apos;s Work Together
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-text-primary mt-2">
            Get In Touch
          </h2>
          <p className="text-text-secondary mt-3 max-w-xl mx-auto">
            Have a project in mind or want to discuss an opportunity? I&apos;d love to hear
            from you.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* Form */}
          <motion.form
            variants={fadeUp}
            initial="hidden"
            animate={inView ? "show" : "hidden"}
            onSubmit={handleSubmit}
            className="space-y-5"
            noValidate
          >
            {/* Honeypot — hidden from humans */}
            <input
              type="text"
              name="_honey"
              value={honey}
              onChange={(e) => setHoney(e.target.value)}
              style={{ display: "none" }}
              tabIndex={-1}
              aria-hidden="true"
              autoComplete="off"
            />

            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-text-secondary text-xs font-medium mb-1.5" htmlFor="name">
                  Name <span className="text-accent-primary">*</span>
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={form.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  className="w-full bg-bg-secondary border border-white/10 rounded-xl px-4 py-3 text-text-primary placeholder:text-text-tertiary text-sm focus:outline-none focus:border-accent-primary transition-colors"
                />
              </div>
              <div>
                <label className="block text-text-secondary text-xs font-medium mb-1.5" htmlFor="email">
                  Email <span className="text-accent-primary">*</span>
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={form.email}
                  onChange={handleChange}
                  placeholder="john@example.com"
                  className="w-full bg-bg-secondary border border-white/10 rounded-xl px-4 py-3 text-text-primary placeholder:text-text-tertiary text-sm focus:outline-none focus:border-accent-primary transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-text-secondary text-xs font-medium mb-1.5" htmlFor="subject">
                Subject
              </label>
              <input
                id="subject"
                name="subject"
                type="text"
                value={form.subject}
                onChange={handleChange}
                placeholder="Project inquiry, job opportunity, etc."
                className="w-full bg-bg-secondary border border-white/10 rounded-xl px-4 py-3 text-text-primary placeholder:text-text-tertiary text-sm focus:outline-none focus:border-accent-primary transition-colors"
              />
            </div>

            <div>
              <label className="block text-text-secondary text-xs font-medium mb-1.5" htmlFor="message">
                Message <span className="text-accent-primary">*</span>
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={5}
                value={form.message}
                onChange={handleChange}
                placeholder="Tell me about your project or what you'd like to discuss..."
                className="w-full bg-bg-secondary border border-white/10 rounded-xl px-4 py-3 text-text-primary placeholder:text-text-tertiary text-sm focus:outline-none focus:border-accent-primary transition-colors resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={status === "loading"}
              className="w-full flex items-center justify-center gap-2 bg-accent-primary text-bg-primary font-semibold py-3 rounded-xl hover:bg-accent-primary/90 disabled:opacity-60 disabled:cursor-not-allowed transition-all active:scale-[0.98]"
            >
              {status === "loading" ? (
                <span className="w-4 h-4 border-2 border-bg-primary border-t-transparent rounded-full animate-spin" />
              ) : (
                <FiSend size={15} />
              )}
              {status === "loading" ? "Sending..." : "Send Message"}
            </button>

            {status === "success" && (
              <p className="text-accent-primary text-sm text-center font-medium flex items-center justify-center gap-2">
                <FiCheck /> Message sent! I&apos;ll get back to you soon.
              </p>
            )}
            {status === "error" && (
              <p className="text-red-400 text-sm text-center">
                Something went wrong. Please try again or email me directly.
              </p>
            )}
          </motion.form>

          {/* Sidebar: info + socials */}
          <motion.div
            variants={{
              hidden: { opacity: 0, x: 30 },
              show:   { opacity: 1, x: 0, transition: { duration: 0.6, delay: 0.1 } },
            }}
            initial="hidden"
            animate={inView ? "show" : "hidden"}
            className="space-y-6"
          >
            {/* Location */}
            <div className="card-base p-5 flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-accent-primary/10 flex items-center justify-center flex-shrink-0">
                <FiMapPin className="text-accent-primary" size={18} />
              </div>
              <div>
                <p className="text-text-primary text-sm font-medium">Location</p>
                <p className="text-text-secondary text-xs">
                  Lahore, Pakistan — Available for remote work worldwide
                </p>
              </div>
            </div>

            {/* Email */}
            <div className="card-base p-5 flex items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-accent-primary/10 flex items-center justify-center flex-shrink-0">
                  <FiMail className="text-accent-primary" size={18} />
                </div>
                <div>
                  <p className="text-text-primary text-sm font-medium">Email</p>
                  <p className="text-text-secondary text-xs">awaisjutt2512@gmail.com</p>
                </div>
              </div>
              <button
                onClick={copyEmail}
                className="text-text-tertiary hover:text-accent-primary transition-colors flex-shrink-0"
                aria-label="Copy email"
              >
                {copied ? <FiCheck size={16} className="text-accent-primary" /> : <FiCopy size={16} />}
              </button>
            </div>

            {/* Social links */}
            <div className="card-base p-5">
              <p className="text-text-secondary text-xs font-medium mb-4 uppercase tracking-widest">
                Find me online
              </p>
              <div className="flex gap-3">
                {[
                  { href: "https://github.com/Awais2512",   icon: <FiGithub size={20} />,   label: "GitHub" },
                  { href: "https://www.linkedin.com/in/muhammadawis/", icon: <FiLinkedin size={20} />, label: "LinkedIn" },
                  { href: "mailto:awaisjutt2512@gmail.com",            icon: <FiMail size={20} />,     label: "Email" },
                ].map(({ href, icon, label }) => (
                  <a
                    key={label}
                    href={href}
                    target={href.startsWith("mailto") ? undefined : "_blank"}
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="flex items-center gap-2 px-4 py-2.5 card-base text-text-secondary hover:text-accent-primary hover:border-accent-primary/30 transition-all text-sm font-medium"
                  >
                    {icon} {label}
                  </a>
                ))}
              </div>
            </div>

            {/* Availability note */}
            <div className="p-5 bg-accent-primary/5 border border-accent-primary/20 rounded-xl">
              <p className="text-text-secondary text-sm leading-relaxed">
                <span className="text-accent-primary font-semibold">Currently available</span> for
                freelance projects and full-time AI engineering roles. Typical response
                time: 24–48 hours.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
