import "./login.css";
import defaultAvatar from "../../assets/avatar.png";
import { useFirebase } from "../../utils/firebaseContext";
import { useState } from "react";
import { toast } from "react-toastify";
import uplaodImage from "../../utils/uploadImage";
import { collection } from "firebase/firestore";
import { db } from "../../utils/firebase";

function Login() {
  const { signUp, signIn } = useFirebase();
  const [isLoading, setIsLoading] = useState(false);
  const [avatar, setAvatar] = useState({
    file: null,
    url: "",
  });

  function handleAvatar(e) {
    if (e.target.files[0]) {
      setAvatar({
        file: e.target.files[0],
        url: URL.createObjectURL(e.target.files[0]),
      });
    }
  }

  async function handleSignupUser(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const { email, username, password } = Object.fromEntries(formData);

    //* VALIDATE INPUTS
    if (!email || !username || !password)
      return toast.warn("Please enter inputs");

    if (!avatar.file) return toast.warn("Please upload avatar");

    setIsLoading(true);

    try {
      const image = await uplaodImage(avatar.file);
      await signUp(email, password, username, image);
    } catch (err) {
      console.log(err.message);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleLoginUser(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const { email, password } = Object.fromEntries(formData);
    try {
      await signIn(email, password);
    } catch (err) {
     return toast.error(err.message);
    }
  }

  return (
    <div className="login ">
      <div className="item">
        <h2>Welcome back</h2>
        <form onSubmit={handleLoginUser}>
          <input type="email" placeholder="Email" name="email" />
          <input type="password" placeholder="Password" name="password" />
          <button className="bg-primary">Sign In</button>
        </form>
      </div>
      <div className="separator border-r-2 "></div>
      <div className="item">
        <h2>Create an Account</h2>
        <form onSubmit={handleSignupUser}>
          <label htmlFor="file">
            <img src={avatar.url || defaultAvatar} alt="" />
            Uplaod an image
          </label>
          <input
            onChange={handleAvatar}
            style={{ display: "none" }}
            type="file"
            id="file"
            placeholder="File"
            name="file"
          />
          <input type="text" placeholder="Username" name="username" />
          <input type="email" placeholder="Email" name="email" />
          <input type="password" placeholder="Password" name="password" />
          <button
            className={` ${
              isLoading
                ? "bg-green-700 cursor-none "
                : "bg-primary cursor-pointer"
            }`}
          >
            {isLoading ? "Loading..." : "Sign Up"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
