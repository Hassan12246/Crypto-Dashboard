import { createSlice } from '@reduxjs/toolkit';
import { loadFromStorage } from '../../utils/localStorage';

export type ThemeMode = 'light' | 'dark';

interface ThemeState {
  mode: ThemeMode;
}

// Agar user ne pehle theme choose ki thi, wahi load karo.
// Warna default 'light' se shuru karo.
const initialState: ThemeState = {
  mode: loadFromStorage<ThemeMode>('theme', 'light'),
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.mode = state.mode === 'light' ? 'dark' : 'light';
    },
  },
});

export const { toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;
