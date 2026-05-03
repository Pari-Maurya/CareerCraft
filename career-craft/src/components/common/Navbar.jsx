// src/components/common/Navbar.jsx
import { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuth } from '../../hooks/useAuth'
import { logoutUser } from '../../firebase/auth'

const Navbar = ({ transparent = false }) => {
  const { user } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  const handleLogout = async () => {
    await logoutUser()
    navigate('/')
  }

  const navBg = transparent && !scrolled
    ? 'bg-transparent'
    : 'bg-white/90 backdrop-blur-md border-b border-ink-100 shadow-sm'

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${navBg}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-ember-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-display font-bold text-sm">CC</span>
            </div>
            <span className="font-display font-bold text-xl text-ink-900">
              Career<span className="text-ember-500">Craft</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6">
            {user ? (
              <>
                <Link to="/dashboard" className={`nav-link text-sm ${location.pathname === '/dashboard' ? 'text-ink-900 after:w-full' : ''}`}>
                  Dashboard
                </Link>
                <Link to="/quiz" className={`nav-link text-sm ${location.pathname === '/quiz' ? 'text-ink-900 after:w-full' : ''}`}>
                  Retake Quiz
                </Link>
                <div className="flex items-center gap-3 ml-2">
                  <div className="w-8 h-8 rounded-full bg-ember-100 flex items-center justify-center text-ember-700 font-medium text-sm">
                    {user.displayName?.[0]?.toUpperCase() || user.email?.[0]?.toUpperCase()}
                  </div>
                  <button onClick={handleLogout} className="btn-ghost text-sm py-1.5">
                    Sign out
                  </button>
                </div>
              </>
            ) : (
              <>
                <Link to="/login" className="nav-link text-sm">Login</Link>
                <Link to="/signup" className="btn-primary py-2 text-sm">
                  Get Started
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-ink-100 transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <div className="w-5 flex flex-col gap-1.5">
              <span className={`block h-0.5 bg-ink-700 transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
              <span className={`block h-0.5 bg-ink-700 transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
              <span className={`block h-0.5 bg-ink-700 transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden bg-white border-b border-ink-100 shadow-lg"
          >
            <div className="px-4 py-4 flex flex-col gap-3">
              {user ? (
                <>
                  <Link to="/dashboard" className="py-2 text-ink-700 font-medium" onClick={() => setMenuOpen(false)}>Dashboard</Link>
                  <Link to="/quiz" className="py-2 text-ink-700 font-medium" onClick={() => setMenuOpen(false)}>Retake Quiz</Link>
                  <button onClick={handleLogout} className="py-2 text-left text-ink-500 font-medium">Sign out</button>
                </>
              ) : (
                <>
                  <Link to="/login" className="py-2 text-ink-700 font-medium" onClick={() => setMenuOpen(false)}>Login</Link>
                  <Link to="/signup" className="btn-primary justify-center" onClick={() => setMenuOpen(false)}>Get Started</Link>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}

export default Navbar;