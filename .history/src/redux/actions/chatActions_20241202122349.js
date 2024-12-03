import axios from "axios";

export const fetchModelResponse = (input, modelId) => async (dispatch) => {
    dispatch({ type: "FETCH_MESSAGE_START" });

    let endpoint = "";
    switch (modelId) {
        case 0:
            endpoint = "/summarization";
            break;
        case 1:
            endpoint = "/translate";
            break;
        case 2:
            endpoint = "/predict";
            break;
        case 3:
            endpoint = "/question-answering";
            break;
        case 4:
            endpoint = "/generate-text";
            break;
        default:
            endpoint = "/healthcheck/";
    }

    let requestBody = { input };

    if (modelId === "emotion_classifier") {
        requestBody = { texts: [input] };
    } else if (modelId === "question_answering") {
        const [context, question] = input.split("|"); // Użyj separatora "|"
        requestBody = { context, question };
    }

    try {
        const response = await axios.post(`http://127.0.0.1:8000${endpoint}`, requestBody);
        let message = "";

        switch (modelId) {
            case "summarization":
                message = response.data.summarization || "No summary generated.";
                break;
            case "translation":
                message = response.data.translation || "No translation available.";
                break;
            case "emotion_classifier":
                message = response.data.emotions?.map(e => `${e.label}: ${e.score}`).join(", ") || "No emotions detected.";
                break;
            case "question_answering":
                message = response.data.answer || "No answer available.";
                break;
            case "text_generation":
                message = response.data.generated_text || "No text generated.";
                break;
            default:
                message = "No valid model response.";
        }

        // Dodaj wiadomość od użytkownika
        dispatch({
            type: "FETCH_MESSAGE_SUCCESS",
            payload: { text: input, isUser: true }, // Wysyłamy wiadomość od użytkownika
        });

        // Dodaj odpowiedź modelu
        dispatch({
            type: "FETCH_MESSAGE_SUCCESS",
            payload: { text: message, isUser: false }, // Odpowiedź modelu
        });

    } catch (error) {
        dispatch({
            type: "FETCH_MESSAGE_FAILURE",
            payload: error.message || "Failed to fetch response",
        });
    }
};
