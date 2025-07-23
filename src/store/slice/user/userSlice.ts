
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserRole } from '../../../../types.ts';

interface UserState {
  currentRole: UserRole;
}

const initialState: UserState = {
  currentRole: UserRole.Teacher,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setCurrentRole: (state, action: PayloadAction<UserRole>) => {
      state.currentRole = action.payload;
    },
  },
});

export const { setCurrentRole } = userSlice.actions;
export default userSlice.reducer;