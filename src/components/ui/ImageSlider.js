import React from "react";
import ContactUs from "./ContactUs";

function ImageSlider() {
  return (
    <div className="w-0 sm:w-full   h-full relative flex ">
      <ContactUs/>
      <div className=" hidden md:block  flex-col gap-10 absolute -top-12 right-[300px]">
        <img
          className="w-[190px] rounded-[40px] object-cover"
          src="https://images.pexels.com/photos/6382640/pexels-photo-6382640.jpeg?auto=compress&cs=tinysrgb&w=600"
          alt=""
        />
        <img
          className="w-[190px] my-3 rounded-[40px] object-cover"
          src="https://images.pexels.com/photos/5538608/pexels-photo-5538608.jpeg?auto=compress&cs=tinysrgb&w=600"
          alt=""
        />
        <img
          className="w-[190px] rounded-[40px] object-cover"
          src="https://images.pexels.com/photos/4049991/pexels-photo-4049991.jpeg?auto=compress&cs=tinysrgb&w=600"
          alt=""
        />
      </div>
      <div className=" hidden sm:block   flex-col gap-10 absolute bottom-10 right-8 md:right-16">
        <img
          className="w-[190px] rounded-[40px] object-cover"
          src="https://images.pexels.com/photos/6146927/pexels-photo-6146927.jpeg?auto=compress&cs=tinysrgb&w=600"
          alt=""
        />
        <img
          className="w-[190px] my-4 rounded-[40px] object-cover"
          src="https://images.pexels.com/photos/3771060/pexels-photo-3771060.jpeg?auto=compress&cs=tinysrgb&w=600"
          alt=""
        />
        <img
          className="w-[190px] rounded-[40px] object-cover"
          src="https://images.pexels.com/photos/5965925/pexels-photo-5965925.jpeg?auto=compress&cs=tinysrgb&w=600"
          alt=""
        />
      </div>
    </div>
  );
}

export default ImageSlider;
