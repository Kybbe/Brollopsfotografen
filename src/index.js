import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

window.addEventListener('load', async () => {
  if('serviceWorker' in navigator){
    try {
      await navigator.serviceWorker.register('service-worker.js');
    } catch(err) {
      console.error('Whooopsie!', err)
    }
  }
});