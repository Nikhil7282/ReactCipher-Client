import { Drawer, IconButton, List,ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import React, { useState } from "react";
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
const DrawerComp = ({links}) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Drawer
      PaperProps={{sx:{backgroundColor:"#07629f"}}}
        open={open}
        onClose={() => {
          setOpen(false);
        }}
        anchor="left"
      >
        <List>
            {links.map((link)=>{
                return <ListItemButton  onClick={()=>setOpen(false)} key={link} divider>
                <ListItemIcon>
                    <ListItemText sx={{color:"white"}}>
                        {link}
                    </ListItemText>
                </ListItemIcon>
            </ListItemButton>
            })}
        </List>
      </Drawer>
      <IconButton sx={{color:"white",marginLeft:"auto"}} onClick={()=>{setOpen(!open)}}>
        <MenuOpenIcon/>
      </IconButton>
    </>
  );
};

export default DrawerComp;
