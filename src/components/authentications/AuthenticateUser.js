import React, { useState } from "react";
import Logo from "../ui/Logo";
import Login from "./Login";
import Register from "./Register";
import ImageSlider from "../ui/ImageSlider";

function AuthenticateUser() {
  const [register, setRegister] = useState(false);

  return (
    <div className="flex p-6  h-screen   w-full  justify-center items-center">
      <div className="flex flex-col w-full h-full">
        <Logo />
       {register ? <Register setRegister={setRegister} /> : <Login setRegister={setRegister} />}
       
      </div>
      <ImageSlider />
    </div>
  );
}

export default AuthenticateUser;
