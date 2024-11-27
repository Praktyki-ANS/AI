// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import modelReducer from './modelSlice';

const store = configureStore({
  reducer: {
    model: modelReducer,
  },
});

export default store;
