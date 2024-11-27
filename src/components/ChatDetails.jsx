import React, { useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { Chats } from '../constants';
import ChatComponent from './ChatComponent'; // Import ChatComponent
import { styles } from '../styles';

const ChatDetails = () => {
  const { id } = useParams();
  const chat = Chats.find((chat) => chat.id === id);

  const sectionRef = useRef(null);

  useEffect(() => {
    if (sectionRef.current) {
      sectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [id]); // Depend on `id` to ensure scrolling on chat change

  return (
    <section ref={sectionRef} className='py-32 w-full h-screen mx-auto'>
      <div className='flex justify-center '>
        <h2 className={styles.sectionHeadText}>
          {chat?.title}
        </h2>
        <img
            src={chat?.imageUrl}
            alt={chat?.title}
            className='w-16 h-16 object-contain p-2 mb-2'
          />
      </div>

      <div className='flex flex-col h-full'>
        <div className='flex-1'>
          {/* Pass `id` as a key to force re-render */}
          <ChatComponent key={id} chatId={id} />
        </div>
      </div>
    </section>
  );
};

export default ChatDetails;
