import React from 'react';

export default function MealRow({ meal, onRemove }) {
  return (
    <div className="meal-row">
      <div className="meal-name">{meal.name}</div>
      <div className="meal-macros">
        <span className="macro-pill macro-cal">{meal.calories} kcal</span>
        <span className="macro-pill macro-p">P {meal.protein}g</span>
        <span className="macro-pill macro-c">C {meal.carbs}g</span>
        <span className="macro-pill macro-f">F {meal.fat}g</span>
      </div>
      <button className="remove-btn" onClick={onRemove} aria-label="Remove meal">✕</button>
    </div>
  );
}
