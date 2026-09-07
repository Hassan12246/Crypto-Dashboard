import { Link } from 'react-router-dom';
import type { Coin } from '../features/coins/types';
import FavoriteButton from './FavoriteButton';
import './CoinListItem.css';

// { coin: Coin } ka matlab: is component ko ek prop chahiye,
// naam 'coin', aur uska type 'Coin' hoga (jo types.ts mein banaya tha)
export default function CoinListItem({ coin }: { coin: Coin }) {
  const change = coin.price_change_percentage_24h ?? 0;
  const isUp = change >= 0;

  return (
    <Link to={`/coin/${coin.id}`} className="coin-item">
      <img src={coin.image} alt={coin.name} className="coin-item__image" />

      <div className="coin-item__names">
        <p className="coin-item__name">{coin.name}</p>
        <p className="coin-item__symbol">{coin.symbol}</p>
      </div>

      <span className="coin-item__price">
        ${coin.current_price.toLocaleString('en-US')}
      </span>

      <span
        className={`coin-item__change ${
          isUp ? 'coin-item__change--up' : 'coin-item__change--down'
        }`}
      >
        {isUp ? '▲' : '▼'} {Math.abs(change).toFixed(2)}%
      </span>

      <FavoriteButton coinId={coin.id} />
    </Link>
  );
}
