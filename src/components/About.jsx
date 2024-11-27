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
     >Na naszej platformie możesz czatować z różnymi modelami LLM (Large Language Models), a także z naszym własnym projektem studenckim, LLM Ans Bot, w celu ich porównania. 
     Użytykownicy mogą w ten sposób interaktywnie sprawdzić możliwości i ograniczenia poszczególnych modeli, co pozwala na lepsze zrozumienie ich zalet i wad.
    </motion.p>
    <NeuronCanvas />
    </section>
  );
};

export default  SectionWrapper(About, 'about');
