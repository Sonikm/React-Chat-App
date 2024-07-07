import React from "react";
import LeftSidebar from "./components/UserProfile/LeftSidebase";
import Chats from "./components/chats/Chats";
import UserList from "./components/userList/UserList";
import Login from "./components/login/Login";
function App() {
  const user = false;

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
    </div>
  );
}

export default App;
