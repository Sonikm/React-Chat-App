import React from 'react'
import contactUs from "../../assets/support.png";

function ContactUs() {
  return (
    <div className="absolute shadow-xl right-0 sm:right-4 flex justify-center items-center gap-2 bg-white z-10 p-1 px-3 rounded-full ">
    <span className='whitespace-nowrap'>Contact Us</span>

    <div className="w-9 h-9 flex p-2 justify-center items-center bg-[#05966834] rounded-full">
      <img className="" src={contactUs} alt="" />
    </div>
  </div>
  )
}

export default ContactUs