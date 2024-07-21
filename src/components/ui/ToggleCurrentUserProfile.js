import React from "react";
import menu from "../../assets/menu.png"
import useChatStore from "../../utils/chatStore";

function ToggleCurrentUserProfile({toggleCurrentUser, onHandleToggleCurrentUserProfile, screenWidth }) {
    const {user} = useChatStore();
  return (
    <div
      onClick={onHandleToggleCurrentUserProfile}
      className={`${
        screenWidth <= 1024 ? "block" : "hidden"
      } ${toggleCurrentUser ? "left-[240px] top-6" : user ? "left-4 top-2" : "left-4 top-8"}  z-[80]  absolute  cursor-pointer`}
    >
      <img className="w-10 h-10" src={menu} alt=""/>
    </div>
  );
}

export default ToggleCurrentUserProfile;
