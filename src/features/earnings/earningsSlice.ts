import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { EarningsSummary, EarningsHistory } from '../../../types.ts';

interface EarningsState {
  summary: EarningsSummary | null;
  history: EarningsHistory | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: EarningsState = {
  summary: null,
  history: null,
  status: 'idle',
  error: null,
};

export const fetchEarningsSummary = createAsyncThunk<EarningsSummary>('earnings/fetchSummary', async () => {
  const response = await fetch('/api/earnings/summary');
  if (!response.ok) throw new Error('Server error!');
  return await response.json();
});

export const fetchEarningsHistory = createAsyncThunk<EarningsHistory>('earnings/fetchHistory', async () => {
  const response = await fetch('/api/earnings/history');
  if (!response.ok) throw new Error('Server error!');
  return await response.json();
});

const earningsSlice = createSlice({
  name: 'earnings',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEarningsSummary.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchEarningsHistory.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchEarningsSummary.fulfilled, (state, action: PayloadAction<EarningsSummary>) => {
        state.summary = action.payload;
        state.status = state.history ? 'succeeded' : 'loading';
      })
      .addCase(fetchEarningsHistory.fulfilled, (state, action: PayloadAction<EarningsHistory>) => {
        state.history = action.payload;
        state.status = state.summary ? 'succeeded' : 'loading';
      })
      .addCase(fetchEarningsSummary.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch earnings data';
      })
      .addCase(fetchEarningsHistory.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch earnings data';
      });
  },
});

export default earningsSlice.reducer;