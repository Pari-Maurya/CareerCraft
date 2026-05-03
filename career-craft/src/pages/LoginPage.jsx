// src/pages/LoginPage.jsx
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { loginUser } from '../firebase/auth'
import { getQuizResult } from '../firebase/database'

const LoginPage = () => {
  const navigate = useNavigate()
  const [form, setForm] = useState({ email: '', password: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const user = await loginUser(form.email, form.password)
      // Check if user has taken quiz
      const quizResult = await getQuizResult(user.uid)
      if (quizResult) {
        navigate('/dashboard')
      } else {
        navigate('/quiz')
      }
    } catch (err) {
      const messages = {
        'auth/user-not-found': 'No account found with this email.',
        'auth/wrong-password': 'Incorrect password. Please try again.',
        'auth/invalid-email': 'Invalid email address.',
        'auth/too-many-requests': 'Too many failed attempts. Please wait a moment.',
        'auth/invalid-credential': 'Invalid email or password. Please try again.',
      }
      setError(messages[err.code] || 'Login failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-ink-50 flex">
      {/* Left Panel */}
      <div className="hidden lg:flex flex-1 bg-ink-900 flex-col justify-center px-16 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-ember-500/10 rounded-full -translate-y-1/2 translate-x-1/4 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-sage-500/5 rounded-full translate-y-1/2 blur-3xl" />
        <div className="relative z-10">
          <Link to="/" className="flex items-center gap-2 mb-16">
            <div className="w-8 h-8 bg-ember-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-display font-bold text-sm">CC</span>
            </div>
            <span className="font-display font-bold text-xl text-white">CareerCraft</span>
          </Link>
          <h2 className="font-display text-4xl font-bold text-white mb-4">
            Welcome back.
          </h2>
          <p className="text-ink-400 text-lg leading-relaxed max-w-sm">
            Pick up right where you left off. Your roadmaps and progress are waiting for you.
          </p>
          <div className="mt-12 flex flex-col gap-4">
            {['Your quiz results & career profile', 'Saved roadmaps', 'Skill tracker progress'].map((item) => (
              <div key={item} className="flex items-center gap-3 text-ink-400">
                <div className="w-5 h-5 bg-ember-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-3 h-3 text-ember-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="text-sm">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Panel */}
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          {/* Mobile logo */}
          <div className="lg:hidden flex items-center gap-2 mb-10">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-ember-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-display font-bold text-sm">CC</span>
              </div>
              <span className="font-display font-bold text-xl text-ink-900">CareerCraft</span>
            </Link>
          </div>

          <h1 className="font-display text-3xl font-bold text-ink-900 mb-2">Sign in</h1>
          <p className="text-ink-500 mb-8">
            Don't have an account?{' '}
            <Link to="/signup" className="text-ember-600 font-medium hover:text-ember-700">Create one free</Link>
          </p>

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm"
            >
              {error}
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div>
              <label htmlFor="email" className="label">Email address</label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={form.email}
                onChange={handleChange}
                className="input-field"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label htmlFor="password" className="label">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={form.password}
                onChange={handleChange}
                className="input-field"
                placeholder="Your password"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary justify-center mt-2 py-3.5 text-base disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0"
            >
              {loading ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Signing in...
                </>
              ) : 'Sign in'}
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-ink-400">
            By continuing, you agree to CareerCraft's terms of use.
          </p>
        </motion.div>
      </div>
    </div>
  )
}

export default LoginPage