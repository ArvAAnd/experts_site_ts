import React, { useEffect } from 'react';
import './App.css';
import { Router } from './Routers';
import { useAuth } from './custom-hook/useAuth';

function App() {
  return (
      <Router />
  );
}

export default App;
