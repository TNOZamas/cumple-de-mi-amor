"use client";

import { motion } from "motion/react";

interface CosmosCardProps {
  children: React.ReactNode;
  title?: string; // Título opcional que flotará en el borde superior
  className?: string;
}

export const CosmosCard = ({
  children,
  title,
  className = "",
}: CosmosCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      /* overflow-visible es CLAVE para que el título pueda sobresalir */
      className={`group relative w-full overflow-visible rounded-3xl bg-[#0d0a1a]/90 pt-8 pb-6 px-6 backdrop-blur-2xl transition-all duration-500 hover:shadow-[0_0_45px_rgba(234,179,8,0.18)] ${className}`}
    >
      {/* 1. TÍTULO SOBREPUESTO (Mitad afuera, mitad adentro) */}
      {title && (
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-auto max-w-[85%] text-center">
          <div className="relative inline-block rounded-full bg-linear-to-r from-[#2a2010] via-[#1a1425] to-[#2a2010] px-5 py-1.5 border border-amber-400/50 shadow-[0_4px_20px_rgba(0,0,0,0.5),0_0_15px_rgba(251,191,36,0.2)] backdrop-blur-md">
            <h3 className="font-title text-sm md:text-base font-bold tracking-wider text-amber-200 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] whitespace-nowrap">
              {title}
            </h3>
          </div>
        </div>
      )}

      {/* 2. BORDE SVG DORADO (Transición ultra lenta y suave) */}
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full rounded-3xl"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <motion.linearGradient
            id="gold-border-gradient"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
            animate={{
              x1: ["0%", "100%"],
              y1: ["0%", "100%"],
              x2: ["100%", "0%"],
              y2: ["100%", "0%"],
            }}
            transition={{
              duration: 18, // Duración extendida para máxima suavidad
              repeat: Infinity,
              repeatType: "mirror", // Va y vuelve sin saltos
              ease: "easeInOut",
            }}
          >
            {/* Degradado metálico: Oro claro, ámbar brillante y oro cálido */}
            <stop offset="0%" stopColor="#fef08a" stopOpacity="0.85" />
            <stop offset="50%" stopColor="#b45309" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#fbbf24" stopOpacity="0.85" />
          </motion.linearGradient>
        </defs>

        <rect
          x="0.5"
          y="0.5"
          width="calc(100% - 1px)"
          height="calc(100% - 1px)"
          rx="23"
          fill="none"
          stroke="url(#gold-border-gradient)"
          strokeWidth="1.5"
          className="transition-all duration-700 group-hover:stroke-width-2"
        />
      </svg>

      {/* 3. RESPLANDOR AMBIENTAL DORADO DE FONDO */}
      <div className="pointer-events-none absolute -top-12 left-1/2 -translate-x-1/2 h-32 w-48 rounded-full bg-amber-500/10 blur-3xl transition-all duration-700 group-hover:bg-amber-400/20" />

      {/* 4. CONTENIDO INTERNO */}
      <div className="relative z-10 flex h-full flex-col">{children}</div>
    </motion.div>
  );
};
