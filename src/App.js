import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import StartScreen from './components/StartScreen'
import SongChoice from './components/SongChoice'

function App() {
  return (
    <Router>
        {/* <div className='page' id='start'>
            <StartScreen />
        </div>
        <div className='page' id='songChoice'>
            <SongChoice />
        </ div> */}
      <Routes> 
        <Route path="/" element={ <StartScreen /> } />
        <Route path="/TutorialSongChoices" element={ <SongChoice /> } />
      </Routes>
    </Router>
  );
}

export default App;
