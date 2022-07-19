import { useNavigate } from "react-router-dom";
import Piano from './photos/piano.png';
import Guitar from './photos/guitar.png';
import Drums from './photos/drums.png';
import BeatPad from './photos/beat pad.png'

const Instruments = () => {
    let navigate = useNavigate();
  return (
   <div className='page choices'>
        <div>
            <button className='btn menuBackBtn' onClick={
                () => {navigate('/')}
            }>BACK</button>
        </div>
        <div id='instrumentChoiceAndSettingsTitle'>
            <h1 className='title'>CHOOSE YOUR INSTRUMENT</h1>  
        </div>
        <div id='instrumentContainer'>
             <button className='btn imgBtns'  onClick={() => (
                navigate('/PianoSettings')
                )}>
                <img className='instrumentImg' src={ Piano } alt='Piano'/>
            </button>
             <button className='btn imgBtns'><img className='instrumentImg' src={ Guitar } alt='Guitar'/></button>
             <button className='btn imgBtns'><img className='instrumentImg' src={ Drums } alt='Drums'/></button> 
             {/* fix drums image */}
             <button className='btn imgBtns'><img className='instrumentImg' src={ BeatPad } alt='Beat Pad'/></button>
        </div>
    </div>
  )
}

export default Instruments