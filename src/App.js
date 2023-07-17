import React, { useState} from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import Focus from "./pages/Focus";
import NoPage from "./pages/NoPage";
import Home from "./pages/Home";
import { TimerProvider } from "./components/TimerContext";
import { TodosProvider } from "./components/TodosContext";

function App() {

  return (

    <div className="App">
      <TodosProvider>
        <BrowserRouter>
          <Routes>
            <Route index path="/Main" element={<Home />}/>
            <Route path="/Focus" element={<Focus />}/>
            <Route path="*" element={<NoPage />}/>
          </Routes>
        </BrowserRouter>
      </TodosProvider>
    </div>
 
  );
}

export default App;
