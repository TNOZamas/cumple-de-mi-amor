import GreetingsWallClient from "../components/ui/GreetingsWall";
import { createClient } from "../utils/supabase/server";

export const revalidate = 0;

export default async function GreetingsWallPage() {
  const supabase = await createClient();

  const { data: saludos } = await supabase
    .from("saludos")
    .select("*")
    .order("created_at", { ascending: false });

  return <GreetingsWallClient saludos={saludos || []} />;
}
