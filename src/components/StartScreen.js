import { useNavigate } from 'react-router-dom'
import Photo from './photos/band.png'

const Header = () => {
  let navigate = useNavigate();

  return (
    <div id='start' className='page'>

      <img id='band' src={ Photo } alt='Band' />

      <h1 className='title'>MUSIC<span id='forKids' style={{color: '#FFA723'}}>4KIDS</span></h1>

      <h1 className='title' id='subtitle'>Let's make some music!</h1>

      <div>
            <button className="btn modeOptions" onClick={() => (
              navigate('/InstrumentChoices')
            )}>
              FREE STYLE
            </button>
      </div>

      <div>
        <button className="btn modeOptions" id="tutorialOptn">
          TUTORIAL
        </button>
      </div>
       
    </div>   
  )
}

export default Header