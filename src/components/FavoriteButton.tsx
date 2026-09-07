import { Star } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { toggleFavorite } from '../features/favorites/favoritesSlice';
import './FavoriteButton.css';

export default function FavoriteButton({ coinId }: { coinId: string }) {
  const dispatch = useAppDispatch();

  // .includes() se check karte hain ye coin already favorite hai ya nahi
  const isFavorite = useAppSelector((state) =>
    state.favorites.ids.includes(coinId)
  );

  // Zaroori: e.preventDefault() aur e.stopPropagation() — kyunke ye
  // button aksar ek <Link> ke andar hoga (CoinListItem mein). Bina
  // inke, star click karne par poora card bhi "click" ho jayega aur
  // detail page khul jayega — jo hum nahi chahte.
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(toggleFavorite(coinId));
  };

  return (
    <button onClick={handleClick} className="favorite-button">
      <Star
        size={18}
        fill={isFavorite ? '#e8a33d' : 'none'}
        color={isFavorite ? '#e8a33d' : '#a8b3bf'}
      />
    </button>
  );
}
