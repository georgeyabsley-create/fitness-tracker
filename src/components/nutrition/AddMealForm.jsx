import React, { useState } from 'react';

const empty = { name: '', calories: '', protein: '', carbs: '', fat: '' };

export default function AddMealForm({ onAdd }) {
  const [form, setForm] = useState(empty);

  const set = (field, value) => setForm(f => ({ ...f, [field]: value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name.trim()) return;
    onAdd({
      id: Date.now(),
      name: form.name.trim(),
      calories: parseFloat(form.calories) || 0,
      protein: parseFloat(form.protein) || 0,
      carbs: parseFloat(form.carbs) || 0,
      fat: parseFloat(form.fat) || 0,
    });
    setForm(empty);
  };

  return (
    <form className="add-meal-form" onSubmit={handleSubmit}>
      <h3 className="section-title">Log a Meal</h3>
      <input
        className="meal-name-input"
        type="text"
        placeholder="Food / meal name"
        value={form.name}
        onChange={e => set('name', e.target.value)}
        required
      />
      <div className="macro-inputs">
        <div className="input-group">
          <label>Calories</label>
          <input type="number" inputMode="decimal" placeholder="0" value={form.calories} onChange={e => set('calories', e.target.value)} />
        </div>
        <div className="input-group">
          <label>Protein (g)</label>
          <input type="number" inputMode="decimal" placeholder="0" value={form.protein} onChange={e => set('protein', e.target.value)} />
        </div>
        <div className="input-group">
          <label>Carbs (g)</label>
          <input type="number" inputMode="decimal" placeholder="0" value={form.carbs} onChange={e => set('carbs', e.target.value)} />
        </div>
        <div className="input-group">
          <label>Fat (g)</label>
          <input type="number" inputMode="decimal" placeholder="0" value={form.fat} onChange={e => set('fat', e.target.value)} />
        </div>
      </div>
      <button type="submit" className="primary-btn">+ Log Meal</button>
    </form>
  );
}
