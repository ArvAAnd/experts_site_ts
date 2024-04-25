import React, { useEffect } from 'react';
import './App.css';
import { Router } from './Routers';
import { Connect } from './connect/Connect';
import { useUsersStore } from './store/usersStore';

function App() {
  
  return (
    <Router />
  );
}

export default App;
