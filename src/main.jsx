import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './main.css';
import App from './App';
import { QuizProvider } from './contexts/QuizContext';

createRoot(document.getElementById('root')).render(
  <QuizProvider>
    <BrowserRouter basename='/eduplayground/gameSources/gridReveal/'>
      <App />
    </BrowserRouter>
  </QuizProvider>
)
