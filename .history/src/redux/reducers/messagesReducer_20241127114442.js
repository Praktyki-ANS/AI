const initialState = {
    messages: [],
    loading: false,
    error: null,
  };
  
  const messagesReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'FETCH_MESSAGES_SUCCESS':
        return {
          ...state,
          messages: action.payload,
          loading: false,
        };
      case 'FETCH_MESSAGES_FAILURE':
        return {
          ...state,
          error: action.payload,
          loading: false,
        };
      case 'SEND_MESSAGE_SUCCESS':
        return {
          ...state,
          messages: [...state.messages, action.payload],
        };
      case 'SEND_MESSAGE_FAILURE':
        return {
          ...state,
          error: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default messagesReducer;
  