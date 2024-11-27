import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Tworzymy asynchroniczną funkcję do wysyłania i odbierania wiadomości z Llama
export const sendMessage = createAsyncThunk(
  'chat/sendMessage',
  async (message, { rejectWithValue }) => {
    try {
      const response = await axios.post('https://api.llama.ai/v1/completion', {
        model: 'llama-3.2-11B-vision-instruct-turbo',  // Zmieniony model na Llama
        inputs: message,
        headers: {
          'Authorization': `Bearer ${process.env.LLAMA_API_KEY}`, // Klucz API Llama
        },
      });

      return response.data.output;
    } catch (error) {
      if (error.response && error.response.status === 401) {
        return rejectWithValue('Brak dostępu do modelu'); // Specjalny komunikat dla Unauthorized
      }
      return rejectWithValue(error.response ? error.response.data : error.message);
    }
  }
);

const chatSlice = createSlice({
  name: 'chat',
  initialState: {
    messages: [],  // Wiadomości (w tym błędy) będą przechowywane tutaj
    isSending: false,
    error: null,  // Błąd globalny (np. brak dostępu do modelu)
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(sendMessage.pending, (state) => {
        state.isSending = true;
      })
      .addCase(sendMessage.fulfilled, (state, action) => {
        state.isSending = false;
        state.messages.push({ text: action.payload, isUser: false });
        state.error = null;  // Reset błędu po pomyślnym wykonaniu
      })
      .addCase(sendMessage.rejected, (state, action) => {
        state.isSending = false;
        state.error = action.payload; // Ustawiamy błąd na odpowiednią wartość
        state.messages.push({ text: action.payload, isUser: false, isError: true }); // Dodajemy komunikat o błędzie do wiadomości
      });
  },
});

export default chatSlice.reducer;
