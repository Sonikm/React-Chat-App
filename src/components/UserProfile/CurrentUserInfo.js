import React from "react";
import avatar from "../../assets/user.jpg";
import Settings from "../ui/Settings";
import Avatar from "../ui/Avatar";

function CurrentUserInfo() {
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
       <Avatar size={20} avatar={avatar}/>
        <div className="text-base">Soni Kumari</div>
      </div>

      <div className="text-sm text-gray-300">
        <div className="">
          <p className="text-gray-500 ">E-mail</p>
          <p>sonikm443@gmail.com</p>
        </div>
        <div className="py-3">
          <p className="text-gray-500">Status</p>
          <p>Frontend Develoer</p>
        </div>
      </div>
      <div className="w-full h-[1px] bg-gray-700"></div>
      <Settings />
      <div className="flex-1 flex justify-end flex-col">
        <button className="bg-dark-green rounded-lg p-2 hover:bg-[#03845b] text-white">
          Logout
        </button>
      </div>
    </div>
  );
}

export default CurrentUserInfo;
