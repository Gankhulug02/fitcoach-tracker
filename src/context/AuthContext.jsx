import { createContext, useContext, useEffect, useState } from "react";
import { supabase, isConfigured } from "../lib/supabaseClient";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [session, setSession] = useState(isConfigured ? undefined : null);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    if (!isConfigured) return;

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session) fetchProfile(session.user.id);
    }).catch(() => setSession(null));

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session) fetchProfile(session.user.id);
      else setProfile(null);
    });

    return () => subscription.unsubscribe();
  }, []);

  async function fetchProfile(userId) {
    const { data } = await supabase.from("users").select("*").eq("id", userId).single();
    setProfile(data);
  }

  async function updateProfile(updates) {
    if (!session) return;
    const { data, error } = await supabase
      .from("users")
      .update(updates)
      .eq("id", session.user.id)
      .select()
      .single();
    if (!error) setProfile(data);
    return { data, error };
  }

  async function signOut() {
    await supabase.auth.signOut();
  }

  const isOnboarded = profile?.dob != null && profile?.height_cm != null;

  return (
    <AuthContext.Provider value={{ session, profile, isOnboarded, updateProfile, signOut, fetchProfile }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
