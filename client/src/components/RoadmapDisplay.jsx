import React, { useState, useEffect } from 'react';
import { BookOpen, CheckCircle, Circle, Trophy } from 'lucide-react';

const RoadmapDisplay = ({ roadmap }) => {
  const [completedTasks, setCompletedTasks] = useState(new Set());
  const [progress, setProgress] = useState(0);

  // Total tasks count
  const allTasks = roadmap.weeks.flatMap(week => 
    week.tasks.map(task => ({ weekNumber: week.week, task }))
  );
  
  useEffect(() => {
    if (allTasks.length > 0) {
      const percentage = Math.round((completedTasks.size / allTasks.length) * 100);
      setProgress(percentage);
    }
  }, [completedTasks, allTasks.length]);

  const toggleTask = (taskId) => {
    setCompletedTasks(prev => {
      const newSet = new Set(prev);
      if (newSet.has(taskId)) {
        newSet.delete(taskId);
      } else {
        newSet.add(taskId);
      }
      return newSet;
    });
  };

  return (
    <div className="max-w-4xl mx-auto pb-20">
      <div className="glass-panel p-6 mb-8 text-center sticky top-4 z-10 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="text-left flex-1 border-r border-white/10 pr-6 hidden md:block">
          <h3 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
            {roadmap.title}
          </h3>
          <p className="text-sm text-textMuted mt-1">Goal: {roadmap.goal}</p>
        </div>
        
        <div className="flex-1 w-full">
          <div className="flex justify-between text-sm mb-2">
            <span className="font-semibold text-textMuted">Overall Progress</span>
            <span className="font-bold text-secondary text-lg">{progress}%</span>
          </div>
          <div className="w-full bg-black/50 rounded-full h-3 overflow-hidden shadow-inner">
            <div 
              className="bg-gradient-to-r from-primary to-secondary h-3 rounded-full transition-all duration-700 ease-out flex items-center justify-end pr-1 shadow-[0_0_10px_rgba(139,92,246,0.5)]"
              style={{ width: `${progress}%` }}
            >
              <div className="w-1.5 h-1.5 bg-white rounded-full opacity-70"></div>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-8">
        {roadmap.weeks.map((weekData) => (
          <div key={weekData.week} className="glass-panel overflow-hidden transition-all hover:border-primary/30 group">
            <div className="bg-card/60 p-5 flex items-center justify-between border-b border-white/5 relative">
              <div className="absolute left-0 top-0 h-full w-1 bg-primary opacity-50 group-hover:opacity-100 transition-opacity"></div>
              <div>
                <span className="text-xs uppercase tracking-wider text-primary font-bold mb-1 block">
                  Week {weekData.week} of {roadmap.totalWeeks}
                </span>
                <h3 className="text-xl font-semibold text-white">{weekData.theme}</h3>
              </div>
              <BookOpen className="text-textMuted w-5 h-5" />
            </div>
            
            <div className="p-6">
              <div className="space-y-3 mb-6">
                {weekData.tasks.map((task, index) => {
                  const taskId = `wk${weekData.week}-tsk${index}`;
                  const isCompleted = completedTasks.has(taskId);
                  
                  return (
                    <div 
                      key={taskId}
                      onClick={() => toggleTask(taskId)}
                      className={`flex items-start gap-4 p-3 rounded-xl cursor-pointer transition-all border border-transparent
                        ${isCompleted ? 'bg-primary/10 border-primary/20' : 'hover:bg-white/5'}
                      `}
                    >
                      <button className="flex-shrink-0 mt-0.5 focus:outline-none">
                        {isCompleted ? (
                          <CheckCircle className="text-primary w-5 h-5 fill-primary/20" />
                        ) : (
                          <Circle className="text-textMuted w-5 h-5 hover:text-white transition-colors" />
                        )}
                      </button>
                      <span className={`text-base transition-all ${isCompleted ? 'text-textMuted line-through decoration-primary/50' : 'text-gray-200'}`}>
                        {task}
                      </span>
                    </div>
                  );
                })}
              </div>

              <div className="bg-gradient-to-br from-black/40 to-black/20 rounded-xl p-4 border border-white/5">
                <div className="flex items-start gap-3">
                  <Trophy className="text-secondary w-5 h-5 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-semibold text-secondary mb-1">Weekly Milestone</h4>
                    <p className="text-sm text-textMuted leading-relaxed">{weekData.milestone}</p>
                  </div>
                </div>
              </div>
              
              {weekData.resources && weekData.resources.length > 0 && (
                 <div className="mt-6 pt-4 border-t border-white/5">
                   <h4 className="text-xs font-bold uppercase tracking-wider text-textMuted mb-3 flex items-center gap-2">
                     Recommended Resources
                   </h4>
                   <ul className="flex flex-wrap gap-2">
                     {weekData.resources.map((res, i) => (
                       <li key={i} className="text-xs bg-white/5 text-gray-300 px-3 py-1.5 rounded-full border border-white/10">
                         {res}
                       </li>
                     ))}
                   </ul>
                 </div>
              )}
            </div>
          </div>
        ))}
      </div>
      
      {progress === 100 && (
         <div className="mt-12 text-center animate-pulse">
           <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary mb-2">
             Congratulations! 🎉
           </h2>
           <p className="text-textMuted">You have completed your Roadmap.</p>
         </div>
      )}
    </div>
  );
};

export default RoadmapDisplay;
