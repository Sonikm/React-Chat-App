import React from "react";

function Avatar({ avatar, size }) {
  return (
    <img
      className={`h-${size} w-${size} object-cover rounded-full`}
      src={avatar}
      alt=""
    />
  );
}

export default Avatar;
