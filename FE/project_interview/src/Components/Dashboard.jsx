import React, { useEffect, useState } from 'react';
import jwtDecode from 'jwt-decode';
import axios from 'axios';
import '../App.css';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Row, Col, Card, Navbar, Button, Nav } from 'react-bootstrap';

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
    const decoded = jwtDecode(token);
    setUserName(decoded.Name);
  }, [navigate]);

  // Handle action like button.
  const handleLike = (movie) => {
    axios.patch(`https://localhost:7244/api/like/${movie.movieId}`)
      .then(response => {
        const updatedMovie = response.data;
        setMovies(movies.map(m => m.movieId === updatedMovie.movieId ? updatedMovie : m));
      })
      .catch(error => {
        console.log(error);
      });
  };


  // Handle action dislike button.
  const handleDislike = (movie) => {
    axios.patch(`https://localhost:7244/api/dislike/${movie.movieId}`)
      .then(response => {
        const updatedMovie = response.data;
        setMovies(movies.map(m => m.movieId === updatedMovie.movieId ? updatedMovie : m));
      })
      .catch(error => {
        console.log(error);
      });
  };

  // Handle logout button
  const handleLogout = () => {
    localStorage.removeItem('jwtToken');
    navigate("/");
  };

  return (
    <div className="container">
      <Navbar className="nav nav-pills">
        <Nav className="align-self-center">Welcome, {userName}!</Nav>
        <Nav.Link variant="outline-primary" onClick={() => handleLogout()}>Logout</Nav.Link>
      </Navbar>
      <Row>
        {movies.map((movie) => (
          <Row className="p-3 border" key={movie.id}>
            <Col>
              <img className="img-fluid w-100 c-img gx-5" src={movie.path} alt={movie.title} />
            </Col>
            <Col>
              <h5 className="card-title">{movie.title}</h5>
              <Card.Body>
                <h6 className="card-text">Likes: {movie.likes}</h6>
                <Button variant="success" className="m-1" onClick={() => handleLike(movie)}>Like</Button>
                <Button variant="danger" onClick={() => handleDislike(movie)}>Dislike</Button>
              </Card.Body>
            </Col>
          </Row>
        ))}
      </Row>
    </div>
  );
};