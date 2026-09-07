import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { loadFromStorage } from '../../utils/localStorage';

interface FavoritesState {
  ids: string[]; // sirf coin IDs ki list, jaise ["bitcoin", "ethereum"]
}

// Pehle localStorage check karo — agar pehle se saved favorites
// hain, wahi se shuru karo. Warna khaali array se shuru karo.
const initialState: FavoritesState = {
  ids: loadFromStorage<string[]>('favorites', []),
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  // Ye 'reducers' hain, 'extraReducers' nahi — kyunke koi API call
  // nahi ho rahi, ye sab turant (synchronous) hone wale kaam hain
  reducers: {
    toggleFavorite: (state, action: PayloadAction<string>) => {
      const coinId = action.payload;

      if (state.ids.includes(coinId)) {
        // Pehle se favorite hai → hata do
        state.ids = state.ids.filter((id) => id !== coinId);
      } else {
        // Favorite nahi hai → add kar do
        state.ids.push(coinId);
      }
    },
  },
});

export const { toggleFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;
