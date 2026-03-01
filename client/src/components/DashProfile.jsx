import { TextInput } from "flowbite-react";
import React from "react";
import { useSelector } from "react-redux";

export default function DashProfile() {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <div className="max-w-lg mx-auto p-3 w-full">
      <h1 className="my-7 text-center font-semibold text-3xl">Profile</h1>
      <form className="flex flex-col">
        <div className="w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full">
          <img
            className="w-full h-full object-cover rounded-full border-8 border-[lightgray]"
            src={currentUser?.profilePicture}
            alt="User"
          />
        </div>
        <TextInput type="text" id="username" placeholder="Username" />
      </form>
    </div>
  );
}
