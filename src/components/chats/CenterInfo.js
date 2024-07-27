import React, { useEffect, useRef, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../utils/firebase";
import useChatStore from "../../utils/chatStore";
import useUserStore from "../../utils/userStore";
import { format } from "timeago.js";
import { format as formatDate } from "date-fns"; // Import date-fns for formatting

function CenterInfo() {
  const chatRef = useRef(null);
  const { chatId, user } = useChatStore();
  const [chats, setChats] = useState();
  const { currentUser } = useUserStore();
  const [createdAt, setCreatedAt] = useState(null); // State for chat creation date

  useEffect(() => {
    chatRef.current.scrollIntoView({ behavior: "smooth" });
  }, [chats?.messages]);

  useEffect(() => {
    const unSub = onSnapshot(doc(db, "chats", chatId), (res) => {
      const chatData = res.data();
      setChats(chatData);
      if (chatData?.createdAt) {
        setCreatedAt(chatData.createdAt.toDate());
      }
    });

    return () => unSub();
  }, [chatId]);

  return (
    <div className="bg-secondary px-6 overflow-y-scroll py-4 flex-1">
      {createdAt && (
        <div className="flex justify-center mb-4 items-center">
          <span className="bg-gray-200 text-sm font-medium text-gray-700 px-4 p-1 rounded-lg">
            {formatDate(createdAt, 'EEEE, d MMMM yyyy')}
          </span>
        </div>
      )}
      <div className="flex flex-col gap-4">
        {chats?.messages.map((message) => (
          <div
            style={{
              alignSelf: message?.senderId === currentUser.id ? "end" : "start",
            }}
            key={message?.createdAt}
            className="flex flex-col gap-2  xs:max-w-[60%] sm:max-w-[50%] max-w-[90%]  messsage own"
          >
            <div className="texts flex flex-col gap-1">
              {message?.img && (
                <img
                  className="max-w-[300px] object-cover rounded-xl"
                  src={message.img}
                  alt=""
                />
              )}

              {message.text && (
                <p
                  className={`${
                    message?.senderId === currentUser.id
                      ? "bg-primary text-white"
                      : "bg-white text-black"
                  } p-3 px-4 rounded-xl rounded-bl-none`}
                >
                  {message.text}
                </p>
              )}
            </div>
            <div className="text-sm text-gray-500 gap-2">
              {message?.senderId === currentUser.id ? (
                <div className="flex justify-between items-center gap-2 text-sm text-gray-500">
                  <div className="flex gap-1 flex-1  items-center">
                    <img
                      className={`h-6 w-6 flex-none object-cover rounded-full`}
                      src={currentUser.avatar}
                      alt=""
                    />
                    <span className="whitespace-nowrap overflow-ellipsis">You</span>
                  </div>
                  <span className="whitespace-nowrap">{format(message.createdAt.toDate())}</span>
                </div>
              ) : (
                <div className="flex justify-between gap-2 items-center text-sm text-gray-500">
                  <span className="whitespace-nowrap">{format(message.createdAt.toDate())}</span>
                  <div className="flex gap-2">
                    <span className="whitespace-nowrap overflow-ellipsis overflow-hidden">{user.username}</span>
                    <img
                      className={`h-6 w-6 object-cover rounded-full`}
                      src={user.avatar}
                      alt=""
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
        <div ref={chatRef}></div>
      </div>
    </div>
  );
}

export default CenterInfo;
