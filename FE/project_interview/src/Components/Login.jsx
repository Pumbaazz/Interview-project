import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import '../App.css'
import 'bootstrap/dist/css/bootstrap.min.css';

// new import
import { loginRequest } from "../authConfig";
import msalInstance from "../AuthService";

export const Login = (props) => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPass] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin(e);
  };

  // async function handleLogin(e) {
  //   try {
  //     var json = JSON.stringify({ email: email, password: password })
  //     // Fetch login data.
  //     var response = await fetch('https://localhost:7244/api/login', {
  //       headers: {
  //         'Content-Type': 'application/json'
  //       },
  //       method: 'POST',
  //       body: json
  //     });

  //     if (response.status === 200){
  //       const data = await response.json();
  //       localStorage.setItem('jwtToken', data.token);  
  //       navigate("/dashboard");
  //     }
  //     else {
  //       // Handle exception.
  //       if (response.status === 401) {
  //         setErrorMessage("User not found. Please try again.");
  //       }
  //       else {
  //         setErrorMessage("An error occurred. Please try again later.");
  //       }
  //     }
  //   }
  //   catch (error) {
  //     console.log(error);
  //   }
  // }

  const handleLogin = async () => {
    try{
      await msalInstance.loginPopup(loginRequest);
      console.log("ok");
    }
    catch(error){
      console.error(error);
    }
  }

  return (
    <div className="App auth-form-container">
      <h2>Login</h2>
      {/* <form className="login-form" onSubmit={handleSubmit}> */}
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
      {/* </form> */}
      <button className="link-btn" onClick={() => navigate("/sign-up")}>
        Don't have an account? Register here.
      </button>
    </div>
  );
};
