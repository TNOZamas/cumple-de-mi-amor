"use client";

import { useState, useEffect, useMemo, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";

const STAR_COUNT = 180;

interface CursorParticle {
  id: number;
  x: number;
  y: number;
  size: number;
  velocityX?: number;
  velocityY?: number;
  duration?: number;
}

const StarryBackground = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [cursorParticles, setCursorParticles] = useState<CursorParticle[]>([]);

  // Referencia para guardar la última posición conocida del cursor
  const mousePosRef = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    setIsMounted(true);

    // 1. Escuchar movimiento del cursor
    const handleGlobalMouseMove = (e: MouseEvent) => {
      mousePosRef.current = { x: e.clientX, y: e.clientY };

      // Generar partículas en movimiento de forma espaciada y suave
      const newParticle: CursorParticle = {
        id: Date.now() + Math.random(),
        x: e.clientX + (Math.random() * 8 - 4),
        y: e.clientY + (Math.random() * 8 - 4),
        size: Math.random() * 3.5 + 2,
        duration: 1.4 + Math.random() * 0.6, // Más duración = más suave
      };

      setCursorParticles((prev) => [...prev.slice(-25), newParticle]);
    };

    // 2. Interacción al hacer CLIC (Estallido de destellos)
    const handleGlobalClick = (e: MouseEvent) => {
      const burstCount = 12; // Cantidad de destellos en la explosión
      const newBurst: CursorParticle[] = Array.from(
        { length: burstCount },
        () => {
          const angle = Math.random() * Math.PI * 2;
          const speed = Math.random() * 45 + 15;
          return {
            id: Date.now() + Math.random(),
            x: e.clientX,
            y: e.clientY,
            size: Math.random() * 4 + 2,
            velocityX: Math.cos(angle) * speed,
            velocityY: Math.sin(angle) * speed,
            duration: 1.2 + Math.random() * 0.8,
          };
        },
      );

      setCursorParticles((prev) => [...prev.slice(-30), ...newBurst]);
    };

    // 3. Generación continua cuando el cursor se queda QUIETO
    const idleInterval = setInterval(() => {
      if (mousePosRef.current) {
        const { x, y } = mousePosRef.current;
        const idleParticle: CursorParticle = {
          id: Date.now() + Math.random(),
          x: x + (Math.random() * 16 - 8),
          y: y + (Math.random() * 16 - 8),
          size: Math.random() * 3 + 1.5,
          duration: 1.6 + Math.random() * 0.8,
        };

        setCursorParticles((prev) => [...prev.slice(-25), idleParticle]);
      }
    }, 120); // Emite una partícula flotante cada 120ms si el mouse está inmóvil

    window.addEventListener("mousemove", handleGlobalMouseMove);
    window.addEventListener("click", handleGlobalClick);

    return () => {
      window.removeEventListener("mousemove", handleGlobalMouseMove);
      window.removeEventListener("click", handleGlobalClick);
      clearInterval(idleInterval);
    };
  }, []);

  // Estrellas estáticas de fondo
  const stars = useMemo(() => {
    return Array.from({ length: STAR_COUNT }, (_, index) => ({
      id: index,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() < 0.7 ? 1.5 : 2.5,
      baseOpacity: 0.2 + Math.random() * 0.3,
      peakOpacity: 0.8 + Math.random() * 0.2,
      delay: Math.random() * 4,
      duration: 2 + Math.random() * 3,
    }));
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-[#03010a]"
    >
      {/* Fondo Gradiente Dinámico */}
      <motion.div
        animate={{
          opacity: [0.6, 0.9, 0.6],
          scale: [1, 1.05, 1],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-0 bg-radial-[at_50%_20%] from-purple-900/30 via-[#0a051d] to-[#020105]"
      />

      {/* Grid de estrellas */}
      <div className="absolute inset-0 opacity-10 mix-blend-overlay bg-[radial-gradient(#fff_1px,transparent_1px)] bg-size-[32px_32px]" />

      {/* Nebulosas orgánicas */}
      <motion.div
        animate={{
          opacity: [0.35, 0.65, 0.35],
          scale: [0.8, 1, 0.8],
          rotate: [-15, -5, -15],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-20 -left-20 h-150 w-225 rounded-full bg-linear-to-tr from-fuchsia-600/25 via-purple-600/20 to-transparent blur-[120px] mix-blend-screen"
      />

      <motion.div
        animate={{
          opacity: [0.25, 0.55, 0.25],
          scale: [1, 1.2, 1],
          rotate: [20, 35, 20],
        }}
        transition={{
          duration: 12,
          delay: 1,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute -bottom-32 -right-20 h-140 w-200 rounded-full bg-linear-to-br from-indigo-500/20 via-blue-600/15 to-transparent blur-[130px] mix-blend-screen"
      />

      {isMounted && (
        <div className="absolute inset-0">
          {/* Estrellas Parpadeantes de Fondo */}
          {stars.map((star) => (
            <motion.span
              key={star.id}
              initial={{ opacity: star.baseOpacity, scale: 0.8 }}
              animate={{
                opacity: [star.baseOpacity, star.peakOpacity, star.baseOpacity],
                scale: [0.7, 1.3, 0.7],
              }}
              transition={{
                duration: star.duration,
                delay: star.delay,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute rounded-full bg-white shadow-[0_0_6px_rgba(255,255,255,0.8)]"
              style={{
                width: star.size,
                height: star.size,
                left: `${star.x}%`,
                top: `${star.y}%`,
              }}
            />
          ))}

          {/* RASTRO MÁGICO DEL CURSOR Y CLIC */}
          <AnimatePresence key={""}>
            {cursorParticles.map((particle) => {
              const hasBurst =
                particle.velocityX !== undefined &&
                particle.velocityY !== undefined;

              return (
                <motion.span
                  key={particle.id}
                  initial={{
                    opacity: 0.9,
                    scale: 1,
                    x: 0,
                    y: 0,
                  }}
                  animate={{
                    opacity: 0,
                    scale: hasBurst ? 0.2 : 0,
                    x: hasBurst ? particle.velocityX : 0,
                    y: hasBurst ? particle.velocityY : -20, // Movimiento ascendente suave si no es clic
                  }}
                  exit={{ opacity: 0 }}
                  transition={{
                    duration: particle.duration || 1.5,
                    ease: "easeOut",
                  }}
                  onAnimationComplete={() => {
                    setCursorParticles((prev) =>
                      prev.filter((p) => p.id !== particle.id),
                    );
                  }}
                  className="pointer-events-none fixed rounded-full bg-pink-200 shadow-[0_0_10px_#f472b6,0_0_18px_#ec4899]"
                  style={{
                    width: particle.size,
                    height: particle.size,
                    left: particle.x,
                    top: particle.y,
                    transform: "translate(-50%, -50%)",
                  }}
                />
              );
            })}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
};

export default StarryBackground;
