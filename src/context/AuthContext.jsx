import { createContext, useContext, useEffect, useState } from "react";
import { client } from "../App";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({ name: "", email: "" });
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    client
      .get("/users/verifyUser")
      .then((res) => {
        if (res.status === 200) {
          setIsLoggedIn(true);
          setUser(res.data.user);
        } else if (res.status === 401) {
          setIsLoggedIn(false);
          setUser({ name: "", email: "" });
        }
      })
      .catch((error) => {
        setIsLoggedIn(false);
        setUser({ name: "", email: "" });
        console.log(error);
      });
  }, []);

  const login = async (name, email) => {
    setUser({ ...user, name: name, email: email });
    setIsLoggedIn(true);
  };
  const logout = async () => {};
  const value = { user, login, isLoggedIn, logout };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
