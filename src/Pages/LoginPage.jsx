import React, { useEffect, useState } from "react";
import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import { client } from "../App";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loggedIn } from "../state/User/loginSlice";

const LoginPage = () => {
  const {username,isLoggedIn}=useSelector((state)=>state)
  const dispatch=useDispatch()
  const navigate=useNavigate()
  useEffect(()=>{
    if(isLoggedIn){
      navigate('/addPassword')
    }
  })
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData=new FormData(e.currentTarget)
    const username=formData.get("username")
    const password=formData.get("password")
    client.post('/users/login',{username,password})
    .then((res)=>{
      dispatch(loggedIn(),username)
      console.log(res.data);
    })
    .catch((err)=>{
      console.log(err);
    })
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
        name="username"
          type="text"
          label="Username"
          variant="outlined"
          sx={{ m: "20px" }}
        />
        <TextField
        name="password"
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
