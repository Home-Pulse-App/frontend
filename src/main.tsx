import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './main.css';
import App from './App.tsx';
import { HashRouter } from 'react-router-dom';
import DevicePlacer from './components/DevicePlacer.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HashRouter>
      {/* <App /> */}
      <DevicePlacer />
    </HashRouter>
  </StrictMode>,
)
