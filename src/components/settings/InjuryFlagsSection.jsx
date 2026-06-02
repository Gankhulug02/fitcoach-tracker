import { useAuth } from "../../context/AuthContext";
import toast from "react-hot-toast";

const FLAGS = [
  { key: "shoulder_restriction", label: "Shoulder restriction", desc: "Post-op Latarjet / impingement" },
  { key: "ankle_restriction",    label: "Ankle restriction",    desc: "Sprain / instability"           },
];

export default function InjuryFlagsSection() {
  const { profile, updateProfile } = useAuth();

  async function toggle(key) {
    const newVal = !profile?.[key];
    await updateProfile({ [key]: newVal });
    toast.success(`${newVal ? "Enabled" : "Disabled"} ${key.replace("_", " ")}`);
  }

  return (
    <div className="flex flex-col gap-3">
      {FLAGS.map(({ key, label, desc }) => (
        <div key={key} className="flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold text-white">{label}</p>
            <p className="text-xs text-zinc-500">{desc}</p>
          </div>
          <button
            onClick={() => toggle(key)}
            className={`relative w-12 h-6 rounded-full transition-colors tap-target ${profile?.[key] ? "bg-accent" : "bg-zinc-700"}`}
          >
            <span className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${profile?.[key] ? "translate-x-6" : ""}`} />
          </button>
        </div>
      ))}
    </div>
  );
}
