import { createContext, useEffect, useState } from "react";
import { client } from "../App";

export const authContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({ name: "", email: "" });
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const value = { user, setUser, isLoggedIn, setIsLoggedIn };

  useEffect(() => {
    client
      .get("/users/verifyUser")
      .then((res) => {
        setIsLoggedIn(true);
        setUser(res.data.user);
        // console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return <authContext.Provider value={value}>{children}</authContext.Provider>;
};
