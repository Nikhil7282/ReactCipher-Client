import { createContext, useContext, useEffect, useState } from "react";
import { client } from "../App";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    client
      .get("/users/refreshToken")
      .then((res) => {
        if (res.status === 200) {
          setUser(res.data.user);
          setIsLoggedIn(true);
          sessionStorage.setItem("access_token", res.data.accessToken);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const login = async (userObj) => {
    setUser(userObj);
    setIsLoggedIn(true);
  };

  const logout = async () => {
    client.defaults.headers.common["Authorization"] =
      "Bearer " + sessionStorage.getItem("access_token");
    client.post("/users/logout").then((res) => {
      if (res.status === 200) {
        setIsLoggedIn(false);
        setUser(null);
        sessionStorage.removeItem("access_token");
        window.location.reload();
      }
    });
  };
  const value = { user, login, isLoggedIn, logout };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
