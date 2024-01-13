import React, { useEffect, useState } from "react";
import { client} from "../App";
import toast from "react-hot-toast";

function AddPassword() {
  const [userDetails, setUserDetails] = useState({ password: "", title: "" });
  const [userPasswords, setUserPasswords] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserDetails({ ...userDetails, [name]: value });
  };
  const handleSubmit = async() => {
      await client.post(`/passwords/addPassword`, userDetails)
      .then((res) => {
        console.log(res.data);
        toast.success("Password Added");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
      client.get(`/passwords/getAllPasswords`)
      .then((res) => {
        console.log(res.data);
        setUserPasswords(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const decrypt = async(encryption) => {
    console.log(encryption);
    await client.post(`/passwords/decryptPassword`, {
      password: encryption.password,
      iv: encryption.iv,
    })
    .then((res)=>{
      // console.log(res.data.data);
      setUserPasswords(userPasswords.map((val)=>{
        return val.id===encryption.id ?{...encryption,title:res.data.data}:val
      }))
    })
    .catch((error)=>{
      console.log(error);
    })
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
            <div className="password" key={idx} onClick={()=>{decrypt(val)}}>
              <h3>{val.title}</h3>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default AddPassword;
