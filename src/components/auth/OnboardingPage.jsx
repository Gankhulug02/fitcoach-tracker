import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import Button from "../ui/Button";
import Input from "../ui/Input";

const STEPS = ["body", "profile", "injuries"];

export default function OnboardingPage() {
  const { updateProfile } = useAuth();
  const [step, setStep] = useState(0);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    weight_kg: "",
    body_fat_pct: "",
    skeletal_muscle_pct: "",
    height_cm: "",
    dob: "",
    shoulder_restriction: false,
    ankle_restriction: false,
  });

  function set(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  async function finish() {
    setSaving(true);
    await updateProfile({
      height_cm: parseInt(form.height_cm),
      dob: form.dob,
      shoulder_restriction: form.shoulder_restriction,
      ankle_restriction: form.ankle_restriction,
    });
    setSaving(false);
  }

  const stepContent = [
    {
      title: "Your body stats",
      subtitle: "We'll use these as your starting baseline.",
      content: (
        <div className="flex flex-col gap-4">
          <Input label="Current weight (kg)" type="number" step="0.1" placeholder="78.8" value={form.weight_kg} onChange={(e) => set("weight_kg", e.target.value)} />
          <Input label="Body fat %" type="number" step="0.1" placeholder="22.6" value={form.body_fat_pct} onChange={(e) => set("body_fat_pct", e.target.value)} />
          <Input label="Skeletal muscle %" type="number" step="0.1" placeholder="43.8" value={form.skeletal_muscle_pct} onChange={(e) => set("skeletal_muscle_pct", e.target.value)} />
        </div>
      ),
    },
    {
      title: "About you",
      subtitle: "Used to calculate your body age.",
      content: (
        <div className="flex flex-col gap-4">
          <Input label="Height (cm)" type="number" placeholder="174" value={form.height_cm} onChange={(e) => set("height_cm", e.target.value)} />
          <Input label="Date of birth" type="date" value={form.dob} onChange={(e) => set("dob", e.target.value)} />
        </div>
      ),
    },
    {
      title: "Any injuries?",
      subtitle: "We'll warn you about exercises that may aggravate them.",
      content: (
        <div className="flex flex-col gap-4">
          {[
            { key: "shoulder_restriction", label: "Shoulder restriction", desc: "e.g. post-op Latarjet, impingement" },
            { key: "ankle_restriction", label: "Ankle restriction", desc: "e.g. current sprain, instability" },
          ].map(({ key, label, desc }) => (
            <button
              key={key}
              onClick={() => set(key, !form[key])}
              className={`flex items-start gap-4 p-4 rounded-2xl border-2 text-left transition-all ${
                form[key] ? "border-accent bg-accent/10" : "border-zinc-800 bg-zinc-900"
              }`}
            >
              <div className={`w-5 h-5 rounded-full border-2 mt-0.5 flex items-center justify-center flex-shrink-0 ${form[key] ? "border-accent bg-accent" : "border-zinc-600"}`}>
                {form[key] && <span className="text-zinc-950 text-xs font-bold">✓</span>}
              </div>
              <div>
                <div className="font-semibold text-white">{label}</div>
                <div className="text-xs text-zinc-400 mt-0.5">{desc}</div>
              </div>
            </button>
          ))}
        </div>
      ),
    },
  ];

  const current = stepContent[step];

  return (
    <div className="min-h-screen flex flex-col bg-zinc-950 px-6 py-10">
      <div className="max-w-sm mx-auto w-full flex-1 flex flex-col">
        <div className="flex gap-1.5 mb-8">
          {STEPS.map((_, i) => (
            <div key={i} className={`h-1 flex-1 rounded-full transition-all ${i <= step ? "bg-accent" : "bg-zinc-800"}`} />
          ))}
        </div>

        <div className="flex-1">
          <h2 className="text-2xl font-bold text-white mb-1">{current.title}</h2>
          <p className="text-sm text-zinc-400 mb-6">{current.subtitle}</p>
          {current.content}
        </div>

        <div className="flex gap-3 mt-8">
          {step > 0 && (
            <Button variant="secondary" onClick={() => setStep((s) => s - 1)} className="flex-1">Back</Button>
          )}
          {step < STEPS.length - 1 ? (
            <Button onClick={() => setStep((s) => s + 1)} className="flex-1">Continue</Button>
          ) : (
            <Button onClick={finish} disabled={saving} className="flex-1">{saving ? "Saving…" : "Get started"}</Button>
          )}
        </div>
      </div>
    </div>
  );
}
