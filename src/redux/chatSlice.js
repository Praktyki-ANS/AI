import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Asynchroniczna funkcja do wysyłania i odbierania wiadomości
export const sendMessage = createAsyncThunk(
  'chat/sendMessage',
  async (message, { rejectWithValue }) => {
    try {
      const response = await axios.post('https://api.llama.ai/v1/completion', {
        model: 'llama-3.2-11B-vision-instruct-turbo',
        inputs: message,
        headers: {
          'Authorization': `Bearer ${process.env.LLAMA_API_KEY}`,
        },
      });

      return response.data.output;
    } catch (error) {
      if (error.response && error.response.status === 401) {
        return rejectWithValue('Brak dostępu do modelu');
      }
      return rejectWithValue(error.response ? error.response.data : error.message);
    }
  }
);

// Jeśli masz funkcję receiveMessage, zadeklaruj ją i eksportuj
export const receiveMessage = (message) => ({
  type: 'chat/receiveMessage',
  payload: message,
});

const chatSlice = createSlice({
  name: 'chat',
  initialState: {
    messages: [],
    isSending: false,
    error: null,
  },
  reducers: {
    // Możesz dodać takie reducer'y jak receiveMessage
    receiveMessage: (state, action) => {
      state.messages.push({ text: action.payload, isUser: false });
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendMessage.pending, (state) => {
        state.isSending = true;
      })
      .addCase(sendMessage.fulfilled, (state, action) => {
        state.isSending = false;
        state.messages.push({ text: action.payload, isUser: false });
        state.error = null;
      })
      .addCase(sendMessage.rejected, (state, action) => {
        state.isSending = false;
        state.error = action.payload;
        state.messages.push({ text: action.payload, isUser: false, isError: true });
      });
  },
});

export default chatSlice.reducer;
