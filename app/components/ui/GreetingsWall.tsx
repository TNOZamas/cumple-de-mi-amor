"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { MessageChip } from "@/app/components/ui/MessageChip";
import { CosmosButton } from "@/app/components/ui/CosmosButton";

export interface Saludo {
  id: number;
  name: string;
  message: string;
  style: string;
  media_url: string | null;
}

const cardStyles: Record<string, string> = {
  amber:
    "border-amber-400/40 bg-[#0d0a1a]/90 shadow-[0_0_20px_rgba(251,191,36,0.1)] text-amber-200",
  rose: "border-rose-400/40 bg-[#120817]/90 shadow-[0_0_20px_rgba(244,63,94,0.1)] text-rose-200",
  purple:
    "border-purple-400/40 bg-[#0f071a]/90 shadow-[0_0_20px_rgba(168,85,247,0.1)] text-purple-200",
};

export default function GreetingsWallClient({
  saludos,
}: {
  saludos: Saludo[];
}) {
  const [selectedMedia, setSelectedMedia] = useState<{
    url: string;
    type: "image" | "video";
  } | null>(null);

  const openPreview = (url: string) => {
    const isVideo = url.endsWith(".mp4") || url.includes("video");
    setSelectedMedia({ url, type: isVideo ? "video" : "image" });
  };

  return (
    <section className="min-h-screen w-full py-16 px-4 flex flex-col items-center">
      <div className="text-center mb-10 space-y-3 max-w-xl">
        <MessageChip>Muro Cósmico de Cumpleaños</MessageChip>
        <h2 className="font-title text-3xl md:text-4xl font-bold text-amber-100">
          Saludos para Tati
        </h2>
        <div className="pt-2">
          <Link href="/saludos/enviar">
            <CosmosButton>Dejar mi saludo</CosmosButton>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-5xl">
        {saludos?.map((item) => {
          const styleClass = cardStyles[item.style] || cardStyles.amber;

          return (
            <div
              key={item.id}
              className={`rounded-3xl border p-6 backdrop-blur-xl flex flex-col justify-between shadow-lg space-y-4 transition-all duration-300 hover:scale-[1.02] ${styleClass}`}
            >
              {item.media_url && (
                <div
                  onClick={() => openPreview(item.media_url!)}
                  className="group relative h-48 w-full overflow-hidden rounded-2xl border border-white/10 bg-black/40 cursor-pointer"
                >
                  {item.media_url.endsWith(".mp4") ||
                  item.media_url.includes("video") ? (
                    <video
                      src={item.media_url}
                      className="h-full w-full object-cover pointer-events-none"
                    />
                  ) : (
                    <img
                      src={item.media_url}
                      alt={item.name}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  )}
                </div>
              )}

              <p className="font-body text-xs md:text-sm text-white/90 leading-relaxed italic">
                "{item.message}"
              </p>

              <div className="border-t border-white/10 pt-3 flex justify-between items-center">
                <span className="font-title text-sm font-bold">
                  - {item.name}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* POPUP DE PREVISUALIZACIÓN */}
      <AnimatePresence>
        {selectedMedia && (
          <div
            onClick={() => setSelectedMedia(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md cursor-pointer"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl max-h-[85vh] overflow-hidden rounded-3xl border border-amber-400/40 bg-[#0d0a1a] p-2 shadow-2xl"
            >
              <button
                onClick={() => setSelectedMedia(null)}
                className="absolute top-4 right-4 z-10 h-9 w-9 rounded-full bg-black/70 text-white border border-white/20 flex items-center justify-center text-sm font-bold hover:bg-black"
              >
                ✕
              </button>

              {selectedMedia.type === "image" ? (
                <img
                  src={selectedMedia.url}
                  alt="Previsualización"
                  className="max-h-[80vh] w-auto rounded-2xl object-contain"
                />
              ) : (
                <video
                  src={selectedMedia.url}
                  controls
                  autoPlay
                  className="max-h-[80vh] w-auto rounded-2xl object-contain"
                />
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
