import React from "react";
import Logo from "../ui/Logo";
import Login from "./Login";
import Register from "./Register";
import ImageSlider from "../ui/ImageSlider";

function AuthenticateUser() {
  return (
    <div className="flex p-6  h-screen   w-full  justify-center items-center">
      <div className="flex flex-col w-full h-full">
        <Logo />
        {/* <Register/> */}
        <Login />
      </div>
      <ImageSlider />
    </div>
  );
}

export default AuthenticateUser;
