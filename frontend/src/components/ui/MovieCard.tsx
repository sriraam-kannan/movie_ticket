import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card";
import { Button } from "./button";

interface MovieCardProps {
  movie: {
    imdbID: string;
    Title: string;
    Year: string;
    Poster: string;
    Rating: number;
    Certification: string;
    Language: string;
    imdbRating: string;
  };
}

const MovieCard = ({ movie }: MovieCardProps) => {
  return (
    <Card className="w-[250px] rounded-lg shadow-md">
      <CardContent className="p-0 relative">
        <img
          src={movie.Poster !== "N/A" ? movie.Poster : "placeholder.jpg"}
          alt={movie.Title}
          className="w-full h-[350px] object-cover rounded-t-lg"
        />
      </CardContent>

      <CardFooter className="flex flex-col gap-2 p-4">
        <CardTitle className="text-center text-lg font-semibold">
          {movie.Title}
        </CardTitle>

        <div className="flex justify-center gap-2 text-sm text-muted-foreground">
          <span>{movie.Year}</span>
          <span>•</span>
          <span>{movie.Language}</span>
        </div>
        <Link to={`/movies/${movie.imdbID}`}>
          <Button className="mt-4 py-2 px-4 bg-blue-500 text-white text-sm font-semibold rounded-md hover:bg-blue-600 transition-all">
            See More
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default MovieCard;
