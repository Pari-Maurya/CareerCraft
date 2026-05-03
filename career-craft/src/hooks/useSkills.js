// src/hooks/useSkills.js
import { useState, useEffect, useCallback } from 'react'
import { subscribeToSkills, saveSkillProgress, updateSkillItem } from '../firebase/database'
import { skillGoals } from '../utils/skillsData'

export const useSkills = (uid) => {
  const [skillProgress, setSkillProgress] = useState({})
  const [selectedGoal, setSelectedGoal] = useState(skillGoals[0].id)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (!uid) return
    const unsubscribe = subscribeToSkills(uid, (data) => {
      setSkillProgress(data)
    })
    return unsubscribe
  }, [uid])

  const initGoal = useCallback(async (goalId) => {
    if (!uid) return
    const goal = skillGoals.find((g) => g.id === goalId)
    if (!goal) return

    const items = {}
    goal.skills.forEach((skill) => {
      items[skill.id] = { completed: false, name: skill.name }
    })

    await saveSkillProgress(uid, goalId, {
      goalId,
      goalName: goal.name,
      items,
    })
  }, [uid])

  const toggleSkill = useCallback(async (goalId, skillId) => {
    if (!uid) return
    setSaving(true)
    const currentGoalProgress = skillProgress[goalId]

    if (!currentGoalProgress) {
      await initGoal(goalId)
      setSaving(false)
      return
    }

    const currentCompleted = currentGoalProgress?.items?.[skillId]?.completed ?? false
    await updateSkillItem(uid, goalId, skillId, !currentCompleted)
    setSaving(false)
  }, [uid, skillProgress, initGoal])

  const getGoalProgress = useCallback((goalId) => {
    const goal = skillGoals.find((g) => g.id === goalId)
    if (!goal) return { completed: 0, total: 0, percentage: 0 }

    const goalData = skillProgress[goalId]
    if (!goalData?.items) return { completed: 0, total: goal.skills.length, percentage: 0 }

    const total = goal.skills.length
    const completed = goal.skills.filter((s) => goalData.items[s.id]?.completed).length
    const percentage = Math.round((completed / total) * 100)

    return { completed, total, percentage }
  }, [skillProgress])

  const isSkillCompleted = useCallback((goalId, skillId) => {
    return skillProgress[goalId]?.items?.[skillId]?.completed ?? false
  }, [skillProgress])

  return {
    skillProgress,
    selectedGoal,
    setSelectedGoal,
    saving,
    toggleSkill,
    getGoalProgress,
    isSkillCompleted,
    initGoal,
  }
}