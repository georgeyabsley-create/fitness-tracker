import React from 'react';
import SetRow from './SetRow';

function emptySet() {
  return { weight: '', reps: '', difficulty: '' };
}

export default function ExerciseCard({ exercise, onChange, onRemove, lastSession, isPR }) {
  const updateSet = (setIndex, updatedSet) => {
    const sets = exercise.sets.map((s, i) => (i === setIndex ? updatedSet : s));
    onChange({ ...exercise, sets });
  };

  const addSet = () => {
    const lastSet = exercise.sets[exercise.sets.length - 1];
    const prefill = lastSet ? { weight: lastSet.weight, reps: lastSet.reps, difficulty: '' } : emptySet();
    onChange({ ...exercise, sets: [...exercise.sets, prefill] });
  };

  const removeSet = (setIndex) => {
    const sets = exercise.sets.filter((_, i) => i !== setIndex);
    onChange({ ...exercise, sets });
  };

  return (
    <div className="exercise-card">
      <div className="exercise-header">
        <div className="exercise-name-row">
          <input
            className="exercise-name-input"
            type="text"
            placeholder="Exercise name"
            value={exercise.name}
            onChange={e => onChange({ ...exercise, name: e.target.value })}
          />
          <button className="remove-exercise-btn" onClick={onRemove} aria-label="Remove exercise">✕</button>
        </div>

        {lastSession && (
          <div className="last-session-hint">
            <span className="hint-label">Last time ({lastSession.date}):</span>
            {lastSession.exercise.sets.map((s, i) => (
              <span key={i} className="hint-set">
                {s.weight}kg × {s.reps}
                {s.difficulty && <span className={`hint-diff hint-diff--${s.difficulty}`}> {s.difficulty}</span>}
              </span>
            ))}
          </div>
        )}

        {isPR && (
          <div className="pr-badge">🏆 PR: {isPR.weight}kg × {isPR.reps} reps</div>
        )}
      </div>

      <div className="sets-list">
        <div className="sets-header">
          <span>Set</span>
          <span>Weight / Reps</span>
          <span>Difficulty</span>
          <span></span>
        </div>
        {exercise.sets.map((set, i) => (
          <SetRow
            key={i}
            setIndex={i}
            set={set}
            onChange={updateSet}
            onRemove={removeSet}
          />
        ))}
      </div>

      <button className="add-set-btn" onClick={addSet}>+ Add Set</button>
    </div>
  );
}
