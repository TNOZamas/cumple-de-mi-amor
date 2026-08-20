"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "../utils/supabase/server";

export async function createGreetingAction(formData: FormData) {
  const supabase = await createClient();

  const name = formData.get("name") as string;
  const message = formData.get("message") as string;
  const style = (formData.get("style") as string) || "amber";
  const file = formData.get("file") as File | null;

  // Validación preventiva
  if (!name || !name.trim()) {
    throw new Error("El nombre es un campo obligatorio.");
  }

  if (!message || !message.trim()) {
    throw new Error("El mensaje es un campo obligatorio.");
  }

  let mediaUrl: string | null = null;

  // 1. Subir imagen/video si está presente
  if (file && file.size > 0) {
    const fileExt = file.name.split(".").pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;

    const { error: uploadError } = await supabase.storage
      .from("saludos-media")
      .upload(fileName, file);

    if (uploadError) {
      throw new Error("Error al subir archivo: " + uploadError.message);
    }

    const { data: publicUrlData } = supabase.storage
      .from("saludos-media")
      .getPublicUrl(fileName);

    mediaUrl = publicUrlData.publicUrl;
  }

  // 2. Insertar en la Base de Datos
  const { error: dbError } = await supabase.from("saludos").insert([
    {
      name: name.trim(),
      message: message.trim(),
      style,
      media_url: mediaUrl,
    },
  ]);

  if (dbError) {
    throw new Error("Error al guardar mensaje: " + dbError.message);
  }

  revalidatePath("/saludos");
  return { success: true };
}
