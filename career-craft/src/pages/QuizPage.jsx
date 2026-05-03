// src/pages/QuizPage.jsx
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuth } from '../hooks/useAuth'
import { useQuiz } from '../hooks/useQuiz'
import Navbar from '../components/common/Navbar'

const categoryColors = {
  Tech: 'bg-blue-50 text-blue-700 border-blue-200',
  Design: 'bg-purple-50 text-purple-700 border-purple-200',
  Management: 'bg-amber-50 text-amber-700 border-amber-200',
  Research: 'bg-sage-50 text-sage-700 border-sage-200',
}

const categoryIcons = {
  Tech: '💻',
  Design: '🎨',
  Management: '🗺️',
  Research: '🔬',
}

const ResultView = ({ result }) => {
  const navigate = useNavigate()
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      className="text-center"
    >
      <div className="w-20 h-20 bg-ember-100 rounded-full flex items-center justify-center text-4xl mx-auto mb-6">
        {categoryIcons[result.category]}
      </div>
      <h2 className="font-display text-3xl font-bold text-ink-900 mb-2">
        Your profile is ready!
      </h2>
      <p className="text-ink-500 mb-2">You're a strong fit for the</p>
      <span className="inline-block bg-ember-100 text-ember-700 px-4 py-1.5 rounded-full font-semibold font-display text-lg mb-4">
        {result.category} Track
      </span>
      <p className="text-ink-600 max-w-md mx-auto mb-8 leading-relaxed">
        {result.description}
      </p>

      {/* Trait badges */}
      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {result.traits.map((trait) => (
          <span key={trait} className="bg-ink-100 text-ink-600 px-3 py-1 rounded-full text-sm font-medium">
            {trait}
          </span>
        ))}
      </div>

      {/* Score breakdown */}
      <div className="card p-6 mb-8 max-w-sm mx-auto text-left">
        <h4 className="font-medium text-ink-700 mb-4 text-sm uppercase tracking-wide">Score Breakdown</h4>
        {Object.entries(result.scores)
          .sort((a, b) => b[1] - a[1])
          .map(([cat, score]) => (
            <div key={cat} className="mb-3">
              <div className="flex justify-between text-sm mb-1">
                <span className="text-ink-600 font-medium">{cat}</span>
                <span className="text-ink-400">{score}%</span>
              </div>
              <div className="progress-bar">
                <motion.div
                  className="progress-fill"
                  initial={{ width: 0 }}
                  animate={{ width: `${score}%` }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                />
              </div>
            </div>
          ))}
      </div>

      <button onClick={() => navigate('/dashboard')} className="btn-primary text-base px-10 py-3.5">
        View Career Matches
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
        </svg>
      </button>
    </motion.div>
  )
}

const QuizPage = () => {
  const { user } = useAuth()
  const {
    answers,
    currentIndex,
    currentQuestion,
    totalQuestions,
    progress,
    isLastQuestion,
    submitting,
    result,
    error,
    selectAnswer,
    nextQuestion,
    prevQuestion,
    submitQuiz,
    hasAnswer,
  } = useQuiz(user?.uid)

  const handleNext = () => {
    if (isLastQuestion) {
      submitQuiz()
    } else {
      nextQuestion()
    }
  }

  const optionLetters = ['A', 'B', 'C', 'D']

  return (
    <div className="min-h-screen bg-ink-50">
      <Navbar />
      <div className="pt-20 pb-16 px-4 max-w-2xl mx-auto">
        {result ? (
          <div className="py-12">
            <ResultView result={result} />
          </div>
        ) : (
          <>
            {/* Header */}
            <div className="py-10">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-8"
              >
                <h1 className="font-display text-3xl font-bold text-ink-900 mb-2">Career Discovery Quiz</h1>
                <p className="text-ink-500">Answer honestly — there are no right or wrong answers.</p>
              </motion.div>

              {/* Progress */}
              <div className="mb-8">
                <div className="flex justify-between text-sm text-ink-500 mb-2">
                  <span>Question {currentIndex + 1} of {totalQuestions}</span>
                  <span>{progress}% complete</span>
                </div>
                <div className="progress-bar h-2.5">
                  <motion.div
                    className="progress-fill"
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.4 }}
                  />
                </div>
                {/* Step dots */}
                <div className="flex gap-1.5 mt-3 flex-wrap">
                  {Array.from({ length: totalQuestions }).map((_, i) => (
                    <div
                      key={i}
                      className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${
                        i < currentIndex ? 'bg-ember-500' :
                        i === currentIndex ? 'bg-ember-300' :
                        'bg-ink-200'
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Question */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentQuestion.id}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div className="card p-8">
                    <div className="mb-6">
                      <span className="text-xs font-medium uppercase tracking-widest text-ember-500">
                        {currentQuestion.category.replace('_', ' ')}
                      </span>
                      <h2 className="font-display text-xl md:text-2xl font-semibold text-ink-900 mt-2 leading-snug">
                        {currentQuestion.question}
                      </h2>
                    </div>

                    <div className="flex flex-col gap-3">
                      {currentQuestion.options.map((option, i) => {
                        const selected = answers[currentQuestion.id] === option.value
                        return (
                          <motion.label
                            key={option.value}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.06 }}
                            className={`quiz-option group ${selected ? 'selected' : ''}`}
                            onClick={() => selectAnswer(currentQuestion.id, option.value)}
                          >
                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold flex-shrink-0 transition-colors duration-200 ${
                              selected ? 'bg-ember-500 text-white' : 'bg-ink-100 text-ink-500 group-hover:bg-ember-100 group-hover:text-ember-600'
                            }`}>
                              {optionLetters[i]}
                            </div>
                            <span className={`text-sm leading-relaxed transition-colors duration-200 ${
                              selected ? 'text-ink-900 font-medium' : 'text-ink-700'
                            }`}>
                              {option.label}
                            </span>
                            {selected && (
                              <div className="ml-auto">
                                <svg className="w-5 h-5 text-ember-500" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                              </div>
                            )}
                          </motion.label>
                        )
                      })}
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              {error && (
                <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                  {error}
                </div>
              )}

              {/* Navigation */}
              <div className="flex items-center justify-between mt-6">
                <button
                  onClick={prevQuestion}
                  disabled={currentIndex === 0}
                  className="btn-secondary py-2.5 px-5 text-sm disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  Back
                </button>

                <span className="text-sm text-ink-400 font-mono">
                  {Object.keys(answers).length}/{totalQuestions} answered
                </span>

                <button
                  onClick={handleNext}
                  disabled={!hasAnswer(currentQuestion.id) || submitting}
                  className="btn-primary py-2.5 px-6 text-sm disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                >
                  {submitting ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Analyzing...
                    </>
                  ) : isLastQuestion ? (
                    <>
                      Get Results
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </>
                  ) : (
                    <>
                      Next
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </>
                  )}
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default QuizPage;