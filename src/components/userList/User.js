import React from "react";
import avatar from "../../assets/avatar.png";

function User() {
  return (
    <div className="hover:bg-secondary cursor-pointer px-3 p-2 rounded-md gap-4 flex justify-between items-center">
      <div className="text-sm flex gap-2 items-center justify-center">
        <img
          className={`h-9 w-9 object-cover rounded-full`}
          src={avatar}
          alt=""
        />
        <div className="flex flex-col ">
          <span className="font-medium overflow-ellipsis overflow-hidden">
            Jomas Torff
          </span>
          <p className="overflow-ellipsis line-clamp-1 overflow-hidden text-gray-500">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum, id.
          </p>
        </div>
      </div>
      <div className="text-gray-500 text-sm whitespace-nowrap">07:14 AM</div>
    </div>
  );
}

export default User;
