import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyD4xvhz4okXsea3PhJKHdUjrApUmIjobC4',
  authDomain: "live-chat-d77f5.firebaseapp.com",
  projectId: "live-chat-d77f5",
  storageBucket: "live-chat-d77f5.appspot.com",
  messagingSenderId: "413959372577",
  appId: "1:413959372577:web:5361f185df1caba0040860"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore();
export const storage = getStorage();
export const provider = new GoogleAuthProvider();
