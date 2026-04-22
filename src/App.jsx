import React, { useState } from 'react';
import WorkoutTab from './components/workout/WorkoutTab';
import NutritionTab from './components/nutrition/NutritionTab';
import './App.css';

export default function App() {
  const [activeTab, setActiveTab] = useState('workout');

  return (
    <div className="app">
      <header className="app-header">
        <span className="app-logo">💪</span>
        <span className="app-title">FitTrack</span>
      </header>

      <main className="app-main">
        {activeTab === 'workout' ? <WorkoutTab /> : <NutritionTab />}
      </main>

      <nav className="bottom-nav">
        <button
          className={`nav-btn ${activeTab === 'workout' ? 'active' : ''}`}
          onClick={() => setActiveTab('workout')}
        >
          <span className="nav-icon">🏋️</span>
          <span className="nav-label">Workout</span>
        </button>
        <button
          className={`nav-btn ${activeTab === 'nutrition' ? 'active' : ''}`}
          onClick={() => setActiveTab('nutrition')}
        >
          <span className="nav-icon">🥗</span>
          <span className="nav-label">Nutrition</span>
        </button>
      </nav>
    </div>
  );
}
