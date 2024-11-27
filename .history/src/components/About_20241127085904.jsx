import React from 'react';
import { styles } from '../styles';
import { SectionWrapper } from '../hoc';
import { NeuronCanvas } from './canvas';
import { motion } from 'framer-motion';
import { fadeIn, textVariant } from '../utils/motion';

const About = () => {
  return (
    <section className='relative w-full h-screen mx-auto '>
    <motion.div variants={textVariant()}>  
      <h2 className={styles.sectionHeadText}>
        O projekcie
      </h2>
    </motion.div>
    <motion.p
    variants={
      fadeIn("", "", 0.3, 2)}
      className='mt-4 text-secondary text-[17px] max-w-3xl leading-[30px]'
     >Na naszej platformie oferujemy wyjątkową możliwość interakcji z różnymi modelami LLM (Large Language Models), które umożliwiają zaawansowaną komunikację, generowanie treści i rozwiązywanie problemów w naturalny sposób. 
     Możesz prowadzić czaty, zadawać pytania, uzyskiwać odpowiedzi i korzystać z różnych narzędzi AI, dostosowanych do konkretnych potrzeb.
    </motion.p>
    <NeuronCanvas />
    </section>
  );
};

export default  SectionWrapper(About, 'about');
