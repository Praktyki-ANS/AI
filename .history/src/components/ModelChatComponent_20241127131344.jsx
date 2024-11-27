import React, { useState, useEffect, useRef } from 'react'; // Dodaj useRef
import { useDispatch, useSelector } from 'react-redux';
import { sendMessage } from '../redux/chatSlice';
import './ModelComponent.css';
import { motion } from 'framer-motion';

const ModelChatComponent = ({ ModelId }) => {
  const [messages, setMessages] = useState([]); // Inicjalizacja state
  const [input, setInput] = useState('');
  const [showTyping, setShowTyping] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [buttonIcon, setButtonIcon] = useState('send');

  const chatEndRef = useRef(null); // Inicjalizacja useRef
  const typingRef = useRef(null); // Inicjalizacja useRef
  const messageBoxRef = useRef(null); // Inicjalizacja useRef

  const dispatch = useDispatch();
  const { messages: reduxMessages, isSending: isReduxSending, error } = useSelector((state) => state.chat);

  useEffect(() => {
    setMessages(reduxMessages); // Przypisanie wiadomości z Redux
  }, [reduxMessages]);

  const handleSendMessage = () => {
    if (input.trim() && !isSending) {
      // Dodanie wiadomości użytkownika
      setMessages((prevMessages) => [...prevMessages, { text: input, isUser: true }]);
      setInput('');
      
      dispatch(sendMessage(input)); // Wysłanie wiadomości do Redux
    }
  };

  useEffect(() => {
    if (showTyping && typingRef.current) {
      typingRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    } else if (chatEndRef.current) {
      const messageBox = messageBoxRef.current;
      const endOfChat = chatEndRef.current;

      const shouldScroll = messageBox.scrollHeight - messageBox.scrollTop !== messageBox.clientHeight;
      
      if (shouldScroll) {
        endOfChat.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    }
  }, [messages, showTyping]);

  useEffect(() => {
    if (reduxMessages.length > 0) {
      setMessages(reduxMessages); // Ustawienie nowych wiadomości w state
    }
  }, [reduxMessages]);

  return (
    <div className="chat-container">
      <div className="message-box" ref={messageBoxRef}>
        {messages.map((msg, index) => (
          <motion.div
            key={index}
            className={msg.isUser ? 'user-message' : 'echo-message'}
            initial={{ opacity: 0, transform: 'translateY(100px) scale(0)' }}
            animate={{ opacity: 1, transform: 'translateY(0) scale(1)' }}
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
        />
        <button
          onClick={handleSendMessage}
          disabled={isReduxSending || !input.trim()}
        >
          <div className="svg-wrapper">
            <svg height="24" width="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M0 0h24v24H0z" fill="none" />
              <path
                d="M1.946 9.315c-.522-.174-.527-.455.01-.634l19.087-6.362c.529-.176.832.12.684.638l-5.454 19.086c-.15.529-.455.547-.679.045L12 14l6-8-8 6-8.054-2.685z"
                fill="currentColor"
              />
            </svg>
          </div>
        </button>
      </div>
    </div>
  );
};

export default ModelChatComponent;
