"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { MessageChip } from "@/app/components/ui/MessageChip";
import { CosmosButton } from "@/app/components/ui/CosmosButton";
import { createGreetingAction } from "@/app/actions/saludos";

export default function SubmitGreetingPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [cardStyle, setCardStyle] = useState("amber");
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const [fileType, setFileType] = useState<"image" | "video" | null>(null);
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const isVideo = file.type.startsWith("video/");
      setFileType(isVideo ? "video" : "image");

      const reader = new FileReader();
      reader.onloadend = () => {
        setFilePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData(e.currentTarget);
      const result = await createGreetingAction(formData);
      if (result.success) {
        setIsSuccessOpen(true);
      }
    } catch (error: any) {
      alert(error.message || "Hubo un error al guardar tu saludo");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen w-full py-16 px-4 flex flex-col items-center justify-center">
      <div className="w-full max-w-lg rounded-3xl border border-amber-400/30 bg-[#0d0a1a]/90 p-8 backdrop-blur-2xl shadow-2xl">
        <div className="text-center mb-6 space-y-2">
          <MessageChip>Para el cumple de Tati</MessageChip>
          <h2 className="font-title text-2xl font-bold text-amber-100">
            Déjale un Saludo Especial
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Campo Nombre */}
          <div>
            <label className="font-chip text-xs text-amber-200 block mb-1 uppercase">
              Tu Nombre / Apodo
            </label>
            <input
              type="text"
              name="name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ej: Camilo"
              className="w-full rounded-xl border border-amber-500/30 bg-black/40 px-4 py-2.5 text-sm text-white focus:border-amber-400 focus:outline-none"
            />
          </div>

          {/* Seleccionar Estilo/Color de Tarjeta */}
          <div>
            <label className="font-chip text-xs text-amber-200 block mb-2 uppercase">
              Elige el Color de la Tarjeta
            </label>
            <div className="grid grid-cols-3 gap-3">
              {[
                {
                  id: "amber",
                  name: "Dorado",
                  border: "border-amber-400",
                  bg: "bg-amber-500/20",
                },
                {
                  id: "rose",
                  name: "Rosado",
                  border: "border-rose-400",
                  bg: "bg-rose-500/20",
                },
                {
                  id: "purple",
                  name: "Morado",
                  border: "border-purple-400",
                  bg: "bg-purple-500/20",
                },
              ].map((style) => (
                <button
                  type="button"
                  key={style.id}
                  onClick={() => setCardStyle(style.id)}
                  className={`p-3 rounded-xl border text-xs font-semibold text-white transition-all cursor-pointer ${
                    style.border
                  } ${style.bg} ${
                    cardStyle === style.id
                      ? "ring-2 ring-white scale-105 opacity-100"
                      : "opacity-50 hover:opacity-80"
                  }`}
                >
                  {style.name}
                </button>
              ))}
            </div>
          </div>

          {/* Input Oculto que envía el valor seleccionado a FormData */}
          <input type="hidden" name="style" value={cardStyle} />

          {/* Campo Subir Archivo */}
          <div>
            <label className="font-chip text-xs text-amber-200 block mb-1 uppercase">
              Foto o Video de Recuerdo
            </label>
            <input
              type="file"
              name="file"
              accept="image/*,video/*"
              onChange={handleFileChange}
              className="w-full text-xs text-amber-100/70 file:mr-3 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-amber-500/20 file:text-amber-200 hover:file:bg-amber-500/30 cursor-pointer"
            />

            {filePreview && (
              <div className="mt-3 relative h-48 w-full overflow-hidden rounded-2xl border border-amber-500/30 bg-black/50">
                {fileType === "image" ? (
                  <img
                    src={filePreview}
                    alt="Vista previa"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <video
                    src={filePreview}
                    controls
                    className="h-full w-full object-cover"
                  />
                )}
              </div>
            )}
          </div>

          {/* Campo Mensaje */}
          <div>
            <label className="font-chip text-xs text-amber-200 block mb-1 uppercase">
              Tu Dedicatoria
            </label>
            <textarea
              name="message"
              required
              rows={3}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Escribe tu mensaje para Tati..."
              className="w-full rounded-xl border border-amber-500/30 bg-black/40 px-4 py-2.5 text-sm text-white focus:border-amber-400 focus:outline-none"
            />
          </div>

          <CosmosButton
            type="submit"
            disabled={loading}
            className="w-full pt-3"
          >
            {loading ? "Publicando..." : "Publicar en el Muro ✦"}
          </CosmosButton>
        </form>
      </div>

      <AnimatePresence>
        {isSuccessOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.85 }}
              className="relative w-full max-w-sm rounded-3xl border border-amber-400/50 bg-[#0d0a1a] p-6 text-center shadow-2xl space-y-4"
            >
              <div className="text-5xl animate-bounce">🎉</div>
              <h3 className="font-title text-xl font-bold text-amber-200">
                ¡Saludo Publicado!
              </h3>
              <p className="font-body text-xs text-amber-100/80 leading-relaxed">
                Tu mensaje y recuerdo han sido agregados al muro cósmico para
                Tati.
              </p>
              <CosmosButton
                onClick={() => router.push("/saludos")}
                className="w-full"
              >
                Ver Muro de Saludos ✦
              </CosmosButton>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
