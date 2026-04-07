import { FiGithub, FiLinkedin, FiMail } from "react-icons/fi";

export default function Footer() {
  return (
    <footer className="bg-bg-secondary border-t border-white/5 py-8">
      <div className="container-max flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-text-tertiary text-sm">
          © {new Date().getFullYear()} Muhammad Awais. Built with Next.js & Tailwind CSS.
        </p>
        <div className="flex items-center gap-4">
          {[
            { href: "https://github.com/Awais2512",      icon: <FiGithub size={17} />,   label: "GitHub" },
            { href: "https://www.linkedin.com/in/muhammadawis/", icon: <FiLinkedin size={17} />, label: "LinkedIn" },
            { href: "mailto:awaisjutt2512@gmail.com",              icon: <FiMail size={17} />,     label: "Email" },
          ].map(({ href, icon, label }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith("mailto") ? undefined : "_blank"}
              rel="noopener noreferrer"
              aria-label={label}
              className="text-text-tertiary hover:text-accent-primary transition-colors"
            >
              {icon}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
