// src/components/dashboard/SavedRoadmaps.jsx
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { getRoadmaps, deleteRoadmap } from '../../firebase/database'
import { useAuth } from '../../hooks/useAuth'

const SavedRoadmaps = () => {
  const { user } = useAuth()
  const [roadmaps, setRoadmaps] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchRoadmaps = async () => {
    if (!user) return
    const data = await getRoadmaps(user.uid)
    setRoadmaps(data)
    setLoading(false)
  }

  useEffect(() => {
    fetchRoadmaps()
  }, [user])

  const handleDelete = async (roadmapId) => {
    await deleteRoadmap(user.uid, roadmapId)
    setRoadmaps((prev) => prev.filter((r) => r.id !== roadmapId))
  }

  if (loading) {
    return (
      <div className="card p-6">
        <h3 className="font-display font-semibold text-ink-900 text-lg mb-4">Saved Roadmaps</h3>
        <div className="flex flex-col gap-3">
          {[1, 2].map((i) => (
            <div key={i} className="h-14 shimmer-bg rounded-xl" />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="card p-6">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="font-display font-semibold text-ink-900 text-lg">Saved Roadmaps</h3>
          <p className="text-sm text-ink-400 mt-0.5">{roadmaps.length} roadmap{roadmaps.length !== 1 ? 's' : ''} saved</p>
        </div>
      </div>

      {roadmaps.length === 0 ? (
        <div className="text-center py-8">
          <div className="text-4xl mb-3">🗺️</div>
          <p className="text-ink-500 text-sm mb-4">No roadmaps yet. Generate one from your career matches!</p>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {roadmaps.map((roadmap, i) => (
            <motion.div
              key={roadmap.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
              className="flex items-center gap-3 p-3.5 rounded-xl bg-ink-50 border border-ink-100 hover:border-ink-200 transition-colors group"
            >
              <div className="w-9 h-9 bg-ember-100 rounded-lg flex items-center justify-center text-lg flex-shrink-0">
                🗺️
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-ink-800 truncate">{roadmap.title}</p>
                <p className="text-xs text-ink-400">
                  {roadmap.duration} • Saved {new Date(roadmap.savedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                </p>
              </div>
              <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <Link
                  to={`/roadmap/${encodeURIComponent(roadmap.title)}`}
                  className="p-1.5 hover:bg-ember-100 rounded-lg text-ink-500 hover:text-ember-600 transition-colors"
                  title="View roadmap"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </Link>
                <button
                  onClick={() => handleDelete(roadmap.id)}
                  className="p-1.5 hover:bg-red-100 rounded-lg text-ink-400 hover:text-red-500 transition-colors"
                  title="Delete roadmap"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
}

export default SavedRoadmaps;