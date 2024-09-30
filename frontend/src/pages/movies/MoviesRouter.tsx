import { Route, Routes } from "react-router-dom";
import Movies from "./Movies";
import MovieDetails from "./MovieDetails";
import MovieSearch from "./MovieSearch";
import TicketLayout from "./TicketLayout";

const MoviesRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Movies />} />
      <Route path=":id" element={<MovieDetails />} />
      <Route path="/:movieId/book-ticket" element={<TicketLayout />} />
      <Route path="/search" element={<MovieSearch />} />
    </Routes>
  );
};

export default MoviesRouter;
