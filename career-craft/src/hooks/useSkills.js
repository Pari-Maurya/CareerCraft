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

  const initGoal = useCallback(async (goalId, skillsList = []) => {
    if (!uid) return
    const goal = skillGoals.find((g) => g.id === goalId)
    const skillsToUse = goal ? goal.skills : skillsList

    const items = {}
    skillsToUse.forEach((skill) => {
      items[skill.id] = { completed: false, name: skill.name }
    })

    await saveSkillProgress(uid, goalId, {
      goalId,
      goalName: goal ? goal.name : goalId,
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
    const goalData = skillProgress[goalId]
    if (!goalData?.items) return { completed: 0, total: 0, percentage: 0 }

    const itemsArray = Object.values(goalData.items)
    const total = itemsArray.length
    if (total === 0) return { completed: 0, total: 0, percentage: 0 }

    const completed = itemsArray.filter((item) => item.completed).length
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