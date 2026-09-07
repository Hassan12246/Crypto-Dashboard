# 📊 Crypto Dashboard

A live cryptocurrency dashboard built with React, TypeScript, and Redux Toolkit — track real-time prices, view detailed coin analytics with price history charts, and save your favorite coins.

**🔗 Live Demo:** [crypto-dashboard-tawny-one.vercel.app](https://crypto-dashboard-tawny-one.vercel.app)

---

## ✨ Features

- **Live Market Data** — Real-time prices for the top 50 cryptocurrencies, powered by the CoinGecko API
- **Search & Filter** — Instantly filter coins by name
- **Detailed Coin View** — Current price, 24h high/low, market cap, and a description for each coin
- **Price History Chart** — Interactive 7-day price trend, built with Recharts
- **Favorites** — Star any coin to save it to your favorites list
- **Loading Skeletons** — Polished loading states instead of plain spinners
- **Fully Responsive** — Works smoothly on mobile and desktop
- **Type-Safe** — Written entirely in TypeScript with strict mode enabled

---

## 🛠️ Tech Stack

| Category         | Technology                                                                |
| ---------------- | ------------------------------------------------------------------------- |
| Framework        | React 18 + Vite                                                           |
| Language         | TypeScript                                                                |
| State Management | Redux Toolkit (`createSlice`, `createAsyncThunk`)                         |
| Routing          | React Router v6                                                           |
| Charts           | Recharts                                                                  |
| Icons            | Lucide React                                                              |
| Data Source      | [CoinGecko API](https://www.coingecko.com/en/api) (free, no key required) |

---

## 📁 Project Structure

```
src/
├── app/                 # Redux store configuration
├── features/
│   ├── coins/           # Coins slice — list, detail, price history
│   └── favorites/       # Favorites slice
├── hooks/               # Typed Redux hooks (useAppDispatch, useAppSelector)
├── components/          # Reusable UI pieces (CoinListItem, PriceChart, FavoriteButton, Skeletons)
├── pages/                # Route-level pages (Home, CoinDetail, Favorites)
├── App.tsx               # Routes + navigation
└── main.tsx               # App entry point
```

---

## 🚀 Getting Started

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/crypto-dashboard.git
cd crypto-dashboard

# Install dependencies
npm install

# Run the development server
npm run dev
```

Open `http://localhost:5173` in your browser.

### Build for production

```bash
npm run build
```

This runs a TypeScript type-check followed by a Vite production build. Output goes to the `dist/` folder.

---

## 🧠 What I Learned Building This

- Managing async state (loading/success/error) predictably with Redux Toolkit's `createAsyncThunk`
- Building type-safe Redux hooks and slices with TypeScript generics
- Client-side routing with dynamic route parameters (`/coin/:coinId`)
- Chaining and consuming a public REST API
- Writing reusable, composable React components with a clear separation of concerns

---

## 📸 Screenshots

_(Add 2-3 screenshots here after deploying — Home page, Coin Detail page, and Favorites page)_

---

## 📄 License

This project is open source and available for anyone to learn from.
