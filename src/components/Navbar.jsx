import {
  AppBar,
  Box,
  Button,
  Grid,
  Tab,
  Tabs,
  Toolbar,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import LockPersonIcon from "@mui/icons-material/LockPerson";
const Navbar = ({ links }) => {
  const [value, setValue] = useState();
  return (
    <AppBar
      sx={{
        backgroundImage:
          "linear-gradient(90deg, rgba(201,63,56,1) 02%, rgba(111,18,115,1) 36%, rgba(158,49,148,1) 73%, rgba(240,155,228,1) 100%);",
      }}
    >
      <Toolbar>
        <Grid sx={{placeItems:"center"}}container spacing={1}>
          <Grid item xs={2}>
            <Typography>
              <LockPersonIcon />
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Tabs
              value={value}
              textColor="inherit"
              indicatorColor="secondary"
              onChange={(e, val) => {
                setValue(val);
              }}
            >
              {links.map((link) => {
                return <Tab label={link} key={link} />;
              })}
            </Tabs>
          </Grid>
          <Grid item xs={1}></Grid>
          <Grid item xs={3}>
            <Box>
              <Button sx={{ marginLeft: "auto",background:"rgba(201,63,56,1)" }} variant="contained">
                Login
              </Button>
              <Button sx={{ marginLeft: 1 ,background:"rgba(201,63,56,1)"}} variant="contained">
                SignUp
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
