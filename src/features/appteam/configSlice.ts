import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { AppConfig } from '../../../types.ts';

interface ConfigState {
  settings: AppConfig | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: ConfigState = {
  settings: null,
  status: 'idle',
  error: null,
};

export const fetchConfig = createAsyncThunk<AppConfig>('config/fetchConfig', async () => {
  const response = await fetch('/api/appteam/config');
  if (!response.ok) throw new Error('Server error!');
  return await response.json();
});

export const updateConfig = createAsyncThunk<AppConfig, Partial<AppConfig>>('config/updateConfig', async (newSettings) => {
    const response = await fetch('/api/appteam/config', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newSettings),
    });
    if (!response.ok) throw new Error('Server error!');
    return await response.json();
});


const configSlice = createSlice({
  name: 'config',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchConfig.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchConfig.fulfilled, (state, action: PayloadAction<AppConfig>) => {
        state.status = 'succeeded';
        state.settings = action.payload;
      })
      .addCase(fetchConfig.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch config';
      })
       .addCase(updateConfig.fulfilled, (state, action: PayloadAction<AppConfig>) => {
        state.settings = action.payload;
      });
  },
});

export default configSlice.reducer;
