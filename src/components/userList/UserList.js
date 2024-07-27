import React, { useState, useEffect } from "react";
import searchIcon from "../../assets/search-icon.png";
import User from "./User";
import AddUser from "./addUser/AddUser";
import { doc, getDoc, onSnapshot, updateDoc } from "firebase/firestore";
import useUserStore from "../../utils/userStore";
import { db } from "../../utils/firebase";
import plus from "../../assets/plus.png";
import minus from "../../assets/minus.png";
import useChatStore from "../../utils/chatStore";
import emptyChat from "../../assets/empty-chat.svg";
import comment from "../../assets/switch.png";

function UserList() {
  const [addMode, setAddMode] = useState(false);
  const { currentUser } = useUserStore();
  const { changeChat, user } = useChatStore();
  const [chats, setChats] = useState([]);
  const [input, setInput] = useState("");
  const [isShowChats, setIsShowChats] = useState(false);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
      if (window.innerWidth > 640) {
        setIsShowChats(false);
      } else {
        setIsShowChats(isShowChats);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [isShowChats, setIsShowChats, user]);

  useEffect(() => {
    const unsub = onSnapshot(
      doc(db, "userchats", currentUser.id),
      async (res) => {
        const items = res.data()?.chats;

        const promisses = items?.map(async (item) => {
          const userDocRef = doc(db, "users", item.receiverId);
          const userDocSnap = await getDoc(userDocRef);

          const user = userDocSnap.data();

          return { ...item, user };
        });

        const chatData = await Promise.all(promisses);
        setChats(chatData.sort((a, b) => b.updatedAt - a.updatedAt));
      }
    );

    return () => unsub();
  }, [currentUser.id]);

  async function handleSelect(chat) {
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
    } catch (err) {
      console.log(err.message);
    }

    changeChat(chat.chatId, chat.user);
  }

  const filteredChats = chats.filter((c) =>
    c.user.username.toLowerCase().includes(input.toLowerCase())
  );

  function handleShowUserList() {
    setIsShowChats(!isShowChats);
  }

  return (
    <>
      {
        <div
          className={` ${
            user && screenWidth <= 640 && isShowChats
              ? "max-w-[300px] bg-white absolute right-0 top-0 h-full z-50 "
              : !user
              ? "w-full "
              : screenWidth <= 640
              ? " max-w-20 "
              : "max-w-[300px]"
          } border-l border-secondary flex flex-1 flex-col gap-4 `}
        >
          <div
            className={`${
              user && !isShowChats ? "  hidden sm:block " : ""
            } ${(screenWidth <= 1024 && !user)? "ml-14" : ""}  flex-col gap-2 p-4 pb-0 mb-2`}
          >
            <h4
              className={`${
                screenWidth <= 640 && isShowChats ? "text-xl mt-4 ml-2" : ""
              } font-medium`}
            >
              Chats
            </h4>
            <div
              className={`${
                screenWidth <= 640 && isShowChats ? " mt-5 " : ""
              } relative flex-1 flex   justify-between items-center`}
            >
              <img
                className="absolute w-4 top-3 left-3"
                src={searchIcon}
                alt=""
              />
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="outline-none pl-9 border-none  p-2 flex-1 bg-secondary rounded-xl "
                type="text"
                placeholder="Search "
              />
              <div
                onClick={() => setAddMode(!addMode)}
                className="bg-primary hover:bg-[#0fa271] cursor-pointer flex justify-center items-center w-9 h-9 rounded-xl"
              >
                <img className="w-5" src={addMode ? minus : plus} alt="" />
              </div>
            </div>
          </div>

          <div
            onClick={handleShowUserList}
            className={`${
              !user ? "hidden " : " block absolute top-0 xs:right-5 right-4 "
            } xs:w-12 w-9  xs:h-12 h-9 p-2 rounded-lg flex sm:hidden  justify-center items-center my-5 cursor-pointer bg-primary`}
          >
            <img src={comment} alt="" />
          </div>

          {filteredChats.length === 0 && (
            <div className="overflow-hidden object-cover flex justify-center items-center">
              <img
                className="max-w-[400px] opacity-35"
                src={emptyChat}
                alt=""
              />
            </div>
          )}
          <div
            className={` ${
              screenWidth <= 640 && !isShowChats && user ? " mt-16 xs:mt-20 " : ""
            } flex flex-col xs:gap-1  overflow-y-scroll px-3 `}
          >
            {filteredChats?.map((chat) => (
              <User
                screenWidth={screenWidth}
                isShowChats={isShowChats}
                key={chat.chatId}
                chat={chat}
                onHandleSelectChat={() => handleSelect(chat)}
              />
            ))}
          </div>
        </div>
      }
      {addMode && <AddUser onHandleAddMode={() => setAddMode(!addMode)} />}
    </>
  );
}

export default UserList;
