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
            endpoint = "/predict/emotions"; // Updated endpoint for emotion classifier
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
        case 8: // New endpoint for toxicity classification
            endpoint = "/predict/toxicity";
            break;
        case 9: // New endpoint for paraphrasing
            endpoint = "/predict/paraphrase";
            break;
        case 10: // New endpoint for sentiment analysis
            endpoint = "/predict/sentiment";
            break;
        case 11: // New endpoint for topic classification
            endpoint = "/predict/topic";
            break;
        case 12: // New endpoint for zero-shot classification
            endpoint = "/predict/zero-shot";
            break;
        case 13: // New endpoint for named entity recognition
            endpoint = "/predict/ner";
            break;
        case 14: // New endpoint for named entity recognition
            endpoint = "/translate/en-ger";
            break;   
        case 15: // New endpoint for named entity recognition
            endpoint = "/translate/en-esp";
            break;  
            case 16: // New endpoint for named entity recognition
            endpoint = "/summarization/distilbart";
            break;  
            case 17: // New endpoint for named entity recognition
            endpoint = "/summarization/cnicu";
            break;  
            case 18:
            endpoint = "/generate-text2";
            break;
            case 19:
            endpoint = "/generate-text3";
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
    } else if ([8, 9, 10, 11, 12, 13].includes(modelId)) { // For new models
        requestBody = { texts: [input] }; // Use the same format for toxicity, paraphrasing, sentiment, topic, zero-shot, and NER
    }

    try {
        // Use Axios instance to make the request
        const response = await axiosInstance.post(endpoint, requestBody);
        console.log("Response:", response.data); // Log the response for debugging
        let message = "";

        // Process the response based on modelId
        switch (modelId) {
            case 0:  // Summarization
            case 5:  // Summarization/pegasus
            case 16: // Summarization
            case 17: // Summarization
                message = response.data.summarization || "No summary generated.";
                break;
        
            case 1:  // Translation
            case 6:  // Translation
            case 14: // Translation
            case 15: // Translation
                message = response.data.translation || "No translation available.";
                break;
        
            case 2:  // Emotion classifier
                message = response.data.predictions?.map(e => `${e.label}: ${e.score}`).join(", ") || "No emotions detected.";
                break;
        
            case 3:  // Question answering
                message = response.data.answer || "No answer available.";
                break;
        
            case 4:  // Text generation
            case 18: // Text generation
            case 19: // Text generation
                message = response.data.generated_text || "No text generated.";
                break;
        
            case 7:  // Image generation 
                message = response.data.images?.map((img, index) => `<img src="${img}" alt="Generated Image ${index + 1}" />`).join("") || "No images generated.";
                break;
        
            case 8:  // Toxicity classification
                message = response.data.predictions?.map(e => `Toxicity: ${e.label}, Score: ${e.score}`).join(", ") || "No toxicity predictions.";
                break;
        
            case 9:  // Paraphrasing
                message = response.data.predictions?.map(e => `Paraphrase: ${e.paraphrase}`).join(", ") || "No paraphrases generated.";
                break;
        
            case 10: // Sentiment analysis
                message = response.data.predictions?.map(e => `Sentiment: ${e.label}, Score: ${e.score}`).join(", ") || "No sentiment predictions.";
                break;
        
            case 11: // Topic classification
                message = response.data.predictions?.map(e => `Topic: ${e.label}, Score: ${e.score}`).join(", ") || "No topic predictions.";
                break;
        
            case 12: // Zero-shot classification
                message = response.data.predictions?.map(e => `Zero-shot label: ${e.label}, Score: ${e.score}`).join(", ") || "No zero-shot predictions.";
                break;
        
            case 13: // Named entity recognition
                message = response.data.predictions?.map(e => `Entity: ${e.entity}, Label: ${e.label}`).join(", ") || "No entities recognized.";
                break;
        
            default:
                message = "No valid model response.";
        }
        

        // Dispatch the success action for the model response only
        dispatch({
            type: "FETCH_MESSAGE_SUCCESS",
            payload: { text: message, isUser: false }, // Model response
        });

    } catch (error) {
        console.error("Error fetching model response:", error); // Log the error for debugging
        dispatch({
            type: "FETCH_MESSAGE_FAILURE",
            payload: error.response?.data?.detail || error.message || "Failed to fetch response",
        });
    }
};