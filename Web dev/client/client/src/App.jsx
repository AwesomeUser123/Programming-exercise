import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute"; // import here
import Login from "./pages/login/Login";
import MainMenu from "./pages/mainmenu/MainMenu";
import Register from "./pages/register/Register";
import Restaurant from "./pages/menu/Restaurant";
import Profile from "./pages/profile/Profile";
import Reservation from "./pages/reservations/Reservation";
import ChatPage from "./pages/chat/ChatPage";
import Event from "./pages/event/Event";

const router = createBrowserRouter([
  {
    path: "/mainmenu",
    element: <MainMenu />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/restaurant-menu",
    element: <Restaurant />,
  },
  {
    path: "/event",
    element: <Event />
  },
  {
    path: "/profile",
    element: (
      <ProtectedRoute>
        <Profile />
      </ProtectedRoute>
    ),
  },
  {
    path: "/reservation",
    element: (
      <ProtectedRoute>
        <Reservation />
      </ProtectedRoute>
    ),
  },
  {
    path: "/contact",
    element: (
      <ProtectedRoute>
        <ChatPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "*",
    element: <Navigate to="/mainmenu" />,
  },
]);
function App() {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
