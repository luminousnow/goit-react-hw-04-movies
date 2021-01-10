import { BrowserRouter } from 'react-router-dom';
import 'modern-normalize/modern-normalize.css';
import 'semantic-ui-css/semantic.min.css';
import 'react-toastify/dist/ReactToastify.css';
import 'pure-react-carousel/dist/react-carousel.es.css';
import './style/common.css';
import 'lazysizes';
import 'lazysizes/plugins/parent-fit/ls.parent-fit';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './Components/App/App';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root'),
);
