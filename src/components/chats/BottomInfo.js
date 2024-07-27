import React, { useState } from "react";
import mic from "../../assets/mic.png";
import gallery from "../../assets/gallery-2.png";
import emoji from "../../assets/smile.png";
import send from "../../assets/send-1.png";
import EmojiPicker from "emoji-picker-react";
import { arrayUnion, doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../utils/firebase";
import useChatStore from "../../utils/chatStore";
import useUserStore from "../../utils/userStore";
import upload from "../../utils/upload";

function BottomInfo({ setIsLoadingSendMsg, isLoadingSendMsg }) {
  const [text, setText] = useState("");
  const [open, setOpen] = useState(false);
  const { chatId, user } = useChatStore();
  const { currentUser } = useUserStore();
  const [img, setImg] = useState({
    file: null,
    url: "",
  });

  function handleEmoji(e) {
    setText((prev) => prev + e.emoji);
  }

  function handleImage(e) {
    if (e.target.files[0]) {
      setImg({
        file: e.target.files[0],
        url: URL.createObjectURL(e.target.files[0]),
      });
    }
  }

  async function handleSendMsg() {
    if (text === "" && !img.url) return;

    let imgUrl = null;
    setIsLoadingSendMsg(true);

    try {
      if (img.file) {
        imgUrl = await upload(img.file);
      }

      await updateDoc(doc(db, "chats", chatId), {
        messages: arrayUnion({
          senderId: currentUser.id,
          text,
          createdAt: new Date(),
          ...(imgUrl && { img: imgUrl }),
        }),
      });

      const userIds = [currentUser.id, user.id];

      userIds.forEach(async (id) => {
        const userChatsRef = doc(db, "userchats", id);
        const userChatsSnapshot = await getDoc(userChatsRef);

        if (userChatsSnapshot.exists()) {
          const userChatsData = userChatsSnapshot.data();

          const chatIndex = userChatsData.chats.findIndex(
            (c) => c.chatId === chatId
          );

          userChatsData.chats[chatIndex].lastMessage = text;
          userChatsData.chats[chatIndex].isSeen =
            id === currentUser.id ? true : false;
          userChatsData.chats[chatIndex].updatedAt = Date.now();

          await updateDoc(userChatsRef, {
            chats: userChatsData.chats,
          });
        }
      });
    } catch (err) {
      console.log(err.message);
    } finally {
      setText("");
      setImg({
        file: null,
        url: "",
      });
      setIsLoadingSendMsg(false);
    }
  }

  return (
    <div className="px-4 z-20 py-3 flex gap-2 sm:gap-4 justify-between items-center ">
      <div className="bg-secondary relative justify-between items-center p-3 px-4 flex flex-1  rounded-xl gap-4 ">
        {img.url && (
          <div className="absolute  bottom-12 left-10 p-2 flex justify-center items-center rounded-md bg-dark-green ">
            <img className="w-[150px] xs:w-[200px] object-cover " src={img.url} alt="" />
          </div>
        )}
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          className={`${
            isLoadingSendMsg ? "cursor-not-allowed" : "cursor-text"
          } max-w-[150px]  px-14 xs:max-w-full outline-none flex-1 pl-7 bg-secondary border-none placeholder:text-gray-500`}
          type="text"
          placeholder={`${
            isLoadingSendMsg ? "Sending..." : "Type your message here"
          }`}
        />
        <img className="w-5 h-5 absolute left-3 " src={mic} alt="" />
        {(text !== "" || img.url) && (
          <img
            onClick={handleSendMsg}
            className={`${isLoadingSendMsg ? "cursor-not-allowed" : "cursor-pointer"} w-8 absolute right-4`}
            src={send}
            alt=""
          />
        )}
      </div>

      <label htmlFor="file">
        <img className="w-6 h-6 cursor-pointer" src={gallery} alt="" />
      </label>
      <input
        onChange={handleImage}
        type="file"
        id="file"
        style={{ display: "none" }}
      />
      <div>
        <img
          onClick={() => setOpen(!open)}
          className="w-6 h-6 cursor-pointer"
          src={emoji}
          alt=""
        />
        <div className="absolute right-0 bottom-20 ">
          <EmojiPicker onEmojiClick={handleEmoji} className=" max-w-[280px] xs:max-w-[300px] sm:max-w-full max-h-[400px] xs:max-h-full" open={open} />
        </div>
      </div>
    </div>
  );
}

export default BottomInfo;
