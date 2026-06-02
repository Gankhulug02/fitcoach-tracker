// Heuristic body age estimate based on VO2 Max and body fat %.
// Coefficients are estimates, not clinical values.
export function estimateBodyAge(vo2Max, bodyFatPct, chronologicalAge) {
  if (!vo2Max || !bodyFatPct || !chronologicalAge) return null;
  let offset = 0;
  // VO2 Max: each unit below 48 = +0.5 yr
  offset += (48 - vo2Max) * 0.5;
  // BF%: each % above 15 = +0.75 yr; below = -0.3 yr
  const bfDelta = bodyFatPct - 15;
  offset += bfDelta > 0 ? bfDelta * 0.75 : bfDelta * 0.3;
  return Math.max(Math.round(chronologicalAge + offset), 18);
}
