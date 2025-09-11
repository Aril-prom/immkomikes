import { supabase } from "./supabase.js";

export async function getAllBerita() {
  let { data, error } = await supabase
    .from("berita")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error(error);
    return [];
  }

  return data;
}

export async function getBeritaBySlug(slug) {
  let { data, error } = await supabase
    .from("berita")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error) {
    console.error(error);
    return null;
  }

  return data;
}
