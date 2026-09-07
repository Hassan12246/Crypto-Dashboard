import { useEffect } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { useAppSelector } from './hooks/redux';
import HomePage from './pages/HomePage';
import CoinDetailPage from './pages/CoinDetailPage';
import FavoritesPage from './pages/FavoritesPage';
import DarkModeToggle from './components/DarkModeToggle';
import './App.css';

export default function App() {
  const mode = useAppSelector((state) => state.theme.mode);

  // Jab bhi 'mode' badle (light/dark), <html> tag par
  // data-theme attribute set karo. Isi attribute ko theme.css
  // mein [data-theme='dark'] selector "sunta" hai.
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', mode);
  }, [mode]);

  return (
    <div className="app-shell">
      <nav className="app-nav">
        <div className="app-nav__links">
          <Link to="/" className="app-nav__link">
            Home
          </Link>
          <Link to="/favorites" className="app-nav__link">
            ★ Favorites
          </Link>
        </div>
        <DarkModeToggle />
      </nav>

      {/* Routes ek "switchboard" hai — jo bhi Route match ho, wahi dikhega */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/coin/:coinId" element={<CoinDetailPage />} />
        <Route path="/favorites" element={<FavoritesPage />} />
      </Routes>
    </div>
  );
}
