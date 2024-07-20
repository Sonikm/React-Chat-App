import React from "react";
import avatar from "../../assets/avatar.png";
import useChatStore from "../../utils/chatStore";

function User({ chat, onHandleSelectChat }) {
  const {user} = useChatStore();
  return (
    <div
      style={{
        backgroundColor: `${
          user?.id === chat?.user?.id ? "#ebeef3 " :
          chat.isSeen ? "transparent" : "var(--PRIMARY-COLOR)"
        }`,
      }}
      onClick={onHandleSelectChat}
      className="hover:!bg-secondary cursor-pointer px-3 p-2 rounded-md gap-4 flex justify-between items-center"
    >
      <div className="text-sm flex gap-2 items-center justify-center">
        <img
          className={`h-9 w-9 object-cover rounded-full`}
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
      <div className="text-gray-500 text-sm whitespace-nowrap">07:14 AM</div>
    </div>
  );
}

export default User;
