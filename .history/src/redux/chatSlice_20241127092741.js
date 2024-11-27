import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// API endpoints
const API_ENDPOINTS = {
  gpt: process.env.GPT_API_IN,
  bert: process.env.BERT_API_IN,
};

export const sendMessage = createAsyncThunk(
  'chat/sendMessage',
  async ({ message, type }, { rejectWithValue }) => {
    try {
      const apiUrl = API_ENDPOINTS[type];
      if (!apiUrl) {
        throw new Error(`API endpoint for type "${type}" is not defined.`);
      }

      const response = await axios.post(apiUrl, { message });
      return { response: response.data, type };
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Error communicating with API');
    }
  }
);

const chatSlice = createSlice({
  name: 'chat',
  initialState: {
    messages: [], // Historia wiadomości
    status: 'idle',
    error: null,
    type: 'gpt', // Domyślnie GPT
  },
  reducers: {
    addMessage: (state, action) => {
      state.messages.push(action.payload);
    },
    setChatType: (state, action) => {
      state.type = action.payload; // Ustawienie typu chatu (gpt/bert)
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendMessage.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(sendMessage.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.messages.push({ role: 'bot', content: action.payload.response });
      })
      .addCase(sendMessage.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const { addMessage, setChatType } = chatSlice.actions;
export default chatSlice.reducer;
