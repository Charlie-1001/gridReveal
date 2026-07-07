import { createRoot } from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import './main.css';
import App from './App';
import { QuizProvider } from './contexts/QuizContext';

createRoot(document.getElementById('root')).render(
  <QuizProvider>
    <HashRouter>
      <App />
    </HashRouter>
  </QuizProvider>
)
