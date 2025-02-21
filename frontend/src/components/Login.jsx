import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaGoogle } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";

import LogStatus from "./admin/LogStatus";

import { useAuth } from "../ProtectedRoutes";

function Login() {

  const { loginFun } = useAuth();

  const navigate = useNavigate();
  const [login, setLogin] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState({
    status: false,
    message: "",
    bg: "green",
  });
  const [send, setSend] = useState(false);

  //   validata inputs

  const isFormValid = () => {
    return login.email.trim() !== "" && login.password.trim() !== "";
  };

  useEffect(() => {
    if (send) {
      if (isFormValid()) {
        console.log(login);
        const fetchLogin = async () => {
          try {
            const response = await fetch(
              "http://localhost:8000/api/auth/login",
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(login),
              }
            );
            const data = await response.json();
            if (response.ok) {
              setError((prevError) => ({
                ...prevError,
                status: true,
                message: data.message,
                bg: "green",
              }));

              let tokens = {
                accessToken: data.accessToken,
                refreshToken: data.refreshToken,
              };

              loginFun(tokens);
              
              setTimeout(() => {
                navigate("../admin/projectType");
              }, 1000);
            } else {
              console.log(data);
              setError((prevError) => ({
                ...prevError,
                status: true,
                message: data.message,
                bg: "red",
              }));
            }
          } catch (error) {
            console.log("An error occured: ", error);
            setError((prevError) => ({
              ...prevError,
              status: true,
              message: "An error occured. Try again later.",
              bg: "red",
            }));
          }
        };
        fetchLogin();
      } else {
        setError((prevError) => ({
          ...prevError,
          status: true,
          message: "All fields are required ohh",
          bg: "red",
        }));
      }
    }

    setSend(false);
  }, [send]);

  return (
    <>
      {error.status && <LogStatus bg={error.bg} message={error.message} />}
      <div className="loginCon">
        <div>
          <div className="with">
            <h1>Login with</h1>
          </div>
          <div className="loginIcons">
            <FaGoogle />
            <FaLinkedin />
            <FaFacebook />
          </div>
          <div className="or">
            <p>or</p>
          </div>
          <form>
            <input
              type="email"
              placeholder="Email:"
              value={login.email}
              onChange={(e) => setLogin({ ...login, email: e.target.value })}
            />
            <input
              type="password"
              placeholder="Password"
              name=""
              onChange={(e) => setLogin({ ...login, password: e.target.value })}
              value={login.password}
            />

            <button
              onClick={(e) => {
                e.preventDefault();
                setSend(true);
              }}
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
