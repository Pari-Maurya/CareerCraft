// src/services/aiService.js

const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY

// ─── Mock Roadmaps ────────────────────────────────────────────────────────────

const mockRoadmaps = {
  'Software Engineer': {
    title: 'Software Engineer',
    overview: 'A structured path from fundamentals to professional software development, focusing on both technical skills and problem-solving.',
    duration: '12–18 months',
    steps: [
      {
        phase: 'Foundation',
        duration: '0–3 months',
        title: 'Learn Programming Fundamentals',
        description: 'Start with Python or JavaScript. Master variables, loops, functions, and basic data structures. Build 3 small projects.',
        resources: ['CS50 (Harvard, free)', 'The Odin Project', 'freeCodeCamp'],
        milestone: 'Build a command-line calculator and a todo list app',
      },
      {
        phase: 'Core Skills',
        duration: '3–6 months',
        title: 'Data Structures & Algorithms',
        description: 'Study arrays, linked lists, trees, graphs, sorting algorithms, and time complexity. Practice daily on coding platforms.',
        resources: ['LeetCode (Easy/Medium)', 'Cracking the Coding Interview', 'NeetCode.io'],
        milestone: 'Solve 50 LeetCode problems across different categories',
      },
      {
        phase: 'Specialization',
        duration: '6–10 months',
        title: 'Web Development or Backend Systems',
        description: 'Choose a focus: full-stack web (React + Node.js) or backend systems (databases, APIs, cloud). Build a substantial project.',
        resources: ['React Docs', 'Node.js docs', 'AWS/GCP free tier'],
        milestone: 'Deploy a full-stack web application with user authentication',
      },
      {
        phase: 'Professional Readiness',
        duration: '10–14 months',
        title: 'Portfolio & Job Preparation',
        description: 'Build 3 portfolio projects, contribute to open source, refine your GitHub profile, and prepare for technical interviews.',
        resources: ['GitHub', 'LinkedIn Learning', 'Pramp (mock interviews)'],
        milestone: 'Land your first internship or junior developer role',
      },
      {
        phase: 'Growth',
        duration: '14–18 months',
        title: 'System Design & Advanced Topics',
        description: 'Learn system design, microservices, CI/CD, Docker, and advanced algorithms. Start networking in the tech community.',
        resources: ['Designing Data-Intensive Applications', 'System Design Primer (GitHub)', 'Dev.to community'],
        milestone: 'Lead a feature end-to-end at work or in a personal project',
      },
    ],
  },
  'UX/UI Designer': {
    title: 'UX/UI Designer',
    overview: 'Build expertise in user-centered design, from research and wireframing to high-fidelity prototyping and design systems.',
    duration: '10–15 months',
    steps: [
      {
        phase: 'Foundation',
        duration: '0–2 months',
        title: 'Design Principles & Tools',
        description: 'Learn color theory, typography, layout, and visual hierarchy. Master Figma — the industry standard design tool.',
        resources: ['Figma tutorials (YouTube)', 'Google UX Design Certificate', 'Refactoring UI (book)'],
        milestone: 'Redesign 3 existing apps/websites as design exercises',
      },
      {
        phase: 'UX Research',
        duration: '2–5 months',
        title: 'User Research & Personas',
        description: 'Learn to conduct user interviews, create personas, write user stories, and build empathy maps. Practice with real users.',
        resources: ['Nielsen Norman Group articles', 'Just Enough Research (book)', 'Maze (usability testing)'],
        milestone: 'Conduct user research for a self-initiated project with 5 participants',
      },
      {
        phase: 'Design Execution',
        duration: '5–9 months',
        title: 'Wireframing, Prototyping & Design Systems',
        description: 'Create wireframes, interactive prototypes, and a reusable component library. Learn accessibility standards.',
        resources: ['Figma Component libraries', 'Material Design', 'Apple HIG', 'WCAG guidelines'],
        milestone: 'Design a complete mobile app from research to hi-fi prototype',
      },
      {
        phase: 'Portfolio',
        duration: '9–13 months',
        title: 'Portfolio & Case Studies',
        description: 'Document your design process in 3 detailed case studies. Build a portfolio website. Prepare for design critiques.',
        resources: ['Behance', 'Dribbble', 'Notion for case studies', 'Read.cv'],
        milestone: 'Publish a portfolio with 3 complete case studies and get feedback',
      },
      {
        phase: 'Career',
        duration: '13–15 months',
        title: 'Industry Networking & First Role',
        description: 'Attend design meetups, participate in design challenges, apply for junior roles and internships.',
        resources: ['ADPList (mentorship)', 'Designership job board', 'Ladies that UX', 'Local Figma community'],
        milestone: 'Secure a junior UX/UI designer position or internship',
      },
    ],
  },
  'Product Manager': {
    title: 'Product Manager',
    overview: 'Develop the strategic thinking, technical literacy, and leadership skills to guide products from ideation to launch.',
    duration: '12–18 months',
    steps: [
      {
        phase: 'Foundation',
        duration: '0–3 months',
        title: 'PM Fundamentals',
        description: 'Study product management frameworks: Agile, Scrum, OKRs, and product discovery. Read the foundational PM books.',
        resources: ['Inspired by Marty Cagan', 'The Lean Startup', 'ProductPlan Blog', 'Lenny\'s Newsletter'],
        milestone: 'Write a product requirements document (PRD) for an app you want to build',
      },
      {
        phase: 'Technical Literacy',
        duration: '3–6 months',
        title: 'Data & Technical Skills',
        description: 'Learn SQL for data analysis, understand APIs, and get comfortable with A/B testing and analytics tools.',
        resources: ['Mode SQL Tutorial', 'Google Analytics Academy', 'Amplitude for PMs'],
        milestone: 'Analyze a real dataset and present actionable insights',
      },
      {
        phase: 'Practice',
        duration: '6–10 months',
        title: 'Build & Ship Something',
        description: 'Launch a side project, contribute to a startup, or join a product fellowship. Practice the full product lifecycle.',
        resources: ['Product HQ Fellowship', 'Reforge programs', 'Product School free resources'],
        milestone: 'Ship a product (even small) with real users and measure its impact',
      },
      {
        phase: 'Leadership',
        duration: '10–15 months',
        title: 'Stakeholder Management & Roadmapping',
        description: 'Practice prioritization frameworks (RICE, ICE), build roadmaps, and learn to influence without authority.',
        resources: ['RICE scoring model', 'ProductBoard', 'Intercom on Product Management'],
        milestone: 'Present a product roadmap to a panel and defend your prioritization decisions',
      },
      {
        phase: 'Career',
        duration: '15–18 months',
        title: 'PM Interviews & First Role',
        description: 'Practice PM interview formats: product sense, analytical, behavioral. Build your PM brand on LinkedIn.',
        resources: ['Decode & Conquer (book)', 'Exponent PM Interview Prep', 'LinkedIn PM jobs'],
        milestone: 'Land an Associate PM or APM role at a tech company',
      },
    ],
  },
  'Data Scientist': {
    title: 'Data Scientist',
    overview: 'Build expertise in statistics, machine learning, and data storytelling to extract actionable insights from complex data.',
    duration: '14–20 months',
    steps: [
      {
        phase: 'Foundation',
        duration: '0–3 months',
        title: 'Math & Programming Fundamentals',
        description: 'Strengthen statistics, linear algebra, and calculus fundamentals. Learn Python (NumPy, Pandas) for data manipulation.',
        resources: ['Khan Academy (Statistics)', '3Blue1Brown (Linear Algebra)', 'Python for Data Analysis (Wes McKinney)'],
        milestone: 'Analyze a Kaggle dataset and produce a clean exploratory analysis',
      },
      {
        phase: 'Core ML',
        duration: '3–8 months',
        title: 'Machine Learning Algorithms',
        description: 'Study supervised learning (regression, classification), unsupervised learning (clustering), and model evaluation.',
        resources: ['Scikit-learn docs', 'Hands-On ML with Scikit-Learn & TensorFlow', 'fast.ai practical ML'],
        milestone: 'Build and deploy a predictive model that solves a real problem',
      },
      {
        phase: 'Deep Learning',
        duration: '8–13 months',
        title: 'Neural Networks & Specialization',
        description: 'Learn deep learning fundamentals with PyTorch or TensorFlow. Pick a specialization: NLP, computer vision, or tabular data.',
        resources: ['Deep Learning Specialization (Coursera)', 'PyTorch docs', 'Papers With Code'],
        milestone: 'Fine-tune a pre-trained model and build an end-to-end ML pipeline',
      },
      {
        phase: 'Applied Skills',
        duration: '13–17 months',
        title: 'Data Engineering & MLOps',
        description: 'Learn SQL, data pipelines, feature stores, model serving, and monitoring. Understand the full ML lifecycle.',
        resources: ['dbt docs', 'MLflow', 'Evidently AI', 'DataTalks.Club courses'],
        milestone: 'Deploy a model to production with monitoring and retraining pipelines',
      },
      {
        phase: 'Career',
        duration: '17–20 months',
        title: 'Portfolio & Job Search',
        description: 'Publish 3 end-to-end projects on GitHub/Kaggle, write about your work, and target data science roles.',
        resources: ['Kaggle competitions', 'Towards Data Science blog', 'KDnuggets job board'],
        milestone: 'Win a Kaggle medal or publish a data science project that gets community recognition',
      },
    ],
  },
  'Graphic Designer': {
    title: 'Graphic Designer',
    overview: 'Develop visual communication skills from typography and branding to print and digital design for professional clients.',
    duration: '10–14 months',
    steps: [
      { phase: 'Foundation', duration: '0–2 months', title: 'Visual Design Principles', description: 'Master typography, color theory, grid systems, and composition. Study design history and movements for context.', resources: ['Canva Design School', 'Logo Design Love (book)', 'Type Directors Club'], milestone: 'Create 10 typography exercises and 5 color palette studies' },
      { phase: 'Tools', duration: '2–5 months', title: 'Adobe Suite Mastery', description: 'Get proficient in Illustrator, Photoshop, and InDesign. These are industry standards for graphic design work.', resources: ['Adobe tutorials', 'Skillshare Illustrator courses', 'YouTube (Dansky channel)'], milestone: 'Create a complete brand identity (logo, colors, typography, mockups)' },
      { phase: 'Specialization', duration: '5–9 months', title: 'Branding & Print Design', description: 'Learn brand identity systems, packaging design, editorial layout, and print production specifications.', resources: ['Brand New blog', 'Packaging Digest', 'Pantone color guides'], milestone: 'Design a complete brand package for a fictional or real small business' },
      { phase: 'Digital', duration: '9–12 months', title: 'Digital & Motion Design', description: 'Expand into social media design, digital ads, email templates, and basic motion graphics with After Effects.', resources: ['Motion Design School', 'Envato tutorials', 'Dribbble for inspiration'], milestone: 'Create an animated logo reveal and social media template pack' },
      { phase: 'Career', duration: '12–14 months', title: 'Portfolio & Freelancing', description: 'Build a curated portfolio with 8–10 strong projects. Set up a freelance profile and start pitching to small businesses.', resources: ['Behance portfolio', 'Upwork', 'Contra (freelance platform)', 'AIGA career resources'], milestone: 'Land your first paying design client or graphic design position' },
    ],
  },
}

