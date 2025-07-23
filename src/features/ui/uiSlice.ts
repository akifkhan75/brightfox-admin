
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UiState {
  darkMode: boolean;
  isModalOpen: boolean;
}

const initialState: UiState = {
  darkMode: localStorage.getItem('darkMode') ? JSON.parse(localStorage.getItem('darkMode')!) : window.matchMedia('(prefers-color-scheme: dark)').matches,
  isModalOpen: false,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleDarkMode: (state) => {
      state.darkMode = !state.darkMode;
      localStorage.setItem('darkMode', JSON.stringify(state.darkMode));
    },
    setModalOpen: (state, action: PayloadAction<boolean>) => {
      state.isModalOpen = action.payload;
    },
  },
});

export const { toggleDarkMode, setModalOpen } = uiSlice.actions;
export default uiSlice.reducer;
