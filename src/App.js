import React, { useEffect, useState } from "react";
import LeftSidebar from "./components/UserProfile/LeftSidebase";
import Chats from "./components/chats/Chats";
import UserList from "./components/userList/UserList";
import Login from "./components/login/Login";
import { useFirebase } from "./utils/firebaseContext";
import Notification from "./components/ui/Notification";
import { ToastContainer } from "react-toastify";
function App() {
  const { user } = useFirebase();

  return (
    <div className="app flex overflow-hidden h-screen">
      {!user ? (
        <Login />
      ) : (
        <>
          <LeftSidebar />
          <Chats />
          <UserList />
        </>
      )}
      <Notification  />
    </div>
  );
}

export default App;
