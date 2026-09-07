import { useEffect, useState } from "react";
import {
  Link,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { LogOut, User } from "lucide-react";

import { useAppSelector } from "./hooks/redux";
import HomePage from "./pages/HomePage";
import CoinDetailPage from "./pages/CoinDetailPage";
import FavoritesPage from "./pages/FavoritesPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";

import DarkModeToggle from "./components/DarkModeToggle";
import ProtectedRoute from "./components/ProtectedRoute";

import { AuthUser, getCurrentUser, logout } from "./utils/Auth";

import "./App.css";

export default function App() {
  const mode = useAppSelector((state) => state.theme.mode);

  const [user, setUser] = useState<AuthUser | null>(getCurrentUser());

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", mode);
  }, [mode]);

  useEffect(() => {
    function handleAuthChange() {
      setUser(getCurrentUser());
    }

    window.addEventListener("auth-change", handleAuthChange);

    return () => {
      window.removeEventListener("auth-change", handleAuthChange);
    };
  }, []);

  const isAuthPage =
    location.pathname === "/login" || location.pathname === "/signup";

  function handleLogout() {
    logout();
    navigate("/login");
  }

  return (
    <div className="app-shell">
      {!isAuthPage && (
        <nav className="app-nav">
          <div className="app-nav__links">
            <Link to="/" className="app-nav__link">
              Home
            </Link>

            <Link to="/favorites" className="app-nav__link">
              ★ Favorites
            </Link>
          </div>

          <div className="app-nav__right">
            {user && (
              <div className="app-nav__user">
                <User size={15} />
                <span>{user.name}</span>
              </div>
            )}

            <DarkModeToggle />

            {user && (
              <button
                type="button"
                className="app-nav__logout"
                onClick={handleLogout}
                aria-label="Logout"
                title="Logout"
              >
                <LogOut size={16} />
              </button>
            )}
          </div>
        </nav>
      )}

      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/coin/:coinId" element={<CoinDetailPage />} />
          <Route path="/favorites" element={<FavoritesPage />} />
        </Route>
      </Routes>
    </div>
  );
}
