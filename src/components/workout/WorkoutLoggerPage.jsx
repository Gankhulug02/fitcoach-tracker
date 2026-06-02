import { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Plus, ChevronLeft } from "lucide-react";
import PageWrapper from "../layout/PageWrapper";
import ExerciseBlock from "./ExerciseBlock";
import ExerciseSearch from "./ExerciseSearch";
import RestTimer from "./RestTimer";
import FinishWorkoutModal from "./FinishWorkoutModal";
import BottomSheet from "../ui/BottomSheet";
import WorkoutTypeSelector from "./WorkoutTypeSelector";
import Button from "../ui/Button";
import { useWorkouts } from "../../hooks/useWorkouts";
import toast from "react-hot-toast";
import { format } from "date-fns";

export default function WorkoutLoggerPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { saveWorkout } = useWorkouts();

  const [workoutType, setWorkoutType] = useState(null);
  const [exercises, setExercises] = useState([]); // [{ exercise, sets[] }]
  const [showTypeSelector, setShowTypeSelector] = useState(true);
  const [showExerciseSearch, setShowExerciseSearch] = useState(false);
  const [showFinish, setShowFinish] = useState(false);
  const [prs, setPrs] = useState([]);
  const [elapsed, setElapsed] = useState(0);
  const startRef = useRef(Date.now());

  useEffect(() => {
    const iv = setInterval(() => setElapsed(Math.floor((Date.now() - startRef.current) / 1000)), 1000);
    return () => clearInterval(iv);
  }, []);

  const elapsedMin = Math.floor(elapsed / 60);
  const elapsedDisplay = `${Math.floor(elapsed / 60)}:${(elapsed % 60).toString().padStart(2, "0")}`;

  function selectType(type) {
    setWorkoutType(type);
    setShowTypeSelector(false);
  }

  function addExercise(ex) {
    setExercises((prev) => [
      ...prev,
      {
        exercise: ex,
        sets: [{ set_number: 1, reps: "", weight_kg: "", rpe: "" }],
      },
    ]);
    setShowExerciseSearch(false);
  }

  function updateSets(index, newSets) {
    setExercises((prev) =>
      prev.map((e, i) => i === index ? { ...e, sets: newSets.map((s, j) => ({ ...s, set_number: j + 1 })) } : e)
    );
  }

  function addSet(index) {
    setExercises((prev) =>
      prev.map((e, i) => {
        if (i !== index) return e;
        const last = e.sets[e.sets.length - 1] || {};
        return {
          ...e,
          sets: [...e.sets, { set_number: e.sets.length + 1, reps: last.reps || "", weight_kg: last.weight_kg || "", rpe: "" }],
        };
      })
    );
  }

  function removeExercise(index) {
    setExercises((prev) => prev.filter((_, i) => i !== index));
  }

  async function handleSave({ duration_min, notes }) {
    const allSets = exercises.flatMap(({ exercise, sets }) =>
      sets
        .filter((s) => s.reps && s.weight_kg)
        .map((s) => ({
          exercise_name: exercise.name,
          set_number: s.set_number,
          reps: parseInt(s.reps),
          weight_kg: parseFloat(s.weight_kg),
          rpe: s.rpe ? parseInt(s.rpe) : null,
        }))
    );

    const { prs: detectedPRs, error } = await saveWorkout(
      {
        date: format(new Date(), "yyyy-MM-dd"),
        workout_type: workoutType,
        duration_min,
        notes,
      },
      allSets
    );

    if (error) return;

    if (detectedPRs?.length) {
      setPrs(detectedPRs);
      toast.success(`🏆 ${detectedPRs.length} new PR${detectedPRs.length > 1 ? "s" : ""}!`);
    } else {
      toast.success("Workout saved!");
    }
    navigate("/workouts");
  }

  return (
    <PageWrapper>
      <div className="flex items-center gap-3 mb-5">
        <button onClick={() => navigate("/workouts")} className="text-zinc-400 hover:text-white tap-target p-1">
          <ChevronLeft size={22} />
        </button>
        <div className="flex-1">
          <h1 className="text-lg font-bold">{workoutType || "New Workout"}</h1>
          <p className="text-xs text-zinc-500">{elapsedDisplay} elapsed</p>
        </div>
        <Button onClick={() => setShowFinish(true)} size="sm" disabled={exercises.length === 0}>
          Finish
        </Button>
      </div>

      <RestTimer />

      <div className="mt-4">
        {exercises.length === 0 && !showTypeSelector && (
          <div className="text-center py-10 text-zinc-500 text-sm">
            Tap "+ Add Exercise" to start logging
          </div>
        )}
        {exercises.map(({ exercise, sets }, i) => (
          <ExerciseBlock
            key={i}
            exercise={exercise}
            sets={sets}
            onChange={(newSets) => updateSets(i, newSets)}
            onAddSet={() => addSet(i)}
            onRemove={() => removeExercise(i)}
            prs={prs.map((p) => p.exercise_name)}
          />
        ))}
      </div>

      {workoutType && (
        <button
          onClick={() => setShowExerciseSearch(true)}
          className="w-full flex items-center justify-center gap-2 border-2 border-dashed border-zinc-700 hover:border-accent/50 rounded-2xl py-4 text-zinc-500 hover:text-accent transition mt-2"
        >
          <Plus size={18} /> Add Exercise
        </button>
      )}

      <BottomSheet open={showTypeSelector} onClose={() => navigate(-1)} title="Choose workout type" fullHeight={false}>
        <WorkoutTypeSelector onSelect={selectType} />
      </BottomSheet>

      <BottomSheet open={showExerciseSearch} onClose={() => setShowExerciseSearch(false)} title="Add exercise" fullHeight>
        <ExerciseSearch onSelect={addExercise} />
      </BottomSheet>

      <FinishWorkoutModal
        open={showFinish}
        onClose={() => setShowFinish(false)}
        onSave={handleSave}
        elapsedMin={elapsedMin}
        prs={prs}
      />
    </PageWrapper>
  );
}
