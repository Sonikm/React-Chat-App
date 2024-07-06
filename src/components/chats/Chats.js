import React from "react";
import TopInfo from "./TopInfo";
import BottomInfo from "./BottomInfo";
import CenterInfo from "./CenterInfo";

function Chats() {
  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      <TopInfo />
      <CenterInfo />
      <BottomInfo />
    </div>
  );
}

export default Chats;
