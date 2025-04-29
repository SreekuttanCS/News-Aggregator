import React from "react";
import Home from "./Home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Signup from "./components/SignUp/Signup";
import Login from "./components/Login/login";
import Logout from "./components/Logout/Logout";
import CategoryNews from "./components/Category/CategoryNews";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="category/:category" element={<CategoryNews />} />
      </Routes>
    </Router>
  );
};

export default App;
