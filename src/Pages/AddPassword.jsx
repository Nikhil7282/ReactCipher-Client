import React, { useEffect, useLayoutEffect, useState } from "react";
import { client } from "../App";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Box, Button, TextField, Grid } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import PasswordSlot from "../components/PasswordSlot";
function AddPassword() {
  const [userDetails, setUserDetails] = useState({ password: "", title: "" });
  const [userPasswords, setUserPasswords] = useState([]);
  const auth = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserDetails({ ...userDetails, [name]: value });
  };

  const handleSubmit = async () => {
    if (userDetails.password === "" || userDetails.title === "") {
      return toast.error(`You must provide a password and a title`);
    }
    toast.loading("Adding Password", { id: "add" });
    await client
      .post(`/passwords/addPassword`, userDetails)
      .then((res) => {
        // console.log(res.data);
        setUserPasswords([
          ...userPasswords,
          res.data.data,
          // { title: userDetails.title, initPassword: userDetails.password },
        ]);
        setUserDetails({ password: "", title: "" });
        toast.success("Password Added", { id: "add" });
      })
      .catch((error) => {
        console.log(error);
        toast.error("Error in adding password", { id: "add" });
      });
  };

  useLayoutEffect(() => {
    if (auth?.isLoggedIn && auth?.user) {
      client.defaults.headers.common["Authorization"] =
        "Bearer " + sessionStorage.getItem("access_token");
      client
        .get(`/passwords/userPasswords`)
        .then((res) => {
          // console.log(res.data.data);
          setUserPasswords(res.data.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [auth]);

  useEffect(() => {
    if (!auth.isLoggedIn || !auth.user) {
      navigate("/login");
    } else {
      localStorage.setItem("username", auth?.user?.username);
      localStorage.setItem("userId", auth?.user?.userId);
      localStorage.setItem("email", auth?.user?.email);
    }
  }, [auth]);

  return (
    <Grid container sx={{ mt: "65px" }}>
      <Grid
        item
        xs={12}
        sm={6}
        sx={{
          height: { sm: "100vh", xs: "50vh" },
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <TextField
            value={userDetails.password}
            sx={{ margin: "10px" }}
            name="password"
            type="text"
            id="input"
            label="Password"
            variant="filled"
            onChange={handleChange}
          />
          <TextField
            value={userDetails.title}
            sx={{ margin: "10px" }}
            name="title"
            type="text"
            id="input-2"
            label="Title"
            variant="filled"
            onChange={handleChange}
          />
          <Button
            sx={{ width: "50%" }}
            color="info"
            variant="contained"
            onClick={handleSubmit}
            startIcon={<AddIcon />}
          >
            Add
          </Button>
        </Box>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Box>
          <Grid
            // className="Passwords"
            container
            // sx={{ border: "1px solid black" }}
          >
            {userPasswords.length === 0 ? (
              <Box>
                <h3>No Passwords Yet</h3>
              </Box>
            ) : (
              userPasswords.map((val) => {
                return (
                  <Grid item sm={12} md={6} xs={12}>
                    <PasswordSlot
                      key={val.id}
                      password={val}
                      userPasswords={userPasswords}
                      setUserPasswords={setUserPasswords}
                    />
                  </Grid>
                );
              })
            )}
          </Grid>
        </Box>
      </Grid>
    </Grid>
  );
}

export default AddPassword;
