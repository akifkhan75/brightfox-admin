import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { UserProfile } from '../../../types.ts';

interface ProfileState {
  data: UserProfile | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: ProfileState = {
  data: null,
  status: 'idle',
  error: null,
};

export const fetchProfile = createAsyncThunk<UserProfile>('profile/fetchProfile', async () => {
  const response = await fetch('/api/profile');
  if (!response.ok) throw new Error('Server error!');
  return await response.json();
});

export const updateProfile = createAsyncThunk<UserProfile, Partial<UserProfile>>('profile/updateProfile', async (profileData) => {
  const response = await fetch('/api/profile', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(profileData),
  });
  if (!response.ok) throw new Error('Server error!');
  return await response.json();
});


const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfile.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProfile.fulfilled, (state, action: PayloadAction<UserProfile>) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch profile';
      })
      .addCase(updateProfile.fulfilled, (state, action: PayloadAction<UserProfile>) => {
        state.data = action.payload;
      });
  },
});

export default profileSlice.reducer;
