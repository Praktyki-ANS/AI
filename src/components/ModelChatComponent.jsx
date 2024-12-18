import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchModelResponse, addMessage, clearImageMessages } from "../redux/actions/chatActions"; // Importuj addMessage
import "./ModelComponent.css"; // Używamy zaktualizowanych styli CSS
import { motion } from "framer-motion";

const ModelChatComponent = ({ ModelId }) => {
    const dispatch = useDispatch();
    const messages = useSelector((state) => state.chat.messages);
    const errorMessage = useSelector((state) => state.chat.error); // Error message from Redux
    const loading = useSelector((state) => state.chat.loading); // Loading state for typing indicator
    const [input, setInput] = useState("");
    const chatEndRef = useRef(null);
    const [isButtonDisabled, setIsButtonDisabled] = useState(false); // Track button disabled state

    // Scroll to the bottom when new messages are added
    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const handleSendMessage = () => {
        if (input.trim()) {
            // Dodaj wiadomość użytkownika do stanu
            const userMessage = { text: input, isUser:  true };
            dispatch(addMessage(userMessage)); // Dodaj wiadomość do Redux
            dispatch(clearImageMessages());
            setIsButtonDisabled(true); // Disable button while waiting for response
            dispatch(fetchModelResponse(input, ModelId)); // Fetch response from the model
            setInput(""); // Clear input after dispatching
        }
    };

    // Funkcja do obsługi naciśnięcia klawisza
    const handleKeyDown = (event) => {
        if (event.key === 'Enter' && !event.shiftKey && !isButtonDisabled) { // Sprawdź, czy naciśnięto Enter bez Shift
            event.preventDefault(); // Zapobiegaj dodawaniu nowej linii
            handleSendMessage(); // Wywołaj funkcję wysyłania wiadomości
        }
    };

    // Reset button state when loading is finished
    useEffect(() => {
        if (!loading) {
            setIsButtonDisabled(false); // Enable button after response
        }
    }, [loading]);

    return (
        <div className="chat-container bg-light-glass">
            <div className="message-box">
                {messages.map((msg, index) => (
                    <motion.div
                        key={index}
                        className={`message ${
                            msg.isUser    
                                ? "user-message"
                                : "echo-message"
                        }`}
                        initial={{ opacity: 0, transform: "translateY(100px) scale(0)" }}
                        animate={{ opacity: 1, transform: "translateY(0) scale(1)" }}
                        transition={{
                            delay: index % 2 === 0 ? 0 : 1,
                            duration: 0.5,
                        }}
                    >       
                    {msg.text.startsWith("<img") ? (
                            // If the message is an image tag, render it as an image
                            <div dangerouslySetInnerHTML={{ __html: msg.text }} />
                        ) : (
                            // Otherwise, render the text
                            msg.text
                        )}
                    </motion.div>
                ))}
                {loading && (
                    <div className="typing-dots pt-5">
                        <div className="dot"></div>
                        <div className="dot"></div>
                        <div className="dot"></div>
                    </div>
                )}
                {errorMessage && (
                    <motion.div
                        className="error-message"
                        initial={{ opacity: 0, transform: "translateY(100px) scale(0)" }}
                        animate={{ opacity: 1, transform: "translateY(0) scale(1)" }}
                        transition={{ delay: 0.5, duration: 0.5 }}
                    >
                        {errorMessage}
                    </motion.div>
                )}
                <div ref={chatEndRef} /> {/* Ref for auto-scrolling */}
            </div>
            <div className="input-box">
                <textarea
                    value={input}
                    onKeyDown={handleKeyDown}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Zadaj mi pytanie..."
                    className="input-textarea"
                />
                <button
                    onClick={handleSendMessage}
                    disabled={isButtonDisabled}
                    className={`send-button ${isButtonDisabled ? "disabled" : ""}`}
                >
                    <div className="svg-wrapper-1">
                        <div className="svg-wrapper">
                            <svg 
                                height="24" 
                                width="24" 
                                viewBox="0 0 24 24" 
                                xmlns="http://www.w3.org/2000/svg"
                                className={loading === false ? 'animate-arrow' : 'animate-square'}
                            >
                                {loading === false ? (
                                    <>
                                        <path d="M0 0h24v24H0z" fill="none"></path>
                                        <path d="M1.946 9.315c-.522-.174-.527-.455.01-.634l19.087-6.362c.529-.176.832.12.684.638l-5.454 19.086c-.15.529-.455.547-.679.045L12 14l6-8-8 6-8.054-2.685z" fill="currentColor"></path>
                                    </>
                                ) : (
                                    <>
                                        <rect width="24" height="24" fill="currentColor"></rect>
                                    </>
                                )}
                            </svg>
                        </div>
                    </div>
                </button>
            </div>
        </div>
    );
};

export default ModelChatComponent;