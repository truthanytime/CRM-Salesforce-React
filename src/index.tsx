import React from 'react';
import ReactDOM from 'react-dom/client';
import { LicenseInfo } from '@mui/x-license-pro';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

LicenseInfo.setLicenseKey(
  'e3863889ed4e0299dc179fe421717ff6Tz02NzEzNyxFPTE3MTY0ODgxMTE5NjQsUz1wcmVtaXVtLExNPXN1YnNjcmlwdGlvbixLVj0y',
);

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
