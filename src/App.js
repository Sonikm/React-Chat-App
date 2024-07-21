import React, { useEffect } from "react";
import Notification from "./components/notification/Notification";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./utils/firebase";
import useUserStore from "./utils/userStore";
import AuthenticateUser from "./components/authentications/AuthenticateUser";
import ChatScreen from "./page/ChatScreen";
function App() {
  const { currentUser, isLoading, fetchUserInfo } = useUserStore();

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
    <div className="app flex  h-screen overflow-hidden ">
      {!currentUser ? <AuthenticateUser /> : <ChatScreen />}
      <Notification />
    </div>
  );
}

export default App;
