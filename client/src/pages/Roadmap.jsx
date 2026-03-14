import { useLocation, useNavigate } from 'react-router-dom'
import RoadmapDisplay from '../components/RoadmapDisplay'

export default function Roadmap() {
  const { state } = useLocation()
  const navigate = useNavigate()
  const roadmap = state?.roadmap

  if (!roadmap) {
    navigate('/')
    return null
  }

  return (
    <div className="min-h-screen bg-black text-white px-4 py-10">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={() => navigate('/')}
          className="text-gray-500 hover:text-white mb-8 text-sm tracking-widest uppercase transition"
        >
          ← Back
        </button>
        <RoadmapDisplay roadmap={roadmap} />
      </div>
    </div>
  )
}