const getMockRoadmap = (careerTitle) => {
  const exact = mockRoadmaps[careerTitle]
  if (exact) return exact

  // Fuzzy match
  const key = Object.keys(mockRoadmaps).find((k) =>
    k.toLowerCase().includes(careerTitle.toLowerCase()) ||
    careerTitle.toLowerCase().includes(k.toLowerCase())
  )
  if (key) return mockRoadmaps[key]

  // Generic fallback
  return {
    title: careerTitle,
    overview: `A comprehensive path to becoming a successful ${careerTitle}, covering foundational skills, specialization, and career preparation.`,
    duration: '12–18 months',
    steps: [
      { phase: 'Foundation', duration: '0–3 months', title: 'Learn the Fundamentals', description: `Start with the core knowledge needed for ${careerTitle}. Focus on foundational concepts, theory, and practical basics.`, resources: ['Online courses (Coursera, Udemy)', 'YouTube tutorials', 'Industry blogs'], milestone: 'Complete a foundational certification or course' },
      { phase: 'Skill Building', duration: '3–7 months', title: 'Develop Core Competencies', description: `Build the key technical and soft skills required for ${careerTitle}. Practice with real projects.`, resources: ['Hands-on projects', 'Mentorship programs', 'Professional communities'], milestone: 'Complete 2–3 portfolio projects demonstrating your skills' },
      { phase: 'Specialization', duration: '7–11 months', title: 'Choose Your Niche', description: `Identify the sub-field within ${careerTitle} that excites you most and dive deep into it.`, resources: ['Advanced courses', 'Industry conferences', 'Subject matter experts'], milestone: 'Develop expertise in a specific area and document it publicly' },
      { phase: 'Networking', duration: '11–14 months', title: 'Build Your Professional Network', description: 'Connect with professionals in the field, attend events, and grow your online presence.', resources: ['LinkedIn', 'Industry meetups', 'Twitter/X communities'], milestone: 'Build a network of 50+ relevant professionals' },
      { phase: 'Career Launch', duration: '14–18 months', title: 'Land Your First Role', description: 'Apply your skills, portfolio, and network to secure your first professional position or client.', resources: ['Job boards', 'Career coaches', 'Alumni networks'], milestone: 'Secure your first job or freelance project in the field' },
    ],
  }
}

