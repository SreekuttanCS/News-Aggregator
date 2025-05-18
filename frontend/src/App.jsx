import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CategoryNews from "./components/Category/CategoryNews";
import SearchNews from "./components/News/SearchNews";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import CreateNews from "./pages/CreateNews";
import IndividualNews from "./components/News/IndividualNews";
import Admin from "./pages/Admin";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/create" element={<CreateNews />} />
        <Route path="/category/:category" element={<CategoryNews />} />
        <Route path="/search" element={<SearchNews />} />
        <Route path="/news/:id" element={<IndividualNews />} />
        <Route path="/admin" element={<Admin />} />
       
      </Routes>
    </Router>
  );
};

export default App;
