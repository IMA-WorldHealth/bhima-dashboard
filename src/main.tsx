import React from 'react';
import ReactDOM from 'react-dom/client';
import axios from 'axios';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './store/store';
import App from './App.tsx';
import './index.css';
import 'react-toastify/ReactToastify.min.css';

axios.defaults.baseURL = `${import.meta.env.VITE_APP_API}`;

const root = ReactDOM.createRoot(document.getElementById('bhima') as HTMLElement);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <App />
        <ToastContainer position='bottom-left' theme='colored' />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
