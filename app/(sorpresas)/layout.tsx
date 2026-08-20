"use client";

import { usePathname, useRouter } from "next/navigation";
import { motion } from "motion/react";

const PAGES = [
  "/nuestra-historia-de-amor",
  "/razones-para-celebrarte",
  "/cancion-y-recuerdos",
  "/minijuego",
  "flores-y-deseos",
];

export default function SorpresasLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();

  // Encontrar el índice de la página actual
  const currentIndex = PAGES.indexOf(pathname);

  // Determinar si hay página anterior o siguiente
  const hasPrev = currentIndex > 0;
  const hasNext = currentIndex < PAGES.length - 1 && currentIndex !== -1;

  const handlePrev = () => {
    if (hasPrev) router.push(PAGES[currentIndex - 1]);
  };

  const handleNext = () => {
    if (hasNext) router.push(PAGES[currentIndex + 1]);
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col justify-between overflow-x-hidden">
      {/* FLECHA IZQUIERDA (ANTERIOR) */}
      {hasPrev && (
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          whileHover={{ scale: 1.15, x: -3 }}
          whileTap={{ scale: 0.9 }}
          onClick={handlePrev}
          aria-label="Página anterior"
          className="fixed left-3 md:left-8 top-1/2 -translate-y-1/2 z-50 flex h-12 w-12 items-center justify-center rounded-full border border-amber-400/40 bg-[#0d0a1a]/80 text-amber-200 backdrop-blur-md shadow-[0_0_20px_rgba(245,158,11,0.2)] hover:border-amber-400 hover:bg-amber-500/20 hover:shadow-[0_0_30px_rgba(251,191,36,0.5)] transition-all cursor-pointer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2.5}
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 19.5L8.25 12l7.5-7.5"
            />
          </svg>
        </motion.button>
      )}

      {/* FLECHA DERECHA (SIGUIENTE) */}
      {hasNext && (
        <motion.button
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          whileHover={{ scale: 1.15, x: 3 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleNext}
          aria-label="Siguiente página"
          className="fixed right-3 md:right-8 top-1/2 -translate-y-1/2 z-50 flex h-12 w-12 items-center justify-center rounded-full border border-amber-400/40 bg-[#0d0a1a]/80 text-amber-200 backdrop-blur-md shadow-[0_0_20px_rgba(245,158,11,0.2)] hover:border-amber-400 hover:bg-amber-500/20 hover:shadow-[0_0_30px_rgba(251,191,36,0.5)] transition-all cursor-pointer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2.5}
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.25 4.5l7.5 7.5-7.5 7.5"
            />
          </svg>
        </motion.button>
      )}

      {/* CONTENIDO DE LA PÁGINA ACTUAL */}
      <main className="flex-1 w-full">{children}</main>

      {/* INDICADOR DE PÁGINAS (Puntos dorados abajo) */}
      {currentIndex !== -1 && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 rounded-full border border-amber-500/20 bg-[#0d0a1a]/80 px-4 py-2 backdrop-blur-md shadow-lg">
          {PAGES.map((page, idx) => (
            <button
              key={page}
              onClick={() => router.push(page)}
              className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                idx === currentIndex
                  ? "w-7 bg-amber-400 shadow-[0_0_10px_#fbbf24]"
                  : "w-2.5 bg-amber-200/30 hover:bg-amber-200/60"
              }`}
              aria-label={`Ir a sección ${idx + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
