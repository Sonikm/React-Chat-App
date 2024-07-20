import { useState } from "react";
import "./login.css";
import { toast } from "react-toastify";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth, db } from "../../utils/firebase";
import image from "../../assets/avatar.png";
import { collection, doc, getDocs, query, setDoc, where } from "firebase/firestore";
import upload from "../../utils/upload";

function Login() {
  const [avatar, setAvatar] = useState({
    file: null,
    url: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  function handleAvatar(e) {
    if (e.target.files[0]) {
      setAvatar({
        file: e.target.files[0],
        url: URL.createObjectURL(e.target.files[0]),
      });
    }
  }

  async function handleLogin(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const { email, password } = Object.fromEntries(formData);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("Login successfully!");
    } catch (err) {
      toast.error(err.message);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleRegister(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const { username, email, password } = Object.fromEntries(formData);

    // VALIDATE INPUTS
    if (!username || !email || !password) {
      return toast.warn("Please enter inputs!");
    }
    if (!avatar.file) return toast.warn("Please upload an avatar!");

    // VALIDATE UNIQUE USERNAME
    const userRef = collection(db, "users");
    const q = query(userRef, where("username", "==", username))

    const userSnapshot = await getDocs(q);
   if(!userSnapshot.empty) return toast.warn("This username is already exist! Please create another username...");

    try {
      setIsLoading(true);
      const imgUrl = await upload(avatar.file);
      const res = await createUserWithEmailAndPassword(auth, email, password);
      await setDoc(doc(db, "users", res.user.uid), {
        username,
        email,
        avatar: imgUrl,
        id: res.user.uid,
        blocked: [],
      });

      await setDoc(doc(db, "userchats", res.user.uid), {
        chats: [],
      });

      toast.success("Account created! You can login now.");
    } catch (err) {
      toast.error(err.message);
      console.log(err.message);
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <div className="login">
      <div className="item">
        <h2>Welcome back</h2>
        <form onSubmit={handleLogin}>
          <input type="email" placeholder="Email" name="email" />
          <input type="password" placeholder="Password" name="password" />
          <button className="bg-primary" disabled={isLoading}>
            {isLoading ? "Loading" : "Sign In"}
          </button>
        </form>
      </div>
      <div className="separator"></div>
      <div className="item">
        <h2>Create an Account</h2>
        <form onSubmit={handleRegister}>
          <label htmlFor="file">
            <img src={avatar.url || image} alt="" />
            Uplaod an image
          </label>
          <input
            style={{ display: "none" }}
            type="file"
            id="file"
            placeholder="File"
            name="file"
            onChange={handleAvatar}
          />
          <input type="text" placeholder="Username" name="username" />
          <input type="email" placeholder="Email" name="email" />
          <input type="password" placeholder="Password" name="password" />
          <button className="bg-primary">
            {isLoading ? "Loading" : "Sign Up"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
