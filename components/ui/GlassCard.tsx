import { motion } from "framer-motion";
import { ReactNode } from "react";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}

export default function GlassCard({
  children,
  className = "",
  hover = true,
}: GlassCardProps) {
  return (
    <motion.div
      className={`rounded-2xl border border-glass-border bg-glass p-6 shadow-lg shadow-black/20 backdrop-blur-md ${
        hover ? "transition-shadow hover:shadow-accent/10 hover:shadow-xl" : ""
      } ${className}`}
      whileHover={hover ? { y: -4 } : undefined}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      {children}
    </motion.div>
  );
}
