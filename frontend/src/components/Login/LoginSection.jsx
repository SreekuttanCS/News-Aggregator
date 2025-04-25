import React, { useState } from "react";
import "./login.css";
import Button from "./Button";
import axios from "axios";

const LoginSection = () => {
  const [enteredEmail, setEnteredemail] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");

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
      console.log("Successfully logged in:", response.data);
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
    <div className="flex flex-col items-center border login-section ">
      <h2 className="login-heading">Login</h2>
      <input
        type="text"
        className="login-input"
        value={enteredEmail}
        placeholder="Enter Email"
        onChange={(e) => setEnteredemail(e.target.value)}
      />
      <input
        type="password"
        className="login-input"
        placeholder="Enter Password"
        value={enteredPassword}
        onChange={(e) => setEnteredPassword(e.target.value)}
      />
      <span onClick={handleLogin}>
        <Button title={"Login"} />
      </span>
    </div>
  );
};

export default LoginSection;
