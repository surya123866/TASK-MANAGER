/* eslint-disable react/no-unescaped-entities */
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { GoogleLogin, useGoogleLogin } from "@react-oauth/google";
import { toast } from "react-toastify";
const apiUrl = import.meta.env.VITE_API_URL;
const clientId = import.meta.CLIENT_ID;
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
      Cookies.set("token", response.data.token, { expires: 7, path: "" });
      navigate("/");
    } catch (error) {
      console.error("Error logging in:", error);
      alert("Failed to login. Please check your credentials.");
    }
  };

  const handleGoogleLogin = async (response) => {
    console.log(response);
    try {
      const res = await axios.post(apiUrl + "/auth/google", {
        token: response.credential,
      });
      Cookies.set("token", res.data.token, { expires: 7, path: "" });
      navigate("/");
    } catch (error) {
      console.error("Google login failed:", error);
      toast.error("Google login failed. Please try again.");
    }
  };

  const login = useGoogleLogin({
    onSuccess: handleGoogleLogin,
    onError: () => toast.error("Google login failed. Please try again."),
    auto_select: true,
  });

  const handleLoginFailure = (response) => {
     toast.error(`Google login failed: ${response}`);
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="text-left">
        <h2 className="text-2xl mb-4 font-bold text-[#3273f5]">Login</h2>
        <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm border-2 border-[#3273f5]">
          <form onSubmit={handleSubmit}>
            <input
              name="email"
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 mb-3 border rounded"
              required
            />
            <input
              name="password"
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-2 mb-3 border rounded"
              required
            />
            <button
              type="submit"
              className="w-full p-2 bg-[#3273f5] text-white rounded"
            >
              Login
            </button>
            <div className="text-center mt-4">
              <a href="/signup" className="font-bold">
                Don't have an account?{" "}
                <span className="text-[#3273f5]">Signup</span>
              </a>
            </div>
          </form>
          <div className="text-center mt-5">
            <button
              type="submit"
              className="p-2 bg-[#3273f5] text-white rounded"
              onClick={() => login()}
            >
              Login with <span className="font-semibold">Google</span>
            </button>
          </div>
          <div className="w-full text-center mt-5">
            <GoogleLogin
              clientId={clientId}
              buttonText="Login with Google"
              onSuccess={handleGoogleLogin}
              onFailure={handleLoginFailure}
              cookiePolicy={"single_host_origin"}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
