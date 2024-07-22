import React, { useEffect, useState } from "react";
import UserProfileSidebar from "../components/UserProfile/UserProfileSidebar";
import useChatStore from "../utils/chatStore";
import Chats from "../components/chats/Chats";
import UserList from "../components/userList/UserList";
import ToggleCurrentUserProfile from "../components/ui/ToggleCurrentUserProfile";

function ChatScreen() {
  const { chatId } = useChatStore();
 const [toggleCurrentUser, setToggleCurrentUser] = useState(false);
 const [screenWidth, setScreenWidth] = useState(window.innerWidth);


 useEffect(() => {
  const handleResize = () => {
    setScreenWidth(window.innerWidth);
    console.log(toggleCurrentUser);
    if (window.innerWidth > 1024) {
      setToggleCurrentUser(false);
    }
  };

  window.addEventListener("resize", handleResize);

  return () => window.removeEventListener("resize", handleResize);
}, []);

function handleToggleCurrentUserProfile(){
  setToggleCurrentUser(!toggleCurrentUser)
}


  return (
    <div className="app flex  h-screen overflow-hidden relative">
      <ToggleCurrentUserProfile onHandleToggleCurrentUserProfile={handleToggleCurrentUserProfile} toggleCurrentUser={toggleCurrentUser} screenWidth={screenWidth}/>
      <UserProfileSidebar screenWidth={screenWidth} toggleCurrentUser={toggleCurrentUser} />
      {chatId && <Chats toggleCurrentUser={toggleCurrentUser} screenWidth={screenWidth} onHandleToggleCurrentUserProfile={handleToggleCurrentUserProfile}  />}
      <UserList setToggleCurrentUser={setToggleCurrentUser} />
    </div>
  );
}

export default ChatScreen;
