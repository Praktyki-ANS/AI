import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Navbar, Hero, About, ParticlesCanvas, ModelsSection, Contact, Footer, ChatDetails } from "./components";
import ModelDetails from './components/ModelDetails';

const App = () => {
  return (
    <BrowserRouter>
      <div className="relative z-0 bg-bgcolor">
        <Navbar />

        <Routes>
          <Route path="/ANS-AI-DEMO/" element={
            <>
              <Hero />
              <div className="relative">
                <About />
              </div>
              <ModelsSection />
              <div className="relative">
                <ParticlesCanvas />
                <Contact />
              </div>
            </>
          } />

          <Route path="/ANS-AI-DEMO/model/:id" element={
            <>
              <ModelDetails />
              <ParticlesCanvas />
            </>
            } />

        </Routes>

        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;
