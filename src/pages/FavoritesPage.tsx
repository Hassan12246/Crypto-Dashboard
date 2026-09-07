import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { fetchCoins } from '../features/coins/coinsSlice';
import CoinListItem from '../components/CoinListItem';
import './FavoritesPage.css';

export default function FavoritesPage() {
  const dispatch = useAppDispatch();
  const { coins, status } = useAppSelector((state) => state.coins);
  const favoriteIds = useAppSelector((state) => state.favorites.ids);

  // Agar user seedha /favorites par aaya ho (Home kabhi na khola ho),
  // to coins list khaali hogi — is liye yahan bhi fetch karte hain,
  // lekin sirf agar pehle se fetch nahi hui
  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchCoins());
    }
  }, [status, dispatch]);

  // Poori coins list mein se sirf wahi rakhte hain jinka id
  // favoriteIds array mein maujood hai
  const favoriteCoins = coins.filter((coin) => favoriteIds.includes(coin.id));

  return (
    <div className="favorites-page">
      <h1 className="favorites-page__title">Mere Favorites</h1>

      {favoriteCoins.length === 0 ? (
        <p className="favorites-page__empty">
          Abhi tak koi favorite nahi. <Link to="/">Coins dekhein →</Link>
        </p>
      ) : (
        favoriteCoins.map((coin) => <CoinListItem key={coin.id} coin={coin} />)
      )}
    </div>
  );
}
