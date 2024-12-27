import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchModelResponse } from "../redux/actions/chatActions";
import { useParams } from "react-router-dom"; // Pobierz parametry z linku

const ModelChatComponent = () => {
    const { modelId } = useParams(); // Pobierz ID modelu z linku
    const [input, setInput] = useState("");
    const dispatch = useDispatch();
    const { messages, loading, error } = useSelector((state) => state.chat);

    useEffect(() => {
        if (!modelId) {
            console.error("Brak ID modelu w URL");
        }
    }, [modelId]);

    const handleSend = () => {
        if (input.trim()) {
            dispatch(fetchModelResponse(input, modelId)); // Wyślij żądanie z dynamicznym modelem
            setInput(""); // Wyczyść pole tekstowe
        }
    };

    return (
        <div className="chat-container">
            <div className="chat-messages">
                {messages.map((msg, index) => (
                    <div
                        key={index}
                        className={`message ${msg.isUser ? "user-message" : "bot-message"}`}
                    >
                        {msg.text}
                    </div>
                ))}
            </div>
            <div className="chat-input">
                <textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Wpisz wiadomość..."
                />
                <button onClick={handleSend} disabled={loading}>
                    {loading ? "Ładowanie..." : "Wyślij"}
                </button>
            </div>
            {error && <p className="error">Błąd: {error}</p>}
        </div>
    );
};

export default ModelChatComponent;
