import React, { useEffect, useState } from 'react';
// import jwtDecode from 'jwt-decode';
import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Row, Col, Card, Button } from 'react-bootstrap';
import { useBootstrapBreakpoints } from 'react-bootstrap/esm/ThemeProvider';

export const DashboardPage = (props) => {
  const [userName, setUserName] = useState("");
  const [movies, setMovies] = useState([]);
  // const navigate = useNavigate();

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    const apiUrl = `${process.env.REACT_APP_BASE_URL}/api/get-movies`;
    const response = await axios.get(apiUrl);
    setMovies(response.data);
  };

  // Handle action like button.
  const handleLike = async (movie) => {
    const apiUrl = `${process.env.REACT_APP_BASE_URL}/api/like/${movie.movieId}`;
    try {
      const response = await axios.patch(apiUrl);
      const updatedMovie = response.data;
      setMovies(movies.map(m => m.movieId === updatedMovie.movieId ? updatedMovie : m));
    } catch (error) {
      console.log(error);
    }
  };


  // Handle action dislike button.
  const handleDislike = async (movie) => {
    const apiUrl = `${process.env.REACT_APP_BASE_URL}/api/dislike/${movie.movieId}`;
    try {
      const response = await axios.patch(apiUrl);
      const updatedMovie = response.data;
      setMovies(movies.map(m => m.movieId === updatedMovie.movieId ? updatedMovie : m));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container">
      <Row>
        {movies.map((movie) => (
          <Row className="p-3 border" key={movie.id}>
            <Col className='col'>
              <img className="img-fluid img-thumbnail" src={movie.path} alt={movie.title} width={300} height={100} />
            </Col>
            <Col className='col-5 border'>
              <h3 className="card-title">{movie.title}</h3>
              <Card.Body className='mt-2'>
                <h5 className="card-text text-muted">Likes: {movie.likes}</h5>
              </Card.Body>
            </Col>
            <Col>
              <Row>
                <Col>
                  <Button variant="success" className=" btn m-1 btn-lg" onClick={() => handleLike(movie)}>Like</Button>
                </Col>
                <Col>
                  <Button variant="danger" className='btn m-1 btn-lg' onClick={() => handleDislike(movie)}>Dislike</Button>
                </Col>
              </Row>
            </Col>
          </Row>
        ))}
      </Row>
    </div>
  );
};