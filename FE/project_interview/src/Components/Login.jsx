import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import '../styles/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from "react-bootstrap";
import { useEffect } from "react";
import { useIsAuthenticated, useMsal } from "@azure/msal-react";
import { loginRequest } from "../config/authConfig";

export const Login = (props) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPass] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { instance } = useMsal();
  const isAuthenticated = useIsAuthenticated();

  useEffect(() => {
    if (isAuthenticated !== false) {
      navigate("/dashboard");
    }
  }, [isAuthenticated]);

  const handleLoginRedirect = async () => {
    try {
      const loginPopupResponse = await instance.loginPopup(loginRequest);
    } catch (error) {
      console.error(error);
    }
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin(e);
  };

  async function handleLogin(e) {
    try {
      var json = JSON.stringify({ email: email, password: password })
      // Fetch login data.
      var response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/login`, {
        headers: {
          'Content-Type': 'application/json'
        },
        method: 'POST',
        body: json
      });

      if (response.status === 200){
        const data = await response.json();
        localStorage.setItem('jwtToken', data.token);  
        navigate("/dashboard");
      }
      else {
        // Handle exception.
        if (response.status === 401) {
          setErrorMessage("User not found. Please try again.");
        }
        else {
          setErrorMessage("An error occurred. Please try again later.");
        }
      }
    }
    catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="App auth-form-container">
      <h2>Login</h2>
      <form className="login-form" onSubmit={handleSubmit}>
        {errorMessage && <div className="errorForm">{errorMessage}</div>}
        <label htmlFor="email">Email</label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="youremail@gmail.com"
          id="email"
          name="email"
        />
        <label htmlFor="password">Password</label>
        <input
          value={password}
          onChange={(e) => setPass(e.target.value)}
          type="password"
          placeholder="********"
          id="password"
          name="password"
        />
        <button className="c-button" onClick={handleSubmit}>Log In</button>
      </form>
      <button className="link-btn" onClick={() => navigate("/sign-up")}>
        Don't have an account? Register here.
      </button>
      <br/>
      <button type="button" className="btn btn-outline-primary" onClick={handleLoginRedirect}>
        Login with another account.
      </button>
    </div>
  );
};
