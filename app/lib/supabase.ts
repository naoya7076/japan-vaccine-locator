import { createServerClient } from "@supabase/auth-helpers-remix";
import { Database } from "@/types/supabase";

export const supabaseClient = (request: Request, response: Response) => {
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;
  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error("Supabase URL or Supabase Anon Key is missing.");
  }
  return createServerClient<Database>(supabaseUrl, supabaseAnonKey, {
    request,
    response,
  });
};
