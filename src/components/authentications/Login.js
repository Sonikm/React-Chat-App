import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { auth } from "../../utils/firebase";
import { toast } from "react-toastify";
import SignInWithGoogle from "../ui/SignInWithGoogle";

function Login({ setRegister }) {
  const [isLoading, setIsLoading] = useState(false);

  async function handleLogin(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const { email, password } = Object.fromEntries(formData);
    setIsLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("Login successfully!");
    } catch (err) {
      toast.error(err.message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex flex-col   w-full  justify-center items-center h-full gap-3">
      <div className="flex flex-col max-w-[300px]  justify-center items-center mx-10 gap-4 w-full ">
        <h2 className="text-3xl font-medium">Welcome back</h2>
        <form
          className="flex flex-col  gap-4 justify-start items-start w-full "
          onSubmit={handleLogin}
        >
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
          >
            {isLoading ? "Loading" : "Sign In"}
          </button>
        </form>
      </div>

      <SignInWithGoogle />
      <div className="mt-4 text-center">
        Don't have an account?{" "}
        <span
          onClick={() => setRegister(true)}
          className="underline whitespace-nowrap  ml-1 font-semibold cursor-pointer"
        >
          Sign Up here
        </span>
      </div>
    </div>
  );
}

export default Login;
