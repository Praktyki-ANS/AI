import axios from 'axios';

export const SEND_MESSAGE = 'SEND_MESSAGE';
export const RECEIVE_MESSAGE = 'RECEIVE_MESSAGE';
export const SEND_MESSAGE_FAILURE = 'SEND_MESSAGE_FAILURE'; // Action type for error

export const sendMessage = (message) => async (dispatch) => {
    dispatch({ type: SEND_MESSAGE, payload: message });

    try {
        // Fetch response from the FastAPI
        const response = await axios.post('http://127.0.0.1:8000', { texts: [message] });
        const responseMessage = response.data; // Adjust based on your API response structure

        dispatch({ type: RECEIVE_MESSAGE, payload: responseMessage });
    } catch (error) {
        // Dispatch error action with error message
        dispatch({ type: SEND_MESSAGE_FAILURE, payload: error.message });
        throw error; // Rethrow the error to handle it in the component
    }
};