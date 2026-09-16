export const personalInfo = {
  name: "Badal Sharma",
  role: "Frontend Engineer | Cloud & DevOps",
  location: "Delhi (NCR)",
  email: "sharmabadal15@gmail.com",
  phone: "+91 9109868147",
  github: "https://github.com",
  linkedin: "https://linkedin.com",
  tagline:
    "4+ years building high-complexity React & Next.js apps. Cloud-native deployments & CI/CD pipelines. AI-assisted development. End-to-end ownership.",
} as const;

export const about = {
  summary:
    "Frontend engineer with 4+ years building and maintaining high-complexity web applications on a modern JavaScript / TypeScript stack. Deep experience architecting reusable, type-safe React and Next.js component systems with strong separation of concerns, performance, and maintainability. Hands-on with cloud infrastructure (AWS, Azure) and DevOps practices \u2014 CI/CD pipelines, Docker, Kubernetes, and Infrastructure as Code. Fluent in AI-assisted development \u2014 LLM-powered tooling and shipping LLM-driven product features. Comfortable owning projects end to end and adapting quickly in fast-moving, ambiguous environments.",
  stats: [
    { label: "Years Experience", value: "4+" },
    { label: "Components Built", value: "100+" },
    { label: "Current Role", value: "Sr. SWE I @ HCL" },
  ],
} as const;

export interface SkillCategory {
  title: string;
  skills: string[];
}

export const skillCategories: SkillCategory[] = [
  {
    title: "Languages",
    skills: ["JavaScript (ES6+)", "TypeScript", "HTML", "CSS", "Python", "SQL"],
  },
  {
    title: "Frontend",
    skills: [
      "React.js",
      "Next.js",
      "Redux",
      "Context API",
      "Tailwind CSS",
      "Responsive UI/UX",
    ],
  },
  {
    title: "AI / LLM",
    skills: [
      "Claude",
      "GitHub Copilot",
      "LLM Integration",
      "Ollama",
      "Prompt Design",
    ],
  },
  {
    title: "Backend",
    skills: [
      "FastAPI",
      "Flask",
      "Node.js",
      "REST APIs",
      "WebSocket / Socket.IO",
      "MongoDB",
    ],
  },
  {
    title: "Cloud & DevOps",
    skills: [
      "AWS (EC2, S3, Lambda, CloudFront)",
      "Azure (App Service, DevOps)",
      "Docker",
      "Kubernetes",
      "Terraform",
      "CI/CD Pipelines",
      "Nginx",
      "Linux Administration",
    ],
  },
  {
    title: "Practices",
    skills: [
      "Infrastructure as Code",
      "GitOps",
      "Git / GitHub",
      "Agile / Scrum",
      "Monitoring & Logging",
    ],
  },
];

export interface ProjectImage {
  src: string;
  alt: string;
}

export interface Project {
  title: string;
  description: string;
  techStack: string[];
  highlight: string;
  images?: ProjectImage[];
}

export const projects: Project[] = [
  {
    title: "Full-Stack CRM",
    description:
      "End-to-end CRM built solo with contact and sales-pipeline management, role-based auth, REST APIs, and an analytics dashboard. Features a Kanban deal pipeline, revenue analytics, activity tracking, calendar scheduling, and third-party integrations.",
    techStack: ["React", "Next.js", "FastAPI", "MongoDB"],
    highlight: "Solo build, end-to-end",
    images: [
      { src: "/crm-2.png", alt: "CRM Dashboard — analytics overview" },
      { src: "/crm-1.png", alt: "CRM Deals — Kanban pipeline board" },
      { src: "/crm-3.png", alt: "CRM Activities — calls, emails, meetings" },
      { src: "/crm-4.png", alt: "CRM Calendar — scheduled events" },
      { src: "/crm-5.png", alt: "CRM Settings — third-party integrations" },
    ],
  },
  {
    title: "AI LinkedIn Post Generator",
    description:
      "Full-stack tool with a Next.js UI and a Python/Ollama LLM backend; selectable tone, word limits, and real-time preview.",
    techStack: ["Next.js", "Python", "Ollama", "LLM"],
    highlight: "40% efficiency gain",
  },
  {
    title: "Job Listing Platform",
    description:
      "Dynamic job-listing features and a responsive UI improving user engagement through clean design and fast interactions.",
    techStack: ["React", "TypeScript", "Tailwind CSS", "REST APIs"],
    highlight: "30% engagement boost",
  },
];

export const certifications = [
  "Azure Fundamentals (Microsoft)",
  "AWS Cloud Foundations (Academy)",
  "React.js (Cutshort)",
] as const;

export const navLinks = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
] as const;
