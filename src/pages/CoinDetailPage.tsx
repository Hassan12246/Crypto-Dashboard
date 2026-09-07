import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import {
  fetchCoinDetail,
  fetchPriceHistory,
} from "../features/coins/coinsSlice";
import PriceChart from "../components/PriceChart";
import FavoriteButton from "../components/FavoriteButton";
import CoinDetailSkeleton from "../components/CoinDetailSkeleton";
import "./CoinDetailPage.css";

export default function CoinDetailPage() {
  const { coinId } = useParams<{ coinId: string }>();
  const dispatch = useAppDispatch();

  const { selectedCoin, detailStatus, detailError, priceHistory } =
    useAppSelector((state) => state.coins);

  // Zaroori: [coinId] dependency array mein hai. Agar user Bitcoin se
  // Ethereum page par jaye, coinId badal jayega, aur ye useEffect
  // DOBARA chalega — naye coin ka data mangwane ke liye.
  useEffect(() => {
    if (coinId) {
      dispatch(fetchCoinDetail(coinId));
      dispatch(fetchPriceHistory(coinId));
    }
  }, [coinId, dispatch]);

  if (detailStatus === "loading") {
    return (
      <div className="detail-page">
        <CoinDetailSkeleton />
      </div>
    );
  }

  if (detailStatus === "failed") {
    return <p className="detail-page__error">{detailError}</p>;
  }

  if (!selectedCoin) return null;

  const md = selectedCoin.market_data;
  const change = md.price_change_percentage_24h ?? 0;
  const isUp = change >= 0;

  // API description mein HTML tags hote hain (jaise <a>, <b>) —
  // simple regex se unhe hata kar sirf plain text nikal rahe hain.
  const plainDescription = selectedCoin.description.en
    .replace(/<[^>]*>/g, "")
    .split("\n")[0];

  return (
    <div className="detail-page">
      <Link to="/" className="detail-page__back">
        ←
      </Link>

      <header className="detail-page__header">
        <img
          src={selectedCoin.image.large}
          alt={selectedCoin.name}
          className="detail-page__image"
        />
        <div>
          <h1 className="detail-page__name">{selectedCoin.name}</h1>
          <p className="detail-page__symbol">{selectedCoin.symbol}</p>
        </div>
        <FavoriteButton coinId={selectedCoin.id} />
      </header>

      <div className="detail-page__price-card">
        <p className="detail-page__price">
          ${md.current_price.usd.toLocaleString("en-US")}
        </p>
        <p
          className={`detail-page__change ${
            isUp ? "detail-page__change--up" : "detail-page__change--down"
          }`}
        >
          {isUp ? "▲" : "▼"} {Math.abs(change).toFixed(2)}% (24h)
        </p>

        <div className="detail-page__stats">
          <div>
            <p className="detail-page__stat-label">24h High</p>
            <p className="detail-page__stat-value">
              ${md.high_24h.usd.toLocaleString("en-US")}
            </p>
          </div>
          <div>
            <p className="detail-page__stat-label">24h Low</p>
            <p className="detail-page__stat-value">
              ${md.low_24h.usd.toLocaleString("en-US")}
            </p>
          </div>
          <div>
            <p className="detail-page__stat-label">Market Cap</p>
            <p className="detail-page__stat-value">
              ${md.market_cap.usd.toLocaleString("en-US")}
            </p>
          </div>
        </div>
      </div>

      {priceHistory.length > 0 && <PriceChart data={priceHistory} />}

      {plainDescription && (
        <div className="detail-page__description">{plainDescription}</div>
      )}
    </div>
  );
}
