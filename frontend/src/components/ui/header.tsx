import { Link, useNavigate } from "react-router-dom";

import { CircleUserRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Header() {
  const navigate = useNavigate();

  return (
    <header className="w-full h-16 bg-white border-b flex items-center justify-between px-6 fixed top-0 left-0 z-50">
      {/* Logo Section */}
      <div className="flex items-center gap-4">
        <h1 className="text-lg font-bold">Movies Ticket</h1>
      </div>

      <nav className="flex-1 flex justify-center gap-8">
        <Link
          to="/"
          className="text-lg font-medium hover:underline hover:text-blue-600"
        >
          Home
        </Link>
        <Link
          to="/movies/search"
          className="text-lg font-medium hover:underline hover:text-blue-600"
        >
          Search Movies
        </Link>

        <Link
          to="/movies/mytickets"
          className="text-lg font-medium hover:underline hover:text-blue-600"
        >
          My Tickets
        </Link>
      </nav>

      {/* User Profile Section */}
      <div className="flex items-center gap-6">
        <p className="text-lg font-medium">Welcome, User</p>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="secondary" className="rounded-full ">
              <CircleUserRound className="h-8 w-8 text-blue-600" />
              <span className="sr-only">Toggle user menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuItem>Support</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => {
                console.log("Log out");
                navigate("/login");
                localStorage.removeItem("login");
              }}
            >
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
