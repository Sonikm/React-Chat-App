import React from "react";
import LeftSidebar from "./components/UserProfile/LeftSidebase";
import Chats from "./components/chats/Chats";
import UserList from "./components/userList/UserList";
function App() {
  return (
    <div className="app flex overflow-hidden h-screen">
      <LeftSidebar />
      <Chats />
      <UserList/>
    </div>
  );
}

export default App;
