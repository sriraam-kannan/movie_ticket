import { Navigate, Outlet } from "react-router-dom";
import Header from "@/components/ui/header";

export default function AuthorizedLayout() {
  const isLoggedIn = localStorage.getItem("login") === "true";

  if (!isLoggedIn) {
    console.log("User not logged in");
    return <Navigate to="/login" />;
  }

  return (
    <>
      <div className="flex flex-row space-y-12">
        <Header />
        <div className="grid h-screen w-full">
          <Outlet />
        </div>
      </div>
    </>
  );
}
