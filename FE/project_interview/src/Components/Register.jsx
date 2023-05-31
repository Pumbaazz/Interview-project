import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Register = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [notifyMessage, setNotifyMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    registerUser();
  };

  const navigate = useNavigate();

  async function registerUser() {
    try {
      const body = JSON.stringify({ email, password, fullName });
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/sign-up`, {
        headers: {
          'Content-Type': 'application/json'
        },
        method: 'POST',
        body
      });

      switch (response.status) {
        case 200:
          setNotifyMessage('User created successfully!');
          break;
        case 409:
          setNotifyMessage('User already exists. Please try again.');
          break;
        case 401:
          setNotifyMessage('Invalid input. Please try again.');
          break;
        default:
          setNotifyMessage('An error occurred. Please try again later.');
          break;
      }
    }
    catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="App auth-form-container">
      <h2>Register</h2>
      <form className="register-form" onSubmit={handleSubmit}>
        {notifyMessage && <div className="notifyBanner">{notifyMessage}</div>}
        <label htmlFor="fullName">Full name</label>
        <input
          value={fullName}
          name="fullName"
          onChange={(e) => setFullName(e.target.value)}
          id="fullName"
          placeholder="Full Name"
        />
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
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="********"
          id="password"
          name="password"
        />
        <button type="submit" className="btn btn-outline-primary mt-1">Register</button>
      </form>
      <button type="button" className="btn btn-outline-primary" onClick={() => navigate("/")}>
        Already have an account? Login here.
      </button>
    </div>
  );
};