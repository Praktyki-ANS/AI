import React, { useState } from 'react';
import { styles } from '../styles';
import { SectionWrapper } from '../hoc';
import { motion, useInView } from 'framer-motion'; 
import { fadeIn, expandFromBottom, hideFromTop } from '../utils/motion';
import { HologramCanvas } from './canvas';
import emailjs from 'emailjs-com'; // Importuj emailjs

const Contact = () => {
  const [isSent, setIsSent] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false); 
  const [isActive, setIsActive] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [formErrors, setFormErrors] = useState({ email: '', subject: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false); // Stan do blokowania wysyłania

  // Reference to the section we want to observe
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px 0px' });
  const formRef = React.useRef(null);

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const handleClick = (e) => {
    e.preventDefault();

    // Reset errors
    setFormErrors({ email: '', subject: '', message: '' });

    const email = formRef.current.email.value.trim();
    const subject = formRef.current.subject.value.trim();
    const message = formRef.current.message.value.trim();

    // Validate form fields
    let hasError = false;
    if (!email) {
      setFormErrors(prev => ({ ...prev, email: 'E-mail jest wymagany.' }));
      hasError = true;
    } else if (!validateEmail(email)) {
      setFormErrors(prev => ({ ...prev, email: 'Nieprawidłowy format e-maila.' }));
      hasError = true;
    }
    if (!subject) {
      setFormErrors(prev => ({ ...prev, subject: 'Temat jest wymagany.' }));
      hasError = true;
    }
    if (!message) {
      setFormErrors(prev => ({ ...prev, message: 'Wiadomość jest wymagana.' }));
      hasError = true;
    }

    if (hasError) {
      return; // Nie wysyłaj formularza, jeśli są błędy
    }

    if (formRef.current && !isSubmitting) {
      setIsSubmitting(true); // Zablokuj możliwość wysyłania
      emailjs.sendForm('service_jihombb', 'template_4ou1ybd', formRef.current, 'OouAUM9in93eo4ur1')
        .then((result) => {
          console.log(result.text);
          setIsActive(true);
          setIsSent(true); 
          setTimeout(() => {
            setShowSuccess(true);
          }, 1000); 
        }, (error) => {
          console.log(error.text);
          alert('Nie udało się wysłać wiadomości.');
        })
        .finally(() => {
          setIsSubmitting(false); // Odblokuj możliwość wysyłania
        });
    }
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
        <form ref={formRef} className="Container-form">
          <input 
            name="email" 
            className={`form-content bg-glass ${formErrors.email ? 'error' : ''}`} 
            type="text" 
            placeholder="E-mail" 
            required 
          />
          {formErrors.email && <span className="error-message-v">{formErrors.email}</span>}
          <input 
            name="subject" 
            className={`form-content bg-glass ${formErrors.subject ? 'error' : ''}`} 
            type="text" 
            placeholder="Temat" 
            required 
          />
          {formErrors.subject && <span className="error-message-v">{formErrors.subject}</span>}
          <textarea 
            name="message" 
            className={`form-content bg-glass form-area ${formErrors.message ? 'error' : ''}`} 
            placeholder="Wiadomość" 
            required 
          />
          {formErrors.message && <span className="error-message-v">{formErrors.message}</span>}
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
            <div className="send-message">
              <span className="text-lg">Wysłano pomyślnie</span>
            </div>
          </motion.div>
          <motion.div
            variants={expandFromBottom(0.3, 2)}
            initial="hidden"
            animate="show"
            transition={{ duration: 1 }}
            onAnimationStart={() => { setIsHidden(true); }}
          >
            <div className="absolute top-0 left-0 right-0 bottom-0 rays-green rays"></div>
          </motion.div>
        </>
      )}
      <div id='hologram'>
        <HologramCanvas />
        <button
          type="button"
          className={`btn3D ${isActive ? 'active' : ''}`}
          onClick={handleClick}
          disabled={isSubmitting} // Zablokuj przycisk podczas wysyłania
        >
          <span>Wyślij</span>
        </button>
      </div>
    </section>
  );
};

export default SectionWrapper(Contact, 'contact');