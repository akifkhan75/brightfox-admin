import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Class } from '../../../types.ts';

interface ClassesState {
  items: Class[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: ClassesState = {
  items: [],
  status: 'idle',
  error: null,
};

export const fetchClasses = createAsyncThunk<Class[]>('classes/fetchClasses', async () => {
  const response = await fetch('/api/classes');
  if (!response.ok) throw new Error('Server error!');
  return await response.json();
});

export const createClass = createAsyncThunk<Class, { name: string; description: string }>('classes/createClass', async (newClass) => {
  const response = await fetch('/api/classes', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newClass),
  });
  if (!response.ok) throw new Error('Server error!');
  return await response.json();
});

export const sendAnnouncement = createAsyncThunk<Class, { classId: string; message: string }>('classes/sendAnnouncement', async ({ classId, message }) => {
  const response = await fetch(`/api/classes/${classId}/announcement`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message }),
  });
  if (!response.ok) throw new Error('Server error!');
  return await response.json();
});

const classesSlice = createSlice({
  name: 'classes',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchClasses.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchClasses.fulfilled, (state, action: PayloadAction<Class[]>) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchClasses.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Something went wrong';
      })
      .addCase(createClass.fulfilled, (state, action: PayloadAction<Class>) => {
        state.items.push(action.payload);
      })
      .addCase(sendAnnouncement.fulfilled, (state, action: PayloadAction<Class>) => {
        const index = state.items.findIndex(c => c.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      });
  },
});

export default classesSlice.reducer;
