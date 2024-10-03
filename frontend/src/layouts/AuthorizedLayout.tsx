import { Navigate, Outlet } from "react-router-dom";
import Header from "@/components/ui/header";

export default function AuthorizedLayout() {
  const isLoggedIn = JSON.parse(localStorage.getItem("login") || "false");

  if (!isLoggedIn) {
    console.log("User not logged in");
    return <Navigate to="/login" />;
  }

  return (
    <>
      <div className="flex flex-row space-y-12">
        <Header />
        <div className="ml-52 flex flex-col flex-1 min-h-screen bg-gray-100">
          <Outlet />
        </div>
      </div>
    </>
  );
}
