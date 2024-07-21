import React from "react";
import searchIcon from "../../assets/search-icon.png";
import comments from "../../assets/comment.png";

function SearchChats() {
  return (
    <div className="relative flex gap-2 items-center ">
      <img className="absolute w-4 top-3 left-2" src={searchIcon} alt="" />
      <input
        className="outline-none pl-9 border-none p-2 bg-secondary rounded-xl "
        type="text"
        placeholder="Search "
      />
      <div className="bg-primary hover:bg-[#0fa271] cursor-pointer flex justify-center items-center w-9 h-9 rounded-xl">
        <img className="" src={comments} alt="" />
      </div>
    </div>
  );
}

export default SearchChats;
