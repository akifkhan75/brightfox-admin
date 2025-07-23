
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Friend } from '../../../../types.ts';

interface FriendsState {
  items: Friend[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: FriendsState = {
  items: [],
  status: 'idle',
  error: null,
};

export const fetchFriends = createAsyncThunk<Friend[]>('friends/fetchFriends', async () => {
  const response = await fetch('/api/friends');
  if (!response.ok) {
    throw new Error('Server error!');
  }
  const data = await response.json();
  return data;
});

const friendsSlice = createSlice({
  name: 'friends',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFriends.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchFriends.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchFriends.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Something went wrong';
      });
  },
});

export default friendsSlice.reducer;