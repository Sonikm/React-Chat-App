import React from "react";
import avatar from "../../assets/avatar.png";
import useChatStore from "../../utils/chatStore";
import { format } from "timeago.js";

function User({ chat, onHandleSelectChat, isShowChats, screenWidth }) {
  const { user } = useChatStore();
  return (
    <>
      {!isShowChats && screenWidth <= 640 && user !== null ? (
        <div
        onClick={onHandleSelectChat}
          className={`${
            user?.id === chat?.user.id
              ? "bg-[#ebeef3] "
              : chat.isSeen
              ? "bg-transparent"
              : "bg-primary"
          } hover:bg-secondary   py-1 h-14 w-14 xs:h-16 xs:w-16 cursor-pointer flex justify-center items-center  rounded-full `}
        >
          <img
            className={`xs:h-12 h-10 xs:w-12 w-10 object-cover rounded-full  `}
            src={chat?.user?.avatar || avatar}
            alt=""
          />
        </div>
      ) : (
        <div
          style={{
            backgroundColor: `${
              user?.id === chat?.user?.id
                ? "#ebeef3 "
                : chat.isSeen
                ? "transparent"
                : "var(--PRIMARY-COLOR)"
            }`,
          }}
          onClick={onHandleSelectChat}
          className={`${
            chat.isSeen
              ? "hover:!bg-secondary bg-transparent "
              : " bg-[var(--PRIMARY-COLOR)] "
          } cursor-pointer px-3 p-2 rounded-md gap-4 flex justify-between items-center`}
        >
          <div className="text-sm flex gap-2 items-center justify-center">
            <img
              className={`h-9 w-9 object-cover rounded-full flex-none`}
              src={chat?.user?.avatar || avatar}
              alt=""
            />
            <div className="flex flex-col ">
              <span className="font-medium overflow-ellipsis overflow-hidden">
                {chat?.user?.username}
              </span>
              <p className="overflow-ellipsis line-clamp-1 overflow-hidden text-gray-500">
                {chat?.lastMessage}
              </p>
            </div>
          </div>
          <div className="text-gray-500 text-sm whitespace-nowrap">
            <span>{format(chat?.updatedAt)}</span>
          </div>
        </div>
      )}
    </>
  );
}

export default User;
