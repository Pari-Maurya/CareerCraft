// src/pages/LandingPage.jsx
import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView } from 'framer-motion'
import Navbar from '../components/common/Navbar'

const FadeIn = ({ children, delay = 0, className = '' }) => {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

const features = [
  {
    icon: '🧭',
    title: 'Career Discovery Quiz',
    description: 'Answer 12 thoughtful questions about your interests, personality, and work style. Powered by evidence-based career psychology.',
  },
  {
    icon: '🤖',
    title: 'AI-Powered Suggestions',
    description: 'Get matched with 3 careers that align with who you truly are — not just what\'s trending. Backed by real data.',
  },
  {
    icon: '🗺️',
    title: 'Custom Roadmaps',
    description: 'Generate a personalized, step-by-step roadmap for any career path with timelines, resources, and clear milestones.',
  },
  {
    icon: '📈',
    title: 'Skill Tracker',
    description: 'Track your learning progress with a visual skills checklist. See exactly how far you\'ve come and what\'s next.',
  },
  {
    icon: '💾',
    title: 'Save Everything',
    description: 'All your roadmaps, quiz results, and progress are saved to your account — accessible anywhere, anytime.',
  },
  {
    icon: '📊',
    title: 'Visual Analytics',
    description: 'Understand your personality profile through beautiful charts showing your interest distribution across categories.',
  },
]

const steps = [
  { number: '01', title: 'Take the Quiz', description: 'Answer 12 questions about your interests, personality, and work preferences. It takes less than 5 minutes.' },
  { number: '02', title: 'Discover Your Matches', description: 'Our algorithm calculates your profile and surfaces 3 careers most aligned with who you are.' },
  { number: '03', title: 'Build Your Roadmap', description: 'Click "Generate Roadmap" on any career to get a personalized, month-by-month action plan.' },
  { number: '04', title: 'Track Your Progress', description: 'Use the Skill Tracker to mark off what you\'ve learned and watch your progress bar fill up.' },
]

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-ink-50">
      <Navbar transparent />

      {/* ── Hero ── */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-ember-100 rounded-full opacity-60 blur-3xl" />
          <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-sage-100 rounded-full opacity-40 blur-3xl" />
          <div className="absolute top-1/3 left-1/4 w-64 h-64 bg-ink-100 rounded-full opacity-30 blur-3xl" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 bg-white border border-ember-200 text-ember-700 px-4 py-2 rounded-full text-sm font-medium mb-8 shadow-sm"
          >
            <span className="w-2 h-2 bg-ember-500 rounded-full animate-pulse" />
            AI-powered career guidance for students
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-display text-5xl md:text-7xl font-bold text-ink-900 leading-tight mb-6"
          >
            Discover who you are.
            <br />
            <span className="text-ember-500 italic">Design your career.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-xl text-ink-500 max-w-2xl mx-auto mb-10 font-light leading-relaxed"
          >
            CareerCraft helps college students and teenagers cut through the noise — using AI to surface personalized career paths and actionable roadmaps built for who you actually are.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link to="/signup" className="btn-primary text-base px-8 py-3.5">
              Start Career Journey
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <Link to="/login" className="btn-secondary text-base px-8 py-3.5">
              Login
            </Link>
          </motion.div>

          {/* Trust indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-16 flex flex-wrap items-center justify-center gap-8 text-sm text-ink-400"
          >
            {['Free to use', 'No credit card needed', 'AI-powered insights', 'Save your progress'].map((t) => (
              <span key={t} className="flex items-center gap-2">
                <svg className="w-4 h-4 text-sage-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                {t}
              </span>
            ))}
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-ink-400"
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <span className="text-xs font-medium tracking-widest uppercase">Scroll</span>
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </motion.div>
      </section>

      {/* ── Features ── */}
      <section className="py-24 px-4 max-w-7xl mx-auto">
        <FadeIn className="text-center mb-16">
          <p className="text-ember-600 font-medium text-sm tracking-widest uppercase mb-3">Everything you need</p>
          <h2 className="section-title">Built for students who are figuring it out</h2>
          <p className="section-subtitle mx-auto mt-4">
            Not vague advice. Not generic lists. A complete toolkit to understand yourself and map a real path forward.
          </p>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <FadeIn key={feature.title} delay={i * 0.08}>
              <div className="card-hover p-6 group">
                <div className="w-12 h-12 bg-ember-50 rounded-xl flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="font-display font-semibold text-lg text-ink-900 mb-2">{feature.title}</h3>
                <p className="text-ink-500 text-sm leading-relaxed">{feature.description}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* ── How it works ── */}
      <section className="py-24 bg-ink-900">
        <div className="max-w-6xl mx-auto px-4">
          <FadeIn className="text-center mb-16">
            <p className="text-ember-400 font-medium text-sm tracking-widest uppercase mb-3">Simple process</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white">
              From confused to confident in 4 steps
            </h2>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, i) => (
              <FadeIn key={step.number} delay={i * 0.1}>
                <div className="text-center group">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-ember-500/10 border border-ember-500/30 flex items-center justify-center group-hover:bg-ember-500/20 transition-colors duration-300">
                    <span className="font-mono text-ember-400 font-bold text-lg">{step.number}</span>
                  </div>
                  <h3 className="font-display font-semibold text-white text-lg mb-2">{step.title}</h3>
                  <p className="text-ink-400 text-sm leading-relaxed">{step.description}</p>
                </div>
              </FadeIn>
            ))}
          </div>

          <FadeIn className="text-center mt-16">
            <Link to="/signup" className="btn-primary text-base px-10 py-4">
              Start for Free
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </FadeIn>
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section className="py-24 px-4">
        <FadeIn>
          <div className="max-w-4xl mx-auto bg-gradient-to-br from-ember-500 to-ember-700 rounded-3xl p-12 text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/4" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/4" />
            <div className="relative z-10">
              <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">
                Your career starts with knowing yourself.
              </h2>
              <p className="text-ember-100 text-lg mb-8 max-w-xl mx-auto">
                Take the 5-minute quiz and get your personalized career profile today. It's free.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/signup" className="bg-white text-ember-700 font-medium px-8 py-3.5 rounded-lg hover:bg-ember-50 transition-colors shadow-md hover:-translate-y-0.5 transition-transform duration-200 inline-flex items-center gap-2">
                  Create Free Account
                </Link>
                <Link to="/login" className="bg-ember-600/40 text-white font-medium px-8 py-3.5 rounded-lg hover:bg-ember-600/60 transition-colors inline-flex items-center gap-2 border border-white/20">
                  I have an account
                </Link>
              </div>
            </div>
          </div>
        </FadeIn>
      </section>

      {/* ── Footer ── */}
      <footer className="bg-ink-900 border-t border-ink-800 py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 bg-ember-500 rounded-md flex items-center justify-center">
                <span className="text-white font-display font-bold text-xs">CC</span>
              </div>
              <span className="font-display font-bold text-lg text-white">
                Career<span className="text-ember-400">Craft</span>
              </span>
            </div>
            <p className="text-ink-500 text-sm text-center">
              Discover who you are. Design your career.
            </p>
            <div className="flex items-center gap-6 text-sm text-ink-500">
              <Link to="/login" className="hover:text-ink-300 transition-colors">Login</Link>
              <Link to="/signup" className="hover:text-ink-300 transition-colors">Sign up</Link>
            </div>
          </div>
          <div className="mt-8 pt-6 border-t border-ink-800 text-center text-xs text-ink-600">
            © {new Date().getFullYear()} CareerCraft. Built with ❤️ by Pari Maurya.
          </div>
        </div>
      </footer>
    </div>
  )
}

export default LandingPage;