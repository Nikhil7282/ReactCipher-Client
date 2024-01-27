import React, { useEffect, useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import LoginIcon from "@mui/icons-material/Login";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import { client } from "../App";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const LoginPage = () => {
  const navigate = useNavigate();
  const [isSignUp, setIsSignUp] = useState(false);
  const auth = useAuth();

  useEffect(() => {
    if (auth.isLoggedIn && auth.user) {
      navigate("/addPassword");
    }
  }, [auth]);

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const username = formData.get("username");
    const password = formData.get("password");
    client
      .post("/users/login", { username, password })
      .then((res) => {
        if (res.status === 200) {
          auth.login(res.data.user);
          sessionStorage.setItem("access_token", res.data.accessToken);
          navigate("/addPassword");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSignUpSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const username = formData.get("username");
    const password = formData.get("password");
    const email = formData.get("email");
    if (username === "" || password === "" || email === "") {
      return alert("Fill all Details");
    }
    client
      .post(`/users/signUp`, { username, email, password })
      .then((res) => {
        console.log(res.data);
      })
      .catch((Error) => {
        console.log(Error);
      });
  };

  return (
    <form
      onSubmit={isSignUp ? handleSignUpSubmit : handleLoginSubmit}
      style={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <Box
        display="flex"
        flexDirection={"column"}
        maxWidth={400}
        alignItems={"center"}
        justifyContent={"center"}
        margin={"auto"}
        marginTop={isSignUp ? "20px" : "90px"}
        padding={3}
        borderRadius={5}
        boxShadow={"5px 5px 10px #ccc"}
        sx={{
          ":hover": {
            boxShadow: "10px 10px 20px #ccc",
          },
        }}
      >
        <Typography variant="h2" padding={3} textAlign={"center"}>
          {isSignUp ? "SignUp" : "Login"}
        </Typography>
        <TextField
          // placeholder="Username"
          name="username"
          type="text"
          label="Username"
          variant="outlined"
          sx={{ m: "20px" }}
          margin="normal"
          required
        />
        {isSignUp && (
          <TextField
            // placeholder="Username"
            name="email"
            type="text"
            label="Email"
            variant="outlined"
            sx={{ m: "20px" }}
            margin="normal"
            required
          />
        )}
        <TextField
          // placeholder="Password"
          name="password"
          type="password"
          label="Password"
          variant="outlined"
          sx={{ m: "20px" }}
          margin="normal"
          required
        />
        <Button
          endIcon={isSignUp ? <HowToRegIcon /> : <LoginIcon />}
          variant="contained"
          disableElevation
          type="submit"
          sx={{ marginTop: 3, borderRadius: 3 }}
        >
          {isSignUp ? "SignUp" : "Login"}
        </Button>
        <Button
          endIcon={isSignUp ? <LoginIcon /> : <HowToRegIcon />}
          sx={{ marginTop: 3, borderRadius: 3 }}
          onClick={() => {
            setIsSignUp(!isSignUp);
          }}
        >
          Go To{isSignUp ? " Login" : " SIGNUP"}
        </Button>
      </Box>
    </form>
  );
};

export default LoginPage;
