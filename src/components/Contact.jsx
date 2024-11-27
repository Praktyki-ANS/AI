import React, { useState, useEffect } from 'react';
import { styles } from '../styles';
import { SectionWrapper } from '../hoc';
import { motion, useInView } from 'framer-motion'; 
import { fadeIn, expandFromBottom, hideFromTop } from '../utils/motion';
import { HologramCanvas } from './canvas';

const Contact = () => {
  const [isSent, setIsSent] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false); 
  const [isActive, setIsActive] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  
  // Reference to the section we want to observe
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px 0px' });

  const handleClick = () => {
    setIsActive(true);
    setIsSent(true); 
    setTimeout(() => {
      setShowSuccess(true);
    }, 3000); 
  };

  return (
    <section ref={ref} className='relative contact-wh mx-auto'>
      <motion.p
        variants={fadeIn("", "", 0.1, 2)}
        initial="hidden"
        animate={isInView ? "show" : "hidden"} // Trigger animation based on scroll
        className={styles.sectionHeadText}
      >
        Skontaktuj się z nami
      </motion.p>

      <motion.div
        variants={isSent ? hideFromTop(0.3, 1) : expandFromBottom(1.2, 1)}
        initial="hidden"
        animate={isInView ? "show" : "hidden"} // Trigger animation based on scroll
        style={{ height: isHidden ? '0' : '' }}
  
      >
        <form className="Container-form">
          <input name="email" className="form-content bg-glass" type="text" placeholder="E-mail" required />
          <input name="subject" className="form-content bg-glass" type="text" placeholder="Temat" required />
          <textarea name="message" className="form-content bg-glass form-area" placeholder="Wiadomość" required />
          <br />
        </form>
      </motion.div>

      <motion.div
        variants={isSent ? hideFromTop(1.2, 2) : expandFromBottom(0.3, 2)}
        initial="hidden"
        animate={isInView ? "show" : "hidden"} // Trigger animation based on scroll
        
        style={{ height: isHidden ? '0' : '' }}

      >
        <div className="absolute top-0 left-0 right-0 bottom-0 rays rays-blue"></div>
      </motion.div>

      {showSuccess && (
        <>
        <motion.div
          variants={expandFromBottom(2.3, 1)}
          initial="hidden"
          animate="show"
        >
          <div className="send-message" >
            <span className="text-lg">Wysłano pomyślnie</span>
          </div>
        </motion.div>
        <motion.div
              variants={expandFromBottom(0.3, 2)}
              initial="hidden"
              animate="show"
              transition={{ duration: 1 }}     
              onAnimationStart={() => {setIsHidden(true);}}
            >
              <div  className="absolute top-0 left-0 right-0 bottom-0 rays-green rays"></div>
          </motion.div>
        </>
      )}
      <div id='hologram'>
        <HologramCanvas />
          <button
          type="button"
          className={`btn3D ${isActive ? 'active' : ''}`}
          onClick={handleClick}
        >
          <span>Wyślij</span>
        </button>
      </div>
    </section>
  );
};

export default SectionWrapper(Contact, 'contact');
