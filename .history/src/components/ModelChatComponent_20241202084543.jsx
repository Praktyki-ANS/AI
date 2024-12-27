import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchModelResponse } from "../redux/actions/chatActions"; // Action for fetching the backend response
import "./ModelComponent.css";
import { motion } from "framer-motion";

const ModelChatComponent = ({ ModelId }) => {
    const dispatch = useDispatch();
    const messages = useSelector((state) => state.chat.messages);
    const errorMessage = useSelector((state) => state.chat.errorMessage); // Error message from Redux
    const loading = useSelector((state) => state.chat.loading); // Loading state for typing indicator
    const [input, setInput] = useState("");
    const chatEndRef = useRef(null);

    // Scroll to the bottom when new messages are added
    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const handleSendMessage = () => {
        if (input.trim()) {
            dispatch(fetchModelResponse(input, ModelId));
            setInput(""); // Clear input after dispatching
        }
    };

    return (
        <div className="chat-container bg-light-glass">
            <div className="message-box">
                {messages.map((msg, index) => (
                    <motion.div
                        key={index}
                        className={`message ${
                            msg.isError
                                ? "error-message"
                                : msg.isUser
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
                        {msg.text}
                    </motion.div>
                ))}
                {loading && (
                    <div className="typing-dots">
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
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Zadaj mi pytanie..."
                    className="input-textarea"
                />
                <button
                    onClick={handleSendMessage}
                    disabled={!input.trim()}
                    className={`send-button ${!input.trim() ? "disabled" : ""}`}
                >
                    <div className="svg-wrapper-1">
                        <div className="svg-wrapper">
                            <svg
                                height="24"
                                width="24"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                                className="animate-arrow"
                            >
                                <path d="M0 0h24v24H0z" fill="none"></path>
                                <path
                                    d="M1.946 9.315c-.522-.174-.527-.455.01-.634l19.087-6.362c.529-.176.832.12.684.638l-5.454 19.086c-.15.529-.455.547-.679.045L12 14l6-8-8 6-8.054-2.685z"
                                    fill="currentColor"
                                ></path>
                            </svg>
                        </div>
                    </div>
                </button>
            </div>
        </div>
    );
};

export default ModelChatComponent;
