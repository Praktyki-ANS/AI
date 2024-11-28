import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducers'; // Adjust the path as necessary

const store = configureStore({
    reducer: rootReducer,
    // You can add additional middleware or settings here if needed
});

export default store;