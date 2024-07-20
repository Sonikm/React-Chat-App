import { signInWithPopup } from 'firebase/auth';
import { GoogleAuthProvider } from 'firebase/auth/web-extension';
import React from 'react'
import { auth } from '../../utils/firebase';
import { toast } from 'react-toastify';

function SignInWithGoogle() {
    async function loginWithGoogle() {
        const provider = new GoogleAuthProvider();
        try {
          await signInWithPopup(auth, provider);
        } catch (error) {
          toast.error("Failed to login with Google. Please try again.");
        }
      }
    
  return (
   <div className='w-full flex flex-col justify-center items-center'>
       <div className=" w-full max-w-[300px]  gap-2 my-8  h-[2px] flex justify-center items-center">
        <span className="border-[1.4px] border-[--SECONDARY-COLOR] w-full"></span>
        <span className="font-semibold">or</span>
        <span className="border-[1.4px] border-[--SECONDARY-COLOR] w-full"></span>
      </div>
      <div
        onClick={loginWithGoogle}
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
  )
}

export default SignInWithGoogle