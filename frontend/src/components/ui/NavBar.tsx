import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div className="w-screen h-16 bg-white border-b flex items-center justify-between px-6">
      {/* Logo Section */}
      <div className="flex items-center gap-4">
        <img src="/path/to/logo.png" alt="Logo" className="h-10" />
      </div>

      {/* Navigation Links */}
      <nav className="flex gap-6">
        <Link
          to="/"
          className="text-lg font-medium hover:text-blue-500 hover:font-bold"
        >
          Home
        </Link>
        <Link
          to="/movies"
          className="text-lg font-medium hover:text-blue-500 hover:font-bold"
        >
          Movies
        </Link>
        <Link
          to="/theatres"
          className="text-lg font-medium hover:text-blue-500 hover:font-bold"
        >
          Theatres
        </Link>
        <Link
          to="/mytickets"
          className="text-lg font-medium hover:text-blue-500 hover:font-bold"
        >
          My Tickets
        </Link>
      </nav>

      {/* User Profile Section */}
      <div className="flex items-center gap-2">
        <span className="text-lg font-medium">Hi, [User]</span>
        <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center">
          <img
            src="/path/to/profile-icon.png"
            alt="User"
            className="h-8 w-8 rounded-full"
          />
        </div>
      </div>
    </div>
  );
}
