import React from 'react';
import { Container } from 'react-bootstrap';
import { Routes, Route } from "react-router-dom";
import {Artists} from './Artist/Artists'
import { Songs } from './Song/Songs';
import {Performances} from './Performance/Performances.js'
import { WrappedLoginScreen } from './LoginScreen';
import {Topten} from './Topten'




function App() {
  return (
    
    
    <Routes>
        <Route path="/" element={<Performances />} />
        <Route path="/artists" element={<Artists />} />
        <Route path="/songs" element={<Songs />} />
        <Route path="/performances" element={<Performances />} />
        <Route path="/login" element={<WrappedLoginScreen />} />    
        <Route path="/topten" element ={<Topten/>} />
        
  
    </Routes>
 
  )
}

export default App;
