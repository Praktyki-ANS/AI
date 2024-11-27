import React, { useState, useEffect, useRef } from 'react';
import './ModelComponent.css';
import { motion } from 'framer-motion';

const ModelChatComponent = ({ ModelId }) => {
  const [messages, setMessages] = useState([]); // Store messages
  const [input, setInput] = useState(''); // User input state
  const [showTyping, setShowTyping] = useState(false); // Typing indicator state
  const [isSending, setIsSending] = useState(false); // State for sending messages
  const [buttonIcon, setButtonIcon] = useState('send'); // Button icon state
  const chatEndRef = useRef(null); // Ref for scrolling to bottom
  const typingRef = useRef(null); // Ref for typing dots
  const messageBoxRef = useRef(null); // Ref for the message box

  // Scroll to the bottom when new messages are added or typing indicator is shown
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

  // Reset messages when ModelId changes
  useEffect(() => {
    setMessages([]);
  }, [ModelId]);

  // Simulate typing delay for echo responses
  useEffect(() => {
    if (messages.length > 0 && messages[messages.length - 1].isUser) {
      setShowTyping(true); // Show typing indicator
      setIsSending(true); // Set sending state to true
      setButtonIcon('square'); // Change button icon to square (indicating sending)

      const timer = setTimeout(() => {
        setShowTyping(false); // Hide typing indicator after delay
        setIsSending(false); // Set sending state to false
        setButtonIcon('send'); // Reset button icon to send

        // Add an echo message after the delay
        setMessages((prevMessages) => [
          ...prevMessages,
          { text: 'Echo: ' + prevMessages[prevMessages.length - 1].text, isUser: false },
        ]);
      }, 2000); // Simulate a 2-second delay for bot response

      return () => clearTimeout(timer); // Clean up the timer when messages change
    }
  }, [messages]);

  // Handle sending user message
  const handleSendMessage = () => {
    if (input.trim() && !isSending) {
      setMessages((prevMessages) => [...prevMessages, { text: input, isUser: true }]);
      setInput(''); // Clear input field after sending
    }
  };

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
        {/* Typing dots for bot responses */}
        {showTyping && (
          <div className="typing-dots" ref={typingRef}>
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
          </div>
        )}
        <div ref={chatEndRef} /> {/* Scroll to bottom */}
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
