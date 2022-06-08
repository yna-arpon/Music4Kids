import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import StartScreen from './components/StartScreen'
import ModuleOptns from './components/ModeOptns';

const state = {
  page: 'start'
}

function App() {
  return (
    <div className="App">
     {(state.page === 'start') && <div className='page' id='start'>
        <div>
          <StartScreen />
          <ModuleOptns />
        </div>
      </div>}
    <div className='page'>
        <div>
          This is a text
        </div>
    </ div>
    </div>
  );
}

export default App;
