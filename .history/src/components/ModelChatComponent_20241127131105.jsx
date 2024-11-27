import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux'; // Import do obsługi Redux
import './ModelComponent.css';
import { motion } from 'framer-motion';
import { sendMessage, receiveMessage } from '../redux/chatSlice'; // Zakładając, że masz akcje do wysyłania i odbierania wiadomości

const ModelChatComponent = ({ ModelId }) => {
  const dispatch = useDispatch();
  const [input, setInput] = useState('');
  const [showTyping, setShowTyping] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [buttonIcon, setButtonIcon] = useState('send');
  const chatEndRef = useRef(null);
  const typingRef = useRef(null);
  const messageBoxRef = useRef(null);

  // Pobieramy wiadomości z Redux
  const messages = useSelector((state) => state.chat.messages);
  const errorMessage = useSelector((state) => state.chat.errorMessage); // Jeśli masz errorMessage w Reduxie

  // Scroll to the bottom or typing dots when new messages are added or typing indicator is shown
  useEffect(() => {
    if (showTyping && typingRef.current) {
      typingRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    } else if (chatEndRef.current) {
      const messageBox = messageBoxRef.current;
      const endOfChat = chatEndRef.current;

      const shouldScroll =
        messageBox.scrollHeight - messageBox.scrollTop !== messageBox.clientHeight;

      if (shouldScroll) {
        endOfChat.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    }
  }, [messages, showTyping]);

  useEffect(() => {
    setMessages([]); // Reset messages when ModelId changes
  }, [ModelId]);

  // Obsługuje wysyłanie wiadomości
  const handleSendMessage = () => {
    if (input.trim() && !isSending) {
      dispatch(sendMessage(input)); // Wysłanie wiadomości do Redux
      setInput('');
      setIsSending(true);
      setButtonIcon('square');
      setShowTyping(true);
    }
  };

  // Obsługuje odpowiedzi z Redux (aktualizacja stanu po odpowiedzi)
  useEffect(() => {
    if (messages.length > 0 && messages[messages.length - 1].isUser) {
      const timer = setTimeout(() => {
        setShowTyping(false);
        setIsSending(false);
        setButtonIcon('send');
        
        // Jeżeli jest błąd, dodajemy komunikat o błędzie
        if (errorMessage) {
          dispatch(receiveMessage({ text: `Error: ${errorMessage}`, isUser: false }));
        } else {
          // Odpowiedź z "echo" lub prawdziwa odpowiedź
          const responseText = `Echo: ${messages[messages.length - 1].text}`;
          dispatch(receiveMessage({ text: responseText, isUser: false }));
        }
      }, 2000); // Symulacja opóźnienia odpowiedzi

      return () => clearTimeout(timer);
    }
  }, [messages, errorMessage, dispatch]);

  return (
    <div className="chat-container bg-light-glass">
      <div className="message-box" ref={messageBoxRef}>
        {/* Map through messages to display them */}
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
        {showTyping && (
          <div className="typing-dots" ref={typingRef}>
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
          </div>
        )}
        <div ref={chatEndRef} />
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
