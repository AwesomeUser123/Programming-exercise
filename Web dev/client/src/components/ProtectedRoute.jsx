import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const [authChecked, setAuthChecked] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const token = sessionStorage.getItem("token");

      if (!token) {
        setIsAuthenticated(false);
        navigate("/login");
        return;
      }

      try {
        await axios.get("http://localhost:8800/api/users/me", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        setIsAuthenticated(true);
      } catch (error) {
        setIsAuthenticated(false);
        navigate("/login"); // redirect if token is invalid
      } finally {
        setAuthChecked(true);
      }
    };

    checkAuth();
  }, [navigate]);

  if (!authChecked) return <p>Checking authentication...</p>;

  return isAuthenticated ? children : null;
};

export default ProtectedRoute;
