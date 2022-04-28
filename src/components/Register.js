import React, { useState } from "react";
import AuthService from "../services/auth.service";
import { useNavigate } from "react-router-dom";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";

const Register = () => {
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [username, setUsername] = useState("");
  let [phone, setPhone] = useState("");
  let [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };
  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };
  const handleChangeUsername = (e) => {
    setUsername(e.target.value);
  };
  const handleChangePhone = (e) => {
    setPhone(e.target.value);
  };

  const handleRegister = () => {
    AuthService.register(email, password, username, phone)
      .then(() => {
        window.alert("註冊成功! 將前往登入頁面");
        navigate("/login");
      })
      .catch((e) => {
        setErrorMessage(e.response.data);
      });
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          borderStyle: "solid",
          borderRadius: "1rem",
          padding: "2rem",
          // backgroundColor: "gray",
        }}
      >
        <h1>註冊</h1>
        {errorMessage && <Alert severity="warning">{errorMessage}</Alert>}

        <TextField
          onChange={handleChangeEmail}
          type="email"
          label="Email"
          variant="outlined"
        />
        <TextField
          onChange={handleChangePassword}
          type="password"
          label="Password"
          variant="outlined"
        />
        <TextField
          onChange={handleChangeUsername}
          type="text"
          label="name"
          variant="outlined"
        />
        <TextField
          onChange={handleChangePhone}
          type="text"
          label="phone"
          variant="outlined"
        />
        <Button onClick={handleRegister} variant="contained">
          送出
        </Button>
      </Box>
    </Box>
  );
};

export default Register;