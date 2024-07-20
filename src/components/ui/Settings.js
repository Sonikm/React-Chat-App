import React from "react";
import gallery from "../../assets/gallery.png";
import security from "../../assets/security.png";
import language from "../../assets/language.png";
import settings  from "../../assets/settings.png";
function Settings() {
  return (
    <div className="settings border-t-[2px] border-gray-700 flex text-sm  flex-col gap-1 text-gray-300 pt-6">
      <div className="flex hover:bg-[#282B3A] px-2 py-2 rounded-lg gap-4 cursor-pointer ">
        <img className="h-5" src={security} alt="" />
        <span>Privacy & Security</span>
      </div>
      <div className="flex hover:bg-[#282B3A] px-2 py-2 rounded-lg gap-4 cursor-pointer ">
        <img className="h-5" src={settings} alt="" />
        <span>Settings</span>
      </div>
      <div className="flex hover:bg-[#282B3A] px-2 py-2 rounded-lg gap-4 cursor-pointer ">
        <img className="h-5" src={language} alt="" />
        <span>Language</span>
      </div>
      <div className="flex hover:bg-[#282B3A] px-2 py-2 rounded-lg gap-4 cursor-pointer ">
        <img className="h-5" src={gallery} alt="" />
        <span>Gallery</span>
      </div>
    </div>
  );
}

export default Settings;
