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

      // Załóżmy, że odpowiedź zawiera pole 'output', które zawiera odpowiedź modelu
      return response.data.output;
    } catch (error) {
      // Jeśli wystąpi błąd, sprawdzamy, czy jest to 'Unauthorized' (401)
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
    messages: [],
    isSending: false,
    error: null,
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
      })
      .addCase(sendMessage.rejected, (state, action) => {
        state.isSending = false;
        state.error = action.payload; // Ustawiamy błąd na odpowiednią wartość (np. "Brak dostępu do modelu" w przypadku Unauthorized)
      });
  },
});

export default chatSlice.reducer;
