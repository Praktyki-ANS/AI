import React from 'react'
import { Tilt } from 'react-tilt';
import { motion } from 'framer-motion';
import { fadeIn, textVariant } from '../utils/motion';
import { SectionWrapper } from '../hoc';
import {Models} from '../constants'
import { styles } from '../styles';
import {next} from '../assets'
import { Link } from "react-router-dom";

const  ModelCard = ({ index, imageUrl, title, description }) => {
    return (
      <Tilt className='xs:w-[250px] w-full'>
        <motion.div
          variants={fadeIn("right", "spring", index * 0.5, 0.75)}
          className='w-full '
        > 
          <div 
          options={{ max: 45, scale: 1, speed: 450 }}
          className=' rounded-[20px] py-5 px-12 min-h-[280px] flex justify-evenly items-center flex-col card3D bg-glass'>
              <img
            src={imageUrl}
            alt={title}
            className='w-16 h-16 object-contain'
          />
          <h3 className='text-white text-[20px] font-bold text-center'>
              {title}
            </h3>
            <p className='mt-3 text-secondary text-[14px] text-center'>
              {description}
            </p>
            <p className='mt-3 text-white text-[14px] text-center'>
            <Link to={`/ANS-AI-DEMO/model/${index}`} className='flex items-center justify-center'>
              Użyj modelu <img className="w-5 h-5 float-right mx-2 cursor-pointer invert" src={next} alt="next" />
            </Link>
          </p>
          </div>
        </motion.div>
      </Tilt>
    )
  }
const ModelsSection = () => {
  return (
    <> 
    <motion.div variants={textVariant()}>
      <p className={styles.sectionSubText}>
        Modele
      </p>
      <h2 className={styles.sectionHeadText}>
        Sprawdź dotępne
      </h2>
    </motion.div>
    <motion.p
    variants={
      fadeIn("", "", 0.3, 2)}
      className='mt-4 text-secondary text-[17px] max-w-3xl leading-[30px]'
     >Na naszej platformie możesz czatować z różnymi modelami LLM (Large Language Models), 
     a także skorzystć z możliwości innych modeli na przykład do analizy dokumentów.

    </motion.p>

    <div className='ml-20 mt-20 flex flex-wrap gap-20 justify-center items-center'>
      {Models.map((chat, index) => (<ModelCard key={Models.title} index={index} {...chat} />))}
    </div>
   </>
  );
};

export default  SectionWrapper(ModelsSection, 'models');