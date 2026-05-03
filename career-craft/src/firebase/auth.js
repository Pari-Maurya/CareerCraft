// src/firebase/auth.js
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
} from 'firebase/auth'
import { auth } from './config'
import { createUserProfile, getUserProfile } from './database'

export const registerUser = async (email, password, displayName) => {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password)
  await updateProfile(userCredential.user, { displayName })
  await createUserProfile(userCredential.user.uid, {
    displayName,
    email,
    createdAt: Date.now(),
    isNewUser: true,
  })
  return userCredential.user
}

export const loginUser = async (email, password) => {
  const userCredential = await signInWithEmailAndPassword(auth, email, password)
  return userCredential.user
}

export const logoutUser = () => signOut(auth)

export const onAuthChange = (callback) => onAuthStateChanged(auth, callback)

export const checkIsNewUser = async (uid) => {
  const profile = await getUserProfile(uid)
  return profile ? profile.isNewUser === true : true
}