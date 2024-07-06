import React from "react";
import avatar from "../../assets/avatar.png";
import currentUser from "../../assets/user.jpg";

function CenterInfo() {
  return (
    <div className="bg-secondary px-6 overflow-y-scroll  py-4 flex-1">
      <div className=" flex justify-center mb-4 items-center ">
        <span className="bg-gray-200 text-sm font-medium text-gray-700 px-4 p-1 rounded-lg">
          Monday, 15 April 2024
        </span>
      </div>
      <div className="flex flex-col gap-4 ">
        {/* User message */}
        <div className="flex flex-col gap-2 max-w-[50%] ">
          <p className="p-3 px-4 bg-white rounded-xl rounded-bl-none">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Consectetur, animi?
          </p>
          <div className="flex text-sm text-gray-500 justify-between">
            <div className="flex gap-2 ">
              <img
                className={`h-6 w-6 object-cover rounded-full`}
                src={avatar}
                alt=""
              />
              <span className="">James Tariff</span>
            </div>
            <span>09:22 AM</span>
          </div>
        </div>
        {/* Own message */}
        <div className=" flex flex-col self-end gap-2 max-w-[50%] ">
          <p className="p-3 px-4 bg-primary text-white rounded-xl rounded-bl-none">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Consectetur, animi?
          </p>
          <div className="flex text-sm text-gray-500 justify-between">
            <span>09:22 AM</span>
            <div className="flex gap-2 ">
              <span className="">You</span>
              <img
                className={`h-6 w-6 object-cover rounded-full`}
                src={currentUser}
                alt=""
              />
            </div>
          </div>
        </div>
        {/* User message */}
        <div className="flex flex-col gap-2 max-w-[50%] ">
          <p className="p-3 px-4 bg-white rounded-xl rounded-bl-none">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Consectetur, animi?
          </p>
          <div className="flex text-sm text-gray-500 justify-between">
            <div className="flex gap-2 ">
              <img
                className={`h-6 w-6 object-cover rounded-full`}
                src={avatar}
                alt=""
              />
              <span className="">James Tariff</span>
            </div>
            <span>09:22 AM</span>
          </div>
        </div>
        {/* Own message */}
        <div className=" flex flex-col self-end gap-2 max-w-[50%] ">
          <p className="p-3 px-4 bg-primary text-white rounded-xl rounded-bl-none">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Consectetur, animi?
          </p>
          <div className="flex text-sm text-gray-500 justify-between">
            <span>09:22 AM</span>
            <div className="flex gap-2 ">
              <span className="">You</span>
              <img
                className={`h-6 w-6 object-cover rounded-full`}
                src={currentUser}
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CenterInfo;
