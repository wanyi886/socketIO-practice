import './App.css';
import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import io from 'socket.io-client';
import Login from "./pages/login";
import Profile from "./pages/profile";
import ChangePW from './pages/ChagePW';
const host = process.env.REACT_APP_TARGET || process.env.REACT_APP_LOCALHOST;
const port = process.env.REACT_APP_BACKEND_PORT;


function App() {
  useEffect(() => {
    // Socket.io event listeners
    const socket = io(`${host}:${port}`); // this need to be in the useEffect. Or the server will connect and disconnect immediately
    socket.on('connect', () => {
      console.log('socket id:', socket.id);
    });

    socket.on('disconnect', () => {
      console.log('Disconnected from server');
    });

    socket.on('sessionUpdate', () => {
      // Perform actions on password change, like updating UI
      alert('Session has been updated!');
    });

    // Clean up on unmount
    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <BrowserRouter>
      <Routes>
          <Route path="/login" element={<Login />}/>
          <Route path="/profile" element={<Profile />}/>
          <Route path="/change_password" element={<ChangePW />}/>
          <Route path="/" element={ <Navigate to="/login" />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
