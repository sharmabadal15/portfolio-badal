import { ReactElement } from "react";
import {
  SiJavascript,
  SiTypescript,
  SiHtml5,
  SiCss,
  SiPython,
  SiReact,
  SiNextdotjs,
  SiRedux,
  SiTailwindcss,
  SiNodedotjs,
  SiFastapi,
  SiFlask,
  SiMongodb,
  SiSocketdotio,
  SiDocker,
  SiKubernetes,
  SiTerraform,
  SiNginx,
  SiLinux,
  SiGit,
  SiGithub,
  SiOllama,
  SiGithubcopilot,
  SiPostgresql,
} from "react-icons/si";
import { FaAws, FaMicrosoft } from "react-icons/fa";
import {
  FiCode,
  FiDatabase,
  FiCloud,
  FiCpu,
  FiSettings,
  FiLayers,
  FiActivity,
  FiGitBranch,
  FiRepeat,
} from "react-icons/fi";

interface SkillIcon {
  icon: ReactElement;
  color: string;
}

export const skillIconMap: Record<string, SkillIcon> = {
  // Languages
  "JavaScript (ES6+)": { icon: <SiJavascript />, color: "#F7DF1E" },
  TypeScript: { icon: <SiTypescript />, color: "#3178C6" },
  HTML: { icon: <SiHtml5 />, color: "#E34F26" },
  CSS: { icon: <SiCss />, color: "#1572B6" },
  Python: { icon: <SiPython />, color: "#3776AB" },
  SQL: { icon: <SiPostgresql />, color: "#4169E1" },

  // Frontend
  "React.js": { icon: <SiReact />, color: "#61DAFB" },
  "Next.js": { icon: <SiNextdotjs />, color: "#ffffff" },
  Redux: { icon: <SiRedux />, color: "#764ABC" },
  "Context API": { icon: <SiReact />, color: "#61DAFB" },
  "Tailwind CSS": { icon: <SiTailwindcss />, color: "#06B6D4" },
  "Responsive UI/UX": { icon: <FiLayers />, color: "#8B5CF6" },

  // AI / LLM
  Claude: { icon: <FiCpu />, color: "#D97706" },
  "GitHub Copilot": { icon: <SiGithubcopilot />, color: "#ffffff" },
  "LLM Integration": { icon: <FiCode />, color: "#10B981" },
  Ollama: { icon: <SiOllama />, color: "#ffffff" },
  "Prompt Design": { icon: <FiSettings />, color: "#F59E0B" },

  // Backend
  FastAPI: { icon: <SiFastapi />, color: "#009688" },
  Flask: { icon: <SiFlask />, color: "#ffffff" },
  "Node.js": { icon: <SiNodedotjs />, color: "#339933" },
  "REST APIs": { icon: <FiCode />, color: "#3B82F6" },
  "WebSocket / Socket.IO": { icon: <SiSocketdotio />, color: "#ffffff" },
  MongoDB: { icon: <SiMongodb />, color: "#47A248" },

  // Cloud & DevOps
  "AWS (EC2, S3, Lambda, CloudFront)": { icon: <FaAws />, color: "#FF9900" },
  "Azure (App Service, DevOps)": { icon: <FaMicrosoft />, color: "#0078D4" },
  Docker: { icon: <SiDocker />, color: "#2496ED" },
  Kubernetes: { icon: <SiKubernetes />, color: "#326CE5" },
  Terraform: { icon: <SiTerraform />, color: "#7B42BC" },
  "CI/CD Pipelines": { icon: <FiRepeat />, color: "#22D3EE" },
  Nginx: { icon: <SiNginx />, color: "#009639" },
  "Linux Administration": { icon: <SiLinux />, color: "#FCC624" },

  // Practices
  "Infrastructure as Code": { icon: <FiCloud />, color: "#8B5CF6" },
  GitOps: { icon: <FiGitBranch />, color: "#F97316" },
  "Git / GitHub": { icon: <SiGit />, color: "#F05032" },
  "Agile / Scrum": { icon: <FiActivity />, color: "#06B6D4" },
  "Monitoring & Logging": { icon: <FiDatabase />, color: "#10B981" },
};
