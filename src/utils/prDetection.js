function epley1RM(weightKg, reps) {
  return weightKg * (1 + reps / 30);
}

export function detectPRs(newSets, historicalSets) {
  const prs = [];
  const exercises = [...new Set(newSets.map((s) => s.exercise_name))];

  for (const exercise of exercises) {
    const newEx = newSets.filter((s) => s.exercise_name === exercise);
    const histEx = historicalSets.filter((s) => s.exercise_name === exercise);

    const newBest1RM = Math.max(...newEx.map((s) => epley1RM(s.weight_kg, s.reps)));
    const histBest1RM = histEx.length
      ? Math.max(...histEx.map((s) => epley1RM(s.weight_kg, s.reps)))
      : 0;

    if (newBest1RM > histBest1RM) {
      prs.push({ exercise_name: exercise, type: "1RM", newValue: newBest1RM, previousBest: histBest1RM });
    }
  }
  return prs;
}
