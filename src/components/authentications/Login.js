import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { auth } from "../../utils/firebase";
import { toast } from "react-toastify";
import Logo from "../ui/Logo";
import chatPeople from "../../assets/chat-img.jpg";

function Login() {
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
                className="bg-primary hover:bg-dark-green outline-none border-none w-full p-3 px-4 text-white font-semibold flex-1 rounded-md "
                disabled={isLoading}
              >
                {isLoading ? "Loading" : "Sign In"}
              </button>
            </form>
          </div>
          <div className=" w-full max-w-[300px]  gap-2 my-8  h-[2px] flex justify-center items-center">
            <span className="border-[1.4px] border-[--SECONDARY-COLOR] w-full"></span>
            <span className="font-semibold">or</span>
            <span className="border-[1.4px] border-[--SECONDARY-COLOR] w-full"></span>
          </div>
          <div className="flex font-semibold cursor-pointer items-center justify-center gap-2 bg-[#0596682c] p-3  max-w-[300px] w-full rounded-lg">
            Sign In with
            <img
              className="w-5"
              src="https://cdn.iconscout.com/icon/free/png-512/free-google-160-189824.png?f=webp&w=512"
              alt=""
            />
          </div>
          <div className="">
            Don't have an account?{" "}
            <span className="underline ml-1 font-semibold cursor-pointer">
              Sign Up here
            </span>
          </div>
        </div>
  );
}

export default Login;
