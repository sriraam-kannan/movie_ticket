import { useEffect, useState } from "react";
import axios from "axios";
import { Loader } from "lucide-react";
import MovieCard from "../../components/ui/MovieCard";

const OMDB_API_KEY = "7055a610";

interface Movie {
  imdbID: string;
  Title: string;
  Year: string;
  Poster: string;
  Rating: number;
  Certification: string;
  Language: string;
  imdbRating: string;
}

const Movies = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const movieTitles = [
    "Meiyazhagan",
    "Lubber Pandhu",
    "Kadaisi Ulaga Por",
    "The Greatest of All Time",
    "The Adamant Girl",
    "Raayan",
    "Guntur Kaaram",
    "Shaitaan",
    "Kalki 2898 AD",
    "Devara - Part 1",
    "Tumbbad",
    "Kishkindha Kaandam",
    "Hitler",
    "Vaazhai",
    "Andhagan",
    "Stree 2",
    "Jung Kook: I Am Still",
    "Hanu-Man",
  ];

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const moviePromises = movieTitles.map((title) =>
          axios.get(`https://www.omdbapi.com/`, {
            params: {
              t: title,
              y: "2024",
              apikey: OMDB_API_KEY,
            },
          })
        );

        const movieResponses = await Promise.all(moviePromises);

        const movieData: Movie[] = movieResponses
          .filter(
            (response) => response.data && response.data.Response !== "False"
          )
          .map((response) => ({
            imdbID: response.data.imdbID,
            Title: response.data.Title,
            Year: response.data.Year,
            Poster: response.data.Poster,
            Rating: response.data.imdbRating
              ? Number(response.data.imdbRating)
              : 0,
            Certification: response.data.Rated || "U",
            Language: response.data.Language || "English",
            imdbRating: response.data.imdbRating || "N/A",
          }));

        setMovies(movieData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching movies:", error);
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  return (
    <div className="py-12">
      <div className="py-2">
        <h2>Upcoming Shows</h2>
      </div>
      {loading ? (
        <Loader />
      ) : (
        <div className="grid grid-cols-4 gap-6">
          {movies.map((movie) => (
            <MovieCard key={movie.imdbID} movie={movie} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Movies;
