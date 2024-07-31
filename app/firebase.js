// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "",
  authDomain: "expense-tracker-d400f.firebaseapp.com",
  projectId: "expense-tracker-d400f",
  storageBucket: "expense-tracker-d400f.appspot.com",
  messagingSenderId: "479042434134",
  appId: "1:479042434134:web:7d5330d12db7f2fb98b7f7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);