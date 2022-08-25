import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import StartScreen from './components/StartScreen';
import Instruments from './components/Instruments';
import PianoNotes from './components/PianoNotes';
import PianoChords from './components/PianoChords';
import PianoSettings from './components/PianoSettings';

function App() {
  
  return (
    <Router>
      <Routes> 
        <Route path="/" element={<StartScreen />} />
        <Route path='/InstrumentChoices' element={<Instruments />} />
        <Route path='/PianoNotes' element={<PianoNotes />} />
        <Route path='/PianoChords' element={<PianoChords />} />
        <Route path='/PianoSettings' element={<PianoSettings />} />
      </Routes>
    </Router>
  );
}

export default App;