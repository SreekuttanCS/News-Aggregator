import React, { useState } from "react";
import Button from "../Button"; // Your custom button component
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { isSignin } from "../../redux/LoggedSlice";
import { Bounce, toast } from "react-toastify";
import CloseIcon from "@mui/icons-material/Close";

const SignUpSection = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [enteredName, setEnteredName] = useState("");
  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    if (enteredName && enteredEmail && enteredPassword) {
      try {
        const response = await axios.post(
          "http://localhost:5000/api/user/signup",
          {
            name: enteredName,
            email: enteredEmail,
            password: enteredPassword,
          }
        );
        dispatch(isSignin(true));
        toast.success(`Welcome ${enteredName}!`, {
          position: "top-left",
          autoClose: 3000,
          theme: "dark",
          transition: Bounce,
        });
        navigate("/");
      } catch {
        toast.error("Signup failed. Please try again.", {
          position: "top-left",
          autoClose: 3000,
          theme: "dark",
          transition: Bounce,
        });
      }
    } else {
      toast.warning("Please fill out all fields.", {
        position: "top-left",
        autoClose: 3000,
        theme: "dark",
        transition: Bounce,
      });
    }
  };

  const handleHome = () => {
    navigate("/");
  };

  return (
    <div className="flex relative flex-col items-center justify-center gap-5 w-full max-w-[500px] px-8 py-10 mx-auto bg-[#121212] rounded-2xl shadow-2xl">
      <span
        className="absolute left-5 top-5 text-white hover:text-gray-400 cursor-pointer transition"
        onClick={handleHome}
      >
        <CloseIcon fontSize="medium" />
      </span>

      <h2 className="text-white text-3xl font-bold italic font-sans">
        Sign Up
      </h2>
      <p className="text-gray-300 text-sm text-center">
        Create your account to get started with NewsGrid!
      </p>

      <div className="w-full">
        <input
          type="text"
          className="w-full p-3 bg-[#1e1e1e] border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-indigo-500 transition"
          placeholder="Enter Name"
          value={enteredName}
          onChange={(e) => setEnteredName(e.target.value)}
        />
      </div>
      <div className="w-full">
        <input
          type="email"
          className="w-full p-3 bg-[#1e1e1e] border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-indigo-500 transition"
          placeholder="Enter Email"
          value={enteredEmail}
          onChange={(e) => setEnteredEmail(e.target.value)}
        />
      </div>
      <div className="w-full">
        <input
          type="password"
          className="w-full p-3 bg-[#1e1e1e] border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-indigo-500 transition"
          placeholder="Enter Password"
          value={enteredPassword}
          onChange={(e) => setEnteredPassword(e.target.value)}
        />
      </div>

      <div className="w-full">
        <span onClick={handleSignup}>
          <Button title="Sign Up" />
        </span>
      </div>
    </div>
  );
};

export default SignUpSection;
