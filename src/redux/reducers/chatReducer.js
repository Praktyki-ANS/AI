const initialState = {
    messages: [],
    loading: false,
    error: null,
};

const chatReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_MESSAGE':
            return {
                ...state,
                messages: [...state.messages, action.payload],
            };
        case "FETCH_MESSAGE_START":
            return { ...state, loading: true, error: null };
        case "FETCH_MESSAGE_SUCCESS":
            return {
                ...state,
                loading: false,
                messages: [...state.messages, action.payload],
                error: null, // Resetowanie błędu
            };
        case "FETCH_MESSAGE_FAILURE":
            return { ...state, loading: false, error: action.payload };
        case "CLEAR_MESSAGES":
            return { ...state, messages: [] , error: null}; // Resetowanie wiadomości
        case "CLEAR_IMAGE_MESSAGES":
            return {
                ...state,
                messages: state.messages.filter(msg => !msg.text.startsWith("<img")),
            };
        default:
            return state;
    }
};

export default chatReducer;