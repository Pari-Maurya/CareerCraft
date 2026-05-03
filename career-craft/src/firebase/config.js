// src/firebase/config.js
// Replace these values with your actual Firebase project configuration
// You can get these from Firebase Console → Project Settings → Your apps

import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getDatabase } from 'firebase/database'
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyAk1SEpujakJJT0uJACzCfX2LsLH2Pi1AA",
  authDomain: "careercraft-7c7e6.firebaseapp.com",
  databaseURL: "https://careercraft-7c7e6-default-rtdb.firebaseio.com",
  projectId: "careercraft-7c7e6",
  storageBucket: "careercraft-7c7e6.firebasestorage.app",
  messagingSenderId: "745815587862",
  appId: "1:745815587862:web:0adfded0a33d2e48378937",
  measurementId: "G-2XKMZMN27N"
}

const app = initializeApp(firebaseConfig)
const analytics = getAnalytics(app);
export const auth = getAuth(app)
export const db = getDatabase(app)
export default app