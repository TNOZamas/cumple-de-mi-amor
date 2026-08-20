"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { CosmosButton } from "@/app/components/ui/CosmosButton";
import { MessageChip } from "@/app/components/ui/MessageChip";

interface PhotoMemory {
  id: number;
  src: string;
  title: string;
  date: string;
  note: string;
}

const MEMORIES: PhotoMemory[] = [
  {
    id: 1,
    src: "/assets/images/nosotros-background.jpg",
    title: "Nuestro Primer Viaje Juntos",
    date: "Un día inolvidable",
    note: "Recuerdo perfectamente la risa que nos dio perdernos en el camino. Contigo hasta perderse es el mejor plan.",
  },
  {
    id: 2,
    src: "/assets/images/nosotros-background.jpg",
    title: "Esa Cena Especial",
    date: "Noche mágica",
    note: "Mirarte a los ojos bajo la luz tenue y saber que no quería estar en ningún otro lugar del mundo.",
  },
  {
    id: 3,
    src: "/assets/images/nosotros-background.jpg",
    title: "Tardes de Abrazos",
    date: "Cosas cotidianas",
    note: "Mis momentos favoritos no siempre son lujosos; son así, juntos en el sillón sin hacer nada particular.",
  },
];

export default function SongAndMemoriesPage() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState<PhotoMemory | null>(null);

  return (
    <section className="relative min-h-screen w-full py-20 px-4 flex flex-col items-center justify-center">
      {/* ENCABEZADO */}
      <div className="text-center mb-10 space-y-3 max-w-xl">
        <MessageChip>Nuestra Sintonía Especial</MessageChip>
        <h2 className="font-title text-3xl md:text-4xl font-bold text-amber-100 tracking-wide">
          Melodías & Recuerdos
        </h2>
        <p className="font-body text-xs md:text-sm text-amber-200/70">
          Dale play a nuestra canción mientras recorres este pequeño álbum de
          fotos inolvidable.
        </p>
      </div>

      <div className="w-full max-w-3xl flex flex-col items-center gap-10">
        {/* 1. REPRODUCTOR CÓSMICO DE MÚSICA */}
        <div className="w-full max-w-md rounded-3xl border border-amber-400/30 bg-[#0d0a1a]/85 p-6 backdrop-blur-2xl shadow-[0_0_30px_rgba(245,158,11,0.15)] flex flex-col items-center gap-4">
          <div className="relative h-28 w-28 rounded-full border-2 border-amber-400/50 p-1 shadow-[0_0_20px_rgba(251,191,36,0.3)]">
            <motion.div
              animate={{ rotate: isPlaying ? 360 : 0 }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "linear",
              }}
              className="h-full w-full rounded-full overflow-hidden"
            >
              <img
                src="/assets/images/nosotros-background.jpg"
                alt="Carátula"
                className="h-full w-full object-cover"
              />
            </motion.div>
            {/* Agujero central del disco */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-5 w-5 rounded-full bg-[#0d0a1a] border border-amber-400/60" />
          </div>

          <div className="text-center">
            <h3 className="font-title text-base font-bold text-amber-200">
              Nuestra Canción Favorita
            </h3>
            <p className="font-body text-xs text-amber-100/60 mt-0.5">
              Dedicatoria para Tatiana
            </p>
          </div>

          {/* Botón Play / Pause */}
          <CosmosButton
            onClick={() => setIsPlaying(!isPlaying)}
            variant={isPlaying ? "secondary" : "primary"}
            className="w-full"
          >
            {isPlaying ? "Pausar Música ⏸" : "Reproducir Canción ▶"}
          </CosmosButton>
        </div>

        {/* 2. GALERÍA DE MURAL DE FOTOS */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 w-full">
          {MEMORIES.map((photo) => (
            <motion.div
              key={photo.id}
              whileHover={{ scale: 1.03 }}
              onClick={() => setSelectedPhoto(photo)}
              className="group relative h-64 w-full cursor-pointer overflow-hidden rounded-2xl border border-amber-500/30 bg-[#0d0a1a] shadow-md"
            >
              <img
                src={photo.src}
                alt={photo.title}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-linear-to-t from-[#0d0a1a] via-black/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />

              <div className="absolute bottom-0 left-0 right-0 p-4 text-center">
                <span className="font-chip text-[10px] text-amber-300 uppercase tracking-widest">
                  {photo.date}
                </span>
                <h4 className="font-title text-sm font-bold text-white mt-1">
                  {photo.title}
                </h4>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* MODAL DETALLE DE LA FOTO (LIGHTBOX) */}
      <AnimatePresence>
        {selectedPhoto && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="relative w-full max-w-lg rounded-3xl border border-amber-400/50 bg-[#0d0a1a] p-6 shadow-2xl flex flex-col items-center text-center space-y-4"
            >
              <button
                onClick={() => setSelectedPhoto(null)}
                className="absolute top-4 right-4 text-amber-200 hover:text-white font-bold text-xl cursor-pointer"
              >
                ✕
              </button>

              <div className="h-64 w-full overflow-hidden rounded-2xl border border-amber-500/20">
                <img
                  src={selectedPhoto.src}
                  alt={selectedPhoto.title}
                  className="h-full w-full object-cover"
                />
              </div>

              <h3 className="font-title text-xl font-bold text-amber-200">
                {selectedPhoto.title}
              </h3>

              <p className="font-body text-sm text-amber-100/90 leading-relaxed">
                "{selectedPhoto.note}"
              </p>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
