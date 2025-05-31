import React, { useState } from "react";
import axios from "axios";
import { Email, Lock, Close } from "@mui/icons-material";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../../redux/LoggedSlice";
import { Bounce, toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LoginSection = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [enteredEmail, setEnteredemail] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");

  const handleSuccessfulLogin = (token, isAdmin = false) => {
    localStorage.setItem("token", token);
    dispatch(login());

    toast.success("Successfully Logged In", {
      position: "top-left",
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "dark",
      transition: Bounce,
    });

    navigate(isAdmin ? "/admin" : "/");
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!enteredEmail || !enteredPassword) {
      return toast.warn("Enter Email and Password", {
        position: "top-left",
        autoClose: 3000,
        hideProgressBar: true,
        theme: "dark",
        transition: Bounce,
      });
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/user/login",
        {
          email: enteredEmail,
          password: enteredPassword,
        }
      );
      handleSuccessfulLogin(response.data.token);
    } catch (userError) {
      try {
        const adminResponse = await axios.post(
          "http://localhost:5000/api/admin/login",
          {
            email: enteredEmail,
            password: enteredPassword,
          }
        );
        handleSuccessfulLogin(adminResponse.data.token, true);
      } catch (err) {
        toast.error("Login failed. Please check your credentials.", {
          position: "top-left",
          autoClose: 3000,
          theme: "dark",
          transition: Bounce,
        });
        console.error(
          "Login error:",
          err.response?.data?.message || err.message
        );
      }
    }
  };

  const handleHome = () => navigate("/");

  return (
    <div className="flex items-center justify-center min-h-screen  p-4">
      <div className="relative bg-gray-800 rounded-2xl shadow-lg w-full max-w-md px-6 py-10 text-white space-y-6">
        <button
          onClick={handleHome}
          className="absolute top-4 left-4 text-gray-400 hover:text-white"
        >
          <Close />
        </button>

        <div className="text-center">
          <h1 className="text-3xl font-bold font-[Montserrat] italic mb-2">
            NewsGrid
          </h1>
          <p className="text-sm text-gray-300">
            Log in to unlock exclusive content and enjoy a premium experience.
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div className="flex items-center bg-zinc-700 rounded-lg px-3 py-2">
            <Email className="text-gray-400 mr-2" />
            <input
              type="email"
              value={enteredEmail}
              onChange={(e) => setEnteredemail(e.target.value)}
              placeholder="Enter Email"
              className="w-full bg-transparent outline-none text-sm"
              required
            />
          </div>

          <div className="flex items-center bg-zinc-700 rounded-lg px-3 py-2">
            <Lock className="text-gray-400 mr-2" />
            <input
              type="password"
              value={enteredPassword}
              onChange={(e) => setEnteredPassword(e.target.value)}
              placeholder="Enter Password"
              className="w-full bg-transparent outline-none text-sm"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 transition-all py-2 rounded-xl font-semibold mt-2"
          >
            Login
          </button>
        </form>

        <div className="text-center text-sm">
          <Link to="/signup" className="text-gray-400 hover:underline">
            If you haven't signed up yet, please create an{" "}
            <span className="text-blue-400">account</span>.
          </Link>
        </div>

        <ToastContainer />
      </div>
    </div>
  );
};

export default LoginSection;
