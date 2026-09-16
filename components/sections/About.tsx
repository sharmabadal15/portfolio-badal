import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { about } from "@/data/resume";

gsap.registerPlugin(ScrollTrigger);

function AnimatedCounter({
  value,
  label,
  index,
}: {
  value: string;
  label: string;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.from(ref.current, {
        y: 80,
        opacity: 0,
        scale: 0.9,
        duration: 0.8,
        delay: index * 0.15,
        ease: "back.out(1.5)",
        scrollTrigger: {
          trigger: ref.current,
          start: "top 85%",
        },
      });
    },
    { scope: ref }
  );

  return (
    <div
      ref={ref}
      className="group rounded-2xl border border-glass-border bg-glass p-6 text-center shadow-md shadow-card-shadow backdrop-blur-md transition-all duration-500 hover:border-accent/30 hover:shadow-lg hover:shadow-accent/10 sm:p-8"
    >
      <p className="text-3xl font-bold text-accent transition-transform duration-300 group-hover:scale-110 sm:text-4xl lg:text-5xl">
        {value}
      </p>
      <p className="mt-2 text-xs font-medium tracking-wide text-muted sm:mt-3 sm:text-sm">
        {label}
      </p>
    </div>
  );
}

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;

      const title = section.querySelector(".about-title");
      const text = section.querySelector(".about-text");
      const line = section.querySelector(".about-line");

      if (title)
        gsap.from(title, {
          y: 60,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: title, start: "top 85%" },
        });

      if (text)
        gsap.from(text, {
          y: 40,
          opacity: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: { trigger: text, start: "top 85%" },
        });

      if (line)
        gsap.from(line, {
          scaleX: 0,
          duration: 1.2,
          ease: "power2.inOut",
          scrollTrigger: { trigger: line, start: "top 90%" },
        });
    },
    { scope: sectionRef }
  );

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative px-4 py-20 sm:px-6 sm:py-32"
    >
      <div className="pointer-events-none absolute right-0 top-0 h-100 w-100 rounded-full bg-accent/5 blur-[150px]" />

      <div className="mx-auto max-w-4xl">
        <h2 className="about-title mb-4 text-center text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
          About{" "}
          <span className="bg-linear-to-r from-accent to-accent-light bg-clip-text text-transparent">
            Me
          </span>
        </h2>

        <div className="about-line mx-auto mb-8 h-0.5 w-24 origin-left bg-linear-to-r from-accent to-accent-light sm:mb-12" />

        <p className="about-text mx-auto mb-12 max-w-3xl text-center text-sm leading-[1.9] text-muted sm:mb-16 sm:text-base lg:text-lg">
          {about.summary}
        </p>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-6">
          {about.stats.map((stat, i) => (
            <AnimatedCounter
              key={stat.label}
              value={stat.value}
              label={stat.label}
              index={i}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
