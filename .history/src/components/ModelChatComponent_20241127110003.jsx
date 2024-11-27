import React, { useState, useEffect, useRef } from 'react';
import './ModelComponent.css';
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { addMessage, sendMessage, setChatType } from './redux'; // Importuj akcje z chatSlice

const ModelChatComponent = ({ ModelId }) => {
  const dispatch = useDispatch();
  const { messages, status, type } = useSelector((state) => state.chat); // Pobierz dane ze stanu Redux
  const [input, setInput] = useState('');
  const [buttonIcon, setButtonIcon] = useState('send');
  const chatEndRef = useRef(null);
  const messageBoxRef = useRef(null);

  // Ustawienie typu modelu na podstawie `ModelId`
  useEffect(() => {
    dispatch(setChatType(ModelId));
  }, [ModelId, dispatch]);

  // Automatyczne przewijanie do końca wiadomości
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }, [messages]);

  // Obsługa wysyłania wiadomości
  const handleSendMessage = () => {
    if (input.trim() && status !== 'loading') {
      // Dodaj wiadomość użytkownika lokalnie
      dispatch(addMessage({ role: 'user', content: input }));

      // Wyślij wiadomość do API i odbierz odpowiedź
      dispatch(sendMessage({ message: input, type }));

      // Zresetuj pole tekstowe
      setInput('');
      setButtonIcon('square'); // Zmień ikonę przycisku podczas wysyłania
    }
  };

  // Zresetuj ikonę po zakończeniu wysyłania
  useEffect(() => {
    if (status !== 'loading') {
      setButtonIcon('send');
    }
  }, [status]);

  return (
    <div className='chat-container bg-light-glass'>
      <div className='message-box' ref={messageBoxRef}>
        {messages.map((msg, index) => (
          <motion.div
            key={index}
            className={`message ${msg.role === 'user' ? 'user-message' : 'echo-message'}`}
            initial={{ opacity: 0, transform: 'translateY(100px) scale(0)' }}
            animate={{ opacity: 1, transform: 'translateY(0) scale(1)' }}
            transition={{ delay: 0, duration: 0.5 }}
          >
            {msg.content}
          </motion.div>
        ))}
        {status === 'loading' && (
          <div className='typing-dots'>
            <div className='dot'></div>
            <div className='dot'></div>
            <div className='dot'></div>
          </div>
        )}
        <div ref={chatEndRef} /> {/* Ref do automatycznego przewijania */}
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
          disabled={status === 'loading' || !input.trim()}
          className={`send-button ${status === 'loading' || !input.trim() ? 'disabled' : ''}`}
        >
          <div className='svg-wrapper-1'>
            <div className='svg-wrapper'>
              <svg
                height='24'
                width='24'
                viewBox='0 0 24 24'
                xmlns='http://www.w3.org/2000/svg'
                className={buttonIcon === 'send' ? 'animate-arrow' : 'animate-square'}
              >
                {buttonIcon === 'send' ? (
                  <>
                    <path d='M0 0h24v24H0z' fill='none'></path>
                    <path
                      d='M1.946 9.315c-.522-.174-.527-.455.01-.634l19.087-6.362c.529-.176.832.12.684.638l-5.454 19.086c-.15.529-.455.547-.679.045L12 14l6-8-8 6-8.054-2.685z'
                      fill='currentColor'
                    ></path>
                  </>
                ) : (
                  <rect width='24' height='24' fill='currentColor'></rect>
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
