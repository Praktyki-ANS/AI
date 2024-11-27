import React, { useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { Models } from '../constants';
import ModelComponent from './ModelComponent'; // Import ChatComponent
import { styles } from '../styles';

const ModelDetails = () => {
  const { id } = useParams();
  const model = Models.find((model) => model.id === id);

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
          {model?.title}
        </h2>
        <img
            src={model?.imageUrl}
            alt={model?.title}
            className='w-16 h-16 object-contain p-2 mb-2'
          />
      </div>

      <div className='flex flex-col h-full'>
        <div className='flex-1'>
          {/* Pass `id` as a key to force re-render */}
          <ModelComponent key={id} ModelId={id} />
        </div>
      </div>
    </section>
  );
};

export default ModelDetails;
