import axiosInstance from '../../utils/axiosInstance';

export const sendMessage = (message) => async (dispatch) => {
    try {
        dispatch({ type: 'SEND_MESSAGE_REQUEST' });

        // Wybierz odpowiedni endpoint (np. `/summarization` lub `/translate`)
        const response = await axiosInstance.post('/summarization', { input: message });

        dispatch({
            type: 'SEND_MESSAGE_SUCCESS',
            payload: response.data,
        });
    } catch (error) {
        dispatch({
            type: 'SEND_MESSAGE_FAILURE',
            payload: error.response?.data?.error || error.message,
        });
    }
};
