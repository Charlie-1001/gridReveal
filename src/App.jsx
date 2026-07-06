import HomePage from './pages/HomePage';
import PreviewPage from './pages/PreviewPage';
import GamePage from './pages/GamePage';
import WinnersPage from './pages/WinnersPage';
import { Routes, Route, Link} from 'react-router-dom';

function App() {
  return(
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='/previewPage/:id' element={<PreviewPage />} />
      <Route path='/gamePage/:id' element={<GamePage />} />
    </Routes>
  )
}

export default App;
