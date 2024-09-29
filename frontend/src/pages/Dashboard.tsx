import React, { useEffect, useState } from "react";
import axios from "axios";

const OMDB_API_KEY = "7055a610";

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        // API call to OMDb to get movies for 2024
        const response = await axios.get(`https://www.omdbapi.com/`, {
          params: {
            s: "action", // Empty search string to get multiple results
            y: "2024", // Search for movies in 2024
            type: "movie",
            apikey: OMDB_API_KEY,
          },
        });
        setMovies(response.data.Search || []); // Handle if no results are found
        setLoading(false);
      } catch (error) {
        console.error("Error fetching movies:", error);
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  return (
    <div className="home-page">
      <h2>Upcoming Movies in 2024</h2>
      {loading ? (
        <p>Loading...</p>
      ) : movies.length > 0 ? (
        <div className="movie-list">
          {movies.map((movie) => (
            <div key={movie.imdbID} className="movie-card">
              <img
                src={movie.Poster !== "N/A" ? movie.Poster : "placeholder.jpg"}
                alt={movie.Title}
                className="movie-poster"
              />
              <div className="movie-info">
                <h3>{movie.Title}</h3>
                <p>Release Year: {movie.Year}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No upcoming movies found for 2024.</p>
      )}
    </div>
  );
};

export default HomePage;
