
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Course } from '../../../../types.ts';

interface CoursesState {
  items: Course[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: CoursesState = {
  items: [],
  status: 'idle',
  error: null,
};

export const fetchCourses = createAsyncThunk<Course[]>('courses/fetchCourses', async () => {
  const response = await fetch('/api/courses');
  if (!response.ok) {
    throw new Error('Server error!');
  }
  const data = await response.json();
  return data;
});

const coursesSlice = createSlice({
  name: 'courses',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCourses.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCourses.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchCourses.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Something went wrong';
      });
  },
});

export default coursesSlice.reducer;