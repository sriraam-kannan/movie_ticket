import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  CalendarDays,
  Clock,
  Film,
  Loader,
  Star,
  Ticket,
  User,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

// Define the interface for Movie data
interface MovieDetailProps {
  title: string;
  poster: string;
  plot: string;
  cast: string[];
  genre: string[];
  director: string;
  releaseDate: string;
  runtime: string;
  rating: number;
  year: number;
  imdbID: string;
}

const OMDB_API_KEY = "7055a610";

const MovieDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [movie, setMovie] = useState<MovieDetailProps | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `https://www.omdbapi.com/?i=${id}&apikey=${OMDB_API_KEY}`
        );
        const data = await response.json();

        if (data.Response === "True") {
          setMovie({
            title: data.Title,
            poster: data.Poster,
            plot: data.Plot,
            cast: data.Actors.split(", "),
            genre: data.Genre.split(", "),
            director: data.Director,
            releaseDate: data.Released,
            runtime: data.Runtime,
            rating: parseFloat(data.imdbRating),
            year: parseInt(data.Year, 10),
            imdbID: data.imdbID,
          });
        } else {
          setError(data.Error);
        }
      } catch (e) {
        setError("Failed to fetch movie details");
        console.error("Failed to fetch movie details", e);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [id]);

  const currentYear = new Date().getFullYear();

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <div className="text-center text-red-600">{error}</div>;
  }

  if (!movie) {
    window.alert("No movie details found.");
    return <Loader />;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-1">
          <img
            src={movie.poster}
            alt={`${movie.title} Poster`}
            className="rounded-lg shadow-lg w-full"
          />
        </div>
        <div className="md:col-span-2 space-y-6">
          <h1 className="text-4xl font-bold">{movie.title}</h1>
          <div className="flex items-center space-x-2">
            <Star className="w-5 h-5 text-yellow-400" />
            <span className="text-xl font-semibold">{movie.rating}/10</span>
          </div>
          <p className="text-lg">{movie.plot}</p>
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <User className="w-5 h-5 text-gray-500" />
              <span className="font-semibold">Director:</span>
              <span>{movie.director}</span>
            </div>
            <div className="flex items-center space-x-2">
              <CalendarDays className="w-5 h-5 text-gray-500" />
              <span className="font-semibold">Release Date:</span>
              <span>{movie.releaseDate}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="w-5 h-5 text-gray-500" />
              <span className="font-semibold">Runtime:</span>
              <span>{movie.runtime}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Film className="w-5 h-5 text-gray-500" />
              <span className="font-semibold">Genre:</span>
              <div className="flex flex-wrap gap-2">
                {movie.genre.map((g) => (
                  <Badge key={g} variant="secondary">
                    {g}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-semibold mb-2">Cast</h2>
            <ul className="list-disc list-inside">
              {movie.cast.map((actor) => (
                <li key={actor}>{actor}</li>
              ))}
            </ul>
          </div>

          {movie.year === currentYear && (
            <Link to={`book-ticket`}>
              <Button className="w-full md:w-auto" size="lg">
                <Ticket className="w-5 h-5 mr-2" />
                Book Ticket
              </Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
