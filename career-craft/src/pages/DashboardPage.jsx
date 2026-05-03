// src/pages/DashboardPage.jsx
import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import Navbar from '../components/common/Navbar'
import CareerCard from '../components/dashboard/CareerCard'
import InterestChart from '../components/dashboard/InterestChart'
import SavedRoadmaps from '../components/dashboard/SavedRoadmaps'
import SkillTracker from '../components/skills/SkillTracker'
import LoadingSpinner from '../components/common/LoadingSpinner'
import { useAuth } from '../hooks/useAuth'
import { getQuizResult } from '../firebase/database'
import { getCareerSuggestions } from '../services/aiService'

const StatCard = ({ icon, label, value, sub }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="card p-5 flex items-center gap-4"
  >
    <div className="w-11 h-11 bg-ember-50 rounded-xl flex items-center justify-center text-xl flex-shrink-0">
      {icon}
    </div>
    <div>
      <p className="text-2xl font-display font-bold text-ink-900">{value}</p>
      <p className="text-sm text-ink-500">{label}</p>
      {sub && <p className="text-xs text-ink-400 mt-0.5">{sub}</p>}
    </div>
  </motion.div>
)

const DashboardPage = () => {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [quizResult, setQuizResult] = useState(null)
  const [careers, setCareers] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('careers')

  useEffect(() => {
    const load = async () => {
      if (!user) return
      const result = await getQuizResult(user.uid)
      if (!result) {
        navigate('/quiz')
        return
      }
      setQuizResult(result)
      setCareers(getCareerSuggestions(result.category))
      setLoading(false)
    }
    load()
  }, [user, navigate])

  if (loading) {
    return (
      <div className="min-h-screen bg-ink-50">
        <Navbar />
        <div className="flex items-center justify-center min-h-screen">
          <LoadingSpinner size="lg" text="Loading your dashboard..." />
        </div>
      </div>
    )
  }

  const topScore = quizResult?.scores
    ? Object.entries(quizResult.scores).sort((a, b) => b[1] - a[1])[0]
    : null

  const tabs = [
    { id: 'careers', label: 'Career Matches', icon: '🎯' },
    { id: 'skills', label: 'Skill Tracker', icon: '📈' },
    { id: 'roadmaps', label: 'Saved Roadmaps', icon: '🗺️' },
    { id: 'analytics', label: 'Analytics', icon: '📊' },
  ]

  return (
    <div className="min-h-screen bg-ink-50">
      <Navbar />
      <div className="pt-20 pb-16">
        {/* Header */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col sm:flex-row sm:items-center justify-between gap-4"
          >
            <div>
              <p className="text-ember-600 font-medium text-sm mb-1">Welcome back</p>
              <h1 className="font-display text-3xl md:text-4xl font-bold text-ink-900">
                {user?.displayName?.split(' ')[0] || 'Explorer'}'s Dashboard
              </h1>
              <p className="text-ink-500 mt-1.5">
                Your <span className="font-semibold text-ink-700">{quizResult?.category}</span> career profile · Updated today
              </p>
            </div>
            <Link to="/quiz" className="btn-secondary text-sm self-start sm:self-auto">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Retake Quiz
            </Link>
          </motion.div>

          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
            <StatCard icon="🎯" label="Career Track" value={quizResult?.category} />
            <StatCard icon="💡" label="Top Interest" value={topScore?.[0] || '—'} sub={`${topScore?.[1] || 0}% match`} />
            <StatCard icon="🚀" label="Career Matches" value={careers.length} sub="personalized to you" />
            <StatCard icon="✨" label="Traits" value={quizResult?.traits?.length || 0} sub="identified strengths" />
          </div>
        </div>

        {/* Tabs */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-1 bg-white border border-ink-200 rounded-xl p-1 mb-8 w-full overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium whitespace-nowrap transition-all duration-200 flex-1 justify-center ${
                  activeTab === tab.id
                    ? 'bg-ember-500 text-white shadow-sm'
                    : 'text-ink-600 hover:bg-ink-50'
                }`}
              >
                <span>{tab.icon}</span>
                <span className="hidden sm:inline">{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Tab content */}
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Career Matches */}
            {activeTab === 'careers' && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="font-display text-xl font-bold text-ink-900">Your Career Matches</h2>
                    <p className="text-sm text-ink-400 mt-1">
                      Based on your {quizResult?.category} profile — click "Generate Roadmap" on any career to build your plan.
                    </p>
                  </div>
                </div>

                {/* Traits */}
                {quizResult?.traits && (
                  <div className="card p-4 mb-6 flex flex-wrap items-center gap-3">
                    <span className="text-sm font-medium text-ink-600">Your strengths:</span>
                    {quizResult.traits.map((trait) => (
                      <span key={trait} className="badge bg-ember-50 text-ember-700 text-xs">
                        {trait}
                      </span>
                    ))}
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {careers.map((career, i) => (
                    <CareerCard
                      key={career.title}
                      career={career}
                      category={quizResult?.category}
                      index={i}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Skill Tracker */}
            {activeTab === 'skills' && <SkillTracker />}

            {/* Saved Roadmaps */}
            {activeTab === 'roadmaps' && <SavedRoadmaps />}

            {/* Analytics */}
            {activeTab === 'analytics' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {quizResult?.scores && (
                  <InterestChart scores={quizResult.scores} />
                )}
                <div className="card p-6">
                  <h3 className="font-display font-semibold text-ink-900 mb-1">Score Breakdown</h3>
                  <p className="text-sm text-ink-400 mb-5">How your answers distributed across categories</p>
                  <div className="flex flex-col gap-4">
                    {quizResult?.scores && Object.entries(quizResult.scores)
                      .sort((a, b) => b[1] - a[1])
                      .map(([cat, score], i) => (
                        <div key={cat}>
                          <div className="flex justify-between mb-1.5">
                            <span className="text-sm font-medium text-ink-700">{cat}</span>
                            <span className="text-sm font-mono text-ink-500">{score}%</span>
                          </div>
                          <div className="progress-bar h-2.5">
                            <motion.div
                              className="progress-fill"
                              initial={{ width: 0 }}
                              animate={{ width: `${score}%` }}
                              transition={{ duration: 0.8, delay: i * 0.1 }}
                            />
                          </div>
                        </div>
                      ))}
                  </div>

                  {quizResult?.traits && (
                    <div className="mt-6 pt-6 border-t border-ink-100">
                      <p className="text-sm font-medium text-ink-600 mb-3">Identified Personality Traits</p>
                      <div className="flex flex-wrap gap-2">
                        {quizResult.traits.map((trait) => (
                          <span key={trait} className="badge bg-ink-100 text-ink-600 text-xs">
                            {trait}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default DashboardPage;