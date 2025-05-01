import React, { useState } from "react";
import "./login.css";
import Button from "../Button.jsx";
import axios from "axios";
// import { useSelector } from "react-redux";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../../redux/LoggedSlice.js";

const LoginSection = () => {
  const navigate = useNavigate();
  const [enteredEmail, setEnteredemail] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");
  // const { isLogged } = useSelector((state) => state.logged);
  const dispatch = useDispatch();
  
  const handleLogin = async (e) => {
    e.preventDefault();
    if (enteredEmail !== "" && enteredPassword !== "") {
      try {
        const response = await axios.post(
          "http://localhost:5000/api/user/login",
          {
            email: enteredEmail,
            password: enteredPassword,
          }
        );
        navigate("/");
        localStorage.setItem("token", response.data.token);
        dispatch(login());
      } catch (err) {
        console.error(
          "Failed to Login:",
          err.response?.data?.message || err.message
        );
      }
    } else {
      console.log("Enter Email and Password");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center gap-3  md:h-[500px] md:w-[500px] login-section ">
      <h2 className="login-heading">NewsGrid</h2>
      <span className="login-caption">
        Log in to unlock exclusive content and enjoy a premium experience.
      </span>
      <span className="input-box">
        <input
          type="text"
          className="login-input"
          value={enteredEmail}
          placeholder="Enter Email"
          onChange={(e) => setEnteredemail(e.target.value)}
        />
        <EmailIcon />
      </span>
      <span className="input-box">
        <input
          type="password"
          className="login-input"
          placeholder="Enter Password"
          value={enteredPassword}
          onChange={(e) => setEnteredPassword(e.target.value)}
        />
        <LockIcon />
      </span>
      <span onClick={handleLogin}>
        <Button title={"Login"} />
      </span>
    </div>
  );
};

export default LoginSection;
