import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// API endpoints
const API_IN = process.env.GPT_API_IN;
const API_OUT = process.env.GPT_API_OUT;

// Thunk do wysyłania wiadomości do API
export const sendMessage = createAsyncThunk(
  'chat/sendMessage',
  async (message, { rejectWithValue }) => {
    try {
      const response = await axios.post(API_IN, { message });
      return response.data; // Odpowiedź od API
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Error communicating with API');
    }
  }
);

const chatSlice = createSlice({
  name: 'chat',
  initialState: {
    messages: [], // Historia wiadomości
    status: 'idle', // idle | loading | succeeded | failed
    error: null,
  },
  reducers: {
    addMessage: (state, action) => {
      state.messages.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendMessage.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(sendMessage.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.messages.push({ role: 'bot', content: action.payload });
      })
      .addCase(sendMessage.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const { addMessage } = chatSlice.actions;
export default chatSlice.reducer;
