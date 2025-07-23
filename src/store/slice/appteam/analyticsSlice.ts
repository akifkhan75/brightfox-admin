import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { AnalyticsData } from '../../../../types.ts';

interface AnalyticsState {
  data: AnalyticsData | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: AnalyticsState = {
  data: null,
  status: 'idle',
  error: null,
};

export const fetchAnalytics = createAsyncThunk<AnalyticsData>('analytics/fetchAnalytics', async () => {
  const response = await fetch('/api/appteam/analytics');
  if (!response.ok) throw new Error('Server error!');
  return await response.json();
});

const analyticsSlice = createSlice({
  name: 'analytics',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAnalytics.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAnalytics.fulfilled, (state, action: PayloadAction<AnalyticsData>) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchAnalytics.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch analytics';
      });
  },
});

export default analyticsSlice.reducer;
