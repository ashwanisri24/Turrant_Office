import { Navigate, useRoutes } from "react-router-dom";
import { mainRoutes } from "./main";

export function Router() {
  return useRoutes([
    {
      path: "/",
      element: <Navigate to="/home" replace />
    },
    ...mainRoutes,

    // No match
    { path: "*", element: <Navigate to="/home" replace /> }
  ]);
}
