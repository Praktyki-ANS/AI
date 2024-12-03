import React, { useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux'; // Import dispatch
import { Models } from '../constants';
import ModelChatComponent from './ModelChatComponent'; // Import ChatComponent
import { styles } from '../styles';

const ModelDetails = () => {
  const { id } = useParams();
  const model = Models.find((model) => model.id === id);

  const sectionRef = useRef(null);
  const dispatch = useDispatch(); // Hook for dispatching actions

  // Scroll to top of section on model change and clear messages
  useEffect(() => {
    if (sectionRef.current) {
      sectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    // Clear messages on model change
    dispatch({ type: 'CLEAR_MESSAGES' });
  }, [id, dispatch]); // Depend on `id` to ensure clearing and scrolling

  return (
    <section ref={sectionRef} className='py-32 w-full h-screen mx-auto'>
      <div className='flex justify-center '>
        <h2 className={styles.sectionHeadText}>
          {model?.title}

        </h2>
        <img
          src={model?.imageUrl}
          alt={model?.title}
          className='w-16 h-16 object-contain p-2 mb-2'
        />
        <div className='p-2 mb-4 w-64  border-solid border-2 border-white rounded-r-lg rounded-b-lg text-md'>
         { model?.quickTip}
        </div>
      </div>

      <div className='flex flex-col h-full'>
        <div className='flex-1'>
          {/* Conditional rendering based on model.type */}
          {model?.type === 'chat' ? (
            <ModelChatComponent key={id} ModelId={model?.id} />
          ) : null}
        </div>
      </div>
    </section>
  );
};

export default ModelDetails;
