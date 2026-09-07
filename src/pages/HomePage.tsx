import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { fetchCoins } from '../features/coins/coinsSlice';
import CoinListItem from '../components/CoinListItem';
import CoinListItemSkeleton from '../components/CoinListItemSkeleton';
import './HomePage.css';

export default function HomePage() {
  const dispatch = useAppDispatch();
  const { coins, status, error } = useAppSelector((state) => state.coins);

  // Search input ka apna local state — ye Redux mein nahi jata,
  // kyunke ye sirf isi page ki UI ke liye hai, poori app ko iski
  // zaroorat nahi.
  const [search, setSearch] = useState('');

  useEffect(() => {
    // Sirf tab fetch karo jab pehle se koi data na ho.
    // Agar coins already 'succeeded' hain, dobara Home par aane
    // par API call NAHI hogi — jo already store mein hai wahi dikhega.
    if (status === 'idle') {
      dispatch(fetchCoins());
    }
  }, [status, dispatch]);

  // .filter() poore 'coins' array mein se sirf wahi wapas deta hai
  // jo condition (name mein search text shamil ho) poori karte hain
  const filteredCoins = coins.filter((coin) =>
    coin.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="home-page">
      <header className="home-page__header">
        <h1 className="home-page__title">Crypto Dashboard</h1>
        <p className="home-page__subtitle">Top 50 coins, live prices</p>
      </header>

      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search coins..."
        className="home-page__search"
      />

      {status === 'loading' && (
        // Array.from({ length: 8 }) ek "khaali" 8-item array banata hai —
        // sirf loop chalane ke liye, asal data ki zaroorat nahi
        <>
          {Array.from({ length: 8 }).map((_, i) => (
            <CoinListItemSkeleton key={i} />
          ))}
        </>
      )}

      {status === 'failed' && (
        <div className="home-page__error">
          <p>{error}</p>
          <button
            onClick={() => dispatch(fetchCoins())}
            className="home-page__retry"
          >
            Dobara Koshish Karein
          </button>
        </div>
      )}

      {status === 'succeeded' &&
        filteredCoins.map((coin) => <CoinListItem key={coin.id} coin={coin} />)}

      {status === 'succeeded' && filteredCoins.length === 0 && (
        <p className="home-page__status">Koi coin nahi mila</p>
      )}
    </div>
  );
}
