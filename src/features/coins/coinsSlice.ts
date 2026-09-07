import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { Coin, CoinDetail, CoinsState, PriceHistoryPoint } from './types';

// ============================================================
// ASYNC THUNK — is dafa koi argument nahi chahiye (city name jaisa
// kuch nahi), is liye pehli generic 'void' likhte hain.
// void ka matlab: "is thunk ko call karte waqt kuch dena zaroori nahi"
// ============================================================
export const fetchCoins = createAsyncThunk<
  Coin[], // success mein Coin ki ek list milegi
  void, // koi argument nahi chahiye
  { rejectValue: string }
>('coins/fetch', async (_, { rejectWithValue }) => {
  try {
    const res = await fetch(
      'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1&sparkline=false'
    );

    if (res.status === 429) {
      return rejectWithValue(
        'Bohot zyada requests ho gayi hain, thori der intezar karein'
      );
    }

    if (!res.ok) {
      return rejectWithValue('Coins load nahi hue, dobara koshish karein');
    }

    // API seedha ek array bhejta hai, is liye 'data' khud Coin[] hoga
    const data: Coin[] = await res.json();
    return data;
  } catch {
    return rejectWithValue('Network mein masla hua');
  }
});

const initialState: CoinsState = {
  coins: [],
  status: 'idle',
  error: null,
  selectedCoin: null,
  detailStatus: 'idle',
  detailError: null,
  priceHistory: [],
  historyStatus: 'idle',
  historyError: null,
};

// ============================================================
// NAYA THUNK — is baar argument chahiye (coinId, jaise "bitcoin"),
// is liye pehli generic 'void' ki jagah 'string' hai.
// ============================================================
export const fetchCoinDetail = createAsyncThunk<
  CoinDetail, // success mein CoinDetail milega
  string, // input: coinId
  { rejectValue: string }
>('coins/fetchDetail', async (coinId, { rejectWithValue }) => {
  try {
    const res = await fetch(
      `https://api.coingecko.com/api/v3/coins/${coinId}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false`
    );

    if (res.status === 429) {
      return rejectWithValue(
        'Bohot zyada requests ho gayi hain, thori der intezar karein'
      );
    }

    if (!res.ok) {
      return rejectWithValue('Ye coin nahi mila');
    }

    const data: CoinDetail = await res.json();
    return data;
  } catch {
    return rejectWithValue('Network mein masla hua');
  }
});

// ============================================================
// TEESRA THUNK — chart ke liye 7 din ka price history mangwata hai
// ============================================================
export const fetchPriceHistory = createAsyncThunk<
  PriceHistoryPoint[], // success mein: din-wise price points ki list
  string, // input: coinId
  { rejectValue: string }
>('coins/fetchPriceHistory', async (coinId, { rejectWithValue }) => {
  try {
    const res = await fetch(
      `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=usd&days=7`
    );

    if (res.status === 429) {
      return rejectWithValue(
        'Bohot zyada requests ho gayi hain, thori der intezar karein'
      );
    }

    if (!res.ok) {
      return rejectWithValue('Chart data nahi mila');
    }

    const data = await res.json();

    // data.prices = [ [timestamp, price], [timestamp, price], ... ]
    // .map() se har pair ko { date, price } object mein badal rahe hain
    const formatted: PriceHistoryPoint[] = data.prices.map(
      (item: [number, number]) => ({
        date: new Date(item[0]).toLocaleDateString('en-US', {
          weekday: 'short',
        }),
        price: item[1],
      })
    );

    return formatted;
  } catch {
    return rejectWithValue('Network mein masla hua');
  }
});

const coinsSlice = createSlice({
  name: 'coins',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCoins.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(
        fetchCoins.fulfilled,
        (state, action: PayloadAction<Coin[]>) => {
          state.status = 'succeeded';
          state.coins = action.payload;
        }
      )
      .addCase(fetchCoins.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload ?? 'Kuch masla ho gaya';
      })
      // Naye thunk ke 3 cases — bilkul wahi pattern, alag fields update karte hain
      .addCase(fetchCoinDetail.pending, (state) => {
        state.detailStatus = 'loading';
        state.detailError = null;
      })
      .addCase(
        fetchCoinDetail.fulfilled,
        (state, action: PayloadAction<CoinDetail>) => {
          state.detailStatus = 'succeeded';
          state.selectedCoin = action.payload;
        }
      )
      .addCase(fetchCoinDetail.rejected, (state, action) => {
        state.detailStatus = 'failed';
        state.detailError = action.payload ?? 'Kuch masla ho gaya';
      })
      // Teesre thunk ke 3 cases
      .addCase(fetchPriceHistory.pending, (state) => {
        state.historyStatus = 'loading';
        state.historyError = null;
      })
      .addCase(
        fetchPriceHistory.fulfilled,
        (state, action: PayloadAction<PriceHistoryPoint[]>) => {
          state.historyStatus = 'succeeded';
          state.priceHistory = action.payload;
        }
      )
      .addCase(fetchPriceHistory.rejected, (state, action) => {
        state.historyStatus = 'failed';
        state.historyError = action.payload ?? 'Kuch masla ho gaya';
      });
  },
});

export default coinsSlice.reducer;
