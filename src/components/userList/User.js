import React from "react";
import defaultAvatar from "../../assets/avatar.png";

function User({username, lastMessage, avatar, handleClick, isSeen}) {
  // console.log(isSeen)

  return (
    <div onClick={handleClick}  className={ `${!isSeen ? "bg-primary" : "bg-white hover:bg-secondary"}  cursor-pointer px-3 p-2 rounded-md gap-4 flex justify-between items-center`}>
      <div className="text-sm flex gap-2 items-center justify-center">
        <img
          className={`h-9 w-9 object-cover rounded-full`}
          src={avatar || defaultAvatar}
          alt=""
        />
        <div className="flex flex-col ">
          <span className="font-medium overflow-ellipsis overflow-hidden">
            {username}
          </span>
          <p className="overflow-ellipsis line-clamp-1 overflow-hidden text-gray-500">
            {lastMessage}
          </p>
        </div>
      </div>
      <div className="text-gray-500 text-sm whitespace-nowrap">07:14 AM</div>
    </div>
  );
}

export default User;
