import React, { useState } from "react";
import mic from "../../assets/mic.png";
import gallery from "../../assets/gallery-2.png";
import emoji from "../../assets/smile.png";
import send from "../../assets/send-1.png";

function BottomInfo() {
  const [text, setText] = useState("");
  return (
    <div className="px-4 py-3 flex gap-4 justify-between items-center ">
      <div className="bg-secondary relative justify-between items-center p-3 px-4 flex flex-1  rounded-xl gap-4 ">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="outline-none flex-1 pl-7 bg-secondary border-none placeholder:text-gray-500"
          type="text"
          placeholder="Type your message here"
        />
        <img className="w-5 h-5 absolute left-3" src={mic} alt="" />
        {text !== "" && (
          <img className="w-8 absolute right-4" src={send} alt="" />
        )}
      </div>
      <img className="w-6 h-6" src={gallery} alt="" />
      <img className="w-6 h-6" src={emoji} alt="" />
    </div>
  );
}

export default BottomInfo;
