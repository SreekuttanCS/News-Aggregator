import React from "react";
import Home from "./Home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Signup from "./components/SignUp/Signup";
import Login from "./components/Login/login";
import CategoryNews from "./components/Category/CategoryNews";
import CreateNews from "./components/News Creation/CreateNews";
import SearchNews from "./components/News/SearchNews";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/create" element={<CreateNews />} />
        <Route path="/category/:category" element={<CategoryNews />} />
        <Route Path="/search" element={<SearchNews />} />
      </Routes>
    </Router>
  );
};

export default App;
