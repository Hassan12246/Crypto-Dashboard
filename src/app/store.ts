import { configureStore } from '@reduxjs/toolkit';
import coinsReducer from '../features/coins/coinsSlice';
import favoritesReducer from '../features/favorites/favoritesSlice';
import themeReducer from '../features/theme/themeSlice';
import { saveToStorage } from '../utils/localStorage';

export const store = configureStore({
  reducer: {
    coins: coinsReducer,
    favorites: favoritesReducer,
    theme: themeReducer,
  },
});

// store.subscribe() ek function chalata hai HAR DAFA jab bhi
// store ki koi bhi state badle — chahe wo favorites ho, coins ho, kuch bhi.
// Hum yahan sirf 'favorites' aur 'theme' ko localStorage mein save karte hain.
store.subscribe(() => {
  const state = store.getState();
  saveToStorage('favorites', state.favorites.ids);
  saveToStorage('theme', state.theme.mode);
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
