import axios from "axios";

export const fetchModelResponse = (input, modelId) => async (dispatch) => {
    dispatch({ type: "FETCH_MESSAGE_START" });

    let endpoint = "";
    switch (modelId) {
        case "summarization":
            endpoint = "/summarization";
            break;
        case "translation":
            endpoint = "/translate";
            break;
        case "emotion_classifier":
            endpoint = "/predict";
            break;
        case "question_answering":
            endpoint = "/question-answering";
            break;
        case "text_generation":
            endpoint = "/generate-text";
            break;
        default:
            endpoint = "/healthcheck";
    }

    try {
        const response = await axios.post(`http://127.0.0.1:8000${endpoint}`, {
            input,
        });
        const message = response.data;

        dispatch({
            type: "FETCH_MESSAGE_SUCCESS",
            payload: { text: message, isUser: false },
        });
    } catch (error) {
        dispatch({
            type: "FETCH_MESSAGE_FAILURE",
            payload: error.message || "Failed to fetch response",
        });
    }
};
