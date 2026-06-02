export const exerciseLibrary = [
  // ── Push ─────────────────────────────────────────────────────────────────
  { id: "p1",  name: "Bench Press (Barbell)",       category: "Push", muscle_group: "Chest",     shoulder_warning: false, ankle_warning: false },
  { id: "p2",  name: "Incline Bench Press",          category: "Push", muscle_group: "Chest",     shoulder_warning: false, ankle_warning: false },
  { id: "p3",  name: "Decline Bench Press",          category: "Push", muscle_group: "Chest",     shoulder_warning: false, ankle_warning: false },
  { id: "p4",  name: "Dumbbell Bench Press",         category: "Push", muscle_group: "Chest",     shoulder_warning: false, ankle_warning: false },
  { id: "p5",  name: "Incline Dumbbell Press",       category: "Push", muscle_group: "Chest",     shoulder_warning: false, ankle_warning: false },
  { id: "p6",  name: "Cable Chest Fly",              category: "Push", muscle_group: "Chest",     shoulder_warning: false, ankle_warning: false },
  { id: "p7",  name: "Dumbbell Chest Fly",           category: "Push", muscle_group: "Chest",     shoulder_warning: false, ankle_warning: false },
  { id: "p8",  name: "Pec Dec Machine",              category: "Push", muscle_group: "Chest",     shoulder_warning: false, ankle_warning: false },
  { id: "p9",  name: "Overhead Press (Barbell)",     category: "Push", muscle_group: "Shoulders", shoulder_warning: true,  ankle_warning: false },
  { id: "p10", name: "Seated Dumbbell Press",        category: "Push", muscle_group: "Shoulders", shoulder_warning: true,  ankle_warning: false },
  { id: "p11", name: "Arnold Press",                 category: "Push", muscle_group: "Shoulders", shoulder_warning: true,  ankle_warning: false },
  { id: "p12", name: "Lateral Raises",               category: "Push", muscle_group: "Shoulders", shoulder_warning: false, ankle_warning: false },
  { id: "p13", name: "Front Raises",                 category: "Push", muscle_group: "Shoulders", shoulder_warning: false, ankle_warning: false },
  { id: "p14", name: "Cable Lateral Raises",         category: "Push", muscle_group: "Shoulders", shoulder_warning: false, ankle_warning: false },
  { id: "p15", name: "Tricep Pushdown (Cable)",      category: "Push", muscle_group: "Triceps",   shoulder_warning: false, ankle_warning: false },
  { id: "p16", name: "Skull Crushers",               category: "Push", muscle_group: "Triceps",   shoulder_warning: true,  ankle_warning: false },
  { id: "p17", name: "Close-Grip Bench Press",       category: "Push", muscle_group: "Triceps",   shoulder_warning: false, ankle_warning: false },
  { id: "p18", name: "Overhead Tricep Extension",    category: "Push", muscle_group: "Triceps",   shoulder_warning: true,  ankle_warning: false },
  { id: "p19", name: "Dips",                         category: "Push", muscle_group: "Triceps",   shoulder_warning: true,  ankle_warning: false },
  { id: "p20", name: "Push-Ups",                     category: "Push", muscle_group: "Chest",     shoulder_warning: false, ankle_warning: false },

  // ── Pull ─────────────────────────────────────────────────────────────────
  { id: "l1",  name: "Pull-Ups",                     category: "Pull", muscle_group: "Back",    shoulder_warning: false, ankle_warning: false },
  { id: "l2",  name: "Chin-Ups",                     category: "Pull", muscle_group: "Back",    shoulder_warning: false, ankle_warning: false },
  { id: "l3",  name: "Lat Pulldown",                 category: "Pull", muscle_group: "Back",    shoulder_warning: false, ankle_warning: false },
  { id: "l4",  name: "Close-Grip Lat Pulldown",      category: "Pull", muscle_group: "Back",    shoulder_warning: false, ankle_warning: false },
  { id: "l5",  name: "Seated Cable Row",             category: "Pull", muscle_group: "Back",    shoulder_warning: false, ankle_warning: false },
  { id: "l6",  name: "Bent-Over Barbell Row",        category: "Pull", muscle_group: "Back",    shoulder_warning: false, ankle_warning: false },
  { id: "l7",  name: "Dumbbell Row",                 category: "Pull", muscle_group: "Back",    shoulder_warning: false, ankle_warning: false },
  { id: "l8",  name: "T-Bar Row",                    category: "Pull", muscle_group: "Back",    shoulder_warning: false, ankle_warning: false },
  { id: "l9",  name: "Chest-Supported Row",          category: "Pull", muscle_group: "Back",    shoulder_warning: false, ankle_warning: false },
  { id: "l10", name: "Machine Row",                  category: "Pull", muscle_group: "Back",    shoulder_warning: false, ankle_warning: false },
  { id: "l11", name: "Face Pulls",                   category: "Pull", muscle_group: "Back",    shoulder_warning: false, ankle_warning: false },
  { id: "l12", name: "Straight-Arm Pulldown",        category: "Pull", muscle_group: "Back",    shoulder_warning: false, ankle_warning: false },
  { id: "l13", name: "Barbell Curl",                 category: "Pull", muscle_group: "Biceps",  shoulder_warning: false, ankle_warning: false },
  { id: "l14", name: "Dumbbell Curl",                category: "Pull", muscle_group: "Biceps",  shoulder_warning: false, ankle_warning: false },
  { id: "l15", name: "Hammer Curl",                  category: "Pull", muscle_group: "Biceps",  shoulder_warning: false, ankle_warning: false },
  { id: "l16", name: "Preacher Curl",                category: "Pull", muscle_group: "Biceps",  shoulder_warning: false, ankle_warning: false },
  { id: "l17", name: "Cable Curl",                   category: "Pull", muscle_group: "Biceps",  shoulder_warning: false, ankle_warning: false },
  { id: "l18", name: "Incline Dumbbell Curl",        category: "Pull", muscle_group: "Biceps",  shoulder_warning: false, ankle_warning: false },
  { id: "l19", name: "Rear Delt Fly",                category: "Pull", muscle_group: "Back",    shoulder_warning: false, ankle_warning: false },
  { id: "l20", name: "Shrugs",                       category: "Pull", muscle_group: "Traps",   shoulder_warning: false, ankle_warning: false },

  // ── Legs ─────────────────────────────────────────────────────────────────
  { id: "g1",  name: "Barbell Squat",                category: "Legs", muscle_group: "Quads",   shoulder_warning: false, ankle_warning: false },
  { id: "g2",  name: "Front Squat",                  category: "Legs", muscle_group: "Quads",   shoulder_warning: false, ankle_warning: false },
  { id: "g3",  name: "Goblet Squat",                 category: "Legs", muscle_group: "Quads",   shoulder_warning: false, ankle_warning: false },
  { id: "g4",  name: "Hack Squat",                   category: "Legs", muscle_group: "Quads",   shoulder_warning: false, ankle_warning: false },
  { id: "g5",  name: "Leg Press",                    category: "Legs", muscle_group: "Quads",   shoulder_warning: false, ankle_warning: false },
  { id: "g6",  name: "Leg Extension",                category: "Legs", muscle_group: "Quads",   shoulder_warning: false, ankle_warning: false },
  { id: "g7",  name: "Leg Curl (Lying)",             category: "Legs", muscle_group: "Hamstrings", shoulder_warning: false, ankle_warning: false },
  { id: "g8",  name: "Leg Curl (Seated)",            category: "Legs", muscle_group: "Hamstrings", shoulder_warning: false, ankle_warning: false },
  { id: "g9",  name: "Romanian Deadlift",            category: "Legs", muscle_group: "Hamstrings", shoulder_warning: false, ankle_warning: false },
  { id: "g10", name: "Stiff-Leg Deadlift",           category: "Legs", muscle_group: "Hamstrings", shoulder_warning: false, ankle_warning: false },
  { id: "g11", name: "Nordic Curls",                 category: "Legs", muscle_group: "Hamstrings", shoulder_warning: false, ankle_warning: false },
  { id: "g12", name: "Hip Thrust",                   category: "Legs", muscle_group: "Glutes",  shoulder_warning: false, ankle_warning: false },
  { id: "g13", name: "Glute Bridge",                 category: "Legs", muscle_group: "Glutes",  shoulder_warning: false, ankle_warning: false },
  { id: "g14", name: "Cable Kickback",               category: "Legs", muscle_group: "Glutes",  shoulder_warning: false, ankle_warning: false },
  { id: "g15", name: "Bulgarian Split Squat",        category: "Legs", muscle_group: "Quads",   shoulder_warning: false, ankle_warning: true  },
  { id: "g16", name: "Walking Lunges",               category: "Legs", muscle_group: "Quads",   shoulder_warning: false, ankle_warning: true  },
  { id: "g17", name: "Standing Calf Raise",          category: "Legs", muscle_group: "Calves",  shoulder_warning: false, ankle_warning: true  },
  { id: "g18", name: "Seated Calf Raise",            category: "Legs", muscle_group: "Calves",  shoulder_warning: false, ankle_warning: false },
  { id: "g19", name: "Box Jumps",                    category: "Legs", muscle_group: "Quads",   shoulder_warning: false, ankle_warning: true  },
  { id: "g20", name: "Step-Ups",                     category: "Legs", muscle_group: "Quads",   shoulder_warning: false, ankle_warning: true  },

  // ── Core ─────────────────────────────────────────────────────────────────
  { id: "c1",  name: "Plank",                        category: "Core", muscle_group: "Core",    shoulder_warning: false, ankle_warning: false },
  { id: "c2",  name: "Side Plank",                   category: "Core", muscle_group: "Core",    shoulder_warning: false, ankle_warning: false },
  { id: "c3",  name: "Ab Wheel",                     category: "Core", muscle_group: "Core",    shoulder_warning: false, ankle_warning: false },
  { id: "c4",  name: "Cable Crunch",                 category: "Core", muscle_group: "Core",    shoulder_warning: false, ankle_warning: false },
  { id: "c5",  name: "Hanging Leg Raise",            category: "Core", muscle_group: "Core",    shoulder_warning: false, ankle_warning: false },
  { id: "c6",  name: "Russian Twist",                category: "Core", muscle_group: "Core",    shoulder_warning: false, ankle_warning: false },
  { id: "c7",  name: "Dead Bug",                     category: "Core", muscle_group: "Core",    shoulder_warning: false, ankle_warning: false },
  { id: "c8",  name: "Pallof Press",                 category: "Core", muscle_group: "Core",    shoulder_warning: false, ankle_warning: false },
  { id: "c9",  name: "Decline Sit-Up",               category: "Core", muscle_group: "Core",    shoulder_warning: false, ankle_warning: false },
  { id: "c10", name: "L-Sit",                        category: "Core", muscle_group: "Core",    shoulder_warning: false, ankle_warning: false },

  // ── Full Body ─────────────────────────────────────────────────────────────
  { id: "f1",  name: "Deadlift",                     category: "Full Body", muscle_group: "Full Body", shoulder_warning: false, ankle_warning: false },
  { id: "f2",  name: "Sumo Deadlift",                category: "Full Body", muscle_group: "Full Body", shoulder_warning: false, ankle_warning: false },
  { id: "f3",  name: "Power Clean",                  category: "Full Body", muscle_group: "Full Body", shoulder_warning: false, ankle_warning: false },
  { id: "f4",  name: "Farmer's Carry",               category: "Full Body", muscle_group: "Full Body", shoulder_warning: false, ankle_warning: false },
  { id: "f5",  name: "Kettlebell Swing",             category: "Full Body", muscle_group: "Full Body", shoulder_warning: false, ankle_warning: false },
  { id: "f6",  name: "Battle Ropes",                 category: "Full Body", muscle_group: "Full Body", shoulder_warning: false, ankle_warning: false },
  { id: "f7",  name: "Sled Push",                    category: "Full Body", muscle_group: "Full Body", shoulder_warning: false, ankle_warning: false },
  { id: "f8",  name: "Sled Pull",                    category: "Full Body", muscle_group: "Full Body", shoulder_warning: false, ankle_warning: false },
  { id: "f9",  name: "Turkish Get-Up",               category: "Full Body", muscle_group: "Full Body", shoulder_warning: true,  ankle_warning: false },
  { id: "f10", name: "Man Maker",                    category: "Full Body", muscle_group: "Full Body", shoulder_warning: false, ankle_warning: false },
];

export const exerciseCategories = ["Push", "Pull", "Legs", "Core", "Full Body"];

export function searchExercises(query, category = null) {
  const q = query.toLowerCase().trim();
  return exerciseLibrary.filter((e) => {
    const matchesQuery = !q || e.name.toLowerCase().includes(q) || e.muscle_group.toLowerCase().includes(q);
    const matchesCategory = !category || e.category === category;
    return matchesQuery && matchesCategory;
  });
}