// ─── OpenAI Integration ───────────────────────────────────────────────────────

export const generateRoadmap = async (careerTitle, userCategory) => {
  if (!OPENAI_API_KEY) {
    // Simulate loading delay
    await new Promise((r) => setTimeout(r, 1200))
    return getMockRoadmap(careerTitle)
  }

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: `You are a career guidance expert helping students plan their career paths. 
Return ONLY valid JSON. No markdown, no code blocks, no extra text.`,
          },
          {
            role: 'user',
            content: `Create a detailed career roadmap for a student wanting to become a ${careerTitle} with a ${userCategory} background.
Return JSON with this exact structure:
{
  "title": "${careerTitle}",
  "overview": "2-3 sentence overview",
  "duration": "X–Y months",
  "steps": [
    {
      "phase": "Phase name",
      "duration": "X–Y months",
      "title": "Step title",
      "description": "2-3 sentence description",
      "resources": ["Resource 1", "Resource 2", "Resource 3"],
      "milestone": "Concrete milestone to achieve"
    }
  ]
}
Include exactly 5 steps.`,
          },
        ],
        temperature: 0.7,
        max_tokens: 1500,
      }),
    })

    if (!response.ok) throw new Error('OpenAI API error')

    const data = await response.json()
    const content = data.choices[0].message.content
    return JSON.parse(content)
  } catch {
    return getMockRoadmap(careerTitle)
  }
}

