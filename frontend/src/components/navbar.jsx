/* eslint-disable no-unused-vars */
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import Profile from "./profile";
import { useState } from "react";

const avatar =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQv_oL1l60gN7zHc_fMS11OeFR-mLDi3DgjNg&s";

const Navbar = () => {
  const [profileModalIsOpen, setOpenProfile] = useState(false);
  const navigate = useNavigate();
  const handleLogout = () => {
    Cookies.remove("token");
    navigate("/login");
  };
  const userData = JSON.parse(localStorage.getItem("userData"));
  const { name, email, picture } = userData || {};

  return (
    <div className="bg-[#3273f5] h-20 px-2 lg:px-4 py-2 w-full">
      <div className="flex justify-between items-center bg-[#3273f5] h-16 px-2 lg:px-4 sm:px-10 w-full">
        <h1 className="text-xl sm:text-2xl font-bold text-white">
          Task Management
        </h1>
        <div className="flex items-center gap-4 sm:gap-10">
          <div className="hidden sm:flex items-center gap-2">
            <div>
              <p className="font-semibold text-base text-white">{name}</p>
              <p className="font-semibold text-sm text-white">{email}</p>
            </div>
            <img
              src={picture || avatar}
              alt="userImage"
              className="w-12 h-12 rounded-full"
            />
          </div>
          <button
            onClick={handleLogout}
            className="bg-[#f56464] text-white font-medium px-3 py-1 rounded text-sm sm:text-base"
          >
            Logout
          </button>
          <div
            className="flex sm:hidden flex-col gap-1"
            onClick={() => setOpenProfile(true)}
          >
            <div className="w-7 bg-[#f56464] h-1 rounded-lg" />
            <div className="w-7 bg-[#f56464] h-1 rounded-lg" />
            <div className="w-7 bg-[#f56464] h-1 rounded-lg" />
          </div>
          <Profile
            profile={userData}
            isOpen={profileModalIsOpen}
            setIsOpen={setOpenProfile}
          />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
