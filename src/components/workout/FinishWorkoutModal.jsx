import { useState, useEffect } from "react";
import Modal from "../ui/Modal";
import Button from "../ui/Button";
import Input from "../ui/Input";

export default function FinishWorkoutModal({ open, onClose, onSave, elapsedMin, prs = [], initialDuration, initialNotes, isEditing = false }) {
  const [duration, setDuration] = useState(elapsedMin || "");
  const [notes, setNotes] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (open) {
      setDuration(initialDuration ?? elapsedMin ?? "");
      setNotes(initialNotes ?? "");
    }
  }, [open]); // eslint-disable-line react-hooks/exhaustive-deps

  async function handleSave() {
    setSaving(true);
    await onSave({ duration_min: parseInt(duration) || 0, notes });
    setSaving(false);
    onClose();
  }

  return (
    <Modal open={open} onClose={onClose} title={isEditing ? "Update Workout" : "Finish Workout"}>
      <div className="flex flex-col gap-4">
        <Input
          label="Duration (minutes)"
          type="number"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          placeholder="60"
        />
        <div className="flex flex-col gap-1">
          <label className="text-xs font-medium text-zinc-400 uppercase tracking-wide">Notes (optional)</label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="How did it feel?"
            rows={3}
            className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-2.5 text-white placeholder-zinc-500 focus:outline-none focus:border-accent/60 text-sm resize-none"
          />
        </div>

        {prs.length > 0 && (
          <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl px-4 py-3">
            <p className="text-yellow-400 font-semibold text-sm mb-1">🏆 New PRs!</p>
            {prs.map((pr) => (
              <p key={pr.exercise_name} className="text-xs text-yellow-300">
                {pr.exercise_name} — new 1RM: {pr.newValue.toFixed(1)} kg
              </p>
            ))}
          </div>
        )}

        <div className="flex gap-3">
          <Button variant="secondary" onClick={onClose} className="flex-1">Cancel</Button>
          <Button onClick={handleSave} disabled={saving} className="flex-1">
            {saving ? (isEditing ? "Updating…" : "Saving…") : (isEditing ? "Update workout" : "Save workout")}
          </Button>
        </div>
      </div>
    </Modal>
  );
}
