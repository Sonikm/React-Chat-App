import React, { useEffect, useState } from "react";
import LeftSidebar from "./components/UserProfile/LeftSidebase";
import Chats from "./components/chats/Chats";
import UserList from "./components/userList/UserList";
import Login from "./components/login/Login";
import { useFirebase } from "./utils/firebaseContext";
import Notification from "./components/ui/Notification";
import AddUser from "./components/addUser/AddUser";
import Loading from "./components/ui/Loading";
import { useUserStore } from "./utils/userStore";
import { useChatStore } from "./utils/chatStore";
function App() {
  const { user, addUser } = useFirebase();
  const { currentUser, isLoading } = useUserStore();
  const { chatId } = useChatStore();

  if (isLoading) return <Loading />;

  console.log(chatId)

  return (
    <div className="app flex overflow-hidden h-screen">
      {!currentUser ? (
        <Login />
      ) : (
        <>
          <LeftSidebar />
          {chatId && <Chats />}

          <UserList />
          {addUser && <AddUser />}
        </>
      )}
      <Notification />
    </div>
  );
}

export default App;
