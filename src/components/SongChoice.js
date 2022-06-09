import Beginner from './photos/beginnerHeader.png'
import Intermediate from './photos/intHeader.png'
import Master from './photos/masterHeader.png'

const SongChoice = () => {
  return (
    <div className='songChoicePage'>

        <div id='songChoiceHeader'>
            <div id='songChoiceBack'>
              <button className='btn menuBackBtn'>BACK</button>
            </div>
            <div id='songChoiceTitle'>
              <h1 className='title'>CHOOSE A SONG</h1>  
            </div>
        </div>

        <div id='songContainer'>
            <img className='songLevels' id='beginner' 
            src={ Beginner } alt='Beginner Songs' />
            <img className='songLevels' id='intermediate' 
            src={ Intermediate } alt='Intermediate Songs' />
            <img className='songLevels' id='Master' 
            src={ Master } alt='Master Songs' />
            <button className='btn songs' id='song1'>Twinkle Twinkle Little Star</button>
            <button className='btn songs' id='song2'>Intermediate Song 1</button>
            <button className='btn songs' id='song3'>Master Song 1</button>
            <button className='btn songs' id='song4'>Mary Had A Little Lamb</button>
            <button className='btn songs' id='song5'>Intermediate Song 2</button>
            <button className='btn songs' id='song6'>Master Song 2</button>
            <button className='btn songs' id='song7'>Hot Crossed Buns</button>
            <button className='btn songs' id='song8'>Intermediate Song 3</button>
            <button className='btn songs' id='song9'>Intermediate Song 3</button>
        </div>
    </div>
  )
}

export default SongChoice