import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Login from "../pages/Login";
import Register from "../pages/Register";
import MainPage from "../pages/MainPage";
import PrivateRoute from "./PrivateRoute";
import NotFound from "../pages/NotFound";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />, // Main layout wrapper
    children: [
      {
        path: "/",
        element: <PrivateRoute><MainPage /></PrivateRoute>, // MainPage (protected)
      },
      {
        path: "/login",
        element: <Login />, // Login page
      },
      {
        path: "/register",
        element: <Register />, // Registration page
      },
      {
        path: "*",
        element: <NotFound />, // 404 Page
      },
    ],
  },
]);

export default router;
