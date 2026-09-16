import { useRef, useState, useCallback, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { skillCategories } from "@/data/resume";
import { skillIconMap } from "@/data/skillIcons";

gsap.registerPlugin(ScrollTrigger);

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState(0);
  const [hasAnimatedIn, setHasAnimatedIn] = useState(false);

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;

      const title = section.querySelector(".skills-title");
      const subtitle = section.querySelector(".skills-subtitle");
      const tabs = section.querySelector(".skills-tabs");

      if (title) {
        gsap.from(title, {
          y: 60,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: title, start: "top 85%" },
        });
      }

      if (subtitle) {
        gsap.from(subtitle, {
          y: 30,
          opacity: 0,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: { trigger: subtitle, start: "top 90%" },
        });
      }

      if (tabs) {
        gsap.from(tabs, {
          y: 30,
          opacity: 0,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: { trigger: tabs, start: "top 90%" },
        });
      }
    },
    { scope: sectionRef }
  );

  // Animate grid items when they first become visible OR when tab changes
  useEffect(() => {
    if (!gridRef.current) return;
    const items = gridRef.current.querySelectorAll(".skill-item");
    if (!items.length) return;

    if (!hasAnimatedIn) {
      // First render — use ScrollTrigger to animate on scroll
      gsap.fromTo(
        items,
        { y: 40, opacity: 0, scale: 0.85 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.5,
          stagger: 0.05,
          ease: "back.out(1.4)",
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top 85%",
            once: true,
            onEnter: () => setHasAnimatedIn(true),
          },
        }
      );
    } else {
      // Tab switch — animate in immediately
      gsap.fromTo(
        items,
        { y: 25, opacity: 0, scale: 0.9 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.35,
          stagger: 0.04,
          ease: "back.out(1.5)",
        }
      );
    }
  }, [activeTab, hasAnimatedIn]);

  const switchTab = useCallback(
    (index: number) => {
      if (index === activeTab || !gridRef.current) return;

      const items = gridRef.current.querySelectorAll(".skill-item");
      gsap.to(items, {
        y: -15,
        opacity: 0,
        scale: 0.95,
        duration: 0.2,
        stagger: 0.02,
        ease: "power2.in",
        onComplete: () => setActiveTab(index),
      });
    },
    [activeTab]
  );

  const currentCategory = skillCategories[activeTab];

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative overflow-hidden px-4 py-20 sm:px-6 sm:py-32"
    >
      {/* Background orbs */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-[15%] top-[30%] h-87.5 w-87.5 rounded-full bg-accent/8 blur-[130px]" />
        <div className="absolute right-[10%] bottom-[20%] h-75 w-75 rounded-full bg-purple-500/6 blur-[120px]" />
      </div>

      <div className="mx-auto max-w-5xl">
        <h2 className="skills-title text-center text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
          Tech{" "}
          <span className="bg-linear-to-r from-accent to-accent-light bg-clip-text text-transparent">
            Stack
          </span>
        </h2>
        <p className="skills-subtitle mx-auto mt-4 mb-10 max-w-lg text-center text-sm text-muted sm:mb-12 sm:text-base">
          Technologies and tools I work with daily to build scalable,
          production-grade applications.
        </p>

        {/* Category tabs */}
        <div className="skills-tabs mb-10 flex flex-wrap justify-center gap-2 sm:mb-12">
          {skillCategories.map((cat, i) => (
            <button
              key={cat.title}
              onClick={() => switchTab(i)}
              className={`rounded-full px-4 py-2 text-xs font-medium transition-all duration-300 sm:px-5 sm:py-2.5 sm:text-sm ${
                activeTab === i
                  ? "bg-accent text-white shadow-lg shadow-accent/25"
                  : "border border-glass-border bg-glass text-muted hover:border-accent/30 hover:text-foreground"
              }`}
            >
              {cat.title}
            </button>
          ))}
        </div>

        {/* Active category label */}
        <div className="mb-6 text-center sm:mb-8">
          <span className="inline-block rounded-lg bg-accent/10 px-3 py-1 text-[10px] font-semibold tracking-widest text-accent uppercase sm:px-4 sm:py-1.5 sm:text-xs">
            {currentCategory.title}
          </span>
        </div>

        {/* Skills grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4"
        >
          {currentCategory.skills.map((skill) => {
            const iconData = skillIconMap[skill];
            return (
              <div
                key={`${activeTab}-${skill}`}
                className="skill-item group relative flex flex-col items-center gap-2 rounded-2xl border border-glass-border bg-glass p-4 backdrop-blur-md transition-all duration-300 hover:border-accent/30 hover:shadow-xl hover:shadow-accent/5 sm:gap-3 sm:p-6"
              >
                {/* Icon glow */}
                <div
                  className="absolute inset-0 rounded-2xl opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100"
                  style={{
                    background: iconData
                      ? `radial-gradient(circle, ${iconData.color}15 0%, transparent 70%)`
                      : undefined,
                  }}
                />

                {iconData && (
                  <span
                    className="relative text-2xl transition-all duration-300 group-hover:scale-110 group-hover:drop-shadow-lg sm:text-3xl lg:text-4xl"
                    style={{ color: iconData.color }}
                  >
                    {iconData.icon}
                  </span>
                )}

                <span className="relative text-center text-[11px] leading-tight font-medium text-muted transition-colors duration-300 group-hover:text-foreground sm:text-xs lg:text-sm">
                  {skill}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
