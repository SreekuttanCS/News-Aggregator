import React, { useState } from "react";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import { Menu, MenuItem } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./navbar.css";
import { logout } from "../../redux/LoggedSlice.js";

const Account = ({ fontSize = "large", ariaLabel = "Manage Account" }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLogged } = useSelector((state) => state.logged);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleAuth = () => {
    if (isLogged) {
      dispatch(logout());
      localStorage.removeItem("token");
    } else {
      navigate("/login");
    }
  };
  const handleCreatePage = () => {
    navigate("/create");
  };

  return (
    <div>
      <span
        className="account-icon"
        aria-label={ariaLabel}
        onClick={handleClick}
      >
        <ManageAccountsIcon fontSize={fontSize} />
      </span>

      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        <MenuItem onClick={handleCreatePage} className="account-item">
          Create Post
        </MenuItem>
        <MenuItem onClick={handleAuth}>
          {isLogged ? "Logout" : "Login"}
        </MenuItem>
      </Menu>
    </div>
  );
};

export default Account;
