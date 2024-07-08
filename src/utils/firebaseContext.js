import { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "./firebase";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from "firebase/auth";
import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { toast } from "react-toastify";

const FirebaseContext = createContext(null);

export const useFirebase = () => useContext(FirebaseContext);

async function signUp(email, password, username, image) {
  //* VALIDATE USERNAME
  const userRef = collection(db, "users");
  const q = query(userRef, where("username", "==", username));
  const userSnapshot = await getDocs(q);

  if (!userSnapshot.empty) return toast.warn("Select another username.");

  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    toast.success("Account is created successfully!");

    const { email: userEmail, uid } = userCredential.user; // Destructure user object
    await setDoc(doc(db, "users", uid), {
      id: uid,
      email: userEmail,
      username,
      avatar: image,
      blocked: [],
    });
    await setDoc(doc(db, "userchats", uid), {
      chats: [],
    });
  } catch (err) {
    toast.error("This email is already in use.");
  }
}

async function signIn(email, password) {
  try {
    await signInWithEmailAndPassword(auth, email, password);
    console.log("Login successfully");
  } catch (err) {
    console.log(err.message);
  }
}

export const FirebaseProvider = (props) => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      setUser(user);
    });

    return () => unsub();
  }, []);
  return (
    <FirebaseContext.Provider value={{ signUp, signIn, user }}>
      {props.children}
    </FirebaseContext.Provider>
  );
};
