import React, { useState, useEffect, useRef } from 'react';
import './ModelComponent.css';
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { sendMessage } from '../redux/chatSlice';

const ModelChatComponent = ({ ModelId }) => {
  const [input, setInput] = useState('');
  const chatEndRef = useRef(null);
  const typingRef = useRef(null); // Ref for typing dots
  const messageBoxRef = useRef(null); // Ref for message box to calculate height

  const dispatch = useDispatch();
  const { messages, isSending } = useSelector((state) => state.chat);

  // Scroll to bottom or typing dots when new messages are added or typing indicator is shown
  useEffect(() => {
    if (typingRef.current) {
      typingRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    } else if (chatEndRef.current) {
      const messageBox = messageBoxRef.current;
      const endOfChat = chatEndRef.current;

      // Check if scrolling is necessary
      const shouldScroll =
        messageBox.scrollHeight - messageBox.scrollTop !== messageBox.clientHeight;

      if (shouldScroll) {
        endOfChat.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    }
  }, [messages]);

  // Reset state when chatId changes
  useEffect(() => {
    // Wyczyść wiadomości przy zmianie ModelId
    if (ModelId) {
      // Możesz dostosować, jeśli chcesz czyścić wiadomości tylko na konkretne zdarzenie
    }
  }, [ModelId]);

  const handleSendMessage = () => {
    if (input.trim() && !isSending) {
      // Dodaj wiadomość użytkownika do stanu
      dispatch(sendMessage(input)); // Wywołanie wysyłania wiadomości
      setInput('');
    }
  };

  return (
    <div className="chat-container bg-light-glass">
      <div className="message-box" ref={messageBoxRef}>
        {messages.map((msg, index) => (
          <motion.div
            key={index}
            className={`message ${msg.isUser ? 'user-message' : 'echo-message'}`}
            initial={{ opacity: 0, transform: "translateY(100px) scale(0)" }} 
            animate={{ opacity: 1, transform: "translateY(0) scale(1)" }} 
            transition={{ delay: 0, duration: 0.5 }} 
          >
            {msg.text}
          </motion.div>
        ))}
        {isSending && (
          <div className="typing-dots" ref={typingRef}> {/* Ref for typing dots */}
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
          </div>
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
  disabled={isSending || !input.trim()} 
  className={`send-button ${isSending || !input.trim() ? 'disabled' : ''}`}
>
  <div className="svg-wrapper-1">
    <div className="svg-wrapper">
      <svg 
        height="24" 
        width="24" 
        viewBox="0 0 24 24" 
        xmlns="http://www.w3.org/2000/svg"
        className={buttonIcon === 'send' ? 'animate-arrow' : 'animate-square'}
      >
        {buttonIcon === 'send' ? (
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
