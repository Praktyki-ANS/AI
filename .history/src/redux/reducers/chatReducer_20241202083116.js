const initialState = {
    messages: [],
    loading: false,
    errorMessage: null,
};

export const chatReducer = (state = initialState, action) => {
    switch (action.type) {
        case "FETCH_MESSAGE_START":
            return {
                ...state,
                loading: true,
                errorMessage: null,
            };
        case "FETCH_MESSAGE_SUCCESS":
            return {
                ...state,
                loading: false,
                messages: [
                    ...state.messages,
                    { text: action.payload.text, isUser: false },
                ],
            };
        case "FETCH_MESSAGE_FAILURE":
            return {
                ...state,
                loading: false,
                errorMessage: action.payload,
                messages: [
                    ...state.messages,
                    { text: action.payload, isError: true },
                ],
            };
        default:
            return state;
    }
};
