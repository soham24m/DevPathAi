import React, { useState } from 'react';
import axios from 'axios';
import RoadmapForm from '../components/RoadmapForm';
import RoadmapDisplay from '../components/RoadmapDisplay';

export default function Home() {
  const [roadmap, setRoadmap] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGenerateRoadmap = async (goal, weeks) => {
    setIsLoading(true);
    setError('');
    setRoadmap(null);
    
    try {
      const response = await axios.post('http://localhost:8080/generate-roadmap', {
        goal,
        weeks
      });
      
      if (response.data.success && response.data.roadmap) {
        setRoadmap(response.data.roadmap);
      } else {
        throw new Error('Invalid response format');
      }
    } catch (err) {
      console.error('Failed to generate roadmap', err);
      setError(
        err.response?.data?.error || 
        'Failed to generate your roadmap. Please try again. Make sure the backend server is running.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background relative selection:bg-primary/30">
      {/* Background Decorators */}
      <div className="fixed top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/20 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="fixed bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-secondary/20 rounded-full blur-[120px] pointer-events-none"></div>
      
      <div className="container mx-auto px-4 py-12 relative z-10">
        {/* Header */}
        <header className="text-center mb-16">
          <div className="inline-block mb-4 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm">
            <span className="text-xs font-semibold tracking-wider uppercase bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
              AI-Powered Learning
            </span>
          </div>
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-4">
            Dev<span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Path</span> AI
          </h1>
          <p className="text-lg text-textMuted max-w-2xl mx-auto">
            Stop guessing your learning trajectory. Generate structured, actionable, and personalized week-by-week roadmaps instantly.
          </p>
        </header>

        {/* Form Section */}
        {!roadmap && (
          <RoadmapForm onSubmit={handleGenerateRoadmap} isLoading={isLoading} />
        )}
        
        {/* Error State */}
        {error && (
          <div className="max-w-2xl mx-auto mb-8 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-200 text-center text-sm">
            {error}
          </div>
        )}

        {/* Display Section */}
        {roadmap && !isLoading && (
          <div className="animate-fade-in">
            <div className="max-w-4xl mx-auto mb-8 flex justify-center">
               <button 
                 onClick={() => setRoadmap(null)}
                 className="text-sm text-textMuted hover:text-white transition-colors"
               >
                 ← Generate a new roadmap
               </button>
            </div>
            <RoadmapDisplay roadmap={roadmap} />
          </div>
        )}
      </div>
    </div>
  );
}