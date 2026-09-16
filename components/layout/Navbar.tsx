import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { navLinks, personalInfo } from "@/data/resume";
import { HiMenu, HiX } from "react-icons/hi";
import { FiSun, FiMoon, FiDownload } from "react-icons/fi";
import { useTheme } from "@/components/ThemeProvider";

gsap.registerPlugin(ScrollTrigger);

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useGSAP(
    () => {
      gsap.from(navRef.current, {
        y: -80,
        duration: 0.6,
        ease: "power3.out",
      });

      gsap.to(progressRef.current, {
        scaleX: 1,
        ease: "none",
        scrollTrigger: {
          trigger: document.body,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.3,
        },
      });
    },
    { scope: navRef }
  );

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 left-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "border-b border-glass-border bg-background/80 shadow-lg shadow-card-shadow backdrop-blur-xl"
          : "bg-transparent"
      }`}
    >
      {/* Scroll progress bar */}
      <div
        ref={progressRef}
        className="absolute bottom-0 left-0 h-0.5 w-full origin-left scale-x-0 bg-linear-to-r from-accent to-accent-light"
      />

      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6 sm:py-4">
        <a
          href="#"
          className="text-base font-bold tracking-tight text-foreground sm:text-lg"
        >
          {personalInfo.name.split(" ")[0]}
          <span className="text-accent">.</span>
        </a>

        {/* Desktop links + resume + theme toggle */}
        <div className="hidden items-center gap-6 md:flex lg:gap-8">
          <ul className="flex items-center gap-6 lg:gap-8">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="relative text-sm text-muted transition-colors duration-300 hover:text-accent after:absolute after:-bottom-1 after:left-0 after:h-px after:w-0 after:bg-accent after:transition-all after:duration-300 hover:after:w-full"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <a
            href="/Badal_Sharma.docx"
            download
            className="group inline-flex items-center gap-1.5 rounded-full border border-accent bg-accent/10 px-4 py-1.5 text-xs font-medium text-accent transition-all duration-300 hover:bg-accent hover:text-white hover:shadow-md hover:shadow-accent/20"
          >
            <FiDownload size={13} className="transition-transform duration-300 group-hover:translate-y-0.5" />
            Resume
          </a>

          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="rounded-full border border-glass-border bg-glass p-2 text-muted transition-all duration-300 hover:border-accent/40 hover:text-accent"
          >
            {theme === "dark" ? <FiSun size={16} /> : <FiMoon size={16} />}
          </button>
        </div>

        {/* Mobile: resume + theme toggle + hamburger */}
        <div className="flex items-center gap-2 md:hidden">
          <a
            href="/Badal_Sharma.docx"
            download
            className="inline-flex items-center gap-1 rounded-full border border-accent bg-accent/10 px-3 py-1.5 text-[10px] font-medium text-accent transition-all duration-300 hover:bg-accent hover:text-white"
          >
            <FiDownload size={11} />
            Resume
          </a>
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="rounded-full border border-glass-border bg-glass p-2 text-muted transition-all duration-300 hover:text-accent"
          >
            {theme === "dark" ? <FiSun size={14} /> : <FiMoon size={14} />}
          </button>
          <button
            onClick={() => setMobileOpen((v) => !v)}
            className="p-1 text-foreground"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <HiX size={22} /> : <HiMenu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <ul className="flex flex-col gap-3 border-t border-glass-border bg-background/95 px-4 py-4 backdrop-blur-xl md:hidden">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="block text-sm text-muted transition-colors hover:text-accent"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
}
