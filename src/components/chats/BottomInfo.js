import React, { useState } from "react";
import mic from "../../assets/mic.png";
import gallery from "../../assets/gallery-2.png";
import emoji from "../../assets/smile.png";
import send from "../../assets/send-1.png";
import { arrayUnion, doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../utils/firebase";
import { useChatStore } from "../../utils/chatStore";
import { useUserStore } from "../../utils/userStore";

function BottomInfo() {
  const [text, setText] = useState("");
  const [img, setImg] = useState({
    file: null,
    url: "",
  });
  const { chatId, user } = useChatStore();
  const { currentUser } = useUserStore();

  function handleImage(e) {
    if (e.target.files[0]) {
      setImg({
        file: e.target.files[0],
        url: URL.createObjectURL(e.target.files[0]),
      });
    }
  }

  async function handleSend() {
    if (text === "") return;

    try {
      await updateDoc(doc(db, "chats", chatId), {
        messages: arrayUnion({
          senderId: currentUser.id,
          text,
          created: Date.now(),
          isSeen: false,
        }),
      });
      const userIDs = [currentUser.id, user.id];

      userIDs.forEach(async (id) => {
        const userChatsRef = doc(db, "userchats", id);
        const userChatsSnap = await getDoc(userChatsRef);

        if (userChatsSnap.exists()) {
          const userChatData = userChatsSnap.data();

          const chatIndex = userChatData?.chats?.findIndex(
            (c) => c.chatId === chatId
          );

          console.log(userChatData?.chats[chatIndex]);
          userChatData.chats[chatIndex].lastMessage = text;
          userChatData.chats[chatIndex].isSeen =
            id === currentUser.id ? true : false;
          userChatData.chats[chatIndex].updatedAt = Date.now();

          await updateDoc(userChatsRef, {
            chats: userChatData.chats,
          });
        }
      });
    } catch (err) {
      console.log(err.message);
    }
  }

  return (
    <div className="px-4 py-3 flex gap-4 justify-between items-center ">
      <div className="bg-secondary relative justify-between items-center p-3 px-4 flex flex-1  rounded-xl gap-4 ">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="outline-none flex-1 pl-7 bg-secondary border-none placeholder:text-gray-500"
          type="text"
          placeholder="Type your message here"
        />
        <img className="w-5 h-5 absolute left-3" src={mic} alt="" />
        {text !== "" && (
          <img
            onClick={handleSend}
            className="w-8  right-4 cursor-pointer"
            src={send}
            alt=""
          />
        )}
      </div>
      <img className="w-6 h-6" src={gallery} alt="" />
      <img onClick={handleImage} className="w-6 h-6" src={emoji} alt="" />
    </div>
  );
}

export default BottomInfo;
