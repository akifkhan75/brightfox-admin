
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { ScheduledItem } from '../../../types.ts';

interface ScheduleState {
  items: ScheduledItem[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: ScheduleState = {
  items: [],
  status: 'idle',
  error: null,
};

export const fetchSchedule = createAsyncThunk<ScheduledItem[]>('schedule/fetchSchedule', async () => {
  const response = await fetch('/api/schedule');
  if (!response.ok) {
    throw new Error('Server error!');
  }
  const data = await response.json();
  return data;
});

const scheduleSlice = createSlice({
  name: 'schedule',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSchedule.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchSchedule.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchSchedule.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Something went wrong';
      });
  },
});

export default scheduleSlice.reducer;