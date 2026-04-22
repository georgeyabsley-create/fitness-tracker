import React, { useState } from 'react';

const EXERCISES = {
  Chest: ['Bench Press', 'Incline Bench Press', 'Decline Bench Press', 'Dumbbell Fly', 'Cable Fly', 'Push Up'],
  Back: ['Deadlift', 'Pull Up', 'Lat Pulldown', 'Bent Over Row', 'Seated Cable Row', 'T-Bar Row', 'Single Arm Row'],
  Shoulders: ['Overhead Press', 'Lateral Raise', 'Front Raise', 'Face Pull', 'Arnold Press', 'Shrugs'],
  Legs: ['Squat', 'Romanian Deadlift', 'Leg Press', 'Leg Curl', 'Leg Extension', 'Calf Raise', 'Bulgarian Split Squat', 'Lunges'],
  Biceps: ['Bicep Curl', 'Hammer Curl', 'Preacher Curl', 'Incline Dumbbell Curl', 'Cable Curl'],
  Triceps: ['Tricep Pushdown', 'Skull Crusher', 'Overhead Tricep Extension', 'Dip'],
  Core: ['Plank', 'Crunch', 'Hanging Leg Raise', 'Cable Crunch', 'Russian Twist'],
};

export default function ExercisePicker({ onSelect, onClose }) {
  const [search, setSearch] = useState('');

  const q = search.trim().toLowerCase();

  const filtered = Object.entries(EXERCISES).reduce((acc, [category, exercises]) => {
    const matches = exercises.filter(ex => ex.toLowerCase().includes(q));
    if (matches.length > 0) acc[category] = matches;
    return acc;
  }, {});

  return (
    <div className="picker-overlay" onClick={onClose}>
      <div className="picker-sheet" onClick={e => e.stopPropagation()}>
        <div className="picker-handle" />
        <div className="picker-header">
          <span className="picker-title">Choose Exercise</span>
          <button className="picker-close" onClick={onClose}>✕</button>
        </div>
        <div className="picker-search-wrap">
          <input
            className="picker-search"
            type="text"
            placeholder="Search exercises..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            autoFocus
          />
        </div>
        <div className="picker-list">
          {Object.entries(filtered).map(([category, exercises]) => (
            <div key={category} className="picker-category">
              <div className="picker-category-label">{category}</div>
              {exercises.map(ex => (
                <button key={ex} className="picker-exercise-btn" onClick={() => onSelect(ex)}>
                  {ex}
                </button>
              ))}
            </div>
          ))}
          {Object.keys(filtered).length === 0 && (
            <p className="picker-empty">No exercises found.</p>
          )}
        </div>
      </div>
    </div>
  );
}
