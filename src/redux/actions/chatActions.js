import axiosInstance from '../../utils/axiosInstance'; // Import Axios instance

// actions/chatActions.js
export const addMessage = (message) => ({
    type: 'ADD_MESSAGE',
    payload: message,
});

export const clearImageMessages = () => {
    return {
        type: 'CLEAR_IMAGE_MESSAGES',
    };
};

export const fetchModelResponse = (input, modelId) => async (dispatch) => {
    dispatch({ type: "FETCH_MESSAGE_START" });
    console.log("ModelId:", modelId); // Log the ModelId for debugging

    let endpoint = "";
    modelId = parseInt(modelId, 10);

    // Determine the endpoint based on modelId
    switch (modelId) {
        case 0:
            endpoint = "/summarization";
            break;
        case 1:
            endpoint = "/translate/pl-en";
            break;
        case 2:
            endpoint = "/predict"; // Emotion classifier
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
        case 7: 
            endpoint = "/images"; // Image generation
            break;  
        default:
            endpoint = "/healthcheck";
    }

    // Prepare the request body based on modelId
    let requestBody = { input };
    console.log("Endpoint:", endpoint);

    // Handle specific logic based on modelId
    if (modelId === 2) {  // Emotion classifier
        requestBody = { texts: [input] };
    } else if (modelId === 3) {  // Question answering
        const [context, question] = input.split("|"); // Split input for question-answering
        requestBody = { context, question };
    } else if (modelId === 7) {  // Image generation
        requestBody = { prompt: input }; // Correctly format the request body for image generation
    }

    try {
        // Use Axios instance to make the request
        const response = await axiosInstance.post(endpoint, requestBody);
        console.log("Response:", response.data); // Log the response for debugging
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
            case 6:  // Translation
                message = response.data.translation || "No translation available.";
                break;
            case 7:  // Image generation 
                // Assuming the response contains an array of image paths
                message = response.data.images?.map((img, index) => `<img src="${img}" alt="Generated Image ${index + 1}" />`).join("") || "No images generated.";
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
        console.error("Error fetching model response:", error); // Log the error for debugging
        dispatch({
            type: "FETCH_MESSAGE_FAILURE",
            payload: error.response?.data?.detail || error.message || "Failed to fetch response",
        });
    }
};