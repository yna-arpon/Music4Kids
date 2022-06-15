import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import StartScreen from './components/StartScreen';
import SongChoice from './components/SongChoice';
import Instruments from './components/Instruments';

function App() {
  return (
    <Router>
      <Routes> 
        <Route path="/" element={<StartScreen />} />
        <Route path="/TutorialSongChoices" element={<SongChoice />} />
        <Route path='/InstrumentChoices' element={<Instruments />} />
      </Routes>
    </Router>
  );
}

export default App;
