import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: "react-chat-app-c6859.firebaseapp.com",
  projectId: "react-chat-app-c6859",
  storageBucket: "react-chat-app-c6859.appspot.com",
  messagingSenderId: "853821387187",
  appId: "1:853821387187:web:569a5c8c6d853c4f171bc6",
  measurementId: "G-0V3Q2SQ15V"
};

// Initialize Firebase
export const firebase = initializeApp(firebaseConfig); 
export const auth = getAuth(firebase);
export const db = getFirestore(firebase);
export const storage = getStorage(firebase);
