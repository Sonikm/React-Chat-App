import React from "react";
import contactUs from "../../assets/support.png";

function ImageSlider() {
  return (
    <div className=" w-full h-full relative flex ">
      <div className="absolute shadow-xl right-4 flex justify-center items-center gap-2 bg-white z-10 p-1 px-3 rounded-full ">
        <span>Contact Us</span>

        <div className="w-9 h-9 flex p-2 justify-center items-center bg-[#05966834] rounded-full">
          <img className="" src={contactUs} alt="" />
        </div>
      </div>
      <div className=" flex flex-col gap-4 absolute -top-8 right-[300px]">
        <img
          className="w-[180px] rounded-[40px] object-cover"
          src="https://images.pexels.com/photos/6382640/pexels-photo-6382640.jpeg?auto=compress&cs=tinysrgb&w=600"
          alt=""
        />
        <img
          className="w-[180px] rounded-[40px] object-cover"
          src="https://images.pexels.com/photos/5538608/pexels-photo-5538608.jpeg?auto=compress&cs=tinysrgb&w=600"
          alt=""
        />
        <img
          className="w-[180px] rounded-[40px] object-cover"
          src="https://images.pexels.com/photos/4049991/pexels-photo-4049991.jpeg?auto=compress&cs=tinysrgb&w=600"
          alt=""
        />
      </div>
      <div className=" flex flex-col gap-4 absolute -top-28 right-16">
        <img
          className="w-[180px] rounded-[40px] object-cover"
          src="https://images.pexels.com/photos/6146927/pexels-photo-6146927.jpeg?auto=compress&cs=tinysrgb&w=600"
          alt=""
        />
        <img
          className="w-[180px] rounded-[40px] object-cover"
          src="https://images.pexels.com/photos/3771060/pexels-photo-3771060.jpeg?auto=compress&cs=tinysrgb&w=600"
          alt=""
        />
        <img
          className="w-[180px] rounded-[40px] object-cover"
          src="https://images.pexels.com/photos/5965918/pexels-photo-5965918.jpeg?auto=compress&cs=tinysrgb&w=600"
          alt=""
        />
      </div>
    </div>
  );
}

export default ImageSlider;
