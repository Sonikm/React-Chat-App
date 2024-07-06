import React from "react";
import searchIcon from "../../assets/search-icon.png";
import sort from "../../assets/sort.png";
import avatar from "../../assets/avatar.png";
import User from "./User";

function UserList() {
  return (
    <div className="w-[300px] border-l border-secondary flex flex-col gap-4">
      <div className="flex  flex-col gap-2 p-4 pb-0">
        <h4 className="font-medium">Chat</h4>
        <div className="relative flex-1 flex ">
          <img className="absolute w-4 top-3 left-3" src={searchIcon} alt="" />
          <input
            className="outline-none pl-9 border-none p-2 flex-1 bg-secondary rounded-xl "
            type="text"
            placeholder="Search "
          />
          <img className="absolute w-4 top-3 right-3" src={sort} alt="" />
        </div>
      </div>
      <div className="flex flex-col gap-1 overflow-y-scroll px-3">
        <User/>
        <User/>
        <User/>
        <User/>
        <User/>
        <User/>
        <User/>
        <User/>
        <User/>
        <User/>
        <User/>
        <User/>
        <User/>
      </div>
    </div>
  );
}

export default UserList;
