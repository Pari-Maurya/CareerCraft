// src/hooks/useQuiz.js
import { useState, useCallback } from 'react'
import { quizQuestions } from '../utils/quizData'
import { computeCareerCategory } from '../utils/quizScoring'
import { saveQuizResult } from '../firebase/database'

export const useQuiz = (uid) => {
  const [answers, setAnswers] = useState({})
  const [currentIndex, setCurrentIndex] = useState(0)
  const [submitting, setSubmitting] = useState(false)
  const [result, setResult] = useState(null)
  const [error, setError] = useState(null)

  const totalQuestions = quizQuestions.length
  const currentQuestion = quizQuestions[currentIndex]
  const progress = Math.round(((currentIndex) / totalQuestions) * 100)
  const isLastQuestion = currentIndex === totalQuestions - 1

  const selectAnswer = useCallback((questionId, value) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }))
  }, [])

  const nextQuestion = useCallback(() => {
    if (currentIndex < totalQuestions - 1) {
      setCurrentIndex((i) => i + 1)
    }
  }, [currentIndex, totalQuestions])

  const prevQuestion = useCallback(() => {
    if (currentIndex > 0) {
      setCurrentIndex((i) => i - 1)
    }
  }, [currentIndex])

  const submitQuiz = useCallback(async () => {
    setSubmitting(true)
    setError(null)
    try {
      const computed = computeCareerCategory(answers)
      await saveQuizResult(uid, {
        answers,
        category: computed.category,
        scores: computed.scores,
        traits: computed.traits,
      })
      setResult(computed)
      return computed
    } catch (err) {
      setError(err.message)
      return null
    } finally {
      setSubmitting(false)
    }
  }, [answers, uid])

  const hasAnswer = (questionId) => answers[questionId] !== undefined

  return {
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
  }
}