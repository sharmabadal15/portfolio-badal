import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { personalInfo } from "@/data/resume";
import { FiGithub, FiLinkedin, FiDownload } from "react-icons/fi";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline();

      tl.from(".hero-role", {
        y: 60,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
      })
        .from(
          ".hero-name-word",
          {
            y: 80,
            opacity: 0,
            duration: 1,
            ease: "power3.out",
            stagger: 0.15,
          },
          "-=0.4"
        )
        .from(
          ".hero-tagline",
          { y: 40, opacity: 0, duration: 0.8, ease: "power2.out" },
          "-=0.5"
        )
        .from(
          ".hero-cta",
          {
            y: 30,
            opacity: 0,
            duration: 0.6,
            ease: "power2.out",
            stagger: 0.1,
          },
          "-=0.3"
        )
        .from(".hero-scroll-indicator", { opacity: 0, duration: 0.8 }, "-=0.2");

      gsap.to(".hero-content", {
        y: -150,
        opacity: 0,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });

      gsap.to(".hero-blob-1", {
        scale: 1.8,
        x: -100,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });

      gsap.to(".hero-blob-2", {
        scale: 2,
        x: 100,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 sm:px-6"
    >
      {/* Background blobs */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="hero-blob-1 absolute left-[20%] top-[20%] h-72 w-72 rounded-full bg-accent/15 blur-[100px] sm:h-125 sm:w-125 sm:blur-[140px]" />
        <div className="hero-blob-2 absolute bottom-[20%] right-[20%] h-60 w-60 rounded-full bg-accent-light/12 blur-[80px] sm:h-100 sm:w-100 sm:blur-[120px]" />
        <div className="absolute left-[50%] top-[60%] h-48 w-48 -translate-x-1/2 rounded-full bg-purple-500/8 blur-[80px] sm:h-75 sm:w-75 sm:blur-[100px]" />
      </div>

      <div className="hero-content mx-auto max-w-4xl text-center">
        <p className="hero-role mb-4 text-xs font-semibold tracking-[0.3em] text-accent uppercase sm:mb-6 sm:text-sm">
          {personalInfo.role}
        </p>

        <h1 className="mb-6 overflow-hidden text-3xl font-bold leading-[1.1] tracking-tight text-foreground sm:mb-8 sm:text-5xl lg:text-7xl">
          <span className="hero-name-word inline-block">Hi,&nbsp;</span>
          <span className="hero-name-word inline-block">I&apos;m&nbsp;</span>
          <span className="hero-name-word inline-block bg-linear-to-r from-accent to-accent-light bg-clip-text text-transparent">
            {personalInfo.name.split(" ")[0]}
          </span>{" "}
          <span className="hero-name-word inline-block bg-linear-to-r from-accent-light to-purple-400 bg-clip-text text-transparent">
            {personalInfo.name.split(" ")[1]}
          </span>
        </h1>

        <p className="hero-tagline mx-auto mb-8 max-w-2xl text-sm leading-relaxed text-muted sm:mb-12 sm:text-lg">
          {personalInfo.tagline}
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
          {/* Download Resume — primary CTA */}
          <a
            href="/Badal_Sharma.docx"
            download
            className="hero-cta group inline-flex items-center gap-2 rounded-full border border-accent bg-accent px-5 py-3 text-xs font-medium text-white transition-all duration-300 hover:bg-accent/90 hover:shadow-lg hover:shadow-accent/25 sm:px-7 sm:py-3.5 sm:text-sm"
          >
            <FiDownload size={16} className="transition-transform duration-300 group-hover:translate-y-0.5" />
            Resume
          </a>
          <a
            href={personalInfo.github}
            target="_blank"
            rel="noopener noreferrer"
            className="hero-cta group inline-flex items-center gap-2 rounded-full border border-accent bg-accent/10 px-5 py-3 text-xs font-medium text-accent transition-all duration-300 hover:bg-accent hover:text-white hover:shadow-lg hover:shadow-accent/25 sm:px-7 sm:py-3.5 sm:text-sm"
          >
            <FiGithub size={16} className="transition-transform duration-300 group-hover:rotate-12" />
            GitHub
          </a>
          <a
            href={personalInfo.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="hero-cta group inline-flex items-center gap-2 rounded-full border border-glass-border bg-glass px-5 py-3 text-xs font-medium text-foreground transition-all duration-300 hover:border-accent/40 hover:text-accent sm:px-7 sm:py-3.5 sm:text-sm"
          >
            <FiLinkedin size={16} className="transition-transform duration-300 group-hover:scale-110" />
            LinkedIn
          </a>
          {/* Contact — scrolls to footer */}
          <a
            href="#contact"
            className="hero-cta group inline-flex items-center gap-2 rounded-full border border-glass-border bg-glass px-5 py-3 text-xs font-medium text-foreground transition-all duration-300 hover:border-accent/40 hover:text-accent sm:px-7 sm:py-3.5 sm:text-sm"
          >
            Contact
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="hero-scroll-indicator absolute bottom-8 left-1/2 -translate-x-1/2 sm:bottom-10">
        <div className="flex flex-col items-center gap-2">
          <span className="text-[10px] tracking-widest text-muted/60 uppercase sm:text-xs">
            Scroll
          </span>
          <div className="h-10 w-px overflow-hidden bg-muted/20 sm:h-12">
            <div className="scroll-line h-full w-full origin-top bg-accent" />
          </div>
        </div>
      </div>
    </section>
  );
}
