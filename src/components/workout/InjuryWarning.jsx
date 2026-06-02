import { useAuth } from "../../context/AuthContext";

export default function InjuryWarning({ exercise }) {
  const { profile } = useAuth();
  if (!profile) return null;

  const warnings = [];
  if (exercise.shoulder_warning && profile.shoulder_restriction) {
    warnings.push("shoulder");
  }
  if (exercise.ankle_warning && profile.ankle_restriction) {
    warnings.push("ankle");
  }
  if (!warnings.length) return null;

  return (
    <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl px-3 py-2 mt-2">
      <p className="text-xs text-yellow-400">
        ⚠️ This exercise may aggravate your {warnings.join(" & ")}. Consult your physio before loading.
      </p>
    </div>
  );
}
