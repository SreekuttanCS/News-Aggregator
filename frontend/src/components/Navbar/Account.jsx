import React, { useState, useEffect, useCallback } from "react";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import { Menu, MenuItem } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { isPost, login, logout } from "../../redux/LoggedSlice.js";
import { Bounce, toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Make sure styles are imported

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
  }, [dispatch]);

  const handleClick = useCallback((event) => {
    setAnchorEl(event.currentTarget);
  }, []);

  const handleClose = useCallback(() => {
    setAnchorEl(null);
  }, []);

  const handleAuth = useCallback(() => {
    handleClose();
    if (isLogged) {
      toast.success("Logged Out", {
        position: "top-left",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
        transition: Bounce,
      });
      dispatch(logout());
      localStorage.removeItem("token");
      navigate("/");
    } else {
      navigate("/login");
    }
  }, [isLogged, dispatch, navigate, handleClose]);

  const handleCreatePage = useCallback(() => {
    dispatch(isPost(true));
    handleClose();
    navigate("/news/create");
  }, [dispatch, navigate, handleClose]);

  return (
    <>
      <ToastContainer />
      <div className="relative">
        <span
          className="cursor-pointer hover:text-gray-300 text-white"
          aria-label={ariaLabel}
          onClick={handleClick}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") handleClick(e);
          }}
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
    </>
  );
};

export default Account;
