import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

export default function Home() {
  const [goal, setGoal] = useState('')
  const [weeks, setWeeks] = useState(8)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleGenerate = async () => {
    if (!goal.trim()) return setError('Please enter a goal!')
    setError('')
    setLoading(true)
    try {
      const res = await axios.post('http://localhost:8080/generate-roadmap', { goal, weeks })
      navigate('/roadmap', { state: { roadmap: res.data.roadmap } })
    } catch {
      setError('Something went wrong. Check if your server is running.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ fontFamily: "'Inter', sans-serif" }} className="min-h-screen bg-black text-white">
      
      {/* NAV */}
      <nav className="fixed top-0 w-full z-50 flex items-center justify-between px-8 py-5">
        <span className="text-white font-bold text-xl tracking-widest">DEVPATH AI</span>
        <span className="text-gray-500 text-sm tracking-widest">BETA</span>
      </nav>

      {/* HERO */}
      <div className="relative min-h-screen flex flex-col items-center justify-center px-4 overflow-hidden">
        
        {/* Animated background glow */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-600 rounded-full opacity-10 blur-3xl animate-pulse" />
          <div className="absolute top-1/3 left-1/3 w-64 h-64 bg-blue-600 rounded-full opacity-10 blur-3xl animate-pulse" style={{animationDelay: '1s'}} />
          <div className="absolute bottom-1/3 right-1/3 w-80 h-80 bg-indigo-600 rounded-full opacity-10 blur-3xl animate-pulse" style={{animationDelay: '2s'}} />
        </div>

        {/* Stars */}
        {[...Array(80)].map((_, i) => (
          <div key={i} className="absolute w-0.5 h-0.5 bg-white rounded-full opacity-60"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animation: `pulse ${2 + Math.random() * 3}s infinite`
            }}
          />
        ))}

        <div className="relative z-10 text-center max-w-4xl mx-auto">
          <p className="text-purple-400 text-sm tracking-[0.4em] mb-6 uppercase">AI-Powered Learning</p>
          
          <h1 className="text-7xl md:text-9xl font-black text-white mb-6 leading-none tracking-tight">
            Build Your
            <span className="block bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
              Future.
            </span>
          </h1>
          
          <p className="text-gray-400 text-xl mb-12 max-w-xl mx-auto leading-relaxed">
            Tell us where you want to go. We'll map every step to get you there.
          </p>

          <button
            onClick={() => document.getElementById('input-section').scrollIntoView({ behavior: 'smooth' })}
            className="px-10 py-4 bg-white text-black font-bold text-lg rounded-full hover:scale-105 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/30"
          >
            Start Now →
          </button>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce text-gray-600 text-sm tracking-widest">
          SCROLL
        </div>
      </div>

      {/* STATS */}
      <div className="border-y border-gray-900 py-12 px-8">
        <div className="max-w-4xl mx-auto grid grid-cols-3 gap-8 text-center">
          {[['50K+', 'Roadmaps Created'], ['12K+', 'Active Learners'], ['98%', 'Success Rate']].map(([num, label]) => (
            <div key={label}>
              <div className="text-4xl font-black text-white mb-1">{num}</div>
              <div className="text-gray-600 text-sm tracking-widest uppercase">{label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* INPUT SECTION */}
      <div id="input-section" className="min-h-screen flex items-center justify-center px-4 py-20">
        <div className="w-full max-w-2xl">
          <p className="text-purple-400 text-sm tracking-[0.4em] mb-4 uppercase text-center">Generate Roadmap</p>
          <h2 className="text-5xl font-black text-white mb-12 text-center leading-tight">
            What do you want<br/>to achieve?
          </h2>

          <div className="bg-gray-950 border border-gray-800 rounded-3xl p-8 shadow-2xl">
            <textarea
              className="w-full bg-gray-900 text-white rounded-2xl p-5 text-base resize-none border border-gray-800 focus:outline-none focus:border-purple-500 transition-all duration-300 placeholder-gray-600"
              rows={4}
              placeholder='e.g. "I want to become a full stack developer and land an internship"'
              value={goal}
              onChange={e => setGoal(e.target.value)}
            />

            <div className="mt-6 flex items-center gap-4">
              <label className="text-gray-500 text-sm whitespace-nowrap tracking-widest uppercase">Weeks</label>
              <input
                type="range" min={4} max={24} value={weeks}
                onChange={e => setWeeks(Number(e.target.value))}
                className="flex-1 accent-purple-500"
              />
              <span className="text-purple-400 font-black text-xl w-8">{weeks}</span>
            </div>

            {error && <p className="text-red-400 text-sm mt-4">{error}</p>}

            <button
              onClick={handleGenerate}
              disabled={loading}
              className="mt-8 w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 disabled:opacity-50 text-white font-bold py-4 rounded-2xl transition-all duration-300 text-lg hover:scale-[1.02] hover:shadow-2xl hover:shadow-purple-500/30"
            >
              {loading ? '🧠 Generating your roadmap...' : '🚀 Generate My Roadmap'}
            </button>
          </div>
        </div>
      </div>

      {/* JOURNEY SECTION */}
      <div className="py-20 px-8 border-t border-gray-900">
        <div className="max-w-4xl mx-auto">
          <p className="text-purple-400 text-sm tracking-[0.4em] mb-4 uppercase text-center">The Journey</p>
          <h2 className="text-5xl font-black text-white mb-16 text-center">From zero to hired.</h2>
          
          <div className="grid grid-cols-4 gap-4">
            {[
              { step: '01', title: 'LOST', desc: 'No direction, endless resources, zero clarity' },
              { step: '02', title: 'LEARNING', desc: 'Structured path, daily goals, building momentum' },
              { step: '03', title: 'BUILDING', desc: 'Real projects, portfolio growing, skills proven' },
              { step: '04', title: 'HIRED', desc: 'Internship secured, career launched, future bright' },
            ].map((item, i) => (
              <div key={i} className="border border-gray-900 rounded-2xl p-6 hover:border-purple-500/50 transition-all duration-300 hover:bg-gray-950">
                <div className="text-purple-500 text-xs font-bold tracking-widest mb-4">{item.step}</div>
                <div className="text-white font-black text-xl mb-3">{item.title}</div>
                <div className="text-gray-600 text-sm leading-relaxed">{item.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <div className="border-t border-gray-900 py-8 px-8 text-center">
        <p className="text-gray-700 text-sm tracking-widest">DEVPATH AI — POWERED BY GROQ</p>
      </div>
    </div>
  )
}