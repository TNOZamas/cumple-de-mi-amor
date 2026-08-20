"use client";

import { CosmosCard } from "@/app/components/ui/CosmosCard";
import { MessageChip } from "@/app/components/ui/MessageChip";
import { motion } from "motion/react";

interface StoryMoment {
  id: number;
  date: string;
  title: string;
  description: string;
  imageSrc: string;
  imageCaption: string;
  rotation: string;
}

const STORY_MOMENTS: StoryMoment[] = [
  {
    id: 1,
    date: "El inicio de todo",
    title: "El día que nuestras vidas coincidieron",
    description:
      "Aún recuerdo la primera vez que te vi. El universo conspiró a nuestro favor para cruzarnos en el momento exacto. Desde ese instante, supe que serías alguien completamente inolvidable.",
    imageSrc:
      "https://ausfwldochwwgubghyid.supabase.co/storage/v1/object/public/saludos-media/casita_mc.jpg",
    imageCaption: "Nuestro primer momento juntos",
    rotation: "-rotate-2",
  },
  {
    id: 2,
    date: "Momentos mágicos",
    title: "Tu sonrisa iluminando mi mundo",
    description:
      "Gracias por cada risa compartida, por los besitos que lo curan todo y por regalarme tu tiempo de la forma más pura y bonita que existe.",
    imageSrc:
      "https://ausfwldochwwgubghyid.supabase.co/storage/v1/object/public/saludos-media/lunita_mc.jpg",
    imageCaption: "Inmortalizando recuerdos",
    rotation: "rotate-3",
  },
];

const OurStorySection = () => {
  return (
    <section className="relative min-h-screen w-full py-16 px-4 flex flex-col items-center justify-center">
      {/* Encabezado de la Sección */}
      <div className="text-center mb-16 space-y-3 max-w-xl">
        <MessageChip>Nuestra Historia Coincidió</MessageChip>
        <h2 className="font-title text-3xl md:text-4xl font-bold text-amber-100 tracking-wide">
          Capítulos de un Viaje Inolvidable
        </h2>
        <p className="font-body text-sm text-amber-200/70">
          Un pequeño recorrido por los momentos que han hecho que amarte sea la
          aventura más hermosa de mi vida.
        </p>
      </div>

      {/* Lista de Momentos en Mosaico */}
      <div className="flex flex-col gap-16 w-full max-w-2xl">
        {STORY_MOMENTS.map((moment, index) => {
          const isEven = index % 2 === 0;

          return (
            <CosmosCard key={moment.id} title={moment.date} className="w-full">
              <div className="flex flex-col md:flex-row items-center gap-8 py-2">
                {/* 1. FOTO RETRO TIPO POLAROID */}
                <motion.div
                  whileHover={{ scale: 1.05, rotate: 0 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className={`relative shrink-0 w-64 p-3 pb-5 bg-stone-100/90 rounded-sm shadow-[0_10px_25px_rgba(0,0,0,0.5)] transform ${moment.rotation} transition-transform duration-500`}
                >
                  {/* Cinta Adhesiva / Tape Transparente arriba */}
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 h-6 w-20 bg-amber-200/30 backdrop-blur-sm border border-amber-300/30 rotate-1 shadow-xs" />

                  {/* Contenedor de la Foto */}
                  <div className="relative h-52 w-full overflow-hidden bg-stone-900 rounded-2xs border border-stone-300/50">
                    <img
                      src={moment.imageSrc}
                      alt={moment.title}
                      className="h-full w-full object-cover filter contrast-[1.05] saturate-[1.1]"
                    />
                    {/* Grano / Textura de cámara retro */}
                    <div className="absolute inset-0 bg-amber-900/10 mix-blend-overlay pointer-events-none" />
                  </div>

                  {/* Pie de Foto Estilo Nota Manuscrita */}
                  <p className="font-title text-xs text-stone-700 text-center mt-3 font-semibold tracking-wider">
                    {moment.imageCaption}
                  </p>
                </motion.div>

                {/* 2. TEXTO DE LA HISTORIA Y FELICITACIÓN */}
                <div className="flex flex-col space-y-3 text-center md:text-left">
                  <h3 className="font-title text-xl font-bold text-amber-200">
                    {moment.title}
                  </h3>
                  <p className="font-body text-sm leading-relaxed text-amber-100/80">
                    {moment.description}
                  </p>
                </div>
              </div>
            </CosmosCard>
          );
        })}
      </div>
    </section>
  );
};

export default OurStorySection;
