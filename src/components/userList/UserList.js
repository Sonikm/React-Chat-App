import React, { useEffect, useState } from "react";
import searchIcon from "../../assets/search-icon.png";
import sort from "../../assets/sort.png";
import open from "../../assets/plus.png";
import close from "../../assets/minus.png";
import User from "./User";
import { useFirebase } from "../../utils/firebaseContext";
import { doc, getDoc, onSnapshot, updateDoc } from "firebase/firestore";
import { db } from "../../utils/firebase";
import { useChatStore } from "../../utils/chatStore";

function UserList() {
  const { addUser, setAddUser, currentUser } = useFirebase();
  const { user, changeChat } = useChatStore();
  const [chats, setChats] = useState([]);

  useEffect(() => {
    // get current user chat list
    const unSub = onSnapshot(
      doc(db, "userchats", currentUser?.id),
      async (res) => {
        const items = res.data()?.chats;

        const promisses = items.map(async (item) => {
          const userDocRef = doc(db, "users", item.receiverId);
          const userDocSnap = await getDoc(userDocRef);

          const user = userDocSnap.data();

          return { ...item, user };
        });

        const chatData = await Promise.all(promisses);
        // sort data to show message on top whenere get new message
        setChats(chatData.sort((a, b) => b.updatedAt - a.updatedAt));
        console.log(chatData);
      }
    );

    return () => unSub();
  }, [currentUser.id]);

  async function handleSelectUser(chat) {
    const userChats = chats.map((item) => {
      const { user, ...rest } = item;
      return rest;
    });

    const chatIndex = userChats.findIndex(
      (item) => item.chatId === chat.chatId
    );

    userChats[chatIndex].isSeen = true;

    const userChatsRef = doc(db, "userchats", currentUser.id);

    try {
      await updateDoc(userChatsRef, {
        chats: userChats,
      });
      changeChat(chat.chatId, chat.user);
    } catch (err) {
      console.log(err);
    }

  }

  console.log(user)

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

          <div className="bg-black p-3  rounded-full absolute cursor-pointer top-0 right-3">
            <img
              onClick={() => setAddUser(!addUser)}
              className="w-4"
              src={addUser ? close : open}
              alt=""
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-1 overflow-y-scroll px-3">
        {chats.map((chat) => (
          <User
            handleClick={() => handleSelectUser(chat)}
            key={chat.chatId}
            isSeen={chat.isSeen}
            lastMessage={chat.lastMessage}
            avatar={chat.user.avatar}
            username={chat?.user?.username}
          />
        ))}
      </div>
    </div>
  );
}

export default UserList;
