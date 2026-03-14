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
    <div className="glass-panel p-8 max-w-2xl mx-auto mb-12 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-secondary"></div>
      
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-4 flex items-center justify-center gap-3">
          <Sparkles className="text-primary w-8 h-8" />
          Generate Your Path
        </h2>
        <p className="text-textMuted">Tell us what you want to learn, and our AI will craft a personalized weekly roadmap for you.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-textMuted mb-2 flex items-center gap-2">
            <Target className="w-4 h-4" />
            Your Learning Goal
          </label>
          <input
            type="text"
            className="w-full glass-input"
            placeholder="e.g., Learn Full Stack Web Development with React and Node.js"
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
            required
            autoFocus
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-textMuted mb-2 flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            Timeline: <span className="text-white font-semibold">{weeks} Weeks</span>
          </label>
          <div className="px-2">
            <input
              type="range"
              min="4"
              max="24"
              step="1"
              value={weeks}
              onChange={(e) => setWeeks(parseInt(e.target.value))}
              className="w-full h-2 bg-black/40 rounded-lg appearance-none cursor-pointer accent-primary"
            />
            <div className="flex justify-between text-xs text-textMuted mt-2 px-1">
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
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              Generating Roadmap...
            </>
          ) : (
            <>
              <Sparkles className="w-5 h-5" />
              Generate Roadmap
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default RoadmapForm;
