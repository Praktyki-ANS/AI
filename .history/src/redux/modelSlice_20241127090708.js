// src/redux/modelSlice.js
import { createSlice } from '@reduxjs/toolkit';

// Initial state for managing model API interactions
const initialState = {
  inputText: '',
  outputText: '',
  loading: false,
  error: null,
};

const modelSlice = createSlice({
  name: 'model',
  initialState,
  reducers: {
    setInputText: (state, action) => {
      state.inputText = action.payload;
    },
    setOutputText: (state, action) => {
      state.outputText = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    resetState: () => initialState,
  },
});

export const { setInputText, setOutputText, setLoading, setError, resetState } = modelSlice.actions;

export default modelSlice.reducer;
