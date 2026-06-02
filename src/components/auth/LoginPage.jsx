import { supabase, isConfigured } from "../../lib/supabaseClient";
import Button from "../ui/Button";

export default function LoginPage() {
  async function signIn() {
    if (!supabase) return;
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: window.location.origin },
    });
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 bg-zinc-950">
      <div className="w-full max-w-sm flex flex-col items-center gap-8">
        <div className="text-center">
          <div className="text-6xl mb-4">💪</div>
          <h1 className="text-3xl font-bold text-white mb-2">FitCoach Tracker</h1>
          <p className="text-zinc-400 text-sm leading-relaxed">
            Track your workouts, runs, and body composition in one place.
          </p>
        </div>

        {!isConfigured ? (
          <div className="w-full bg-yellow-500/10 border border-yellow-500/30 rounded-2xl px-5 py-4 text-center">
            <p className="text-yellow-400 font-semibold text-sm mb-1">⚙️ Setup required</p>
            <p className="text-xs text-yellow-300/70">
              Add your Supabase credentials to <code className="bg-zinc-800 px-1.5 py-0.5 rounded">.env.local</code> to enable login.
            </p>
          </div>
        ) : (
          <div className="w-full flex flex-col gap-3">
            <Button onClick={signIn} size="lg" className="w-full gap-3">
              <svg width="20" height="20" viewBox="0 0 48 48" fill="none">
                <path fill="#EA4335" d="M24 9.5c3.5 0 6.6 1.2 9.1 3.2l6.8-6.8C35.8 2.4 30.2 0 24 0 14.6 0 6.6 5.4 2.6 13.2l7.9 6.2C12.3 13.2 17.7 9.5 24 9.5z"/>
                <path fill="#4285F4" d="M46.5 24.5c0-1.6-.1-3.2-.4-4.7H24v9h12.7c-.5 2.8-2.1 5.1-4.4 6.7l7 5.4c4.1-3.8 6.4-9.4 6.4-16.4z"/>
                <path fill="#FBBC05" d="M10.5 28.6A14.4 14.4 0 0 1 9.5 24c0-1.6.3-3.1.8-4.6l-7.9-6.2A23.8 23.8 0 0 0 0 24c0 3.8.9 7.4 2.5 10.6l8-5.9z"/>
                <path fill="#34A853" d="M24 48c6.1 0 11.3-2 15-5.4l-7-5.4c-2 1.4-4.6 2.2-8 2.2-6.3 0-11.7-3.7-13.4-9.8l-8 6c3.9 7.8 11.9 12.4 21.4 12.4z"/>
              </svg>
              Continue with Google
            </Button>
          </div>
        )}

        <p className="text-xs text-zinc-600 text-center">
          Your data is private and only visible to you.
        </p>
      </div>
    </div>
  );
}
