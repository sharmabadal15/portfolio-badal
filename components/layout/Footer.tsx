import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { personalInfo } from "@/data/resume";
import { FiGithub, FiLinkedin, FiMail } from "react-icons/fi";

gsap.registerPlugin(ScrollTrigger);

const socials = [
  { icon: FiGithub, href: personalInfo.github, label: "GitHub" },
  { icon: FiLinkedin, href: personalInfo.linkedin, label: "LinkedIn" },
  { icon: FiMail, href: `mailto:${personalInfo.email}`, label: "Email" },
];

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const content = footerRef.current?.querySelector(".footer-content");
      if (content) {
        gsap.from(content, {
          y: 40,
          opacity: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: { trigger: footerRef.current, start: "top 90%" },
        });
      }
    },
    { scope: footerRef }
  );

  return (
    <footer
      id="contact"
      ref={footerRef}
      className="border-t border-glass-border bg-glass"
    >
      <div className="footer-content mx-auto flex max-w-6xl flex-col items-center gap-5 px-4 py-12 sm:gap-6 sm:px-6 sm:py-16">
        <h2 className="mb-1 text-xl font-bold text-foreground sm:mb-2 sm:text-2xl lg:text-3xl">
          Let&apos;s{" "}
          <span className="bg-linear-to-r from-accent to-accent-light bg-clip-text text-transparent">
            Connect
          </span>
        </h2>

        <p className="mb-2 max-w-md text-center text-xs text-muted sm:mb-4 sm:text-sm">
          Open to new opportunities and collaborations. Feel free to reach out!
        </p>

        <div className="flex gap-3 sm:gap-4">
          {socials.map(({ icon: Icon, href, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="group rounded-full border border-glass-border bg-glass p-3 text-muted transition-all duration-300 hover:border-accent/40 hover:text-accent hover:shadow-lg hover:shadow-accent/10 sm:p-4"
            >
              <Icon
                size={20}
                className="transition-transform duration-300 group-hover:scale-110"
              />
            </a>
          ))}
        </div>

        <div className="mt-2 flex flex-col items-center gap-1 sm:mt-4 sm:gap-2">
          <p className="text-center text-xs text-muted sm:text-sm">
            {personalInfo.email} &middot; {personalInfo.phone}
          </p>
          <p className="text-[10px] text-muted/50 sm:text-xs">
            &copy; {new Date().getFullYear()} {personalInfo.name}. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
