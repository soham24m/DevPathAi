import React, { useState, useEffect } from 'react';
import { BookOpen, CheckCircle, Circle, Trophy, Calendar } from 'lucide-react';
import axios from 'axios';

function YouTubeSection({ theme }) {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);

  const fetchVideos = async () => {
    if (show) { setShow(false); return; }
    setLoading(true);
    try {
      const q = encodeURIComponent(`${theme} tutorial for beginners`);
      const res = await axios.get(`https://devpathai.onrender.com/youtube?q=${q}`);
      setVideos(res.data.videos);
      setShow(true);
    } catch { console.error('Failed') }
    finally { setLoading(false); }
  };

  return (
    <div className="mt-4">
      <button onClick={fetchVideos} disabled={loading}
        className="w-full py-3 rounded-xl border border-red-900 text-red-400 text-xs font-bold tracking-widest uppercase hover:bg-red-950/30 hover:border-red-500 transition-all">
        {loading ? '🔍 Searching...' : show ? '✕ Hide Videos' : '▶ Find YouTube Resources'}
      </button>
      {show && videos.length > 0 && (
        <div className="mt-3 space-y-2">
          {videos.map((video, i) => (
            <a key={i} href={`https://www.youtube.com/watch?v=${video.id}`} target="_blank" rel="noopener noreferrer"
              className="flex gap-3 p-3 rounded-xl bg-gray-900 border border-gray-800 hover:border-red-500/50 transition-all group">
              <img src={video.thumbnail} alt={video.title} className="w-24 h-16 rounded-lg object-cover flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-white text-sm font-semibold line-clamp-2 group-hover:text-red-400 transition-colors">{video.title}</p>
                <p className="text-gray-500 text-xs mt-1">{video.channel}</p>
              </div>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}

function DailyPlanSection({ theme, tasks, milestone }) {
  const [plan, setPlan] = useState(null);
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [completedDayTasks, setCompletedDayTasks] = useState({});

  const fetchPlan = async () => {
    if (show) { setShow(false); return; }
    if (plan) { setShow(true); return; }
    setLoading(true);
    try {
      const res = await axios.post('https://devpathai.onrender.com/daily-plan', { theme, tasks, milestone });
      setPlan(res.data.plan);
      setShow(true);
    } catch { console.error('Failed') }
    finally { setLoading(false); }
  };

  const toggleDayTask = (dayIdx, taskIdx) => {
    const key = `${dayIdx}-${taskIdx}`;
    setCompletedDayTasks(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="mt-3">
      <button onClick={fetchPlan} disabled={loading}
        className="w-full py-3 rounded-xl border border-purple-900 text-purple-400 text-xs font-bold tracking-widest uppercase hover:bg-purple-950/30 hover:border-purple-500 transition-all">
        {loading ? '🧠 Generating plan...' : show ? '✕ Hide Daily Plan' : '📅 Generate 7-Day Plan'}
      </button>

      {show && plan && (
        <div className="mt-4 space-y-3">
          <h4 className="text-xs text-gray-500 uppercase tracking-widest mb-3">7-Day Daily Breakdown</h4>
          {plan.days.map((day, dayIdx) => (
            <div key={dayIdx} className="bg-black border border-gray-800 rounded-xl p-4 hover:border-purple-500/30 transition-all">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 rounded-full bg-purple-950 border border-purple-800 flex items-center justify-center text-purple-400 text-xs font-black">
                  {day.day}
                </div>
                <div>
                  <p className="text-white font-bold text-sm">{day.title}</p>
                  <p className="text-gray-500 text-xs">{day.focus}</p>
                </div>
              </div>
              <div className="space-y-2 ml-11">
                {day.tasks.map((task, taskIdx) => {
                  const key = `${dayIdx}-${taskIdx}`;
                  return (
                    <div key={taskIdx} onClick={() => toggleDayTask(dayIdx, taskIdx)}
                      className="flex items-start gap-2 cursor-pointer group">
                      <div className={`mt-0.5 w-4 h-4 rounded border flex-shrink-0 transition-all ${completedDayTasks[key] ? 'bg-purple-500 border-purple-500' : 'border-gray-700 group-hover:border-purple-400'}`} />
                      <span className={`text-xs transition-all ${completedDayTasks[key] ? 'line-through text-gray-600' : 'text-gray-400'}`}>{task}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const RoadmapDisplay = ({ roadmap }) => {
  const [completedTasks, setCompletedTasks] = useState(new Set());
  const [progress, setProgress] = useState(0);

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
      if (newSet.has(taskId)) newSet.delete(taskId);
      else newSet.add(taskId);
      return newSet;
    });
  };

  return (
    <div className="max-w-4xl mx-auto pb-20">
      <div className="glass-panel mb-10 sticky top-4 z-10 flex flex-col md:flex-row items-center justify-between gap-6 px-6 py-5">
        <div className="text-left flex-1 border-b md:border-b-0 md:border-r border-slate-800/70 pb-4 md:pb-0 md:pr-6 hidden md:block">
          <p className="mono-label text-[11px] tracking-[0.32em] uppercase text-cyan-300/80 mb-2">Active Roadmap</p>
          <h3 className="text-lg md:text-xl font-medium tracking-[0.14em] uppercase text-slate-50">{roadmap.title}</h3>
          <p className="mono-label text-[11px] text-slate-400 mt-1">Goal: {roadmap.goal}</p>
        </div>
        <div className="flex-1 w-full">
          <div className="flex items-center justify-between mb-2">
            <span className="mono-label text-[11px] tracking-[0.26em] uppercase text-slate-400">Overall Progress</span>
            <span className="mono-label text-[12px] text-cyan-300">{progress.toString().padStart(2, '0')}%</span>
          </div>
          <div className="mission-progress-track h-3">
            <div className="mission-progress-bar h-3 transition-all duration-700 ease-out" style={{ width: `${progress}%` }} />
          </div>
        </div>
      </div>

      <div className="space-y-8">
        {roadmap.weeks.map((weekData) => (
          <div key={weekData.week} className="glass-panel overflow-hidden transition-all duration-700 hover:border-cyan-400/30 group">
            <div className="relative px-6 py-4 flex items-center justify-between border-b border-slate-800/70 bg-black/60">
              <div className="absolute left-0 top-0 h-full w-px bg-cyan-400/40 group-hover:bg-cyan-300/80 transition-colors" />
              <div>
                <span className="mono-label text-[10px] tracking-[0.3em] uppercase text-cyan-300/80 mb-1 block">Week {weekData.week} of {roadmap.totalWeeks}</span>
                <h3 className="text-base md:text-lg font-medium tracking-[0.14em] uppercase text-slate-50">{weekData.theme}</h3>
              </div>
              <BookOpen className="w-5 h-5 text-slate-500" />
            </div>

            <div className="p-6 bg-black/70">
              <div className="space-y-3 mb-6">
                {weekData.tasks.map((task, index) => {
                  const taskId = `wk${weekData.week}-tsk${index}`;
                  const isCompleted = completedTasks.has(taskId);
                  return (
                    <div key={taskId} onClick={() => toggleTask(taskId)}
                      className={`flex items-start gap-4 px-3 py-2.5 rounded-xl cursor-pointer transition-all border ${isCompleted ? 'border-emerald-400/60 bg-emerald-500/10 shadow-[0_0_40px_rgba(34,197,94,0.45)]' : 'border-slate-800/80 hover:border-cyan-400/60 hover:bg-slate-900/80'}`}>
                      <button className="flex-shrink-0 mt-0.5 focus:outline-none">
                        {isCompleted ? <CheckCircle className="w-5 h-5 text-emerald-400" /> : <Circle className="w-5 h-5 text-slate-500" />}
                      </button>
                      <span className={`text-sm md:text-[15px] transition-all ${isCompleted ? 'task-text-complete' : 'text-slate-200'}`}>{task}</span>
                    </div>
                  );
                })}
              </div>

              <div className="rounded-xl border border-slate-800/80 bg-gradient-to-br from-slate-950/80 to-black/70 p-4 mb-4">
                <div className="flex items-start gap-3">
                  <Trophy className="text-cyan-300 w-5 h-5 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="mono-label text-[11px] tracking-[0.28em] uppercase text-slate-400 mb-1">Weekly Milestone</h4>
                    <p className="text-sm text-slate-200 leading-relaxed">{weekData.milestone}</p>
                  </div>
                </div>
              </div>

              {weekData.resources && weekData.resources.length > 0 && (
                <div className="mb-4 pt-4 border-t border-slate-800/80">
                  <h4 className="mono-label text-[10px] tracking-[0.3em] uppercase text-slate-500 mb-3">Recommended Resources</h4>
                  <ul className="flex flex-wrap gap-2">
                    {weekData.resources.map((res, i) => (
                      <li key={i} className="text-[11px] md:text-xs bg-slate-900/80 text-slate-200 px-3 py-1.5 rounded-full border border-slate-700/80">{res}</li>
                    ))}
                  </ul>
                </div>
              )}

              <DailyPlanSection theme={weekData.theme} tasks={weekData.tasks} milestone={weekData.milestone} />
              <YouTubeSection theme={weekData.theme} />
            </div>
          </div>
        ))}
      </div>

      {progress === 100 && (
        <div className="mt-12 text-center">
          <h2 className="text-2xl md:text-3xl font-medium tracking-[0.2em] uppercase text-slate-50 mb-2">Mission Accomplished</h2>
          <p className="mono-label text-[11px] text-slate-400">Every task complete. This trajectory is closed; the next one is already waiting.</p>
        </div>
      )}
    </div>
  );
};

export default RoadmapDisplay;