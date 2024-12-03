const initialState = {
    messages: [],
    errorMessage: null,
    loading: false,
};

const chatReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SEND_MESSAGE_REQUEST':
            return { ...state, loading: true, errorMessage: null };
        case 'SEND_MESSAGE_SUCCESS':
            return {
                ...state,
                loading: false,
                messages: [
                    ...state.messages,
                    { text: action.payload.summarization || 'Nieznana odpowiedź', isUser: false },
                ],
            };
        case 'SEND_MESSAGE_FAILURE':
            return {
                ...state,
                loading: false,
                errorMessage: action.payload,
                messages: [...state.messages, { text: 'Błąd: ' + action.payload, isError: true }],
            };
        default:
            return state;
    }
};

export default chatReducer;
