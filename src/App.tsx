/* eslint-disable @typescript-eslint/no-explicit-any */
import { ToastContainer } from 'react-toastify';
import '@mdi/font/css/materialdesignicons.min.css';
import i18n from './i18next';
import { Routes } from './routes/index.routes';

i18n.init();
localStorage.setItem('I18N_LANGUAGE', 'fr');
function App() {


  return (
    <>
      <Routes />
      <ToastContainer position='bottom-left' theme='colored' />
    </>
  );
}

export default App
