// src/components/skills/SkillTracker.jsx
import { motion, AnimatePresence } from 'framer-motion'
import { useAuth } from '../../hooks/useAuth'
import { useSkills } from '../../hooks/useSkills'
import { skillGoals, getDifficultyColor } from '../../utils/skillsData'

const SkillTracker = () => {
  const { user } = useAuth()
  const {
    selectedGoal,
    setSelectedGoal,
    saving,
    toggleSkill,
    getGoalProgress,
    isSkillCompleted,
    initGoal,
  } = useSkills(user?.uid)

  const currentGoal = skillGoals.find((g) => g.id === selectedGoal)
  const progress = getGoalProgress(selectedGoal)

  const handleGoalChange = async (goalId) => {
    setSelectedGoal(goalId)
    // Initialize goal in Firebase if not yet done
    const { total } = getGoalProgress(goalId)
    if (total === 0) {
      await initGoal(goalId)
    }
  }

  const handleToggle = async (skillId) => {
    await toggleSkill(selectedGoal, skillId)
  }

  return (
    <div className="card p-6">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="font-display font-semibold text-ink-900 text-lg">Skill Tracker</h3>
          <p className="text-sm text-ink-400 mt-0.5">Track your learning progress</p>
        </div>
        {saving && (
          <span className="text-xs text-ink-400 flex items-center gap-1.5">
            <span className="w-3 h-3 border border-ink-300 border-t-ink-600 rounded-full animate-spin" />
            Saving...
          </span>
        )}
      </div>

      {/* Goal Selector */}
      <div className="flex flex-wrap gap-2 mb-6">
        {skillGoals.map((goal) => {
          const p = getGoalProgress(goal.id)
          return (
            <button
              key={goal.id}
              onClick={() => handleGoalChange(goal.id)}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                selectedGoal === goal.id
                  ? 'bg-ember-500 text-white shadow-sm'
                  : 'bg-ink-100 text-ink-600 hover:bg-ink-200'
              }`}
            >
              <span>{goal.icon}</span>
              <span>{goal.name}</span>
              {p.total > 0 && (
                <span className={`ml-1 text-xs px-1.5 py-0.5 rounded-full ${
                  selectedGoal === goal.id ? 'bg-white/20 text-white' : 'bg-ink-200 text-ink-500'
                }`}>
                  {p.percentage}%
                </span>
              )}
            </button>
          )
        })}
      </div>

      {/* Current Goal */}
      {currentGoal && (
        <>
          {/* Progress Bar */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-ink-700">{currentGoal.name} Progress</span>
              <span className="text-sm font-mono text-ink-500">
                {progress.completed}/{progress.total} skills
              </span>
            </div>
            <div className="progress-bar h-3">
              <motion.div
                className="progress-fill h-3"
                animate={{ width: `${progress.percentage}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
            {progress.percentage === 100 && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-2 text-sm text-sage-600 font-medium flex items-center gap-1.5"
              >
                🎉 Goal complete! You've mastered all {progress.total} skills.
              </motion.div>
            )}
          </div>

          {/* Skills List */}
          <div className="flex flex-col gap-2.5">
            <AnimatePresence>
              {currentGoal.skills.map((skill, i) => {
                const completed = isSkillCompleted(selectedGoal, skill.id)
                return (
                  <motion.div
                    key={skill.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.04 }}
                    onClick={() => handleToggle(skill.id)}
                    className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all duration-200 group ${
                      completed
                        ? 'bg-sage-50 border border-sage-200'
                        : 'bg-ink-50 border border-ink-100 hover:border-ink-200 hover:bg-white'
                    }`}
                  >
                    {/* Checkbox */}
                    <div className={`w-5 h-5 rounded-md flex items-center justify-center flex-shrink-0 transition-all duration-200 border-2 ${
                      completed
                        ? 'bg-sage-500 border-sage-500'
                        : 'border-ink-300 group-hover:border-ember-400'
                    }`}>
                      {completed && (
                        <motion.svg
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="w-3 h-3 text-white"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </motion.svg>
                      )}
                    </div>

                    {/* Skill info */}
                    <div className="flex-1 min-w-0">
                      <span className={`text-sm font-medium transition-colors ${
                        completed ? 'text-sage-700 line-through' : 'text-ink-800'
                      }`}>
                        {skill.name}
                      </span>
                    </div>

                    {/* Category & difficulty */}
                    <div className="flex items-center gap-1.5 flex-shrink-0">
                      <span className="text-xs text-ink-400 hidden sm:block">{skill.category}</span>
                      <span className={`badge text-xs ${getDifficultyColor(skill.difficulty)}`}>
                        {skill.difficulty}
                      </span>
                    </div>
                  </motion.div>
                )
              })}
            </AnimatePresence>
          </div>
        </>
      )}
    </div>
  )
}

export default SkillTracker;