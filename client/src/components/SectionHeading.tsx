/*
 * Design: Terra Viva — Naturalismo Orgânico
 * Heading de seção com linha decorativa verde
 */
import { motion } from "framer-motion";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  light?: boolean;
  className?: string;
}

export default function SectionHeading({ title, subtitle, light = false, className = "" }: SectionHeadingProps) {
  return (
    <motion.div
      className={`text-center mb-12 md:mb-16 ${className}`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6 }}
    >
      <h2
        className={`font-serif text-3xl md:text-4xl lg:text-5xl font-bold mb-4 ${
          light ? "text-white" : "text-[#3a4a2a]"
        }`}
      >
        {title}
      </h2>
      <div className="flex items-center justify-center gap-2 mb-4">
        <span className="h-[2px] w-8 bg-[#8bc34a] rounded-full" />
        <span className="h-2 w-2 bg-[#6f8f2e] rounded-full" />
        <span className="h-[2px] w-8 bg-[#8bc34a] rounded-full" />
      </div>
      {subtitle && (
        <p
          className={`max-w-2xl mx-auto text-base md:text-lg leading-relaxed ${
            light ? "text-white/80" : "text-[#5a5a4a]"
          }`}
        >
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
