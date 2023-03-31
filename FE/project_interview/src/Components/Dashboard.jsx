import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../App.css';

function DashboardPage() {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // Send API request to server to get user data
    axios.get('/api/user')
      .then(response => setUserData(response.data))
      .catch(error => console.log(error));
  }, []);

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Welcome, {userData.firstName}!</h1>
      <p>Your email address is {userData.email}.</p>
    </div>
  );
}

export default DashboardPage;
