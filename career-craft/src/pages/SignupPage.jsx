// src/pages/SignupPage.jsx
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { registerUser } from '../firebase/auth'

const SignupPage = () => {
  const navigate = useNavigate()
  const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match.')
      return
    }
    if (form.password.length < 6) {
      setError('Password must be at least 6 characters.')
      return
    }
    setLoading(true)
    setError('')
    try {
      await registerUser(form.email, form.password, form.name)
      navigate('/quiz')
    } catch (err) {
      const messages = {
        'auth/email-already-in-use': 'An account with this email already exists.',
        'auth/invalid-email': 'Invalid email address.',
        'auth/weak-password': 'Password should be at least 6 characters.',
      }
      setError(messages[err.code] || 'Sign up failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const passwordStrength = () => {
    const p = form.password
    if (!p) return null
    if (p.length < 6) return { label: 'Too short', color: 'bg-red-400', width: '20%' }
    if (p.length < 8) return { label: 'Weak', color: 'bg-amber-400', width: '40%' }
    if (/[A-Z]/.test(p) && /[0-9]/.test(p)) return { label: 'Strong', color: 'bg-sage-500', width: '100%' }
    return { label: 'Fair', color: 'bg-ember-400', width: '65%' }
  }

  const strength = passwordStrength()

  return (
    <div className="min-h-screen bg-ink-50 flex">
      {/* Left Panel */}
      <div className="hidden lg:flex flex-1 bg-gradient-to-br from-ember-600 to-ember-800 flex-col justify-center px-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-40 h-40 border border-white rounded-full" />
          <div className="absolute top-40 left-40 w-24 h-24 border border-white rounded-full" />
          <div className="absolute bottom-32 right-16 w-56 h-56 border border-white rounded-full" />
        </div>
        <div className="relative z-10">
          <Link to="/" className="flex items-center gap-2 mb-16">
            <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
              <span className="text-white font-display font-bold text-sm">CC</span>
            </div>
            <span className="font-display font-bold text-xl text-white">CareerCraft</span>
          </Link>
          <h2 className="font-display text-4xl font-bold text-white mb-4">
            Start your career journey today.
          </h2>
          <p className="text-ember-100 text-lg leading-relaxed max-w-sm">
            In just 5 minutes, you'll have a personalized career profile and a roadmap built for you.
          </p>
          <div className="mt-12 grid grid-cols-2 gap-4">
            {[
              { emoji: '🎯', label: 'Career Matching' },
              { emoji: '🗺️', label: 'AI Roadmaps' },
              { emoji: '📊', label: 'Skill Tracker' },
              { emoji: '💾', label: 'Save Progress' },
            ].map((item) => (
              <div key={item.label} className="bg-white/10 rounded-xl p-4 text-center backdrop-blur-sm">
                <div className="text-2xl mb-1">{item.emoji}</div>
                <div className="text-white text-xs font-medium">{item.label}</div>
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
          <div className="lg:hidden flex items-center gap-2 mb-10">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-ember-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-display font-bold text-sm">CC</span>
              </div>
              <span className="font-display font-bold text-xl text-ink-900">CareerCraft</span>
            </Link>
          </div>

          <h1 className="font-display text-3xl font-bold text-ink-900 mb-2">Create your account</h1>
          <p className="text-ink-500 mb-8">
            Already have one?{' '}
            <Link to="/login" className="text-ember-600 font-medium hover:text-ember-700">Sign in</Link>
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
              <label htmlFor="name" className="label">Full name</label>
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                required
                value={form.name}
                onChange={handleChange}
                className="input-field"
                placeholder="Your name"
              />
            </div>
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
                autoComplete="new-password"
                required
                value={form.password}
                onChange={handleChange}
                className="input-field"
                placeholder="At least 6 characters"
              />
              {strength && (
                <div className="mt-2">
                  <div className="progress-bar">
                    <div
                      className={`h-full rounded-full transition-all duration-300 ${strength.color}`}
                      style={{ width: strength.width }}
                    />
                  </div>
                  <p className="text-xs text-ink-500 mt-1">{strength.label} password</p>
                </div>
              )}
            </div>
            <div>
              <label htmlFor="confirmPassword" className="label">Confirm password</label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                autoComplete="new-password"
                required
                value={form.confirmPassword}
                onChange={handleChange}
                className="input-field"
                placeholder="Repeat your password"
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
                  Creating account...
                </>
              ) : 'Create account & take quiz'}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-ink-400">
            Free forever. No credit card required.
          </p>
        </motion.div>
      </div>
    </div>
  )
}

export default SignupPage