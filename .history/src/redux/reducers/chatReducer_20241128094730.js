// reducers/chatReducer.js
import { SEND_MESSAGE, RECEIVE_MESSAGE, SEND_MESSAGE_FAILURE } from '../actions/chatActions';

const initialState = {
    messages: [],
};

const chatReducer = (state = initialState, action) => {
    switch (action.type) {
        case SEND_MESSAGE:
            return {
                ...state,
                messages: [...state.messages, { text: action.payload, isUser: true, isError : false }],
            };
        case RECEIVE_MESSAGE:
            return {
                ...state,
                messages: [...state.messages, { text: action.payload, isUser: false, isError : false }],
            }; 
        case SEND_MESSAGE_FAILURE:
            return {
                ...state,
                messages: [...state.messages, { text: action.payload, isUser: false, isError : true }],
            };
        default:
            return state;
    }
}
export default chatReducer;