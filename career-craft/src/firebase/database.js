// src/firebase/database.js
import { ref, set, get, update, push, remove, onValue, off } from 'firebase/database'
import { db } from './config'

// ─── User Profile ────────────────────────────────────────────────────────────

export const createUserProfile = async (uid, data) => {
  await set(ref(db, `users/${uid}`), data)
}

export const getUserProfile = async (uid) => {
  const snapshot = await get(ref(db, `users/${uid}`))
  return snapshot.exists() ? snapshot.val() : null
}

export const updateUserProfile = async (uid, data) => {
  await update(ref(db, `users/${uid}`), data)
}

export const markUserNotNew = async (uid) => {
  await update(ref(db, `users/${uid}`), { isNewUser: false })
}

// ─── Quiz Results ─────────────────────────────────────────────────────────────

export const saveQuizResult = async (uid, result) => {
  await set(ref(db, `quizResults/${uid}`), {
    ...result,
    completedAt: Date.now(),
  })
  // Mark user as not new after completing quiz
  await markUserNotNew(uid)
}

export const getQuizResult = async (uid) => {
  const snapshot = await get(ref(db, `quizResults/${uid}`))
  return snapshot.exists() ? snapshot.val() : null
}

// ─── Saved Roadmaps ───────────────────────────────────────────────────────────

export const saveRoadmap = async (uid, roadmap) => {
  const roadmapsRef = ref(db, `roadmaps/${uid}`)
  const newRef = push(roadmapsRef)
  await set(newRef, {
    ...roadmap,
    id: newRef.key,
    savedAt: Date.now(),
  })
  return newRef.key
}

export const getRoadmaps = async (uid) => {
  const snapshot = await get(ref(db, `roadmaps/${uid}`))
  if (!snapshot.exists()) return []
  const data = snapshot.val()
  return Object.values(data).sort((a, b) => b.savedAt - a.savedAt)
}

export const deleteRoadmap = async (uid, roadmapId) => {
  await remove(ref(db, `roadmaps/${uid}/${roadmapId}`))
}

// ─── Skill Progress ───────────────────────────────────────────────────────────

export const saveSkillProgress = async (uid, goalId, progress) => {
  await set(ref(db, `skills/${uid}/${goalId}`), {
    ...progress,
    updatedAt: Date.now(),
  })
}

export const getSkillProgress = async (uid) => {
  const snapshot = await get(ref(db, `skills/${uid}`))
  return snapshot.exists() ? snapshot.val() : {}
}

export const updateSkillItem = async (uid, goalId, skillId, completed) => {
  await update(ref(db, `skills/${uid}/${goalId}/items/${skillId}`), { completed })
  await update(ref(db, `skills/${uid}/${goalId}`), { updatedAt: Date.now() })
}

// ─── Realtime Listener ────────────────────────────────────────────────────────

export const subscribeToSkills = (uid, callback) => {
  const skillsRef = ref(db, `skills/${uid}`)
  onValue(skillsRef, (snapshot) => {
    callback(snapshot.exists() ? snapshot.val() : {})
  })
  return () => off(skillsRef)
}