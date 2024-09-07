import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { BrowserRouter } from 'react-router-dom'; // Import BrowserRouter
import { Provider } from 'react-redux'; // Import Provider from react-redux
import store from './redux/store.js'; // Import your Redux store

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}> {/* Provide the Redux store */}
    <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>
  </Provider>
);
