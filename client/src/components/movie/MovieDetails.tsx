import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const MovieDetails = () => {
  const { id } = useParams(); // This grabs the `id` from the URL
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${id}?api_key=YOUR_API_KEY`
        );
        const data = await response.json();
        console.log(data);
        setMovie(data);
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    };

    if (id) {
      fetchMovie();
    }
  }, [id]);

  return (
    <div>
      <h1>Movie Details</h1>
      {movie ? (
        <div>
          <h2>{movie}</h2>
          <p>{movie}</p>
          <p>Release Date: {movie}</p>
          <p>Rating: {movie}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default MovieDetails;
