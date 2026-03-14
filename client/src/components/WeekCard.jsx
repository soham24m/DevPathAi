import { useState } from 'react'
import axios from 'axios'

export default function WeekCard({ week, completed, toggleTask }) {
  const [videos, setVideos] = useState([])
  const [loadingVideos, setLoadingVideos] = useState(false)
  const [showVideos, setShowVideos] = useState(false)

  const fetchVideos = async () => {
    if (showVideos) { setShowVideos(false); return }
    setLoadingVideos(true)
    try {
      const query = encodeURIComponent(`${week.theme} tutorial for beginners`)
      const res = await axios.get(`http://localhost:8080/youtube?q=${query}`)
      setVideos(res.data.videos)
      setShowVideos(true)
    } catch {
      console.error('Failed to fetch videos')
    } finally {
      setLoadingVideos(false)
    }
  }

  const allDone = week.tasks.every((_, i) => completed[`${week.week}-${i}`])

  return (
    <div className={`mb-6 rounded-2xl border p-6 transition-all duration-300 ${allDone ? 'border-purple-500 bg-purple-950/20' : 'border-gray-800 bg-gray-950'}`}>
      <div className="flex items-center justify-between mb-4">
        <div>
          <span className="text-purple-400 text-xs font-bold tracking-widest uppercase">Week {week.week}</span>
          <h2 className="text-xl font-black text-white mt-1">{week.theme}</h2>
        </div>
        {allDone && <span className="text-purple-400 text-sm font-bold">✅ Complete</span>}
      </div>

      <div className="space-y-3 mb-6">
        {week.tasks.map((task, i) => {
          const key = `${week.week}-${i}`
          return (
            <div key={i} onClick={() => toggleTask(week.week, i)}
              className="flex items-start gap-3 cursor-pointer group">
              <div className={`mt-0.5 w-5 h-5 rounded-full border-2 flex-shrink-0 transition-all ${completed[key] ? 'bg-purple-500 border-purple-500' : 'border-gray-600 group-hover:border-purple-400'}`} />
              <span className={`text-sm transition-all ${completed[key] ? 'line-through text-gray-600' : 'text-gray-300'}`}>{task}</span>
            </div>
          )
        })}
      </div>

      <div className="border-t border-gray-800 pt-4 mb-4">
        <p className="text-xs text-gray-600 uppercase tracking-widest mb-1">Milestone</p>
        <p className="text-sm text-purple-400">{week.milestone}</p>
      </div>

      <div className="mb-4">
        <p className="text-xs text-gray-600 uppercase tracking-widest mb-2">Resources</p>
        {week.resources.map((r, i) => (
          <p key={i} className="text-sm text-gray-400">→ {r}</p>
        ))}
      </div>

      {/* YouTube Button */}
      <button
        onClick={fetchVideos}
        disabled={loadingVideos}
        className="w-full mt-2 py-3 rounded-xl border border-red-900 text-red-400 text-sm font-bold tracking-widest uppercase hover:bg-red-950/30 hover:border-red-500 transition-all duration-300"
      >
        {loadingVideos ? '🔍 Searching...' : showVideos ? '✕ Hide Videos' : '▶ Find YouTube Resources'}
      </button>

      {/* YouTube Videos */}
      {showVideos && videos.length > 0 && (
        <div className="mt-4 grid grid-cols-1 gap-3">
          {videos.map((video, i) => (
            <a key={i} href={`https://www.youtube.com/watch?v=${video.id}`} target="_blank" rel="noopener noreferrer"
              className="flex gap-3 p-3 rounded-xl bg-gray-900 border border-gray-800 hover:border-red-500/50 transition-all duration-300 group">
              <img src={video.thumbnail} alt={video.title} className="w-24 h-16 rounded-lg object-cover flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-white text-sm font-semibold line-clamp-2 group-hover:text-red-400 transition-colors">{video.title}</p>
                <p className="text-gray-600 text-xs mt-1">{video.channel}</p>
              </div>
            </a>
          ))}
        </div>
      )}
    </div>
  )
}