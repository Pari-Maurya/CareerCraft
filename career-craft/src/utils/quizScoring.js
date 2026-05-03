// src/utils/quizScoring.js

const categoryLabels = {
  tech: 'Tech',
  design: 'Design',
  management: 'Management',
  research: 'Research',
}

const categoryDescriptions = {
  Tech: 'You think in systems and love solving logical problems. You thrive when building scalable, impactful technology.',
  Design: 'You have a strong visual sense and care deeply about user experience. You communicate ideas through beauty and clarity.',
  Management: 'You are a natural leader who excels at organizing people, processes, and priorities toward a common goal.',
  Research: 'You are driven by curiosity and rigorous thinking. You excel at discovering insights and advancing knowledge.',
}

const traits = {
  Tech: ['Logical Thinker', 'Problem Solver', 'Systems Thinker', 'Detail-oriented', 'Builder Mindset'],
  Design: ['Creative Visionary', 'Empathetic', 'Aesthetic Sensibility', 'Iterative', 'User-centered'],
  Management: ['Natural Leader', 'Strategic Thinker', 'Communicator', 'Organized', 'People-focused'],
  Research: ['Curious Mind', 'Analytical', 'Methodical', 'Deep Thinker', 'Evidence-driven'],
}

export const computeCareerCategory = (answers) => {
  const scores = { tech: 0, design: 0, management: 0, research: 0 }

  Object.values(answers).forEach((value) => {
    if (scores[value] !== undefined) {
      scores[value]++
    }
  })

  const total = Object.values(scores).reduce((a, b) => a + b, 0) || 1

  const normalized = {
    Tech: Math.round((scores.tech / total) * 100),
    Design: Math.round((scores.design / total) * 100),
    Management: Math.round((scores.management / total) * 100),
    Research: Math.round((scores.research / total) * 100),
  }

  const topCategory = Object.entries(normalized).sort((a, b) => b[1] - a[1])[0][0]

  return {
    category: topCategory,
    scores: normalized,
    description: categoryDescriptions[topCategory],
    traits: traits[topCategory],
  }
}