import { signInWithPopup } from "firebase/auth";
import React from "react";
import { auth, provider } from "../../utils/firebase";
import { toast } from "react-toastify";

function SignInWithGoogle() {
  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log("User Info:", user);
    } catch (error) {
      console.error("Error during sign-in:", error);
    }
  };

  return (
    <div className="w-full flex flex-col justify-center items-center">
      <div className=" w-full max-w-[300px]  gap-2 my-8  h-[2px] flex justify-center items-center">
        <span className="border-[1.4px] border-[--SECONDARY-COLOR] w-full"></span>
        <span className="font-semibold">or</span>
        <span className="border-[1.4px] border-[--SECONDARY-COLOR] w-full"></span>
      </div>
      <div
        onClick={handleGoogleSignIn}
        className="flex font-semibold cursor-pointer items-center justify-center gap-2 bg-[#0596682c] p-3  max-w-[300px] w-full rounded-lg"
      >
        Sign In with
        <img
          className="w-5"
          src="https://cdn.iconscout.com/icon/free/png-512/free-google-160-189824.png?f=webp&w=512"
          alt=""
        />
      </div>
    </div>
  );
}

export default SignInWithGoogle;
