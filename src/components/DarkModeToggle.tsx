import { Sun, Moon } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { toggleTheme } from '../features/theme/themeSlice';
import './DarkModeToggle.css';

export default function DarkModeToggle() {
  const dispatch = useAppDispatch();
  const mode = useAppSelector((state) => state.theme.mode);

  return (
    <button
      onClick={() => dispatch(toggleTheme())}
      className="theme-toggle"
      aria-label="Toggle dark mode"
    >
      {mode === 'light' ? <Moon size={16} /> : <Sun size={16} />}
    </button>
  );
}
