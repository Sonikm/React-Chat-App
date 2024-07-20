import React, { useEffect } from "react";
import Chats from "./components/chats/Chats";
import UserList from "./components/userList/UserList";
import Notification from "./components/notification/Notification";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./utils/firebase";
import useUserStore from "./utils/userStore";
import useChatStore from "./utils/chatStore";
import AuthenticateUser from "./components/authentications/AuthenticateUser";
import UserProfileSidebar from "./components/UserProfile/UserProfileSidebar";
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
       <AuthenticateUser/>
      ) : (
        <>
          <UserProfileSidebar />
          {chatId && <Chats />}
          <UserList />
        </>
      )}
      <Notification />
    </div>
  );
}

export default App;
