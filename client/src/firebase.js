// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "greatness-blog.firebaseapp.com",
  projectId: "greatness-blog",
  storageBucket: "greatness-blog.firebasestorage.app",
  messagingSenderId: "765354757850",
  appId: "1:765354757850:web:de4346a0dc1a6728475fe3",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
