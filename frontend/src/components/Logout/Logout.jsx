import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../redux/LoggedSlice";

const Logout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    // Perform the logout actions
    localStorage.removeItem("token");
    navigate("/login");
    dispatch(logout());
  }, [navigate]);

  return <div>Logging out...</div>;
};

export default Logout;
