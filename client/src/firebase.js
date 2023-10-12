// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-real-estate-d9d0b.firebaseapp.com",
  projectId: "mern-real-estate-d9d0b",
  storageBucket: "mern-real-estate-d9d0b.appspot.com",
  messagingSenderId: "668787097698",
  appId: "1:668787097698:web:d22a71a653ed91a16d113b"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
