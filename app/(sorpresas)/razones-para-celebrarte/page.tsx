"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { MessageChip } from "@/app/components/ui/MessageChip";

interface Reason {
  id: number;
  icon: string;
  title: string;
  reason: string;
}

const REASONS: Reason[] = [
  {
    id: 1,
    icon: "✨",
    title: "Tu luz propia",
    reason:
      "Porque tienes la capacidad única de iluminar cualquier lugar con solo entrar y regalar tu sonrisa sincera.",
  },
  {
    id: 2,
    icon: "💖",
    title: "Tu enorme corazón",
    reason:
      "Por la forma tan dulce, empática y dedicada con la que cuidas a las personas que amas cada día.",
  },
  {
    id: 3,
    icon: "🌷",
    title: "Tu valentía",
    reason:
      "Por el esfuerzo gigante que pones en tus sueños y metas. Admiro profundamente tu fuerza de voluntad.",
  },
  {
    id: 4,
    icon: "🌟",
    title: "Hacer mi vida bonita",
    reason:
      "Porque a tu lado hasta el día más cotidiano se convierte en un recuerdo mágico e inolvidable.",
  },
  {
    id: 5,
    icon: "👑",
    title: "Ser tú misma",
    reason:
      "Porque tu autenticidad, tus risas inesperadas y tu esencia son el regalo más valioso para este mundo.",
  },
  {
    id: 6,
    icon: "♾️",
    title: "Por todo nuestro futuro",
    reason:
      "Porque te mereces un año lleno de bendiciones, salud, amor y cada una de las cosas que tu corazón anhele.",
  },
];

export default function ReasonsPage() {
  const [flippedCards, setFlippedCards] = useState<Record<number, boolean>>({});

  const toggleCard = (id: number) => {
    setFlippedCards((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <section className="relative min-h-screen w-full py-20 px-4 flex flex-col items-center justify-center">
      {/* ENCABEZADO */}
      <div className="text-center mb-12 space-y-3 max-w-xl">
        <MessageChip>Para la chica más especial</MessageChip>
        <h2 className="font-title text-3xl md:text-4xl font-bold text-amber-100 tracking-wide">
          Razones por las que te mereces el mejor cumpleaños
        </h2>
        <p className="font-body text-xs md:text-sm text-amber-200/70">
          Toca cada tarjeta para descubrir por qué hoy el universo celebra tu
          existencia.
        </p>
      </div>

      {/* GRID DE CARTAS VOLTEABLES */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-4xl px-2">
        {REASONS.map((item) => {
          const isFlipped = !!flippedCards[item.id];

          return (
            <div
              key={item.id}
              onClick={() => toggleCard(item.id)}
              className="group h-52 w-full cursor-pointer perspective-1000"
            >
              <motion.div
                initial={false}
                animate={{ rotateY: isFlipped ? 180 : 0 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
                className="relative h-full w-full rounded-2xl transform-style-3d shadow-lg"
              >
                {/* 1. CARA FRONTAL (Oculta el mensaje) */}
                <div className="absolute inset-0 flex flex-col items-center justify-center rounded-2xl border border-amber-400/40 bg-[#0d0a1a]/90 p-6 backdrop-blur-xl backface-hidden shadow-[0_0_20px_rgba(245,158,11,0.15)] group-hover:border-amber-400 group-hover:shadow-[0_0_30px_rgba(251,191,36,0.3)] transition-all">
                  <span className="text-4xl mb-3">{item.icon}</span>
                  <h3 className="font-title text-lg font-bold text-amber-200 text-center">
                    {item.title}
                  </h3>
                  <span className="font-chip text-[10px] text-amber-300/60 uppercase tracking-widest mt-4 border-b border-amber-400/30 pb-0.5">
                    Toca para voltear ✦
                  </span>
                </div>

                {/* 2. CARA TRASERA (Revela el mensaje) */}
                <div className="absolute inset-0 flex flex-col items-center justify-center rounded-2xl border border-pink-400/50 bg-linear-to-br from-[#1a122e] via-[#0d0a1a] to-[#251333] p-6 text-center backdrop-blur-xl rotate-y-180 backface-hidden shadow-[0_0_30px_rgba(244,114,182,0.3)]">
                  <p className="font-body text-xs md:text-sm leading-relaxed text-pink-100">
                    {item.reason}
                  </p>
                </div>
              </motion.div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
