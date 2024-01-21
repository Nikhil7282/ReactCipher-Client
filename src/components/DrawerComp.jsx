import {
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import React, { useState } from "react";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import { useNavigate } from "react-router-dom";
const DrawerComp = ({ links }) => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  return (
    <>
      <Drawer
        PaperProps={{ sx: { backgroundColor: "#07629f" } }}
        open={open}
        onClose={() => {
          setOpen(false);
        }}
        anchor="left"
      >
        <List>
          {links.map((link) => {
            return (
              <ListItemButton
                onClick={() => setOpen(false)}
                key={link.label}
                divider
              >
                <ListItemIcon>
                  <ListItemText
                    sx={{ color: "white" }}
                    onClick={() => navigate(link.goto)}
                  >
                    {link.label}
                  </ListItemText>
                </ListItemIcon>
              </ListItemButton>
            );
          })}
        </List>
      </Drawer>
      <IconButton
        sx={{ color: "white", marginLeft: "auto" }}
        onClick={() => {
          setOpen(!open);
        }}
      >
        <MenuOpenIcon />
      </IconButton>
    </>
  );
};

export default DrawerComp;
