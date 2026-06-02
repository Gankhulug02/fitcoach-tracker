import { createClient } from "@supabase/supabase-js";

const url = import.meta.env.VITE_SUPABASE_URL;
const key = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

const isValidUrl = (s) => { try { return /^https?:\/\/.+/.test(s); } catch { return false; } };

export const supabase = isValidUrl(url) && key ? createClient(url, key) : null;
export const isConfigured = !!supabase;
