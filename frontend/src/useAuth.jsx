import React, { useContext, createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import http from "./http";

const authContext = createContext();

export function useAuth() {
  return useContext(authContext);
}

export function ProvideAuth({ children }) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

function useProvideAuth() {
  const savedUser = window.localStorage.getItem("token");
  const navigate = useNavigate()

  const [user, setUser] = useState(savedUser ? parseJwt(savedUser) : null);

  const signin = async (username, password) => {
    const {
      data: { token },
    } = await http.post("login", { username, password });
    window.localStorage.setItem("token", token);
    setUser(parseJwt(token));
    navigate("/tasks");
  };

  const signout = () => {
    window.localStorage.removeItem("token");
    setUser(null)
    navigate("/login");
  };

  return {
    user,
    signin,
    signout,
  };
}

function parseJwt(token) {
  var base64Url = token.split(".")[1];
  var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  var jsonPayload = decodeURIComponent(
    window
      .atob(base64)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );

  return JSON.parse(jsonPayload);
}
