import React from "react";

function Logo() {
  return (
    <div className="flex  gap-4 justify-start items-center">
      <div className="flex relative">
        <div className="w-10 h-5 bg-[#33D299] rounded-xl"></div>
        <div className="w-7 h-7 bg-dark-green rounded-full absolute -right-1 bottom-0"></div>
      </div>
      <div className="font-medium text-xl tracking-wider">Letschat</div>
    </div>
  );
}

export default Logo;
