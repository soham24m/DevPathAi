import React, { useState } from 'react';
import { Target, Calendar, Sparkles } from 'lucide-react';

const RoadmapForm = ({ onSubmit, isLoading }) => {
  const [goal, setGoal] = useState('');
  const [weeks, setWeeks] = useState(4);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (goal.trim()) {
      onSubmit(goal, weeks);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-7">
      <div>
        <label className="flex items-center gap-2 mono-label text-[11px] tracking-[0.25em] uppercase mb-3" style={{ color: '#ffffff' }}>
          <Target className="w-4 h-4" color="#f59e0b" />
          Mission Objective
        </label>
        <input
          type="text"
          className="glass-input"
          placeholder="e.g., Become a full‑stack engineer using React and Node"
          value={goal}
          onChange={(e) => setGoal(e.target.value)}
          required
          autoFocus
        />
      </div>

      <div>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4" color="#f59e0b" />
            <span className="mono-label text-[11px] tracking-[0.25em] uppercase" style={{ color: '#ffffff' }}>
              Mission Duration
            </span>
          </div>
          <span className="mono-label text-[11px]" style={{ color: '#ffffff' }}>
            {weeks.toString().padStart(2, '0')} Weeks
          </span>
        </div>
        <div className="px-1">
          <input
            type="range"
            min="4"
            max="24"
            step="1"
            value={weeks}
            onChange={(e) => setWeeks(parseInt(e.target.value))}
            className="terminal-range"
          />
          <div className="flex justify-between text-[10px] mono-label mt-2 px-0.5" style={{ color: '#aaaaaa' }}>
            <span>4 wks</span>
            <span>12 wks</span>
            <span>24 wks</span>
          </div>
        </div>
      </div>

      <button
        type="submit"
        disabled={isLoading || !goal.trim()}
        className="w-full btn-primary flex justify-center items-center gap-2 mt-4"
      >
        {isLoading ? (
          <>
            <div className="animate-spin rounded-full h-5 w-5 border-b-2" style={{ borderColor: '#000000' }} />
            <span className="mono-label text-[11px] tracking-[0.3em] uppercase" style={{ color: '#000000' }}>
              Generating Roadmap
            </span>
          </>
        ) : (
          <>
            <Sparkles className="w-5 h-5" color="#000000" />
            <span className="mono-label text-[11px] tracking-[0.3em] uppercase" style={{ color: '#000000' }}>
              Generate Roadmap
            </span>
          </>
        )}
      </button>
    </form>
  );
};

export default RoadmapForm;
