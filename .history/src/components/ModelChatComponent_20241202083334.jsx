import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { motion } from 'framer-motion';
import { addMessage, setError } from '../redux/actions/chatActions'; // Upewnij się, że te akcje istnieją
import './ModelComponent.css';

const ModelChatComponent = ({ ModelId }) => {
    const dispatch = useDispatch();
    const messages = useSelector(state => state.chat.messages);
    const [input, setInput] = useState('');
    const chatEndRef = useRef(null);
    const typingRef = useRef(null);
    const [showTyping, setShowTyping] = useState(false);

    // Mapowanie ModelId do endpointów backendu
    const modelEndpoints = {
        summarization: '/summarization',
        translation: '/translate',
        emotion: '/predict',
        questionAnswering: '/question-answering',
        textGeneration: '/generate-text',
    };

    // Scroll do najnowszej wiadomości
    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    // Funkcja do obsługi wysyłania wiadomości
    const handleSendMessage = async () => {
        if (input.trim()) {
            const endpoint = modelEndpoints[ModelId]; // Pobieranie odpowiedniego endpointu
            if (!endpoint) {
                dispatch(setError('Nieprawidłowy model ID.'));
                return;
            }

            dispatch(addMessage({ text: input, isUser: true }));

            try {
                setShowTyping(true);

                const response = await axios.post(`http://127.0.0.1:8000${endpoint}`, { input });

                if (response.data.error) {
                    dispatch(setError(response.data.error));
                } else {
                    const output = response.data.summarization || response.data.translation || response.data.answer || response.data.generated_text || JSON.stringify(response.data);
                    dispatch(addMessage({ text: output, isUser: false }));
                }
            } catch (error) {
                console.error('Błąd podczas wysyłania wiadomości:', error);
                dispatch(setError('Wystąpił problem z połączeniem z serwerem.'));
            } finally {
                setShowTyping(false);
                setInput('');
            }
        }
    };

    return (
        <div className='chat-container bg-light-glass'>
            <div className='message-box'>
                {messages.map((msg, index) => (
                    <motion.div
                        key={index}
                        className={`message ${msg.isUser ? 'user-message' : 'echo-message'}`}
                        initial={{ opacity: 0, transform: "translateY(100px) scale(0)" }}
                        animate={{ opacity: 1, transform: "translateY(0) scale(1)" }}
                        transition={{ delay: index % 2 === 0 ? 0 : 0.5, duration: 0.5 }}
                    >
                        {msg.text}
                    </motion.div>
                ))}
                {showTyping && (
                    <div className='typing-dots' ref={typingRef}>
                        <div className='dot'></div>
                        <div className='dot'></div>
                        <div className='dot'></div>
                    </div>
                )}
                <div ref={chatEndRef} />
            </div>
            <div className='input-box'>
                <textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder='Zadaj mi pytanie...'
                    className='input-textarea'
                />
                <button
                    onClick={handleSendMessage}
                    disabled={!input.trim()}
                    className={`send-button ${!input.trim() ? 'disabled' : ''}`}
                >
                    <div className="svg-wrapper-1">
                        <div className="svg-wrapper">
                            <svg
                                height="24"
                                width="24"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                                className='animate-arrow'
                            >
                                <path d="M0 0h24v24H0z" fill="none"></path>
                                <path d="M1.946 9.315c-.522-.174-.527-.455.01-.634l19.087-6.362c.529-.176.832.12.684.638l-5.454 19.086c-.15.529-.455.547-.679.045L12 14l6-8-8 6-8.054-2.685z" fill="currentColor"></path>
                            </svg>
                        </div>
                    </div>
                </button>
            </div>
        </div>
    );
};

export default ModelChatComponent;
