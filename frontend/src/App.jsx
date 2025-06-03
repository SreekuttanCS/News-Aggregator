import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { useSelector } from "react-redux";

import CategoryNews from "./components/Category/CategoryNews";
import SearchNews from "./components/News/SearchNews";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import CreateNews from "./pages/CreateNews";
import IndividualNews from "./components/News/IndividualNews";
import Admin from "./pages/Admin";
import AdminIndividualNews from "./components/AdminNewsDetail/AdminIndividualNews";
import IndividualUser from "./components/AdminUserDetail/IndividualUser";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route path="/news/create" element={<CreateNews />} />

        <Route path="/category/:category" element={<CategoryNews />} />
        <Route path="/search" element={<SearchNews />} />
        <Route path="/news/:id" element={<IndividualNews />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/admin/news/:id" element={<AdminIndividualNews />} />
        <Route path="/admin/user/:id" element={<IndividualUser />} />
      </Routes>
    </Router>
  );
};

export default App;
