import 'bootstrap/dist/css/bootstrap.min.css';
import 'antd/dist/antd.css';

import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import AppProvider from './hooks';
import Routes from './routes';
import GlobalStyles from './styles/global';

import Modal from 'react-modal';

Modal.setAppElement('#root')

const App: React.FC = () => {

  return (
    <BrowserRouter>
      <AppProvider>
        <Routes />
      </AppProvider>
      <GlobalStyles />
    </BrowserRouter>
  )
};
export default App;
