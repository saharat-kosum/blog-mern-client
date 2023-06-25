import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
// Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";
// Bootstrap Bundle JS
import "bootstrap/dist/js/bootstrap.bundle.min";
import MyRoute from './MyRoute';

const rootElement = document.getElementById('root');

if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <MyRoute />
    </React.StrictMode>
  );
} else {
  console.error('Root element not found');
}
