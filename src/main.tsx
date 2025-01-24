import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import setupLocatorUI from '@locator/runtime';

if (import.meta.env.DEV) {
    setupLocatorUI();
}

ReactDOM.createRoot(document.getElementById('root')!).render(<App />);
