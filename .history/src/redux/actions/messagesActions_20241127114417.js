import axios from 'axios';

export const fetchMessages = () => async (dispatch) => {
  try {
    const response = await axios.get('/api/messages'); // Zamień na swój endpoint
    dispatch({
      type: 'FETCH_MESSAGES_SUCCESS',
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: 'FETCH_MESSAGES_FAILURE',
      payload: error.message,
    });
  }
};

export const sendMessage = (message) => async (dispatch) => {
  try {
    const response = await axios.post('/api/messages', { text: message }); // Zamień na swój endpoint
    dispatch({
      type: 'SEND_MESSAGE_SUCCESS',
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: 'SEND_MESSAGE_FAILURE',
      payload: error.message,
    });
  }
};
