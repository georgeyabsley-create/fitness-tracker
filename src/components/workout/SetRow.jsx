import React from 'react';

const DIFFICULTY_OPTIONS = [
  { value: 'easy', label: 'Easy', color: '#22c55e' },
  { value: 'moderate', label: 'Moderate', color: '#f59e0b' },
  { value: 'hard', label: 'Hard', color: '#ef4444' },
];

export default function SetRow({ setIndex, set, onChange, onRemove }) {
  const handleField = (field, value) => onChange(setIndex, { ...set, [field]: value });

  return (
    <div className="set-row">
      <span className="set-number">{setIndex + 1}</span>

      <div className="set-inputs">
        <div className="input-group">
          <label>kg</label>
          <input
            type="number"
            inputMode="decimal"
            placeholder="0"
            value={set.weight}
            onChange={e => handleField('weight', e.target.value)}
          />
        </div>
        <div className="input-group">
          <label>reps</label>
          <input
            type="number"
            inputMode="numeric"
            placeholder="0"
            value={set.reps}
            onChange={e => handleField('reps', e.target.value)}
          />
        </div>
      </div>

      <div className="difficulty-buttons">
        {DIFFICULTY_OPTIONS.map(opt => (
          <button
            key={opt.value}
            className={`diff-btn ${set.difficulty === opt.value ? 'active' : ''}`}
            style={set.difficulty === opt.value ? { backgroundColor: opt.color, borderColor: opt.color } : { borderColor: opt.color, color: opt.color }}
            onClick={() => handleField('difficulty', opt.value)}
          >
            {opt.label}
          </button>
        ))}
      </div>

      <button className="remove-btn" onClick={() => onRemove(setIndex)} aria-label="Remove set">
        ✕
      </button>
    </div>
  );
}
