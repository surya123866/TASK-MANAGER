import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { GoogleLogin, useGoogleLogin } from "@react-oauth/google";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
const apiUrl = import.meta.env.VITE_API_URL;
const clientId = import.meta.VITE_GOOGLE_CLIENT_ID;

const Signup = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
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
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      const response = await axios.post(apiUrl + "/auth/register", {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
      });
      document.cookie = `token=${response.data.token}; path=/;`;
      navigate("/");
    } catch (error) {
      toast.error("Error registering:", error);
    }
  };

  const handleGoogleSignup = async (response) => {
    try {
      const res = await axios.post(apiUrl + "/auth/google", {
        token: response.credential,
      });
      const { name, email, picture } = res.data.user;
      toast.success("Google Registration success");
      Cookies.set("token", res.data.token, { expires: 7, path: "" });
      const userData = JSON.stringify({ name, email, picture });
      localStorage.setItem("userData", userData);
      navigate("/");
    } catch (error) {
      toast.error("Google signup failed:", error);
      console.error("Google signup failed:", error);
    }
  };

  const login = useGoogleLogin({
    onSuccess: handleGoogleSignup,
    onError: () => toast.error("Google login failed. Please try again."),
    auto_select: true,
  });

  const handleLoginFailure = (response) => {
    toast.error(`Google login failed: ${response}`);
  };

  return (
    <div className="flex flex-col gap-5 justify-between items-center w-full h-full">
      <div className="flex justify-between items-center bg-[#3273f5] h-16 px-10 w-full">
        <h1 className="text-2xl font-bold text-white">
          Task Management
        </h1>
        <div className="flex justify-center items-center gap-5">
          <div className="flex justify-center items-center font-bold bg-white text-[#4981f1] rounded-md py-1 px-2">
            <Link to={"/login"}>Login</Link>
          </div>
          <div className="flex justify-center items-center font-bold bg-white text-[#4981f1] rounded-md py-1 px-2">
            <Link to={"/signup"}>Signup</Link>
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-center items-center">
        <div className="text-left">
          <h2 className="text-2xl mb-4 font-bold text-[#3273f5]">Signup</h2>
          <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm border-2 border-[#3273f5]">
            <form onSubmit={handleSubmit}>
              <input
                name="firstName"
                type="text"
                placeholder="First Name"
                value={formData.firstName}
                onChange={handleChange}
                className="w-full p-2 mb-3 border rounded"
                required
              />
              <input
                name="lastName"
                type="text"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={handleChange}
                className="w-full p-2 mb-3 border rounded"
                required
              />
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
              <input
                name="confirmPassword"
                type="password"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full p-2 mb-3 border rounded"
                required
              />
              <button
                type="submit"
                className="w-full p-2 bg-[#3273f5] text-white rounded"
              >
                Signup
              </button>
              <div className="text-center mt-4">
                <a href="/login" className="font-bold">
                  Already have an account?{" "}
                  <span className="text-[#3273f5]">Login</span>
                </a>
              </div>
            </form>
            <div className="text-center mt-5">
              <button
                type="submit"
                className="p-2 bg-[#3273f5] text-white rounded"
                onClick={() => login()}
              >
                Signup with <span className="font-semibold">Google</span>
              </button>
            </div>
            <div className="w-full text-center mt-5">
              <GoogleLogin
                clientId={clientId}
                buttonText="Login with Google"
                onSuccess={handleGoogleSignup}
                onFailure={handleLoginFailure}
                cookiePolicy={"single_host_origin"}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
