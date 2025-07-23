
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { ActivityData } from '../../../types.ts';

interface ActivityState {
  data: ActivityData[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: ActivityState = {
  data: [],
  status: 'idle',
  error: null,
};

export const fetchActivity = createAsyncThunk<ActivityData[]>('activity/fetchActivity', async () => {
  const response = await fetch('/api/activity');
  if (!response.ok) {
    throw new Error('Server error!');
  }
  const data = await response.json();
  return data;
});

const activitySlice = createSlice({
  name: 'activity',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchActivity.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchActivity.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchActivity.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Something went wrong';
      });
  },
});

export default activitySlice.reducer;