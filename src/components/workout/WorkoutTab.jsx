import React, { useState } from 'react';
import ExerciseCard from './ExerciseCard';
import ExercisePicker from './ExercisePicker';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { getTodayKey, getLastSession, getPersonalRecords, formatDate } from '../../utils/workoutUtils';

function emptyExercise(name = '') {
  return { id: Date.now() + Math.random(), name, sets: [{ weight: '', reps: '', difficulty: '' }] };
}

export default function WorkoutTab() {
  const todayKey = getTodayKey();
  const [workoutHistory, setWorkoutHistory] = useLocalStorage('workoutHistory', {});
  const [showHistory, setShowHistory] = useState(false);
  const [showPicker, setShowPicker] = useState(false);

  const todayExercises = workoutHistory[todayKey]?.exercises || [];

  const setTodayExercises = (exercises) => {
    setWorkoutHistory(prev => ({
      ...prev,
      [todayKey]: { ...prev[todayKey], exercises, date: todayKey },
    }));
  };

  const addExercise = (name) => {
    setTodayExercises([...todayExercises, emptyExercise(name)]);
    setShowPicker(false);
  };

  const updateExercise = (index, updated) => {
    setTodayExercises(todayExercises.map((e, i) => (i === index ? updated : e)));
  };

  const removeExercise = (index) => {
    setTodayExercises(todayExercises.filter((_, i) => i !== index));
  };

  const prs = getPersonalRecords(workoutHistory);

  const getExercisePR = (exercise) => {
    const name = exercise.name.trim().toLowerCase();
    return prs[name] || null;
  };

  const historyDates = Object.keys(workoutHistory)
    .filter(d => d !== todayKey)
    .sort()
    .reverse()
    .slice(0, 10);

  return (
    <div className="tab-content">
      <div className="tab-header">
        <h2>{formatDate(todayKey)}</h2>
        <button
          className="secondary-btn"
          onClick={() => setShowHistory(v => !v)}
        >
          {showHistory ? 'Hide History' : 'History'}
        </button>
      </div>

      {showHistory && (
        <div className="history-panel">
          <h3 className="section-title">Past Workouts</h3>
          {historyDates.length === 0 && <p className="empty-msg">No past workouts yet.</p>}
          {historyDates.map(date => (
            <div key={date} className="history-session">
              <div className="history-date">{formatDate(date)}</div>
              {workoutHistory[date].exercises?.map((ex, i) => (
                <div key={i} className="history-exercise">
                  <span className="history-exercise-name">{ex.name}</span>
                  <span className="history-sets">
                    {ex.sets.map((s, j) => (
                      <span key={j}>{s.weight}kg×{s.reps}</span>
                    ))}
                  </span>
                </div>
              ))}
            </div>
          ))}
        </div>
      )}

      {todayExercises.length === 0 && (
        <div className="empty-state">
          <p>No exercises logged today.</p>
          <p className="empty-sub">Tap "Add Exercise" to get started.</p>
        </div>
      )}

      {todayExercises.map((exercise, index) => (
        <ExerciseCard
          key={exercise.id}
          exercise={exercise}
          onChange={(updated) => updateExercise(index, updated)}
          onRemove={() => removeExercise(index)}
          lastSession={exercise.name.trim() ? getLastSession(workoutHistory, exercise.name) : null}
          isPR={exercise.name.trim() ? getExercisePR(exercise) : null}
        />
      ))}

      <button className="primary-btn add-exercise-btn" onClick={() => setShowPicker(true)}>
        + Add Exercise
      </button>

      {showPicker && (
        <ExercisePicker onSelect={addExercise} onClose={() => setShowPicker(false)} />
      )}

      {Object.keys(prs).length > 0 && (
        <div className="prs-section">
          <h3 className="section-title">Personal Records</h3>
          <div className="prs-grid">
            {Object.values(prs).map(pr => (
              <div key={pr.displayName} className="pr-card">
                <div className="pr-name">{pr.displayName}</div>
                <div className="pr-value">{pr.weight}kg × {pr.reps}</div>
                <div className="pr-date">{formatDate(pr.date)}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
