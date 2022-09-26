import { useNavigate } from 'react-router-dom'
import Beginner from './photos/beginnerHeader.png'
import Intermediate from './photos/intHeader.png'
import Master from './photos/masterHeader.png'
import TwinkleStar from './photos/Twinkle Twinkle Little Star.png'
import HotCrossBuns from './photos/Hot cross buns.png'
import MaryLamb from './photos/Mary Lamb.png'

// To be developed - all buttons are placeholders. Not actual page on app yet.
const SongChoice = () => {
  let navigate = useNavigate();

  return (
    <div className='page choices'>
        <div id='songChoiceHeader'>
            <div>
              <button className='btn backBtn backToMenu' 
              onClick={() => {navigate('/')}}>BACK</button>
            </div>
            <div id='songChoiceTitle'>
              <h1 className='title'>CHOOSE A SONG</h1>  
            </div>
        </div>

        <div id='songContainer'>
            <img className='songLevels' src={ Beginner } alt='Beginner Songs' />
            <img className='songLevels' src={ Intermediate } alt='Intermediate Songs' />
            <img className='songLevels' src={ Master } alt='Master Songs' />
            <button className='btn song'><img className='songImg' src={ TwinkleStar } alt='Twinkle Twinkle Little Star'/></button>
            <button className='btn song'><img className='songImg' src={ TwinkleStar } alt='Twinkle Twinkle Little Star'/></button> {/* To be replaced with Int song */}
            <button className='btn song'><img className='songImg' src={ TwinkleStar } alt='Twinkle Twinkle Little Star'/></button> {/* To be replaced with Master song */}
            <button className='btn song'><img className='songImg' src={ MaryLamb } alt='Mary Had a Little Lamb'/></button>
            <button className='btn song'><img className='songImg' src={ MaryLamb } alt='Mary Had a Little Lamb'/></button> {/* To be replaced with Int song */}
            <button className='btn song'><img className='songImg' src={ MaryLamb } alt='Mary Had a Little Lamb'/></button> {/* To be replaced with Master song */}
            <button className='btn song'><img className='songImg' src={ HotCrossBuns } alt='Hot Cross Buns'/></button>
            <button className='btn song'><img className='songImg' src={ HotCrossBuns } alt='Hot Cross Buns'/></button> {/* To be replaced with Int song */}
            <button className='btn song'><img className='songImg' src={ HotCrossBuns } alt='Hot Cross Buns'/></button> {/* To be replaced with Master song */}
        </div>
    </div>
  )
}

export default SongChoice