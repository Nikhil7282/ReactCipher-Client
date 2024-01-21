import {
  AppBar,
  Box,
  Button,
  Grid,
  Tab,
  Tabs,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, { useState } from "react";
import LockPersonIcon from "@mui/icons-material/LockPerson";
import DrawerComp from "./DrawerComp";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
const Navbar = ({ links }) => {
  const theme = useTheme();
  const auth = useAuth();
  const navigate = useNavigate();
  // console.log(auth);
  // console.log(theme);
  const isMatch = useMediaQuery(theme.breakpoints.down("md"));
  const [value, setValue] = useState(null);
  return (
    <AppBar
      sx={{
        background:
          "linear-gradient(135deg, rgba(0,0,0,1) 18%, rgba(3,152,252,1) 100%)",
      }}
    >
      <Toolbar>
        {isMatch ? (
          <>
            <Typography>
              <LockPersonIcon />
            </Typography>
            <DrawerComp
              links={
                auth.isLoggedIn
                  ? links
                  : [
                      { label: "Login", goto: "/login" },
                      { label: "Signup", goto: "/login" },
                    ]
              }
            />
          </>
        ) : (
          <Grid sx={{ placeItems: "center" }} container spacing={1}>
            <Grid item xs={2}>
              <Typography
                sx={{ display: "flex", alignItems: "center" }}
                variant="Button text"
              >
                <LockPersonIcon sx={{ marginRight: 2 }} />
                ReactCipher
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Tabs
                value={value}
                textColor="inherit"
                indicatorColor="primary"
                onChange={(e, val) => {
                  setValue(val);
                }}
              >
                {auth.isLoggedIn &&
                  links.map((link) => {
                    return (
                      <Tab
                        label={link.label}
                        key={link.label}
                        onClick={() => navigate(link.goto)}
                      />
                    );
                  })}
              </Tabs>
            </Grid>
            <Grid item xs={1}></Grid>
            <Grid item xs={3}>
              <Box>
                {!auth.isLoggedIn && (
                  <>
                    <Button
                      sx={{
                        marginLeft: "auto",
                        background: "rgba(0,0,0,1) 18%,",
                      }}
                      variant="contained"
                      onClick={() => navigate("/login")}
                    >
                      Login
                    </Button>
                    <Button
                      sx={{ marginLeft: 2, background: "rgba(0,0,0,1) 18%," }}
                      variant="contained"
                      onClick={() => navigate("/login")}
                    >
                      SignUp
                    </Button>
                  </>
                )}
              </Box>
            </Grid>
          </Grid>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
