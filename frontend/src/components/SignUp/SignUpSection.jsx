import React, { useState } from "react";
import "../Login/login.css";
import Button from "../Button";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { isSignin } from "../../redux/LoggedSlice";
const SignUpSection = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [enteredName, setEnteredName] = useState("");
  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");
  const handleSignup = async (e) => {
    e.preventDefault();

    if (enteredName != "" && enteredEmail != "" && enteredPassword != "") {
      console.log("ethi");
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
        navigate("/");
      } catch (err) {
        console.log("Failed to sign in", err);
      }
    }
  };
  return (
    <div className="flex flex-col items-center border login-section ">
      <h2 className="login-heading">Sign Up</h2>
      <input
        type="text"
        className="login-input"
        value={enteredName}
        placeholder="Enter Name"
        onChange={(e) => setEnteredName(e.target.value)}
      />
      <input
        type="text"
        className="login-input"
        value={enteredEmail}
        placeholder="Enter Email"
        onChange={(e) => setEnteredEmail(e.target.value)}
      />
      <input
        type="password"
        className="login-input"
        placeholder="Enter Password"
        value={enteredPassword}
        onChange={(e) => setEnteredPassword(e.target.value)}
      />
      <span onClick={handleSignup}>
        <Button title={"Sign in "} />
      </span>
    </div>
  );
};

export default SignUpSection;
