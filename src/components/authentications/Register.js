import { useState } from "react";
import { toast } from "react-toastify";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../utils/firebase";
import image from "../../assets/avatar.png";
import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import upload from "../../utils/upload";

function Register({ setRegister }) {
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
    const q = query(userRef, where("username", "==", username));

    const userSnapshot = await getDocs(q);
    if (!userSnapshot.empty)
      return toast.warn("This username is already exist!");

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

      toast.success("Account created successfully!");
    } catch (err) {
      toast.error(err.message);
      console.log(err.message);
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <div className="flex flex-col   w-full  justify-center items-center h-full gap-3">
      <div className="flex flex-col max-w-[300px]  justify-start items-center mx-10 gap-4 w-full ">
        <h2 className="text-3xl font-medium mb-2 whitespace-nowrap">
          Create an Account
        </h2>
        <form
          className="flex flex-col  gap-4 justify-start items-start w-full "
          onSubmit={handleRegister}
        >
          <label
            htmlFor="file"
            className="flex font-medium justify-center underline items-center gap-4 cursor-pointer"
          >
            <img
              className="w-10 h-10 opacity-65 rounded-lg"
              src={avatar.url || image}
              alt=""
            />
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
          <input
            className="outline-none border-2 border-dark-green rounded-lg p-2 w-full"
            type="text"
            placeholder="Username"
            name="username"
          />
          <input
            className="outline-none border-2 border-dark-green rounded-lg p-2 w-full"
            type="email"
            placeholder="Email"
            name="email"
          />
          <input
            className="outline-none border-2 border-dark-green rounded-lg p-2 w-full"
            type="password"
            placeholder="Password"
            name="password"
          />
          <button
            className={`${
              isLoading ? "cursor-not-allowed" : "cursor-pointer"
            } bg-primary hover:bg-dark-green outline-none border-none w-full p-3 px-4 text-white font-semibold flex-1 rounded-md`}
            disabled={isLoading}
          >
            {isLoading ? "Loading" : "Sign Up"}
          </button>
        </form>
      </div>

      <div className="">
        Already have an account?{" "}
        <span
          onClick={() => setRegister(false)}
          className="underline ml-1 font-semibold cursor-pointer"
        >
          Sign In here
        </span>
      </div>
    </div>
  );
}

export default Register;
