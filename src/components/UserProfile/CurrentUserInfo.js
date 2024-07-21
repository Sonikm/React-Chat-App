import React from "react";
import Settings from "../ui/Settings";
import useUserStore from "../../utils/userStore";
import { signOut } from "firebase/auth";
import { auth } from "../../utils/firebase";
import useChatStore from "../../utils/chatStore";
import Logo from "../ui/Logo";

function CurrentUserInfo() {
  const { currentUser } = useUserStore();
  const { resetChat } = useChatStore();

  function handleLogout() {
    signOut(auth);
    resetChat();
  }

  return (
    <div className="flex transition-all  mb-4 gap-4 h-full text-white flex-col">
      <Logo />

      <div className="flex flex-col justify-center items-center my-4 gap-4">
        <img
          className={`h-20 w-20 object-cover rounded-full`}
          src={currentUser?.avatar}
          alt=""
        />
        <div className="text-base">{currentUser?.username}</div>
      </div>

      <div className="text-sm text-gray-300">
        <div className="">
          <p className="text-gray-500 ">E-mail</p>
          <p>{currentUser?.email}</p>
        </div>
        <div className="pt-3">
          <p className="text-gray-500">Status</p>
          <p>Lorem ipsum dolor sit amet.</p>
        </div>
      </div>
      <Settings />
      <div className="flex-1 flex justify-end flex-col">
        <button
          onClick={handleLogout}
          className="bg-dark-green rounded-lg p-2 hover:bg-[#03845b] text-white"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default CurrentUserInfo;
