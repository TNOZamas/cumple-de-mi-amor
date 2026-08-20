"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function loginAction(formData: FormData) {
  const passwordInput = (formData.get("password") as string) || "";
  const SECRET_PASSWORD = process.env.SORPRESAS_PASSWORD || "alohomora";

  // Normalizamos quitando espacios y pasando a minúsculas
  const cleanInput = passwordInput.trim().toLowerCase();

  if (cleanInput === SECRET_PASSWORD.toLowerCase()) {
    const cookieStore = await cookies();

    // Cookie válida por 30 días
    cookieStore.set("auth_sorpresa", SECRET_PASSWORD, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 30,
      path: "/",
    });

    redirect("/");
  } else {
    return {
      error: "Hechizo incorrecto... ¡Prueba con otra palabra mágica!",
    };
  }
}
