import { SEND_MESSAGE, RECEIVE_MESSAGE, SEND_MESSAGE_FAILURE } from '../actions/chatActions';

const initialState = {
    messages: [],
    errorMessage: null, // Add error message state
};

const chatReducer = (state = initialState, action) => {
    switch (action.type) {
        case SEND_MESSAGE:
            return {
                ...state,
                messages: [...state.messages, { text: action.payload, is:User  true, isError: false }],
                errorMessage: null, // Clear error message on new send
            };
        case RECEIVE_MESSAGE:
            return {
                ...state,
                messages: [...state.messages, { text: action.payload, is:User  false, isError: false }],
                errorMessage: null, // Clear error message on successful receive
            };
        case SEND_MESSAGE_FAILURE:
            return {
                ...state,
                messages: [...state.messages, { text: action.payload, is:User  false, isError: true }],
                errorMessage: action.payload, // Set error message
            };
        default:
            return state;
    }
};

export default chatReducer;