// src/pages/RoadmapPage.jsx
import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import Navbar from '../components/common/Navbar'
import LoadingSpinner from '../components/common/LoadingSpinner'
import { useAuth } from '../hooks/useAuth'
import { generateRoadmap } from '../services/aiService'
import { getRoadmaps, saveRoadmap, getQuizResult, saveSkillProgress } from '../firebase/database'

const RoadmapPage = () => {
  const { careerTitle } = useParams()
  const decodedTitle = decodeURIComponent(careerTitle || '')
  const navigate = useNavigate()
  const { user } = useAuth()

  const [roadmap, setRoadmap] = useState(null)
  const [loading, setLoading] = useState(true)
  const [regenerating, setRegenerating] = useState(false)
  const [completedSteps, setCompletedSteps] = useState({})
  const [userCategory, setUserCategory] = useState('Tech')
  const [savedSuccess, setSavedSuccess] = useState(false)

  useEffect(() => {
    const fetchOrCreateRoadmap = async () => {
      if (!user || !decodedTitle) return
      setLoading(true)

      try {
        // Fetch user quiz result to pass category to AI
        const quizResult = await getQuizResult(user.uid)
        const category = quizResult?.category || 'Tech'
        setUserCategory(category)

        // Check if roadmap is already saved in Firebase
        const existingRoadmaps = await getRoadmaps(user.uid)
        const matched = existingRoadmaps.find(
          (r) => r.title.toLowerCase() === decodedTitle.toLowerCase()
        )

        if (matched) {
          setRoadmap(matched)
        } else {
          // Generate new roadmap using Gemini LLM
          const generated = await generateRoadmap(decodedTitle, category)
          const newId = await saveRoadmap(user.uid, generated)
          setRoadmap({ ...generated, id: newId })
        }
      } catch (err) {
        console.error('Error fetching roadmap:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchOrCreateRoadmap()
  }, [user, decodedTitle])

  const handleToggleStep = (index) => {
    const updated = {
      ...completedSteps,
      [index]: !completedSteps[index],
    }
    setCompletedSteps(updated)

    // Save progress to Skill Progress in Firebase if user finishes steps
    if (user && roadmap) {
      saveSkillProgress(user.uid, roadmap.title, {
        title: roadmap.title,
        completedCount: Object.values(updated).filter(Boolean).length,
        totalSteps: roadmap.steps?.length || 5,
        items: updated,
      }).catch(console.error)
    }
  }

  const handleRegenerate = async () => {
    if (!user || !roadmap) return
    setRegenerating(true)
    try {
      const newRoadmap = await generateRoadmap(decodedTitle, userCategory)
      const newId = await saveRoadmap(user.uid, newRoadmap)
      setRoadmap({ ...newRoadmap, id: newId })
      setCompletedSteps({})
      setSavedSuccess(true)
      setTimeout(() => setSavedSuccess(false), 3000)
    } catch (err) {
      console.error('Failed to regenerate roadmap:', err)
    } finally {
      setRegenerating(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-ink-50">
        <Navbar />
        <div className="flex items-center justify-center min-h-screen">
          <LoadingSpinner size="lg" text={`Generating AI Roadmap for ${decodedTitle}...`} />
        </div>
      </div>
    )
  }

  if (!roadmap) {
    return (
      <div className="min-h-screen bg-ink-50">
        <Navbar />
        <div className="pt-28 pb-16 px-4 max-w-xl mx-auto text-center">
          <h2 className="font-display text-2xl font-bold text-ink-900 mb-4">Roadmap Not Found</h2>
          <p className="text-ink-500 mb-6">We couldn't generate or locate a roadmap for "{decodedTitle}".</p>
          <Link to="/dashboard" className="btn-primary">
            Return to Dashboard
          </Link>
        </div>
      </div>
    )
  }

  const totalStepsCount = roadmap.steps?.length || 0
  const completedCount = Object.values(completedSteps).filter(Boolean).length
  const progressPercent = totalStepsCount > 0 ? Math.round((completedCount / totalStepsCount) * 100) : 0

  return (
    <div className="min-h-screen bg-ink-50">
      <Navbar />

      <div className="pt-24 pb-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => navigate('/dashboard')}
            className="btn-secondary py-2 px-4 text-sm inline-flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Dashboard
          </button>

          <div className="flex items-center gap-3">
            <button
              onClick={handleRegenerate}
              disabled={regenerating}
              className="btn-secondary py-2 px-4 text-sm inline-flex items-center gap-2 disabled:opacity-50"
            >
              <svg
                className={`w-4 h-4 ${regenerating ? 'animate-spin' : ''}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              {regenerating ? 'Regenerating...' : 'Regenerate with AI'}
            </button>
          </div>
        </div>

        {savedSuccess && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-4 bg-sage-50 border border-sage-200 text-sage-800 rounded-xl text-sm flex items-center justify-between"
          >
            <span>✨ New Roadmap successfully generated and saved to your account!</span>
          </motion.div>
        )}

        {/* Roadmap Header Hero Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card p-8 mb-8 border-ember-100 bg-gradient-to-br from-white to-ember-50/30"
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <span className="badge bg-ember-100 text-ember-700 font-semibold text-xs px-3 py-1">
                  ✨ AI Generated
                </span>
                <span className="badge bg-ink-100 text-ink-600 text-xs px-3 py-1">
                  ⏱️ Est. {roadmap.duration || '12-18 months'}
                </span>
              </div>
              <h1 className="font-display text-3xl md:text-4xl font-bold text-ink-900">
                {roadmap.title} Career Roadmap
              </h1>
              <p className="text-ink-600 mt-3 leading-relaxed max-w-3xl">
                {roadmap.overview}
              </p>
            </div>

            {/* Overall Progress Widget */}
            <div className="card p-5 bg-white border border-ink-200 min-w-[220px] text-center flex-shrink-0">
              <span className="text-xs uppercase font-semibold tracking-wider text-ink-400">Roadmap Progress</span>
              <div className="text-3xl font-display font-bold text-ember-600 my-1">
                {progressPercent}%
              </div>
              <p className="text-xs text-ink-500 mb-3">
                {completedCount} of {totalStepsCount} phases completed
              </p>
              <div className="progress-bar h-2">
                <motion.div
                  className="progress-fill"
                  animate={{ width: `${progressPercent}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Step-by-Step Timeline Section */}
        <div className="relative pl-6 md:pl-8 border-l-2 border-ink-200 space-y-8">
          {roadmap.steps?.map((step, index) => {
            const isDone = !!completedSteps[index]

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1, duration: 0.4 }}
                className="relative group"
              >
                {/* Timeline Dot Indicator */}
                <button
                  onClick={() => handleToggleStep(index)}
                  className={`absolute -left-[31px] md:-left-[39px] top-1.5 w-8 h-8 rounded-full border-2 flex items-center justify-center text-xs font-bold transition-all duration-300 ${isDone
                      ? 'bg-ember-500 border-ember-500 text-white shadow-md'
                      : 'bg-white border-ink-300 text-ink-500 hover:border-ember-400'
                    }`}
                  title={isDone ? 'Mark as incomplete' : 'Mark as complete'}
                >
                  {isDone ? (
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    index + 1
                  )}
                </button>

                {/* Step Card Content */}
                <div
                  className={`card p-6 transition-all duration-300 ${isDone ? 'border-ember-200 bg-ember-50/20' : 'hover:shadow-md'
                    }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold uppercase tracking-wider text-ember-600 bg-ember-50 px-2.5 py-0.5 rounded-md border border-ember-100">
                        {step.phase || `Phase ${index + 1}`}
                      </span>
                      {step.duration && (
                        <span className="text-xs text-ink-400 font-mono">
                          • {step.duration}
                        </span>
                      )}
                    </div>

                    <button
                      onClick={() => handleToggleStep(index)}
                      className={`text-xs font-medium px-3 py-1 rounded-lg transition-colors inline-flex items-center gap-1.5 self-start sm:self-auto ${isDone
                          ? 'bg-sage-100 text-sage-800'
                          : 'bg-ink-100 text-ink-600 hover:bg-ink-200'
                        }`}
                    >
                      {isDone ? '✓ Completed' : 'Mark as Done'}
                    </button>
                  </div>

                  <h3 className={`font-display text-xl font-bold text-ink-900 mb-2 ${isDone ? 'line-through opacity-80' : ''}`}>
                    {step.title}
                  </h3>
                  <p className="text-ink-600 text-sm leading-relaxed mb-5">
                    {step.description}
                  </p>

                  {/* Learning Resources */}
                  {step.resources && step.resources.length > 0 && (
                    <div className="mb-4 pt-4 border-t border-ink-100">
                      <h4 className="text-xs font-semibold uppercase tracking-wider text-ink-500 mb-2">
                        Recommended Resources & Tools
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {step.resources.map((res, rIdx) => (
                          <span
                            key={rIdx}
                            className="inline-flex items-center gap-1 bg-white border border-ink-200 px-3 py-1 rounded-lg text-xs font-medium text-ink-700 shadow-2xs"
                          >
                            <svg className="w-3.5 h-3.5 text-ember-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                            </svg>
                            {res}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Milestone Badge */}
                  {step.milestone && (
                    <div className="bg-ink-50 border border-ink-200 rounded-xl p-3.5 flex items-start gap-3">
                      <span className="text-lg flex-shrink-0">🚩</span>
                      <div>
                        <span className="text-xs font-semibold uppercase tracking-wider text-ink-500 block">
                          Phase Milestone
                        </span>
                        <span className="text-xs md:text-sm font-medium text-ink-800">
                          {step.milestone}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Footer Navigation */}
        <div className="mt-12 text-center pt-8 border-t border-ink-200">
          <h3 className="font-display text-lg font-semibold text-ink-900 mb-2">Ready to track your skills?</h3>
          <p className="text-sm text-ink-500 mb-6">Head back to your dashboard to monitor your progress in the Skill Tracker.</p>
          <div className="flex justify-center gap-4">
            <Link to="/dashboard" className="btn-primary px-8">
              Go to Dashboard
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RoadmapPage
