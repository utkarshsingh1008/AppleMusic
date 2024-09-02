import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  TextField,
  Button,
  Container,
  Typography,
  Alert,
  Box,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import "./Login1.css";

const theme = createTheme();

function Login() {
  const [getData, setData] = useState({
    email: "",
    password: "",
    appType: "music",
  });
  const [getError, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSignUp = () => {
    navigate("/signUp");
  };

  const onChangeHandler = (event) => {
    setData({ ...getData, [event.target.name]: event.target.value });
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();
    setError(null);
    if (!getData.email) {
      setError("Email is mandatory");
      return;
    }
    if (!getData.password) {
      setError("Password cannot be empty");
      return;
    }
    axios
      .post("https://academics.newtonschool.co/api/v1/user/login", getData, {
        headers: {
          projectID: "cp0doe0u3fx9",
        },
      })
      .then((result) => {
        localStorage.setItem("name", result.data.data.user.name);
        localStorage.setItem("token", result.data.token);
        navigate("/");
      })
      .catch((error) => {
        if (error.response && error.response.data.message) {
          setError(error.response.data.message);
        } else {
          setError("Unknown error");
        }
      });
  };

  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = (event) => event.preventDefault();

  return (
    <div className=" main-container">
      <button className="button-x">
        X
      </button>
      <FaApple className="logo-app" />
      <h1 className="login-heading">Login</h1>
      <p className="para-text">Enter your email to get started.</p>
      <input
      value={getData.email}
      onChange={onChangeHandler}
        type="text"
        name="email"
        placeholder="Email or Apple ID"
        className="input-email"
      />
    </div>
  );
}
