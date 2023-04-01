import React, { useEffect, useState } from 'react';
import jwt_decode from 'jwt-decode';
import axios from 'axios';
import '../App.css';
import { useNavigate } from 'react-router-dom';

export const DashboardPage = (props) => {
  const [userName, setUserName] = useState("");
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate();

  // Hook get movies data.
  useEffect(() => {
    fetch('https://localhost:7244/api/get-movies')
      .then(response => response.json())
      .then(data => setMovies(data));
  }, []);

  // Hook get user name from token.
  useEffect(() => {
    const token = localStorage.getItem('jwtToken');
    if (!token) {
      navigate("/");
      return;
    }
    const decoded = jwt_decode(token);
    setUserName(decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"]);
  }, [navigate]);

  // Handle action like button.
  // const handleLike = async (id) => {
  //   const updatedMovies = movies.map((movie) => {
  //     if (movie.movieId === id) {
  //       return {
  //         ...movie,
  //         likes: movie.likes + 1,
  //       };
  //     }
  //     return movie;
  //   });

  //   const updateMovie = updatedMovies.find(movie => movie.id === id);
  //   await fetch(`https://localhost:7244/api/like/${updateMovie.movieId}`,{
  //     method: 'PUT',
  //     headers: {
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify({})    
  //   });
  //   setMovies(updatedMovies);
  // };
const handleLike = (movie) => {
    console.log(movie);
    axios.put(`https://localhost:7244/api/like/${movie.movieId}`)
      .then(response => {
        const updatedMovie = response.data;
        setMovies(movies.map(m => m.movieId === updatedMovie.movieId ? updatedMovie : m));
      })
      .catch(error => {
        console.log(error);
      });
  };


  // Handle action dislike button.
  // const handleDislike = async (id) => {
  //   const updatedMovies = movies.map((movie) => {
  //     if (movie.id === id) {
  //       return {
  //         ...movie,
  //         likes: movie.likes - 1,
  //       };
  //     }
  //     return movie;
  //   });

  //   const updateMovie = updatedMovies.find(movie => movie.id === id);
  //   await fetch(`https://localhost:7244/api/dislike/${updateMovie.movieId}`,{
  //     method: 'PUT',
  //     headers: {
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify({})    
  //   });
  //   setMovies(updatedMovies);
  // };
  const handleDislike = (movie) => {
    axios.put(`https://localhost:7244/api/dislike/${movie.movieId}`)
      .then(response => {
        const updatedMovie = response.data;
        setMovies(movies.map(m => m.movieId === updatedMovie.movieId ? updatedMovie : m));
      })
      .catch(error => {
        console.log(error);
      });
  };


  const handleLogout = () => {
    localStorage.removeItem('jwtToken');
    navigate("/");
  };

  return (
    <div>
      <h1>Dashboard</h1>
      <header>
        <h1>Welcome, {userName}!</h1>
        <button onClick={() => handleLogout()}>Logout</button>
      </header>
      <ul>
        {movies.map((movie) => (
          <li key={movie.id}>
            <img src={movie.path} alt={movie.title} />
            <h2>{movie.title}</h2>
            <p>Likes: {movie.likes}</p>
            <button onClick={() => handleLike(movie)}>Like</button>
            <button onClick={() => handleDislike(movie)}>Dislike</button>
          </li>
        ))}
      </ul>
    </div>
  );
};