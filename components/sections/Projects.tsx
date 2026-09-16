import { useRef, useState, useCallback } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { projects } from "@/data/resume";
import type { Project } from "@/data/resume";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

gsap.registerPlugin(ScrollTrigger);

/* ── Image carousel for featured projects ── */
function ImageCarousel({ images }: { images: NonNullable<Project["images"]> }) {
  const [current, setCurrent] = useState(0);
  const imageRef = useRef<HTMLDivElement>(null);

  const goTo = useCallback(
    (index: number) => {
      if (index === current || !imageRef.current) return;
      const img = imageRef.current.querySelector(".carousel-img");
      if (img) {
        gsap.to(img, {
          opacity: 0,
          scale: 0.97,
          duration: 0.2,
          ease: "power2.in",
          onComplete: () => {
            setCurrent(index);
            requestAnimationFrame(() => {
              const newImg = imageRef.current?.querySelector(".carousel-img");
              if (newImg) {
                gsap.fromTo(
                  newImg,
                  { opacity: 0, scale: 0.97 },
                  { opacity: 1, scale: 1, duration: 0.3, ease: "power2.out" }
                );
              }
            });
          },
        });
      } else {
        setCurrent(index);
      }
    },
    [current]
  );

  const prev = () => goTo(current === 0 ? images.length - 1 : current - 1);
  const next = () => goTo(current === images.length - 1 ? 0 : current + 1);

  return (
    <div className="flex flex-col gap-3">
      {/* Main image */}
      <div
        ref={imageRef}
        className="group relative aspect-video w-full overflow-hidden rounded-xl border border-glass-border bg-surface"
      >
        <Image
          src={images[current].src}
          alt={images[current].alt}
          fill
          className="carousel-img object-cover object-top"
          sizes="(max-width: 768px) 100vw, 60vw"
          priority={current === 0}
        />

        {/* Prev / Next arrows */}
        <button
          onClick={prev}
          aria-label="Previous image"
          className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full border border-glass-border bg-background/70 p-1.5 text-foreground opacity-0 backdrop-blur-sm transition-all duration-300 hover:bg-background hover:text-accent group-hover:opacity-100 sm:left-3 sm:p-2"
        >
          <FiChevronLeft size={18} />
        </button>
        <button
          onClick={next}
          aria-label="Next image"
          className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full border border-glass-border bg-background/70 p-1.5 text-foreground opacity-0 backdrop-blur-sm transition-all duration-300 hover:bg-background hover:text-accent group-hover:opacity-100 sm:right-3 sm:p-2"
        >
          <FiChevronRight size={18} />
        </button>

        {/* Caption */}
        <div className="absolute bottom-0 left-0 w-full bg-linear-to-t from-black/60 to-transparent px-3 pb-2 pt-6 sm:px-4 sm:pb-3 sm:pt-8">
          <p className="text-[10px] font-medium text-white/90 sm:text-xs">
            {images[current].alt}
          </p>
        </div>
      </div>

      {/* Thumbnail dots */}
      <div className="flex items-center justify-center gap-1.5 sm:gap-2">
        {images.map((img, i) => (
          <button
            key={img.src}
            onClick={() => goTo(i)}
            aria-label={`View ${img.alt}`}
            className={`h-1.5 rounded-full transition-all duration-300 sm:h-2 ${
              i === current
                ? "w-6 bg-accent sm:w-8"
                : "w-1.5 bg-muted/30 hover:bg-muted/50 sm:w-2"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

/* ── Featured project card (with images) ── */
function FeaturedProjectCard({ project }: { project: Project }) {
  const cardRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.from(cardRef.current, {
        y: 60,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: cardRef.current,
          start: "top 85%",
        },
      });
    },
    { scope: cardRef }
  );

  return (
    <div
      ref={cardRef}
      className="group overflow-hidden rounded-2xl border border-glass-border bg-glass shadow-md shadow-card-shadow backdrop-blur-md transition-shadow duration-500 hover:shadow-xl hover:shadow-accent/10"
    >
      <div className="grid grid-cols-1 lg:grid-cols-5">
        {/* Image carousel — takes 3/5 */}
        <div className="p-4 sm:p-6 lg:col-span-3">
          {project.images && <ImageCarousel images={project.images} />}
        </div>

        {/* Content — takes 2/5 */}
        <div className="flex flex-col justify-center p-4 pt-0 sm:p-6 sm:pt-0 lg:col-span-2 lg:py-8 lg:pr-8 lg:pl-2 lg:pt-8">
          <span className="mb-3 inline-block w-fit rounded-full bg-accent/10 px-3 py-1 text-[10px] font-semibold tracking-wide text-accent sm:mb-4 sm:px-4 sm:py-1.5 sm:text-xs">
            {project.highlight}
          </span>

          <h3 className="mb-2 text-xl font-bold text-foreground sm:mb-3 sm:text-2xl lg:text-3xl">
            {project.title}
          </h3>

          <p className="mb-5 text-xs leading-relaxed text-muted sm:mb-6 sm:text-sm">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-1.5 sm:gap-2">
            {project.techStack.map((tech) => (
              <span
                key={tech}
                className="rounded-lg bg-surface px-2.5 py-1 text-[10px] font-medium text-muted sm:px-3 sm:py-1.5 sm:text-xs"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Regular project card ── */
function ProjectCard({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.from(cardRef.current, {
        x: index % 2 === 0 ? -80 : 80,
        y: 40,
        opacity: 0,
        rotateY: index % 2 === 0 ? 10 : -10,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: cardRef.current,
          start: "top 85%",
        },
      });
    },
    { scope: cardRef }
  );

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    gsap.to(card, {
      rotateY: x * 8,
      rotateX: -y * 8,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    gsap.to(cardRef.current, {
      rotateY: 0,
      rotateX: 0,
      duration: 0.5,
      ease: "elastic.out(1, 0.5)",
    });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ perspective: "1000px", transformStyle: "preserve-3d" }}
      className="group cursor-pointer rounded-2xl border border-glass-border bg-glass p-6 shadow-md shadow-card-shadow backdrop-blur-md transition-shadow duration-500 hover:shadow-xl hover:shadow-accent/10 sm:p-8"
    >
      <span className="mb-4 inline-block rounded-full bg-accent/10 px-3 py-1 text-[10px] font-semibold tracking-wide text-accent sm:mb-5 sm:px-4 sm:py-1.5 sm:text-xs">
        {project.highlight}
      </span>

      <h3 className="mb-2 text-lg font-bold text-foreground transition-colors duration-300 group-hover:text-accent sm:mb-3 sm:text-2xl">
        {project.title}
      </h3>

      <p className="mb-6 text-xs leading-relaxed text-muted sm:mb-8 sm:text-sm">
        {project.description}
      </p>

      <div className="flex flex-wrap gap-1.5 sm:gap-2">
        {project.techStack.map((tech) => (
          <span
            key={tech}
            className="rounded-lg bg-surface px-2.5 py-1 text-[10px] font-medium text-muted transition-colors duration-300 group-hover:text-foreground sm:px-3 sm:py-1.5 sm:text-xs"
          >
            {tech}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ── Main Projects section ── */
export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;

      const title = section.querySelector(".projects-title");
      const subtitle = section.querySelector(".projects-subtitle");

      if (title)
        gsap.from(title, {
          y: 60,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: title, start: "top 85%" },
        });

      if (subtitle)
        gsap.from(subtitle, {
          y: 30,
          opacity: 0,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: { trigger: subtitle, start: "top 90%" },
        });
    },
    { scope: sectionRef }
  );

  const featuredProjects = projects.filter((p) => p.images?.length);
  const regularProjects = projects.filter((p) => !p.images?.length);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative px-4 py-20 sm:px-6 sm:py-32"
    >
      <div className="pointer-events-none absolute left-0 top-1/2 h-125 w-125 -translate-y-1/2 rounded-full bg-accent/5 blur-[160px]" />

      <div className="mx-auto max-w-5xl">
        <h2 className="projects-title text-center text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
          Featured{" "}
          <span className="bg-linear-to-r from-accent to-accent-light bg-clip-text text-transparent">
            Projects
          </span>
        </h2>
        <p className="projects-subtitle mx-auto mt-4 mb-10 max-w-lg text-center text-sm text-muted sm:mb-16 sm:text-base">
          A selection of projects I&apos;ve designed and built end-to-end.
        </p>

        {/* Featured projects (with screenshots) */}
        <div className="mb-8 flex flex-col gap-8 sm:mb-12">
          {featuredProjects.map((project) => (
            <FeaturedProjectCard key={project.title} project={project} />
          ))}
        </div>

        {/* Regular projects */}
        {regularProjects.length > 0 && (
          <div className="grid grid-cols-1 gap-6 sm:gap-8 lg:grid-cols-2">
            {regularProjects.map((project, i) => (
              <ProjectCard key={project.title} project={project} index={i} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
