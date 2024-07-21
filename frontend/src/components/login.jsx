/* eslint-disable react/no-unescaped-entities */
import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useGoogleLogin } from "@react-oauth/google";
import { toast } from "react-toastify";
const apiUrl = import.meta.env.VITE_API_URL;

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(apiUrl + "/auth/login", {
        email: formData.email,
        password: formData.password,
      });
      const { name, email } = response.data.user;
      toast.success(response.data.message);
      Cookies.set("token", response.data.token, { expires: 7, path: "" });
      const userData = JSON.stringify({ name, email });
      localStorage.setItem("userData", userData);
      navigate("/");
    } catch (error) {
      console.error("Error login:", error);
      toast.error(error.response.data);
    }
  };

  const handleGoogleLogin = async (response) => {
    try {
      const res = await axios.post(apiUrl + "/auth/google", {
        accessToken: response.access_token,
      });
      const { name, email, picture } = res.data.user;
      toast.success("Login success");
      Cookies.set("token", res.data.token, { expires: 7, path: "" });
      const userData = JSON.stringify({ name, email, picture });
      localStorage.setItem("userData", userData);
      navigate("/");
    } catch (error) {
      console.error("Google login failed:", error);
      toast.error(error.response.data);
    }
  };

  const login = useGoogleLogin({
    onSuccess: handleGoogleLogin,
    onError: () => toast.error("Google login failed. Please try again."),
    auto_select: true,
  });

  return (
    <div className="flex flex-col gap-5 justify-between items-center w-full h-full">
      <div className="flex justify-between items-center bg-[#3273f5] h-16 px-2 lg:px-4 sm:px-10 w-full">
        <h1 className="text-xl sm:text-2xl font-bold text-white">
          Task Management
        </h1>
        <div className="flex justify-center items-center gap-2 sm:gap-5">
          <div className="flex justify-center items-center font-bold bg-white text-[#4981f1] rounded-md py-1 px-2 text-sm sm:text-base">
            <Link to={"/login"}>Login</Link>
          </div>
          <div className="flex justify-center items-center font-bold text-white rounded-md py-1 px-2 text-sm sm:text-base">
            <Link to={"/signup"}>Signup</Link>
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-center items-center w-full p-4">
        <div className="text-left w-full max-w-md">
          <h2 className="text-xl sm:text-2xl mb-4 font-bold text-[#3273f5]">
            Login
          </h2>
          <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md border-2 border-[#3273f5]">
            <form onSubmit={handleSubmit}>
              <input
                name="email"
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-2 mb-3 border rounded text-sm sm:text-base"
                required
              />
              <input
                name="password"
                type="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="w-full p-2 mb-3 border rounded text-sm sm:text-base"
                required
              />
              <button
                type="submit"
                className="w-full p-2 bg-[#3273f5] text-white rounded text-sm sm:text-base"
              >
                Login
              </button>
              <div className="text-center mt-4">
                <Link to="/signup" className="font-bold text-sm sm:text-base">
                  Don't have an account?{" "}
                  <span className="text-[#3273f5]">Signup</span>
                </Link>
              </div>
            </form>
            <div className="text-center mt-5">
              <button
                type="submit"
                className="p-2 bg-[#3273f5] text-white rounded text-sm sm:text-base"
                onClick={() => login()}
              >
                Login with <span className="font-semibold">Google</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