// ─── Career Suggestions ───────────────────────────────────────────────────────

const careerSuggestions = {
  Tech: [
    { title: 'Software Engineer', description: 'Design and build software systems, applications, and digital tools that solve real-world problems. One of the highest-demand careers in any industry.', icon: '💻', matchScore: 95, tags: ['High Demand', 'Remote-friendly', 'Strong Salary'] },
    { title: 'Data Scientist', description: 'Analyze complex datasets to extract insights, build predictive models, and guide data-driven decision making at scale.', icon: '📊', matchScore: 88, tags: ['Growing Field', 'Math-heavy', 'Impactful'] },
    { title: 'DevOps Engineer', description: 'Bridge development and operations by building automated pipelines, managing cloud infrastructure, and ensuring system reliability.', icon: '⚙️', matchScore: 82, tags: ['Infrastructure', 'Automation', 'Cloud'] },
  ],
  Design: [
    { title: 'UX/UI Designer', description: 'Research user needs and craft intuitive, beautiful digital experiences that delight users and meet business goals.', icon: '🎨', matchScore: 95, tags: ['Creative', 'User-centered', 'High Impact'] },
    { title: 'Graphic Designer', description: 'Communicate ideas visually through branding, print, digital media, and motion graphics for clients across all industries.', icon: '✏️', matchScore: 90, tags: ['Creative', 'Freelance-friendly', 'Versatile'] },
    { title: 'Product Designer', description: 'Own the end-to-end design of digital products — from strategy and research through prototyping and implementation.', icon: '🖌️', matchScore: 85, tags: ['Strategic', 'Hybrid Role', 'Leadership'] },
  ],
  Management: [
    { title: 'Product Manager', description: 'Define product vision, prioritize features, and coordinate teams to build software products users love.', icon: '🗺️', matchScore: 95, tags: ['Leadership', 'Strategic', 'High Impact'] },
    { title: 'Project Manager', description: 'Plan, execute, and deliver complex projects on time and within budget, coordinating people and resources effectively.', icon: '📋', matchScore: 88, tags: ['Organized', 'Leadership', 'Cross-functional'] },
    { title: 'Business Analyst', description: 'Bridge business stakeholders and technical teams, translating requirements into actionable solutions and process improvements.', icon: '📈', matchScore: 82, tags: ['Analytical', 'Communication', 'Versatile'] },
  ],
  Research: [
    { title: 'UX Researcher', description: 'Conduct qualitative and quantitative studies to understand user behavior, needs, and pain points to inform product decisions.', icon: '🔬', matchScore: 95, tags: ['Empathetic', 'Evidence-based', 'Collaborative'] },
    { title: 'Data Analyst', description: 'Transform raw data into clear insights, dashboards, and reports that help organizations make better decisions.', icon: '🧮', matchScore: 90, tags: ['SQL', 'Visualization', 'Business Impact'] },
    { title: 'Research Scientist', description: 'Advance knowledge through rigorous experimental design, data collection, and publication in academic or industry settings.', icon: '🧪', matchScore: 85, tags: ['Academic', 'Specialized', 'Long-term'] },
  ],
}

export const getCareerSuggestions = (category) => {
  return careerSuggestions[category] || careerSuggestions['Tech']
}