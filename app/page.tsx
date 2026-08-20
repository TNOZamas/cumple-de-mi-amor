"use client";

import Link from "next/link";
import { CosmosButton } from "./components/ui/CosmosButton";
import { CosmosCard } from "./components/ui/CosmosCard";
import { MessageChip } from "./components/ui/MessageChip";

export default function Home() {
  return (
    <main className="flex min-h-screen w-full items-center justify-center p-4">
      <CosmosCard title="Feliz Cumpleaños Mi Amor" className="max-w-md">
        {/* Imagen / Arte de Portada */}
        <div className="relative h-56 w-full overflow-hidden rounded-2xl border border-amber-500/20">
          <img
            src="/assets/images/nosotros-background.jpg"
            alt="Para Tatiana"
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-linear-to-t from-[#0d0a1a] via-transparent to-transparent" />
        </div>

        {/* Cuerpo del Mensaje */}
        <div className="mt-6 flex flex-col items-center text-center space-y-4">
          <MessageChip>Para mi niña hermosa, Tatiana</MessageChip>

          <h2 className="font-title text-xl md:text-2xl font-bold text-amber-100 tracking-wide">
            ¡Hoy el universo celebra tu vida!
          </h2>

          <p className="font-body text-sm leading-relaxed text-amber-100/80">
            Gracias por regalarme tu tiempo, tu sonrisa y por hacer mi mundo un
            lugar mucho más brillante. Este espacio lo construí con mucho amor
            para recordar lo especial que eres para mí.
          </p>

          <p className="font-body text-xs italic text-amber-200/60">
            Prepárate para descubrir cada uno de los detalles que preparé para
            ti...
          </p>

          {/* Botón de Acción */}
          <div className="pt-2">
            <CosmosButton>
              <Link href="/nuestra-historia-de-amor">Descubrir Sorpresa</Link>
            </CosmosButton>
          </div>
        </div>
      </CosmosCard>
    </main>
  );
}
