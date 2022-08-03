import { useNavigate } from "react-router-dom";
import BackBtn from './photos/PianoSettingsBackBtn.png'
import ChordsBtn from './photos/PianoChordsSettings.png';
import NoteBtn from './photos/NoteSettingsBtn.png';



const Instruments = () => {
    let navigate = useNavigate();
  return (
   <div className='page choices'>
        <div id='instrumentChoiceAndSettingsTitle'>
            <h1 className='title'>Piano Settings</h1>  
        </div>
        <div id='settingsContainer'>
             <button className='btn imgBtns' onClick={() => (
                navigate('/InstrumentChoices')
                )}><img src={BackBtn} alt='Back to Instrument Menu'/></button>
             <button className='btn imgBtns' onClick={() => (
                navigate('/PianoNotes')
                )}><img src={NoteBtn} alt='Notes Option'/></button>
             <button className='btn imgBtns'onClick={() => (
                navigate('/PianoChords')
                )}><img src={ChordsBtn} alt='Chords Option'/></button>
        </div>
   </div>
  )
}

export default Instruments