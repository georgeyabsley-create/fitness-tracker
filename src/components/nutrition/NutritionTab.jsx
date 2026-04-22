import React from 'react';
import MealRow from './MealRow';
import AddMealForm from './AddMealForm';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { getTodayKey, formatDate } from '../../utils/workoutUtils';

function sumMacro(meals, key) {
  return meals.reduce((acc, m) => acc + (parseFloat(m[key]) || 0), 0);
}

export default function NutritionTab() {
  const todayKey = getTodayKey();
  const [nutritionHistory, setNutritionHistory] = useLocalStorage('nutritionHistory', {});

  const todayMeals = nutritionHistory[todayKey]?.meals || [];

  const setTodayMeals = (meals) => {
    setNutritionHistory(prev => ({
      ...prev,
      [todayKey]: { meals, date: todayKey },
    }));
  };

  const addMeal = (meal) => setTodayMeals([...todayMeals, meal]);
  const removeMeal = (id) => setTodayMeals(todayMeals.filter(m => m.id !== id));

  const totalCal = sumMacro(todayMeals, 'calories');
  const totalProtein = sumMacro(todayMeals, 'protein');
  const totalCarbs = sumMacro(todayMeals, 'carbs');
  const totalFat = sumMacro(todayMeals, 'fat');

  return (
    <div className="tab-content">
      <div className="tab-header">
        <h2>{formatDate(todayKey)}</h2>
      </div>

      <div className="daily-summary">
        <h3 className="section-title">Today's Totals</h3>
        <div className="summary-grid">
          <div className="summary-card summary-cal">
            <div className="summary-value">{Math.round(totalCal)}</div>
            <div className="summary-label">kcal</div>
          </div>
          <div className="summary-card summary-p">
            <div className="summary-value">{Math.round(totalProtein)}g</div>
            <div className="summary-label">Protein</div>
          </div>
          <div className="summary-card summary-c">
            <div className="summary-value">{Math.round(totalCarbs)}g</div>
            <div className="summary-label">Carbs</div>
          </div>
          <div className="summary-card summary-f">
            <div className="summary-value">{Math.round(totalFat)}g</div>
            <div className="summary-label">Fat</div>
          </div>
        </div>
      </div>

      <AddMealForm onAdd={addMeal} />

      {todayMeals.length > 0 && (
        <div className="meals-list">
          <h3 className="section-title">Meals Logged</h3>
          {todayMeals.map(meal => (
            <MealRow key={meal.id} meal={meal} onRemove={() => removeMeal(meal.id)} />
          ))}
        </div>
      )}

      {todayMeals.length === 0 && (
        <div className="empty-state">
          <p>No meals logged today.</p>
          <p className="empty-sub">Use the form above to log your food.</p>
        </div>
      )}
    </div>
  );
}
