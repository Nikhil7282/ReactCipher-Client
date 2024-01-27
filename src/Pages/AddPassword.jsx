import React, { useEffect, useLayoutEffect, useState } from "react";
import { client } from "../App";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

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
    await client
      .post(`/passwords/addPassword`, userDetails)
      .then((res) => {
        console.log(res.data);
        toast.success("Password Added");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useLayoutEffect(() => {
    if (auth?.isLoggedIn && auth?.user) {
      client.defaults.headers.common["Authorization"] =
        "Bearer " + sessionStorage.getItem("access_token");
      client
        .get(`/passwords/userPasswords`)
        .then((res) => {
          // console.log(res.data);
          setUserPasswords(res.data.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [auth]);

  useEffect(() => {
    // console.log(auth);
    if (!auth.isLoggedIn || !auth.user) {
      navigate("/login");
    } else {
      localStorage.setItem("username", auth?.user?.username);
      localStorage.setItem("userId", auth?.user?.userId);
      localStorage.setItem("email", auth?.user?.email);
    }
  }, [auth]);

  const decrypt = async (encryption) => {
    console.log(encryption);
    await client
      .post(`/passwords/decryptPassword`, {
        password: encryption.password,
        iv: encryption.iv,
      })
      .then((res) => {
        // console.log(res.data.data);
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
    <>
      <div className="AddingPassword">
        <input
          type="text"
          name="password"
          placeholder="Password..."
          onChange={handleChange}
        />
        <input
          type="text"
          name="title"
          placeholder="Title.."
          onChange={handleChange}
        />
        <button onClick={handleSubmit}>Add Password</button>
      </div>
      <div className="Passwords">
        {userPasswords.map((val, idx) => {
          return (
            <div
              className="password"
              key={idx}
              onClick={() => {
                decrypt(val);
              }}
            >
              <h3>{val.title}</h3>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default AddPassword;
