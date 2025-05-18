import React, { useState } from "react";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import { Menu, MenuItem } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./navbar.css";
import { isPost, login, logout } from "../../redux/LoggedSlice.js";
import { Bounce, toast, ToastContainer } from "react-toastify";
import { useEffect } from "react";

const Account = ({ fontSize = "large", ariaLabel = "Manage Account" }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLogged } = useSelector((state) => state.logged);
  const [anchorEl, setAnchorEl] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      dispatch(logout(false));
    } else {
      dispatch(login(true));
    }
  }, []);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleAuth = () => {
    if (isLogged) {
      toast.success("Logged Out", {
        position: "top-left",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
      dispatch(logout());
      localStorage.removeItem("token");
    } else {
      navigate("/login");
    }
  };
  const handleCreatePage = () => {
    dispatch(isPost(true));
    navigate("/create");
  };

  return (
    <div className="relative">
      <span
        className="cursor-pointer hover:text-gray-300 text-white"
        aria-label={ariaLabel}
        onClick={handleClick}
      >
        <ManageAccountsIcon fontSize={fontSize} />
      </span>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        className="z-50"
      >
        <MenuItem onClick={handleCreatePage}>Create Post</MenuItem>
        <MenuItem onClick={handleAuth}>
          {isLogged ? "Logout" : "Login"}
        </MenuItem>
      </Menu>
    </div>
  );
};

export default Account;
