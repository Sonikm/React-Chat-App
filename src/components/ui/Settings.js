import React from "react";
// import dwonload from "../../assets/download.png";
import gallery from "../../assets/gallery.png";
function Settings() {
  return (
    <div className="settings border-t-[2px] border-gray-700 flex text-sm  flex-col gap-1 text-gray-300 pt-6">
      <div className="flex hover:bg-[#282B3A] px-2 py-2 rounded-lg gap-4 cursor-pointer ">
        <img className="h-5" src={gallery} alt="" />
        <span>Privacy & Security</span>
      </div>
      <div className="flex hover:bg-[#282B3A] px-2 py-2 rounded-lg gap-4 cursor-pointer ">
        <img className="h-5" src={gallery} alt="" />
        <span>Settings</span>
      </div>
      <div className="flex hover:bg-[#282B3A] px-2 py-2 rounded-lg gap-4 cursor-pointer ">
        <img className="h-5" src={gallery} alt="" />
        <span>Language</span>
      </div>
      <div className="flex hover:bg-[#282B3A] px-2 py-2 rounded-lg gap-4 cursor-pointer ">
        <img className="h-5" src={gallery} alt="" />
        <span>Dark Mode</span>
      </div>
    </div>
  );
}

export default Settings;
