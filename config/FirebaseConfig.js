// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import  { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
  authDomain: "price-tracker-256e5.firebaseapp.com",
  projectId: "price-tracker-256e5",
  storageBucket: "price-tracker-256e5.appspot.com",
  messagingSenderId: "1073872861545",
  appId: "1:1073872861545:web:56a5eee9681a89edf4a5f8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db=getFirestore(app);