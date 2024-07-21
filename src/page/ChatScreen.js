import React from "react";
import UserProfileSidebar from "../components/UserProfile/UserProfileSidebar";
import useChatStore from "../utils/chatStore";
import Chats from "../components/chats/Chats";
import UserList from "../components/userList/UserList";

function ChatScreen() {
  const { chatId } = useChatStore();

  return (
    <div className="app flex  h-screen overflow-hidden ">
      <UserProfileSidebar />
      {chatId && <Chats />}
      <UserList />
    </div>
  );
}

export default ChatScreen;
