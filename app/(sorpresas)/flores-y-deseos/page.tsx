"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { MessageChip } from "@/app/components/ui/MessageChip";
import { CosmosCard } from "@/app/components/ui/CosmosCard";
import { CosmosButton } from "@/app/components/ui/CosmosButton";

export default function FlowersPage() {
  return (
    <section className="relative min-h-screen w-full py-20 px-4 flex flex-col items-center justify-center overflow-hidden">
      {/* Resplandor ambiental de fondo */}
      <div className="pointer-events-none absolute h-96 w-96 rounded-full bg-rose-600/15 blur-3xl -top-20" />

      <div className="text-center mb-8 space-y-3 max-w-xl z-10">
        <MessageChip>Un detalle especial para ti 🌹</MessageChip>
        <h2 className="font-title text-3xl md:text-5xl font-bold text-amber-100 tracking-wide">
          24 Rosas para mi Amor
        </h2>
      </div>

      <div className="w-full max-w-xl space-y-8 z-10">
        {/* BLOQUE PRINCIPAL DE LAS ROSAS */}
        <CosmosCard title="Feliz Cumpleaños Tati">
          <div className="flex flex-col items-center text-center space-y-6 py-4">
            <motion.div
              animate={{ y: [0, -8, 0], scale: [1, 1.03, 1] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="text-7xl md:text-8xl filter drop-shadow-[0_0_25px_rgba(244,63,94,0.5)]"
            >
              🌹🌹🌹
            </motion.div>

            <div className="space-y-4">
              <h3 className="font-title text-xl font-bold text-amber-200">
                24 rosas, una por cada hora del día que pienso en ti...
              </h3>

              <p className="font-body text-sm leading-relaxed text-amber-100/90">
                Quería regalarte este ramo eterno de 24 rosas rojas. Representan
                el amor tan inmenso que siento por ti, la admiración que me
                despiertas y la alegría de poder celebrar tu vida un año más.
              </p>

              <p className="font-body text-sm leading-relaxed text-amber-100/90">
                Espero de corazón que esta pequeña web y cada una de las
                sorpresas te hayan sacado una hermosa sonrisa. Gracias por
                regalarme tu tiempo y por ser mi persona favorita en todo el
                universo.
              </p>
            </div>

            <div className="pt-4 border-t border-amber-400/20 w-full flex flex-col items-center gap-1">
              <span className="font-title text-lg font-bold text-rose-300">
                ¡Te amo infinitamente, Tati! ❤️
              </span>
              <span className="font-chip text-xs text-amber-200/60 uppercase tracking-widest">
                Por siempre y para siempre ✦
              </span>
            </div>
          </div>
        </CosmosCard>

        {/* TARJETA DE REVELACIÓN: LA ÚLTIMA SORPRESA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-3xl border border-amber-400/40 bg-[#0d0a1a]/95 p-6 md:p-8 text-center backdrop-blur-2xl shadow-[0_0_30px_rgba(251,191,36,0.15)] space-y-4"
        >
          <span className="text-3xl block">🎁</span>
          <h3 className="font-title text-xl font-bold text-amber-200">
            Y como última sorpresa...
          </h3>
          <p className="font-body text-sm text-amber-100/90 leading-relaxed">
            Un mural especial cargado de fotos, videos y mensajes de tus amigos
            cercanos; de todas esas personas que te acompañan, te admiran y que
            siempre te van a querer.
          </p>

          <div className="pt-2">
            <Link href="/saludos">
              <CosmosButton className="w-full sm:w-auto">
                Ver Mural de Saludos
              </CosmosButton>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
