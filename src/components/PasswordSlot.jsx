import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { Box, Button } from "@mui/material";
import { client } from "../App";
import toast from "react-hot-toast";
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

  const deletePassword = async (id) => {
    // console.log(id);
    client.defaults.headers.common["Authorization"] =
      "Bearer " + sessionStorage.getItem("access_token");
    client
      .delete("/passwords/deletePassword", {
        data: {
          passwordId: id,
        },
      })
      .then((res) => {
        setUserPasswords(userPasswords.filter((pass) => pass.id !== id));
        toast.success(res.data.msg);
      })
      .catch((err) => {
        // console.log(err);
        toast.error(err.data.msg);
      });
  };

  return (
    <Box
      sx={{
        borderRadius: "7px",
        backgroundColor: "black",
        color: "white",
        // width: "400px",
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
      <Button onClick={() => deletePassword(password.id)}>
        <DeleteIcon />
      </Button>
    </Box>
  );
}

export default PasswordSlot;
