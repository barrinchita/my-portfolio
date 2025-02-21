import React from "react";

import { createContext, useContext, useState } from "react";

import { Navigate } from "react-router-dom";

import verifyToken from "./components/JS/verifyTokens";
import getNewToken from "./components/JS/getNewToken";

// Create Auth Context
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  let tokens = JSON.parse(localStorage.getItem("tokens"));
  let accessToken = null;
  if (tokens) {
    accessToken = tokens.accessToken;
  }

  const [token, setToken] = useState(accessToken || null);

  const loginFun = (tokens) => {
    localStorage.setItem("tokens", JSON.stringify(tokens));
    let accessToken = tokens.accessToken;
    setToken(accessToken);
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem("tokens");
  };

  return (
    <AuthContext.Provider value={{ token, setToken, loginFun, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use AuthContext
export const useAuth = () => useContext(AuthContext);

const ProtectedRoutes = ({ children }) => {
  const { token, setToken } = useAuth();
  if (token) {
    const tokens = JSON.parse(localStorage.getItem("tokens"));
    let accessToken = tokens.accessToken;

    verifyToken(accessToken).then((data) => {
      if (data.success === true) {
        setToken(accessToken);
      } else {
        // since token is invalid, checking if the refresh token is valid so as to get another access token.

        const refreshToken = tokens.refreshToken;
        if (!refreshToken) {
          console.log("no refresh token");
          setToken(null);
          <Navigate to="/login" />;
        }

        const payload = JSON.parse(atob(refreshToken.split(".")[1])); // Decode JWT payload
        const expiryTime = payload.exp * 1000; // Convert to milliseconds
        let check = Date.now() >= expiryTime;

        if(check){
          console.log("Refresh token expired");
          setToken(null);
          <Navigate to="/login" />;
        }

        getNewToken(refreshToken).then((data) => {
          if (data.success === true) {
            let newAccessToken = data.accessToken;
            let newTokens = {
              accessToken: newAccessToken,
              refreshToken: refreshToken,
            };
            localStorage.setItem("tokens", JSON.stringify(newTokens));
            setToken(newAccessToken);
          } else {
            console.log("Invalid refresh token");
            setToken(null);
            <Navigate to="/login" />;
          }
        });
      
      }
    });
  } else {
    console.log("no token");
    <Navigate to="/login" />;
  }

  return token ? children : <Navigate to="/login" />;
};

export default ProtectedRoutes;
