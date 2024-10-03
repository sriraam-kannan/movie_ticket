import { Navigate, Outlet } from "react-router-dom";

export default function UnAuthorizedLayout() {
  const isLoggedIn = JSON.parse(localStorage.getItem("login") || "false");

  if (isLoggedIn) {
    console.log("User already logged in");
    return <Navigate to="/" />;
  }

  return (
    <div className="w-full h-screen lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
      <div className="flex items-center justify-center py-12">
        <Outlet />
      </div>
      <div className="hidden bg-muted lg:block">
        <img
          src="/placeholder.svg"
          alt="Image"
          width="1920"
          height="1080"
          className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  );
}
