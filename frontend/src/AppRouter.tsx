import { createBrowserRouter, Navigate } from "react-router-dom";

/** Layouts */
import UnAuthorizedLayout from "./layouts/UnAuthorizedLayout";
import AuthorizedLayout from "./layouts/AuthorizedLayout";

// /** UnAuthorized Pages */
import Login from "@/pages/Login";

// /** MoviesRouter */
import MoviesRouter from "../src/pages/movies/MoviesRouter";

export const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <AuthorizedLayout />,
    children: [
      {
        index: true,
        element: <Navigate to="/movies" replace />,
      },
      {
        path: "movies/*",
        element: <MoviesRouter />,
      },
    ],
  },
  {
    path: "/login",
    element: <UnAuthorizedLayout />,
    children: [
      {
        index: true,
        element: <Login />,
      },
    ],
  },
]);
