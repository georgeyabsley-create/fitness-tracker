export function getTodayKey() {
  return new Date().toISOString().split('T')[0];
}

export function getLastSession(workoutHistory, exerciseName) {
  const name = exerciseName.trim().toLowerCase();
  const todayKey = getTodayKey();
  const sortedDates = Object.keys(workoutHistory)
    .filter(date => date !== todayKey)
    .sort()
    .reverse();

  for (const date of sortedDates) {
    const session = workoutHistory[date];
    const match = session.exercises?.find(
      e => e.name.trim().toLowerCase() === name
    );
    if (match) return { date, exercise: match };
  }
  return null;
}

export function getPersonalRecords(workoutHistory) {
  const prs = {};
  for (const date of Object.keys(workoutHistory)) {
    const session = workoutHistory[date];
    for (const exercise of session.exercises || []) {
      const name = exercise.name.trim().toLowerCase();
      for (const set of exercise.sets || []) {
        const weight = parseFloat(set.weight) || 0;
        const reps = parseInt(set.reps) || 0;
        const volume = weight * reps;
        if (!prs[name] || weight > prs[name].weight || (weight === prs[name].weight && reps > prs[name].reps)) {
          prs[name] = { weight, reps, volume, date, displayName: exercise.name };
        }
      }
    }
  }
  return prs;
}

export function formatDate(dateStr) {
  const date = new Date(dateStr + 'T00:00:00');
  return date.toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short' });
}
