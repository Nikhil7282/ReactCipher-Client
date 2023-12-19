import React, { useState } from "react";
import { Box, Button, Grid, TextField, Typography } from "@mui/material";

const LoginPage = () => {
  const [userDetails, setUserDetails] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserDetails({ ...userDetails, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(userDetails);
  };
  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <form
      onSubmit={handleSubmit}
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <Typography variant="h5">Login</Typography>
        <TextField
        onChange={()=>{handleChange}}
          type="text"
          label="Username"
          variant="outlined"
          sx={{ m: "20px" }}
        />
        <TextField
        onChange={()=>{handleChange}}
          type="password"
          label="Password"
          variant="outlined"
          sx={{ m: "20px" }}
        />
        <Button variant="contained" disableElevation type="submit">
          Login
        </Button>
      </form>
    </Box>
  );
};

export default LoginPage;
