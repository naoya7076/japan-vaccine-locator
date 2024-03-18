import { createServerClient } from "@supabase/auth-helpers-remix";

export const supabaseClient = (request: Request, response: Response) => {
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;
  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error("Supabase URL or Supabase Anon Key is missing.");
  }
  return createServerClient(supabaseUrl, supabaseAnonKey, {
    request,
    response,
  });
};
