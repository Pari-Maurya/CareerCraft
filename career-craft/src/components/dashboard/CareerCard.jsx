// src/components/dashboard/CareerCard.jsx
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { generateRoadmap } from '../../services/aiService'
import { saveRoadmap } from '../../firebase/database'
import { useAuth } from '../../hooks/useAuth'

const CareerCard = ({ career, category, index }) => {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [generating, setGenerating] = useState(false)
  const [saved, setSaved] = useState(false)

  const handleGenerateRoadmap = async () => {
    setGenerating(true)
    try {
      const roadmap = await generateRoadmap(career.title, category)
      await saveRoadmap(user.uid, roadmap)
      setSaved(true)
      setTimeout(() => {
        navigate(`/roadmap/${encodeURIComponent(career.title)}`)
      }, 600)
    } catch (err) {
      console.error('Failed to generate roadmap:', err)
    } finally {
      setGenerating(false)
    }
  }

  const tagColors = [
    'bg-blue-50 text-blue-600',
    'bg-purple-50 text-purple-600',
    'bg-amber-50 text-amber-600',
    'bg-sage-50 text-sage-600',
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="card-hover p-6 flex flex-col"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="w-12 h-12 bg-ember-50 rounded-xl flex items-center justify-center text-2xl">
          {career.icon}
        </div>
        <div className="flex items-center gap-1.5 bg-sage-50 border border-sage-200 px-2.5 py-1 rounded-full">
          <div className="w-1.5 h-1.5 bg-sage-500 rounded-full" />
          <span className="text-xs font-medium text-sage-700">{career.matchScore}% match</span>
        </div>
      </div>

      {/* Content */}
      <h3 className="font-display font-bold text-lg text-ink-900 mb-2">{career.title}</h3>
      <p className="text-sm text-ink-500 leading-relaxed flex-1 mb-4">{career.description}</p>

      {/* Tags */}
      <div className="flex flex-wrap gap-1.5 mb-5">
        {career.tags.map((tag, i) => (
          <span key={tag} className={`badge text-xs ${tagColors[i % tagColors.length]}`}>
            {tag}
          </span>
        ))}
      </div>

      {/* Action */}
      <button
        onClick={handleGenerateRoadmap}
        disabled={generating || saved}
        className={`w-full justify-center transition-all duration-300 ${
          saved
            ? 'btn-secondary border-sage-300 text-sage-700 bg-sage-50 hover:translate-y-0'
            : 'btn-primary'
        } disabled:cursor-not-allowed`}
      >
        {generating ? (
          <>
            <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            Generating Roadmap...
          </>
        ) : saved ? (
          <>
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            Opening Roadmap...
          </>
        ) : (
          <>
            Generate Roadmap
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </>
        )}
      </button>
    </motion.div>
  )
}

export default CareerCard;