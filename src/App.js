import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import StartScreen from './components/StartScreen';
import SongChoice from './components/SongChoice';
import Instruments from './components/Instruments';
import PianoNotes from './components/PianoNotes';

function App() {
  
  return (
    <Router>
      <Routes> 
        <Route path="/" element={<StartScreen />} />
        <Route path="/TutorialSongChoices" element={<SongChoice />} />
        <Route path='/InstrumentChoices' element={<Instruments />} />
        <Route path='/PianoNotes' element={<PianoNotes />} />
      </Routes>
    </Router>
  );
}

export default App;