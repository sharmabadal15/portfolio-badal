import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export default function ScrollDivider() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trainRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      const train = trainRef.current;
      const track = trackRef.current;
      if (!section || !train || !track) return;

      const wheels = train.querySelectorAll(".train-wheel");
      const smokePuffs = train.querySelectorAll(".smoke-puff");

      gsap.fromTo(
        track,
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1.5,
          ease: "power2.inOut",
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );

      gsap.fromTo(
        train,
        { x: "-150%" },
        {
          x: "calc(100vw + 50%)",
          duration: 3.5,
          ease: "power1.inOut",
          scrollTrigger: {
            trigger: section,
            start: "top 75%",
            toggleActions: "play none none none",
          },
        }
      );

      gsap.fromTo(
        smokePuffs,
        { opacity: 0, scale: 0, y: 5 },
        {
          opacity: 1,
          scale: 1,
          y: -8,
          duration: 0.6,
          stagger: { each: 0.2, repeat: -1, yoyo: true },
          scrollTrigger: {
            trigger: section,
            start: "top 75%",
            toggleActions: "play pause resume pause",
          },
        }
      );

      gsap.to(wheels, {
        rotation: 360,
        duration: 0.4,
        ease: "none",
        repeat: -1,
        scrollTrigger: {
          trigger: section,
          start: "top 75%",
          toggleActions: "play pause resume pause",
        },
      });
    },
    { scope: sectionRef }
  );

  return (
    <div
      ref={sectionRef}
      className="relative h-[20vh] overflow-hidden sm:h-[30vh]"
    >
      {/* Track */}
      <div className="absolute left-0 top-1/2 w-full -translate-y-1/2">
        <div
          ref={trackRef}
          className="h-0.5 w-full origin-left bg-linear-to-r from-transparent via-accent/30 to-transparent"
        />
        <div className="mt-1.5 flex justify-between px-[3%]">
          {Array.from({ length: 40 }).map((_, i) => (
            <div key={i} className="h-0.5 w-3 bg-accent/10 sm:w-4 sm:bg-accent/15" />
          ))}
        </div>
      </div>

      {/* Train */}
      <div
        ref={trainRef}
        className="absolute top-1/2 left-0 flex translate-y-[-60%] items-end"
      >
        {/* Smoke puffs */}
        <div className="absolute -top-8 left-3 flex gap-2 sm:-top-10 sm:gap-3">
          <div className="smoke-puff h-3 w-3 rounded-full bg-muted/30 blur-[1px] sm:h-4 sm:w-4" />
          <div className="smoke-puff h-4 w-4 rounded-full bg-muted/20 blur-[2px] sm:h-5 sm:w-5" />
          <div className="smoke-puff h-5 w-5 rounded-full bg-muted/15 blur-[3px] sm:h-6 sm:w-6" />
        </div>

        {/* Engine */}
        <div className="relative">
          <div className="h-8 w-12 rounded-t-lg bg-linear-to-b from-accent to-accent/80 shadow-lg shadow-accent/30 sm:h-10 sm:w-16 sm:shadow-accent/40" />
          <div className="h-4 w-16 rounded-sm bg-accent/70 sm:h-5 sm:w-20" />
          <div className="absolute -top-3 left-2 h-3 w-3 rounded-t-md bg-accent-light shadow-sm sm:-top-4 sm:h-4 sm:w-4" />
          <div className="absolute right-0 top-2 h-1.5 w-1.5 rounded-full bg-yellow-300 shadow-md shadow-yellow-300/60 sm:top-3 sm:h-2 sm:w-2" />
          <div className="absolute -bottom-2 left-1 flex gap-3 sm:-bottom-2.5 sm:gap-4">
            <div className="train-wheel h-3 w-3 rounded-full border-2 border-accent-light bg-background sm:h-4 sm:w-4 sm:border-[2.5px]" />
            <div className="train-wheel h-3 w-3 rounded-full border-2 border-accent-light bg-background sm:h-4 sm:w-4 sm:border-[2.5px]" />
            <div className="train-wheel h-3 w-3 rounded-full border-2 border-accent-light bg-background sm:h-4 sm:w-4 sm:border-[2.5px]" />
          </div>
        </div>

        {/* Wagons — hide some on mobile */}
        {["React", "Next.js", "TS", "AWS", "Docker"].map((label, i) => (
          <div
            key={label}
            className={`relative ml-2 sm:ml-3 ${i >= 3 ? "hidden sm:block" : ""}`}
          >
            <div className="flex h-6 w-16 items-center justify-center rounded-md border border-glass-border bg-glass sm:h-8 sm:w-24">
              <span className="text-[8px] font-bold tracking-wider text-accent sm:text-[10px]">
                {label}
              </span>
            </div>
            <div className="absolute -left-2 top-1/2 h-0.5 w-2 -translate-y-1/2 bg-accent/30 sm:-left-3 sm:w-3 sm:bg-accent/40" />
            <div className="absolute -bottom-1.5 left-2 flex gap-5 sm:-bottom-2 sm:left-3 sm:gap-8">
              <div className="train-wheel h-2 w-2 rounded-full border-[1.5px] border-muted/40 bg-background sm:h-3 sm:w-3 sm:border-2" />
              <div className="train-wheel h-2 w-2 rounded-full border-[1.5px] border-muted/40 bg-background sm:h-3 sm:w-3 sm:border-2" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
