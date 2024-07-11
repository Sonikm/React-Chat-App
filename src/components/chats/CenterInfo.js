import React, { useEffect, useRef, useState } from "react";
import avatar from "../../assets/avatar.png";
import currentUser from "../../assets/user.jpg";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../utils/firebase";
import { useChatStore } from "../../utils/chatStore";

function CenterInfo() {
  const chatRef = useRef(null);
  const [chat, setChat] = useState();
  const { chatId } = useChatStore();
  const [text, setText] = useState("");

  useEffect(() => {
    chatRef.current.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    const unSnap = onSnapshot(doc(db, "chats", chatId), (res) => {
      setChat(res.data());
    });

    return () => unSnap();
  }, [chatId]);

  console.log(chat);

  return (
    <div className="bg-secondary px-6 overflow-y-scroll  py-4 flex-1">
      <div className=" flex justify-center mb-4 items-center ">
        <span className="bg-gray-200 text-sm font-medium text-gray-700 px-4 p-1 rounded-lg">
          Monday, 15 April 2024
        </span>
      </div>
      <div className="flex flex-col gap-4 ">
        {chat?.messages?.map((message, i) => (
          <Message message={message} key={i} />
        ))}

        <div ref={chatRef}></div>
      </div>
    </div>
  );
}

export default CenterInfo;

function Message({ message }) {
  console.log("mes:", message);
  return message.senderId === currentUser.id ? (
    <div className=" flex flex-col self-end gap-2 max-w-[50%] ">
      <p className="p-3 px-4 bg-primary text-white rounded-xl rounded-bl-none">
       {
        message?.text
       }
      </p>
      <div className="flex text-sm text-gray-500 justify-between">
        <span>09:22 AM</span>
        <div className="flex gap-2 ">
          <span className="">You</span>
          <img
            className={`h-6 w-6 object-cover rounded-full`}
            src={currentUser}
            alt=""
          />
        </div>
      </div>
    </div>
  ) : (
    <div className="flex flex-col gap-2 max-w-[50%] ">
      {message?.img && <img src={message.img} alt="" />}
      <p className="p-3 px-4 bg-white rounded-xl rounded-bl-none">
        {message?.text}
      </p>
      <div className="flex text-sm text-gray-500 justify-between">
        <div className="flex gap-2 ">
          <img
            className={`h-6 w-6 object-cover rounded-full`}
            src={avatar}
            alt=""
          />
          <span className="">James Tariff</span>
        </div>
        <span>{message?.createdAt}</span>
      </div>
    </div>
  );
}

/*
 <div className="flex flex-col gap-2 max-w-[50%] ">
          <p className="p-3 px-4 bg-white rounded-xl rounded-bl-none">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Consectetur, animi?
          </p>
          <div className="flex text-sm text-gray-500 justify-between">
            <div className="flex gap-2 ">
              <img
                className={`h-6 w-6 object-cover rounded-full`}
                src={avatar}
                alt=""
              />
              <span className="">James Tariff</span>
            </div>
            <span>09:22 AM</span>
          </div>
        </div>
        <div className=" flex flex-col self-end gap-2 max-w-[50%] ">
          <p className="p-3 px-4 bg-primary text-white rounded-xl rounded-bl-none">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Consectetur, animi?
          </p>
          <div className="flex text-sm text-gray-500 justify-between">
            <span>09:22 AM</span>
            <div className="flex gap-2 ">
              <span className="">You</span>
              <img
                className={`h-6 w-6 object-cover rounded-full`}
                src={currentUser}
                alt=""
              />
            </div>
          </div>
        </div>
*/
