import { Navigate, Outlet } from "react-router-dom";
import Header from "@/components/ui/Header";

export default function AuthorizedLayout() {
  const isLoggedIn = localStorage.getItem("login") === "true";

  if (!isLoggedIn) {
    console.log("User not logged in");
    return <Navigate to="/login" />;
  }

  return (
    <>
      <Header />
      <div className="grid h-screen w-full">
        <Outlet />
      </div>
    </>
  );
}
