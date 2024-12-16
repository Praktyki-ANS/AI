import axiosInstance from '../../utils/axiosInstance'; // Importuj instancję Axios

// actions/chatActions.js
export const addMessage = (message) => ({
    type: 'ADD_MESSAGE',
    payload: message,
});

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
            endpoint = "/translate/pl-en";
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
        case 5: 
            endpoint = "/summarization/pegasus";
            break;
        case 6: 
            endpoint = "/translate/en-pl";
            break;
        default:
            endpoint = "/healthcheck";
    }

    let requestBody = { input };
    console.log("Endpoint:", endpoint);

    // Handling specific logic based on modelId
    if (modelId === 2) {  // Emotion classifier model (modelId = 2)
        requestBody = { texts: [input] };
    } else if (modelId === 3) {  // Question answering model (modelId = 3)
        const [context, question] = input.split("|"); // Split input for question-answering
        requestBody = { context, question };
    }

    try {
        // Użyj instancji Axios do wykonania zapytania
        const response = await axiosInstance.post(endpoint, requestBody);
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
            case 5:  // Summarization/pegasus
                message = response.data.summarization || "No summary generated.";
                break;
            case 6:  // Summarization
                message = response.data.translation || "No translation available.";
                break;
            default:
                message = "No valid model response.";
        }

        // Dispatch the success action for the model response only
        dispatch({
            type: "FETCH_MESSAGE_SUCCESS",
            payload: { text: message, isUser:  false }, // Model response
        });

    } catch (error) {
        dispatch({
            type: "FETCH_MESSAGE_FAILURE",
            payload: error.message || "Failed to fetch response",
        });
    }
};