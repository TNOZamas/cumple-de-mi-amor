"use client";

import { motion, HTMLMotionProps } from "motion/react";

interface CosmosButtonProps extends HTMLMotionProps<"button"> {
  children: React.ReactNode;
  variant?: "primary" | "secondary";
}

export const CosmosButton = ({
  children,
  variant = "primary",
  className = "",
  ...props
}: CosmosButtonProps) => {
  const baseStyles =
    "relative inline-flex items-center justify-center gap-2 rounded-full px-6 py-2.5 font-chip text-xs md:text-sm font-semibold tracking-wider uppercase transition-all duration-500 cursor-pointer overflow-hidden";

  const variants = {
    primary:
      "bg-linear-to-r from-amber-500 via-amber-400 to-yellow-500 text-stone-950 shadow-[0_0_20px_rgba(245,158,11,0.3)] hover:shadow-[0_0_30px_rgba(251,191,36,0.6)] hover:scale-[1.02]",
    secondary:
      "border border-amber-400/40 bg-amber-500/10 text-amber-200 backdrop-blur-md hover:border-amber-400 hover:bg-amber-500/20 hover:shadow-[0_0_20px_rgba(245,158,11,0.25)] hover:scale-[1.02]",
  };

  return (
    <motion.button
      whileTap={{ scale: 0.96 }}
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {/* Destello de luz interno */}
      <span className="pointer-events-none absolute -inset-full top-0 block h-full w-1/2 -skew-x-12 bg-linear-to-r from-transparent via-white/40 to-transparent opacity-0 transition-opacity duration-500 group-hover:animate-shine" />
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </motion.button>
  );
};
