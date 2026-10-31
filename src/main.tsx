import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

(window as unknown as Record<string, boolean>).__MAQAM_MOUNTED__ = true;

createRoot(document.getElementById('root')!).render(<App />);
