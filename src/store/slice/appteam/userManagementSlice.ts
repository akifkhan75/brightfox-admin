import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { AppUser } from '../../../../types.ts';

interface UserManagementState {
  users: AppUser[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: UserManagementState = {
  users: [],
  status: 'idle',
  error: null,
};

export const fetchAllUsers = createAsyncThunk<AppUser[]>('userManagement/fetchAllUsers', async () => {
  const response = await fetch('/api/appteam/users');
  if (!response.ok) throw new Error('Server error!');
  return await response.json();
});

export const updateUser = createAsyncThunk<AppUser, { id: string, data: Partial<AppUser> }>('userManagement/updateUser', async ({ id, data }) => {
    const response = await fetch(`/api/appteam/users/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Server error!');
    return await response.json();
});

const userManagementSlice = createSlice({
  name: 'userManagement',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllUsers.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAllUsers.fulfilled, (state, action: PayloadAction<AppUser[]>) => {
        state.status = 'succeeded';
        state.users = action.payload;
      })
      .addCase(fetchAllUsers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch users';
      })
      .addCase(updateUser.fulfilled, (state, action: PayloadAction<AppUser>) => {
          const index = state.users.findIndex(u => u.id === action.payload.id);
          if (index !== -1) {
              state.users[index] = action.payload;
          }
      });
  },
});

export default userManagementSlice.reducer;
