// CoinGecko API ka ek coin object jaisa dikhta hai, uska shape.
// Hum sirf wahi fields likhte hain jo humein chahiye —
// asal API bahut zyada extra fields bhejti hai jo hum ignore kar dete hain.
export interface Coin {
  id: string; // jaise "bitcoin" — isay URL mein use karenge
  symbol: string; // jaise "btc"
  name: string; // jaise "Bitcoin"
  image: string; // coin ka logo, ek URL
  current_price: number;
  market_cap: number;
  price_change_percentage_24h: number | null;
}

// Single coin ki "detail" API alag shape mein data deti hai
// (list wali API se) — is liye ye ek naya, alag interface hai.
// Notice: yahan fields "nested" hain (object ke andar object) —
// asal API bilkul isi tarah data bhejti hai.
export interface CoinDetail {
  id: string;
  name: string;
  symbol: string;
  description: {
    en: string;
  };
  image: {
    large: string;
  };
  market_data: {
    current_price: { usd: number };
    price_change_percentage_24h: number | null;
    high_24h: { usd: number };
    low_24h: { usd: number };
    market_cap: { usd: number };
  };
}

// Chart ke liye ek din ka data point — Recharts isi shape ko expect karta hai
export interface PriceHistoryPoint {
  date: string;
  price: number;
}

type Status = 'idle' | 'loading' | 'succeeded' | 'failed';

// Redux store mein coins slice ki poori state ka shape
export interface CoinsState {
  coins: Coin[]; // Coin[] ka matlab: "Coin shape ki cheezon ki ek list"
  status: Status;
  error: string | null;

  // Naya: ek waqt mein sirf "ek" coin ki detail rakhte hain
  selectedCoin: CoinDetail | null;
  detailStatus: Status;
  detailError: string | null;

  // Naya: chart ke liye price history
  priceHistory: PriceHistoryPoint[];
  historyStatus: Status;
  historyError: string | null;
}
