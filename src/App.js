import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import StartScreen from './components/StartScreen'
import SongChoice from './components/SongChoice'

const state = {
  page: 'start'
}

function App() {
  return (
    <div className="App">
     {(state.page === 'start') && <div className='page' id='start'>
          <StartScreen />
      </div>}
    <div className='page' id='songChoice'>
        <div>
          <SongChoice />
        </div>
    </ div>
    </div>
  );
}

export default App;
