import React, { useEffect, useState } from "react";
import TopInfo from "./TopInfo";
import BottomInfo from "./BottomInfo";
import CenterInfo from "./CenterInfo";

function Chats() {
  const [isLoadingSendMsg, setIsLoadingSendMsg] = useState(false);

  return (
    <div className="flex flex-grow flex-col overflow-hidden">
      <TopInfo />
      <CenterInfo />
      <BottomInfo isLoadingSendMsg={isLoadingSendMsg} setIsLoadingSendMsg={setIsLoadingSendMsg} />
    </div>
  );
}

export default Chats;
