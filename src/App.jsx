import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Navbar, Hero, About, ParticlesCanvas, ChatsSection, Contact, Footer, ChatDetails } from "./components";

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
              <ChatsSection />
              <div className="relative">
                <ParticlesCanvas />
                <Contact />
              </div>
            </>
          } />

          <Route path="/ANS-AI-DEMO/chat/:id" element={
            <>
              <ChatDetails />
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
