import React from 'react';
import './App.css';
import { Container } from 'react-bootstrap';
import { Routes, Route } from "react-router-dom";
import { Artists } from './Artists';
import { Songs } from './Songs';
import {Performances} from './Performances'
import { WrappedLoginScreen } from './LoginScreen';




function App() {
  return (
    
    
    <Routes>
        <Route path="/" element={<Performances />} />
        <Route path="/artists" element={<Artists />} />
        <Route path="/songs" element={<Songs />} />
        <Route path="/performances" element={<Performances />} />
        <Route path="/login" element={<WrappedLoginScreen />} />    
        
  
    </Routes>
 
  )
}

export default App;
