import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { Box, Button } from "@mui/material";
import { client } from "../App";
function PasswordSlot({ password, userPasswords, setUserPasswords }) {
  const decrypt = async (encryption) => {
    await client
      .post(`/passwords/decryptPassword`, {
        password: encryption.password,
        iv: encryption.iv,
      })
      .then((res) => {
        // console.log(res);
        setUserPasswords(
          userPasswords.map((val) => {
            return val.id === encryption.id
              ? { ...encryption, title: res.data.data }
              : val;
          })
        );
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <Box
      key={password.id}
      sx={{
        borderRadius: "7px",
        backgroundColor: "black",
        color: "white",
        width: "400px",
        height: "70px",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        margin: "10px",
        fontFamily: "Arial, Helvetica, sans-serif",
      }}
    >
      <h3
        onClick={() => {
          decrypt(password);
        }}
      >
        {password.title}
      </h3>
      {/* <Button>
        <ContentCopyIcon />
      </Button>
      <Button>
        <DeleteIcon />
      </Button> */}
    </Box>
  );
}

export default PasswordSlot;
