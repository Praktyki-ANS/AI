import axios from "axios";

export const fetchModelResponse = (input, modelId) => async (dispatch) => {
    dispatch({ type: "FETCH_MESSAGE_START" });
    console.log("ModelId:", modelId); // Log the ModelId to the console for debugging

    let endpoint = "";
    modelId = parseInt(modelId, 10);

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
            endpoint = "/healthcheck";
    }

    let requestBody = { input };
    console.log("Endpoint:", endpoint);

    // Handling specific logic based on modelId
    if (modelId == 2) {  // Emotion classifier model (modelId = 2)
        requestBody = { texts: [input] };
    } else if (modelId == 3) {  // Question answering model (modelId = 3)
        const [context, question] = input.split("|"); // Split input for question-answering
        requestBody = { context, question };
    }

    try {
        const response = await axios.post(`http://127.0.0.1:8000${endpoint}`, requestBody);
        let message = "";

        // Process the response based on modelId
        switch (modelId) {
            case 0:  // Summarization
                message = response.data.summarization || "No summary generated.";
                break;
            case 1:  // Translation
                message = response.data.translation || "No translation available.";
                break;
            case 2:  // Emotion classifier
                message = response.data.emotions?.map(e => `${e.label}: ${e.score}`).join(", ") || "No emotions detected.";
                break;
            case 3:  // Question answering
                message = response.data.answer || "No answer available.";
                break;
            case 4:  // Text generation
                message = response.data.generated_text || "No text generated.";
                break;
            default:
                message = "No valid model response.";
        }

        // Dispatch the success actions for both user message and model response
        dispatch({
            type: "FETCH_MESSAGE_SUCCESS",
            payload: { text: input, isUser: true }, // User message
        });

        dispatch({
            type: "FETCH_MESSAGE_SUCCESS",
            payload: { text: message, isUser: false }, // Model response
        });

    } catch (error) {
        dispatch({
            type: "FETCH_MESSAGE_FAILURE",
            payload: error.message || "Failed to fetch response",
        });
    }
};
