import React from "react";
import avatar from "../../assets/user.jpg";
import Settings from "../ui/Settings";
import Avatar from "../ui/Avatar";
import { signOut } from "firebase/auth";
import { auth } from "../../utils/firebase";
import { useFirebase } from "../../utils/firebaseContext";

function CurrentUserInfo() {
  const { currentUser } = useFirebase();

  const { avatar, email, id, username } = currentUser;
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
          src={avatar}
          alt=""
        />
        <div className="text-base">{username}</div>
      </div>

      <div className="text-sm text-gray-300">
        <div className="">
          <p className="text-gray-500 ">E-mail</p>
          <p>{email}</p>
        </div>
        <div className="pt-3">
          <p className="text-gray-500">Status</p>
          <p>Frontend Develoer</p>
        </div>
      </div>
      <Settings />
      <div className="flex-1 flex justify-end flex-col">
        <button
          onClick={() => signOut(auth)}
          className="bg-dark-green rounded-lg p-2 hover:bg-[#03845b] text-white"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default CurrentUserInfo;
