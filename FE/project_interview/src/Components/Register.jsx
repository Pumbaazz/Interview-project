import React, { useState } from "react";
import { Button, label } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export const Register = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPass] = useState("");
  const [user_name, setName] = useState("");
  const [notifyMessage, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    handleRegister(e);
  };

  const navigate = useNavigate();

  async function handleRegister(e) {
    try {
      var json = JSON.stringify({ email: email, password: password, name: user_name })
      // Request create new user.
      var response = await fetch('https://localhost:7244/api/sign-up', {
        headers: {
          'Content-Type': 'application/json'
        },
        method: 'POST',
        body: json
      });

      if (response.status === 200) {
        setMessage("Create user successfully!.")
      }
      else {
        // Handle exception.
        switch (response.status) {
          case 409:
            setMessage("User is existed. Please try again.");
            break;
          case 401:
            setMessage("Input something wrong. Please try again.");
            break;
          default:
            setMessage("An error occurred. Please try again later.");
            break;
        }
      }
    }
    catch (error) {
      console.log(error);
    }
  }

  // Return export.
  return (
    <div className="App auth-form-container">
      <h2>Register</h2>
      <form className="register-form" onSubmit={handleSubmit}>
        {notifyMessage && <div className="notifyBanner">{notifyMessage}</div>}
        <label htmlFor="name">Full name</label>
        <input
          value={user_name}
          name="name"
          onChange={(e) => setName(e.target.value)}
          id="name"
          placeholder="full Name"
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
          onChange={(e) => setPass(e.target.value)}
          type="password"
          placeholder="********"
          id="password"
          name="password"
        />
        <button type="button" class="btn btn-outline-primary mt-1">Register</button>
      </form>
      <button type="button" class="btn btn-outline-primary" onClick={() => navigate("/")}>
        Already have an account? Login here.
      </button>
    </div>
  );
};
