import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  messages: [],
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    addMessage: (state, action) => {
      state.messages.push(action.payload);
    },
    setMessages: (state, action) => {
      state.messages = action.payload;
    },
  },
});

export const { addMessage, setMessages } = chatSlice.actions;

export const sendMessage = ({ text, isUser, modelId }) => async (dispatch) => {
  try {
    // Dodaj wiadomość użytkownika
    dispatch(addMessage({ text, isUser }));

    // Wysyłanie wiadomości do modelu
    const response = await axios.post('YOUR_API_URL', {
      modelId,
      prompt: text,
      apiKey: process.env.REACT_APP_API_KEY,
    });

    const modelMessage = response.data.message;

    // Dodaj wiadomość z modelu
    dispatch(addMessage({ text: modelMessage, isUser: false }));
  } catch (error) {
    if (error.response && error.response.status === 401) {
      throw new Error('Unauthorized'); // Rzucamy błąd, żeby go obsłużyć w komponencie
    }
    console.error('Error sending message:', error);
  }
};

export default chatSlice.reducer;
