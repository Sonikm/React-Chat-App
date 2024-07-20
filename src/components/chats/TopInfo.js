import React from "react";
import avatar from "../../assets/avatar.png";
import search from "../../assets/search.png";
import phone from "../../assets/call.png";
import video from "../../assets/video.png";
import option from "../../assets/more.png";
import SearchMessage from "../ui/SearchMessage";
import useChatStore from "../../utils/chatStore";

function TopInfo() {
  const {user} = useChatStore()
  return (
    <div className="text-black  flex flex-col ">
      {/* <SearchMessage/> */}
      <div className="border-t flex  justify-between items-center px-4 py-3  border-gray-200">
        <div className="flex text-sm items-cener gap-4">
          <img
            className={`h-10 w-10 object-cover rounded-full`}
            src={user?.avatar || avatar}
            alt=""
          />
          <div className="flex flex-col overflow-hidden text-ellipsis ">
            <p className="font-bold">{user?.username}</p>
            <div className="flex items-center gap-1">
             {/* <div className="w-[5px] h-[5px] rounded-full bg-primary"></div> */}
            <p className=" whitespace-nowrap">Lorem ipsum dolor sit amet.</p>
            </div>
          </div>
        </div>
        <div className="flex items-center">
          <Icon icon={search} />
          <Icon icon={phone} />
          <Icon icon={video} />
          <Icon icon={option} />
        </div>
      </div>
    </div>
  );
}

export default TopInfo;

function Icon({ icon }) {
  return (
    <div className="hover:bg-secondary rounded-full p-2 cursor-pointer">
      <img className="w-5 cursor-pointer" src={icon} alt="" />
    </div>
  );
}
