import Skeleton from './Skeleton';
import './CoinListItem.css';

// Ye bilkul CoinListItem jaisa hi layout hai, lekin har cheez
// ki jagah Skeleton box hai. Isay HomePage mein 8 dafa dikhayenge
// jab tak asal data na aaye — user ko lagta hai list "waise hi"
// dikhne wali hai.
export default function CoinListItemSkeleton() {
  return (
    <div className="coin-item">
      <Skeleton width="32px" height="32px" borderRadius="50%" />

      <div className="coin-item__names">
        <Skeleton width="90px" height="14px" />
        <div style={{ marginTop: '6px' }}>
          <Skeleton width="40px" height="11px" />
        </div>
      </div>

      <Skeleton width="70px" height="14px" />
    </div>
  );
}
