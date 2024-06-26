import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter, RouterProvider } from "react-router-dom";
import { Bonjour } from './Bonjour';
import { useAuth } from './custom-hook/useAuth';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  
    <BrowserRouter>
      <App />
    </BrowserRouter>
    //<Bonjour />
);
