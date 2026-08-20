"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MessageChip } from "@/app/components/ui/MessageChip";
import { CosmosButton } from "@/app/components/ui/CosmosButton";

interface SurpriseItem {
  id: number;
  title: string;
  type: "audio" | "video";
  mediaUrl: string;
  challengeType: "quiz" | "clicks" | "word";
}

const SURPRISES: SurpriseItem[] = [
  {
    id: 1,
    title: "Mensaje de Voz Secreto #1",
    type: "audio",
    mediaUrl: "/assets/audio/mensaje1.mp3",
    challengeType: "quiz",
  },
  {
    id: 2,
    title: "Video Especial de Cumpleaños",
    type: "video",
    mediaUrl: "/assets/video/especial.mp4",
    challengeType: "clicks",
  },
  {
    id: 3,
    title: "Mensaje de Voz Secreto #2",
    type: "audio",
    mediaUrl: "/assets/audio/mensaje2.mp3",
    challengeType: "word",
  },
];

export default function MinigamePage() {
  const [unlockedIds, setUnlockedIds] = useState<number[]>([]);
  const [activeMedia, setActiveMedia] = useState<SurpriseItem | null>(null);
  const [currentChallenge, setCurrentChallenge] = useState<SurpriseItem | null>(
    null,
  );

  // Estados para los desafíos
  const [clickCount, setClickCount] = useState(0);
  const [quizError, setQuizError] = useState(false);
  const [selectedWord, setSelectedWord] = useState("");

  const handleUnlockSuccess = (id: number) => {
    if (!unlockedIds.includes(id)) {
      setUnlockedIds((prev) => [...prev, id]);
    }
    setCurrentChallenge(null);
    setClickCount(0);
    setQuizError(false);
    setSelectedWord("");
  };

  return (
    <section className="relative min-h-screen w-full py-20 px-4 flex flex-col items-center justify-center">
      <div className="text-center mb-10 space-y-3 max-w-xl">
        <MessageChip>Desafíos del Amor</MessageChip>
        <h2 className="font-title text-3xl md:text-4xl font-bold text-amber-100 tracking-wide">
          Desbloquea tus Regalos
        </h2>
        <p className="font-body text-xs md:text-sm text-amber-200/70">
          Supera cada mini-desafío para romper el candado y escuchar las
          sorpresas de voz que grabé para ti.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl px-2">
        {SURPRISES.map((item) => {
          const isUnlocked = unlockedIds.includes(item.id);

          return (
            <div
              key={item.id}
              className="relative h-64 w-full rounded-3xl border border-amber-400/30 bg-[#0d0a1a]/90 p-6 backdrop-blur-xl flex flex-col items-center justify-between text-center shadow-[0_0_20px_rgba(245,158,11,0.15)] overflow-hidden"
            >
              {!isUnlocked ? (
                <div className="flex flex-col items-center justify-center h-full w-full space-y-4">
                  <span className="text-5xl animate-pulse">🔒</span>
                  <h3 className="font-title text-base font-bold text-amber-200">
                    {item.title}
                  </h3>
                  <CosmosButton onClick={() => setCurrentChallenge(item)}>
                    Jugar Desafío ✦
                  </CosmosButton>
                </div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-between h-full w-full py-2"
                >
                  <span className="text-4xl">
                    {item.type === "audio" ? "🎙️" : "🎥"}
                  </span>
                  <h3 className="font-title text-base font-bold text-amber-200">
                    ¡Desbloqueado!
                  </h3>
                  <p className="font-body text-xs text-amber-100/80">
                    Listo para escuchar / ver
                  </p>
                  <CosmosButton
                    variant="secondary"
                    onClick={() => setActiveMedia(item)}
                  >
                    Reproducir ▶
                  </CosmosButton>
                </motion.div>
              )}
            </div>
          );
        })}
      </div>

      {/* MODAL DE DESAFÍOS */}
      <AnimatePresence>
        {currentChallenge && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="relative w-full max-w-md rounded-3xl border border-amber-400/50 bg-[#0d0a1a] p-6 shadow-2xl flex flex-col items-center text-center space-y-4"
            >
              <button
                onClick={() => setCurrentChallenge(null)}
                className="absolute top-4 right-4 text-amber-200 hover:text-white font-bold text-xl cursor-pointer"
              >
                ✕
              </button>

              {/* DESAFÍO 1: QUIZ */}
              {currentChallenge.challengeType === "quiz" && (
                <div className="space-y-4 w-full">
                  <MessageChip>Desafío #1 ❓</MessageChip>
                  <h3 className="font-title text-lg font-bold text-amber-200">
                    ¿Quién piensa en ti todos los días al despertar?
                  </h3>
                  <div className="flex flex-col gap-2 pt-2">
                    <button
                      onClick={() => handleUnlockSuccess(currentChallenge.id)}
                      className="p-3 rounded-xl border border-amber-400/40 bg-amber-500/10 text-amber-200 hover:bg-amber-500/30 font-body text-sm cursor-pointer"
                    >
                      El peruano enamorado de ti
                    </button>
                    <button
                      onClick={() => setQuizError(true)}
                      className="p-3 rounded-xl border border-stone-700 bg-stone-900/50 text-stone-400 font-body text-sm cursor-pointer"
                    >
                      Un extraterrestre de Marte
                    </button>
                  </div>
                  {quizError && (
                    <p className="text-xs text-rose-400">
                      ¡Incorrecto! Intenta con la otra opción
                    </p>
                  )}
                </div>
              )}

              {/* DESAFÍO 2: CLICKS RÁPIDOS */}
              {currentChallenge.challengeType === "clicks" && (
                <div className="space-y-4 w-full">
                  <MessageChip>Desafío #2 ⚡</MessageChip>
                  <h3 className="font-title text-lg font-bold text-amber-200">
                    ¡Presiona 5 veces el corazón para romper el sello!
                  </h3>
                  <div className="py-4">
                    <motion.button
                      whileTap={{ scale: 0.8 }}
                      onClick={() => {
                        const newCount = clickCount + 1;
                        setClickCount(newCount);
                        if (newCount >= 5) {
                          handleUnlockSuccess(currentChallenge.id);
                        }
                      }}
                      className="text-6xl cursor-pointer select-none"
                    >
                      ❤️
                    </motion.button>
                  </div>
                  <p className="font-chip text-xs text-amber-300 uppercase">
                    Toques: {clickCount} / 5
                  </p>
                </div>
              )}

              {/* DESAFÍO 3: PALABRA CLAVE */}
              {currentChallenge.challengeType === "word" && (
                <div className="space-y-4 w-full">
                  <MessageChip>Desafío #3 🔑</MessageChip>
                  <h3 className="font-title text-lg font-bold text-amber-200">
                    ¿Qué es lo que más siento por ti?
                  </h3>
                  <div className="flex justify-center gap-2 pt-2">
                    {["Amor", "Admiración", "Todo"].map((word) => (
                      <button
                        key={word}
                        onClick={() => {
                          setSelectedWord(word);
                          handleUnlockSuccess(currentChallenge.id);
                        }}
                        className="px-4 py-2 rounded-xl border border-amber-400/40 bg-amber-500/10 text-amber-200 hover:bg-amber-500/30 font-body text-xs cursor-pointer"
                      >
                        {word}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* MODAL REPRODUCTOR DE MÚSICA / VIDEO */}
      <AnimatePresence>
        {activeMedia && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="relative w-full max-w-md rounded-3xl border border-amber-400/50 bg-[#0d0a1a] p-6 shadow-2xl flex flex-col items-center text-center space-y-4"
            >
              <button
                onClick={() => setActiveMedia(null)}
                className="absolute top-4 right-4 text-amber-200 hover:text-white font-bold text-xl cursor-pointer"
              >
                ✕
              </button>
              <h3 className="font-title text-xl font-bold text-amber-200">
                {activeMedia.title}
              </h3>
              {activeMedia.type === "audio" ? (
                <audio
                  controls
                  autoPlay
                  src={activeMedia.mediaUrl}
                  className="w-full py-4"
                />
              ) : (
                <video
                  controls
                  autoPlay
                  src={activeMedia.mediaUrl}
                  className="w-full rounded-2xl"
                />
              )}
              <MessageChip>Te amo con todo mi corazón 💖</MessageChip>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
