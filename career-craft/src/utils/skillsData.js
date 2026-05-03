// src/utils/skillsData.js

export const skillGoals = [
  {
    id: 'web-dev',
    name: 'Web Developer',
    icon: '💻',
    description: 'Build modern web applications with industry-standard tools',
    skills: [
      { id: 'html', name: 'HTML5 Fundamentals', category: 'Core', difficulty: 'Beginner' },
      { id: 'css', name: 'CSS3 & Flexbox/Grid', category: 'Core', difficulty: 'Beginner' },
      { id: 'js', name: 'JavaScript (ES6+)', category: 'Core', difficulty: 'Intermediate' },
      { id: 'react', name: 'React.js', category: 'Framework', difficulty: 'Intermediate' },
      { id: 'nodejs', name: 'Node.js & Express', category: 'Backend', difficulty: 'Intermediate' },
      { id: 'git', name: 'Git & Version Control', category: 'Tools', difficulty: 'Beginner' },
      { id: 'sql', name: 'SQL & Databases', category: 'Backend', difficulty: 'Intermediate' },
      { id: 'api', name: 'REST APIs & HTTP', category: 'Backend', difficulty: 'Intermediate' },
      { id: 'responsive', name: 'Responsive Design', category: 'Core', difficulty: 'Intermediate' },
      { id: 'deploy', name: 'Deployment (Vercel/Netlify)', category: 'DevOps', difficulty: 'Beginner' },
    ],
  },
  {
    id: 'ux-designer',
    name: 'UX/UI Designer',
    icon: '🎨',
    description: 'Design beautiful, user-centered digital experiences',
    skills: [
      { id: 'figma', name: 'Figma Proficiency', category: 'Tools', difficulty: 'Beginner' },
      { id: 'typography', name: 'Typography Principles', category: 'Design', difficulty: 'Beginner' },
      { id: 'color', name: 'Color Theory', category: 'Design', difficulty: 'Beginner' },
      { id: 'wireframing', name: 'Wireframing & Prototyping', category: 'Core', difficulty: 'Intermediate' },
      { id: 'user-research', name: 'User Research Methods', category: 'Research', difficulty: 'Intermediate' },
      { id: 'usability', name: 'Usability Testing', category: 'Research', difficulty: 'Intermediate' },
      { id: 'design-systems', name: 'Design Systems', category: 'Advanced', difficulty: 'Advanced' },
      { id: 'accessibility', name: 'Accessibility (WCAG)', category: 'Core', difficulty: 'Intermediate' },
      { id: 'motion', name: 'Motion & Interaction Design', category: 'Advanced', difficulty: 'Advanced' },
      { id: 'case-studies', name: 'Portfolio Case Studies', category: 'Career', difficulty: 'Intermediate' },
    ],
  },
  {
    id: 'data-science',
    name: 'Data Scientist',
    icon: '📊',
    description: 'Extract insights and build predictive models from data',
    skills: [
      { id: 'python', name: 'Python Programming', category: 'Core', difficulty: 'Intermediate' },
      { id: 'pandas', name: 'Pandas & NumPy', category: 'Core', difficulty: 'Intermediate' },
      { id: 'statistics', name: 'Statistics & Probability', category: 'Math', difficulty: 'Intermediate' },
      { id: 'ml', name: 'Machine Learning (Scikit-learn)', category: 'ML', difficulty: 'Advanced' },
      { id: 'visualization', name: 'Data Visualization', category: 'Core', difficulty: 'Intermediate' },
      { id: 'sql-ds', name: 'SQL for Data Analysis', category: 'Data', difficulty: 'Intermediate' },
      { id: 'deep-learning', name: 'Deep Learning Basics', category: 'ML', difficulty: 'Advanced' },
      { id: 'ab-testing', name: 'A/B Testing', category: 'Analytics', difficulty: 'Intermediate' },
      { id: 'feature-eng', name: 'Feature Engineering', category: 'ML', difficulty: 'Advanced' },
      { id: 'model-deploy', name: 'Model Deployment', category: 'MLOps', difficulty: 'Advanced' },
    ],
  },
  {
    id: 'product-manager',
    name: 'Product Manager',
    icon: '🗺️',
    description: 'Lead product strategy, roadmapping, and cross-functional teams',
    skills: [
      { id: 'prd', name: 'Writing PRDs', category: 'Core', difficulty: 'Intermediate' },
      { id: 'roadmapping', name: 'Roadmap Planning', category: 'Strategy', difficulty: 'Intermediate' },
      { id: 'agile', name: 'Agile & Scrum', category: 'Process', difficulty: 'Beginner' },
      { id: 'user-stories', name: 'User Stories & Epics', category: 'Core', difficulty: 'Beginner' },
      { id: 'okrs', name: 'OKRs & Metrics', category: 'Strategy', difficulty: 'Intermediate' },
      { id: 'prioritization', name: 'Feature Prioritization (RICE)', category: 'Strategy', difficulty: 'Intermediate' },
      { id: 'stakeholders', name: 'Stakeholder Management', category: 'Soft Skills', difficulty: 'Advanced' },
      { id: 'analytics-pm', name: 'Product Analytics', category: 'Data', difficulty: 'Intermediate' },
      { id: 'competitive', name: 'Competitive Analysis', category: 'Strategy', difficulty: 'Intermediate' },
      { id: 'go-to-market', name: 'Go-to-Market Strategy', category: 'Strategy', difficulty: 'Advanced' },
    ],
  },
]

export const getDifficultyColor = (difficulty) => {
  switch (difficulty) {
    case 'Beginner': return 'text-sage-600 bg-sage-50'
    case 'Intermediate': return 'text-ember-600 bg-ember-50'
    case 'Advanced': return 'text-ink-600 bg-ink-100'
    default: return 'text-ink-500 bg-ink-50'
  }
}