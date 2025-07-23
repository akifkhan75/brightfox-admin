import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Payout, SubscriptionTier } from '../../../../types.ts';

interface BusinessState {
  payouts: Payout[];
  subscriptions: SubscriptionTier[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: BusinessState = {
  payouts: [],
  subscriptions: [],
  status: 'idle',
  error: null,
};

export const fetchPayouts = createAsyncThunk<Payout[]>('business/fetchPayouts', async () => {
  const response = await fetch('/api/appteam/business/payouts');
  if (!response.ok) throw new Error('Server error!');
  return await response.json();
});

export const fetchSubscriptions = createAsyncThunk<SubscriptionTier[]>('business/fetchSubscriptions', async () => {
  const response = await fetch('/api/appteam/business/subscriptions');
  if (!response.ok) throw new Error('Server error!');
  return await response.json();
});


const businessSlice = createSlice({
  name: 'business',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPayouts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchSubscriptions.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPayouts.fulfilled, (state, action: PayloadAction<Payout[]>) => {
        state.payouts = action.payload;
        if (state.subscriptions.length > 0) {
          state.status = 'succeeded';
        }
      })
      .addCase(fetchSubscriptions.fulfilled, (state, action: PayloadAction<SubscriptionTier[]>) => {
        state.subscriptions = action.payload;
        if (state.payouts.length > 0) {
          state.status = 'succeeded';
        }
      })
      .addCase(fetchPayouts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch business data';
      })
      .addCase(fetchSubscriptions.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch business data';
      });
  },
});

export default businessSlice.reducer;