import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import StartScreen from './components/StartScreen';
import SongChoice from './components/SongChoice';
import Instruments from './components/Instruments';
import PianoChords from './components/PianoChords';

function App() {
  
  return (
    <Router>
      <Routes> 
        <Route path="/" element={<StartScreen />} />
        <Route path="/TutorialSongChoices" element={<SongChoice />} />
        <Route path='/InstrumentChoices' element={<Instruments />} />
        <Route path='/PianoChords' element={<PianoChords />} />
      </Routes>
    </Router>
  );
}

export default App;