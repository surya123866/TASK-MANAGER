/* eslint-disable no-unused-vars */
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
const avatar =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQv_oL1l60gN7zHc_fMS11OeFR-mLDi3DgjNg&s";

const Navbar = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    Cookies.remove("token");
    navigate("/login");
  };
  const userData = JSON.parse(localStorage.getItem("userData"));
  const { name, email, picture } = userData || {};
  return (
    <>
      <div className="flex justify-between items-center mb-4 bg-[#3273f5] h-20 px-10 py-1 w-full">
        <h1 className="text-3xl font-bold text-white">
          Task Management
        </h1>
        <div className="flex justify-center items-center gap-10">
          <div className="flex justify-center items-center gap-2">
            <div>
              <p className="font-semibold text-lg text-white">{name}</p>
              <p className="font-semibold text-sm text-white">{email}</p>
            </div>
            <img
              src={picture || avatar}
              alt="userImage"
              className="size-12 rounded-full"
            />
          </div>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white font-medium px-2 py-1 rounded"
          >
            Logout
          </button>
        </div>
      </div>
    </>
  );
};
export default Navbar;
