"use client";

import { useState } from "react";
import { loginAction } from "@/app/actions/auth";
import { MessageChip } from "@/app/components/ui/MessageChip";
import { CosmosButton } from "@/app/components/ui/CosmosButton";

export default function LoginPage() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const res = await loginAction(formData);

    if (res?.error) {
      setError(res.error);
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen w-full flex flex-col items-center justify-center p-4 bg-[#05020a]">
      <div className="w-full max-w-md rounded-3xl border border-amber-400/40 bg-[#0d0a1a]/95 p-8 text-center backdrop-blur-2xl shadow-[0_0_50px_rgba(251,191,36,0.15)] space-y-6">
        <MessageChip>Acceso Secreto Hogwarts</MessageChip>

        {/* ACERTIJO DE HARRY POTTER */}
        <div className="space-y-3">
          <h2 className="font-title text-2xl font-bold text-amber-100">
            Acertijo para Tatiana
          </h2>
          <div className="rounded-2xl border border-amber-400/20 bg-amber-500/5 p-4 text-center">
            <p className="font-body text-xs text-amber-200/90 leading-relaxed italic">
              "Sin llave ni cerrojo me podrás abrir, <br />
              solo un encantamiento debes decir. <br />
              La palabra mágica para revelar la sorpresa es..."
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="password"
            required
            autoComplete="off"
            placeholder="Escribe el hechizo aquí..."
            className="w-full rounded-xl border border-amber-500/30 bg-black/50 px-4 py-3 text-center text-sm text-amber-100 placeholder:text-amber-200/30 focus:border-amber-400 focus:outline-none"
          />

          {error && (
            <p className="font-body text-xs text-rose-400 animate-pulse">
              {error}
            </p>
          )}

          <CosmosButton type="submit" disabled={loading} className="w-full">
            {loading ? "Lanzando hechizo..." : "Revelar Sorpresa ✦"}
          </CosmosButton>
        </form>
      </div>
    </section>
  );
}
