import React, { useEffect, useState } from "react";
import TopInfo from "./TopInfo";
import BottomInfo from "./BottomInfo";
import CenterInfo from "./CenterInfo";

function Chats({toggleCurrentUser, screenWidth}) {
  const [isLoadingSendMsg, setIsLoadingSendMsg] = useState(false);

  return (
    <div className="flex flex-grow flex-col overflow-hidden">
      <TopInfo toggleCurrentUser={toggleCurrentUser} screenWidth={screenWidth} />
      <CenterInfo />
      <BottomInfo isLoadingSendMsg={isLoadingSendMsg} setIsLoadingSendMsg={setIsLoadingSendMsg} />
    </div>
  );
}

export default Chats;
