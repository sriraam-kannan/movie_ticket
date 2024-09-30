import React, { useState } from "react";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import MovieCard from "../../components/ui/MovieCard";

interface Movie {
  imdbID: string;
  Title: string;
  Poster: string;
  Year: string;
  Language: string;
  imdbRating: string;
  Rating?: number;
  Certification?: string;
}

interface OMDBApiResponse {
  Search: Movie[];
  totalResults: string;
  Response: string;
  Error?: string;
}

const OMDB_API_KEY = "7055a610";

const MovieSearchPage = () => {
  const [searchTitle, setSearchTitle] = useState("");
  const [searchGenre, setSearchGenre] = useState("");
  const [searchYear, setSearchYear] = useState("");
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `https://www.omdbapi.com/?s=${searchTitle}&y=${searchYear}&apikey=${OMDB_API_KEY}`
      );
      const data: OMDBApiResponse = await response.json();

      if (data.Response === "True") {
        setMovies(data.Search);
      } else {
        setError(data.Error || "Movie not found");
        setMovies([]);
      }
    } catch (e) {
      console.error("Failed to fetch movie data", e);
      setError("Failed to fetch movie data");
      setMovies([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-card text-card-foreground rounded-lg shadow-lg p-6 mb-8">
        <h2 className="text-2xl font-bold mb-4">Search Movies</h2>
        <form onSubmit={handleSearch} className="space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <Input
              type="text"
              placeholder="Movie Title"
              value={searchTitle}
              onChange={(e) => setSearchTitle(e.target.value)}
              className="flex-grow"
            />
            <Select value={searchGenre} onValueChange={setSearchGenre}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Genre" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="action">Action</SelectItem>
                <SelectItem value="comedy">Comedy</SelectItem>
                <SelectItem value="drama">Drama</SelectItem>
                <SelectItem value="sci-fi">Sci-Fi</SelectItem>
              </SelectContent>
            </Select>
            <Input
              type="number"
              placeholder="Year"
              value={searchYear}
              onChange={(e) => setSearchYear(e.target.value)}
              className="w-full md:w-[120px]"
            />
          </div>
          <Button type="submit" className="w-full">
            <Search className="w-4 h-4 mr-2" />
            Search
          </Button>
        </form>
      </div>

      {loading ? (
        <div className="text-center">Loading...</div>
      ) : error ? (
        <div className="text-center text-red-600">{error}</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {movies.map((movie) => (
            <MovieCard key={movie.imdbID} movie={movie} />
          ))}
        </div>
      )}
    </div>
  );
};

export default MovieSearchPage;
