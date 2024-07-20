import React, { useEffect } from "react";
import LeftSidebar from "./components/UserProfile/LeftSidebase";
import Chats from "./components/chats/Chats";
import UserList from "./components/userList/UserList";
import Login from "./components/authentications/Login";
import Notification from "./components/notification/Notification";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./utils/firebase";
import useUserStore from "./utils/userStore";
import useChatStore from "./utils/chatStore";
function App() {
  const { currentUser, isLoading, fetchUserInfo } = useUserStore();
  const { chatId } = useChatStore();

  useEffect(() => {
    const unSub = onAuthStateChanged(auth, (user) => {
      fetchUserInfo(user?.uid);
    });

    return () => unSub();
  }, [fetchUserInfo]);

  if (isLoading)
    return (
      <div className="p-14 text-lg font-bold text-center ">Loading...</div>
    );

  return (
    <div className="app flex  h-screen ">
      {!currentUser ? (
        <Login />
      ) : (
        <>
          <LeftSidebar />
          {chatId && <Chats />}
          <UserList />
        </>
      )}
      <Notification />
    </div>
  );
}

export default App;
