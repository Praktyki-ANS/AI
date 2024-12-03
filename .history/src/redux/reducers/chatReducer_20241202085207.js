const initialState = {
    messages: [],
    loading: false,
    error: null,
};

const chatReducer = (state = initialState, action) => {
    switch (action.type) {
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
        default:
            return state;
    }
};

export default chatReducer;
