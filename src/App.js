import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import Focus from "./pages/Focus";
import NoPage from "./pages/NoPage";
import Home from "./pages/Home";

function App() {
  return (

    <div className="App">
      
      <BrowserRouter>
        <Routes>
        

          <Route index path="/Main" element={<Home />}/>
          <Route path="/Focus" element={<Focus />}/>
          <Route path="*" element={<NoPage />}/>
          
        </Routes>
      </BrowserRouter>
    
    </div>
 
  );
}

export default App;
