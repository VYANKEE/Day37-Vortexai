// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCw1vicdMtqh-Q1VFcyTK8HVISNyW5rBNU",
  authDomain: "day37-aibot.firebaseapp.com",
  projectId: "day37-aibot",
  storageBucket: "day37-aibot.firebasestorage.app",
  messagingSenderId: "711177178990",
  appId: "1:711177178990:web:0e43aeceebf811d43d3b7f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);