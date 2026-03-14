import { useLocation, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import WeekCard from '../components/WeekCard'

export default function Roadmap() {
  const { state } = useLocation()
  const navigate = useNavigate()
  const roadmap = state?.roadmap

  const [completed, setCompleted] = useState({})

  if (!roadmap) {
    navigate('/')
    return null
  }

  const toggleTask = (weekNum, taskIdx) => {
    const key = `${weekNum}-${taskIdx}`
    setCompleted(prev => ({ ...prev, [key]: !prev[key] }))
  }

  const totalTasks = roadmap.weeks.reduce((acc, w) => acc + w.tasks.length, 0)
  const completedCount = Object.values(completed).filter(Boolean).length
  const progress = Math.round((completedCount / totalTasks) * 100)

  return (
    <div className="min-h-screen bg-gray-950 text-white px-4 py-10">
      <div className="max-w-3xl mx-auto">
        <button
          onClick={() => navigate('/')}
          className="text-gray-500 hover:text-white mb-6 text-sm transition"
        >
          ← Back to Home
        </button>

        <h1 className="text-3xl font-bold text-purple-400 mb-1">{roadmap.title}</h1>
        <p className="text-gray-400 mb-6">{roadmap.goal}</p>

        <div className="bg-gray-800 rounded-full h-3 mb-2">
          <div
            className="bg-gradient-to-r from-purple-500 to-cyan-500 h-3 rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-sm text-gray-500 mb-10">
          {completedCount}/{totalTasks} tasks completed ({progress}%)
        </p>

        {roadmap.weeks.map(week => (
          <WeekCard
            key={week.week}
            week={week}
            completed={completed}
            toggleTask={toggleTask}
          />
        ))}
      </div>
    </div>
  )
}