import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Navbar, Hero, About, ParticlesCanvas, ModelsSection, Contact, Footer, ModelDetails } from "./components";
import { Provider } from 'react-redux';
import store from './redux/store';

const App = () => {
  return (
    <Provider store={store}> 
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
    </Provider>
  );
};

export default App;
