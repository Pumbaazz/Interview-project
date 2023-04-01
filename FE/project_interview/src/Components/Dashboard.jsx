import React, { useEffect, useState } from 'react';
import jwt_decode from 'jwt-decode';
import '../App.css';
import { useNavigate } from 'react-router-dom';

const DashboardPage = () => {
  const [movies, setMovies] = useState([
    {
      id: 1,
      title: 'The Godfather',
      thumbnail: 'https://www.imdb.com/title/tt0111161/mediaviewer/rm1644259072/',
      likes: 10,
    },
    {
      id: 2,
      title: 'The Shaw shank Redemption',
      thumbnail: 'https://kenh14cdn.com/Images/Uploaded/Share/2010/01/12/000113CineSR12.jpg',
      likes: 15,
    },
    {
      id: 3,
      title: 'The Dark Knight',
      thumbnail: 'https://www.imdb.com/title/tt0468569/mediaviewer/rm3879834624/',
      likes: 20,
    },
  ]);
  const navigate = useNavigate();

  const [userName, setUserName] = useState("");
  // Hook get user name from token.
  useEffect(() => {
    const token = localStorage.getItem('jwtToken');
    if(!token){
      navigate("/");
      return;
    }
    const decoded = jwt_decode(token);
    setUserName(decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"]);
  },[navigate]);

  // Handle action like button.
  const handleLike = (id) => {
    const updatedMovies = movies.map((movie) => {
      if (movie.id === id) {
        return {
          ...movie,
          likes: movie.likes + 1,
        };
      }
      return movie;
    });
    setMovies(updatedMovies);
  };

  // Handle action dislike button.
  const handleDislike = (id) => {
    const updatedMovies = movies.map((movie) => {
      if (movie.id === id) {
        return {
          ...movie,
          likes: movie.likes - 1,
        };
      }
      return movie;
    });
    setMovies(updatedMovies);
  };

  const handleLogout = () => {
    localStorage.removeItem('jwtToken');
    navigate("/")
  };

  return (
    <div>
      <h1>Dashboard</h1>
      <header>
        <h1>Welcome, {userName}!</h1>
        <button onClick={handleLogout}>Logout</button>
      </header>
      <ul>
        {movies.map((movie) => (
          <li key={movie.id}>
            <img src={movie.thumbnail} alt={movie.title} />
            <h2>{movie.title}</h2>
            <p>Likes: {movie.likes}</p>
            <button onClick={() => handleLike(movie.id)}>Like</button>
            <button onClick={() => handleDislike(movie.id)}>Dislike</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default DashboardPage;
