// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: 'rental-car-9b37c.firebaseapp.com',
  projectId: 'rental-car-9b37c',
  storageBucket: 'rental-car-9b37c.appspot.com',
  messagingSenderId: '1057618004822',
  appId: '1:1057618004822:web:a738fb4c7bc19239f7a4f7'
}

// Initialize Firebase
export const app = initializeApp(firebaseConfig)
