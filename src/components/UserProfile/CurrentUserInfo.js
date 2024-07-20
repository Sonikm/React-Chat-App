import React from "react";
import avatar from "../../assets/user.jpg";
import Settings from "../ui/Settings";
import Avatar from "../ui/Avatar";
import useUserStore from "../../utils/userStore";
import { signOut } from "firebase/auth";
import { auth } from "../../utils/firebase";
import useChatStore from "../../utils/chatStore";

function CurrentUserInfo() {
  const { currentUser } = useUserStore();
  const { resetChat } = useChatStore();

  function handleLogout() {
    signOut(auth);
    resetChat();
  }

  return (
    <div className="flex mb-4 gap-4 h-full text-white flex-col">
      <div className="flex  gap-4 justify-start items-center">
        <div className="flex relative">
          <div className="w-10 h-5 bg-[#33D299] rounded-xl"></div>
          <div className="w-7 h-7 bg-dark-green rounded-full absolute -right-1 bottom-0"></div>
        </div>
        <div className="font-medium text-xl tracking-wider">Letschat</div>
      </div>

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
