import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Message } from '../../../../types.ts';

interface MessagesState {
  items: Message[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: MessagesState = {
  items: [],
  status: 'idle',
  error: null,
};

export const fetchMessages = createAsyncThunk<Message[]>('messages/fetchMessages', async () => {
  const response = await fetch('/api/messages');
  if (!response.ok) throw new Error('Server error!');
  return await response.json();
});

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
      markAsRead: (state, action: PayloadAction<string>) => {
          const message = state.items.find(m => m.id === action.payload);
          if (message) {
              message.isRead = true;
          }
      }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMessages.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchMessages.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchMessages.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch messages';
      });
  },
});

export const { markAsRead } = messagesSlice.actions;
export default messagesSlice.reducer;
