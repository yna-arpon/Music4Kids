import Photo from './photos/band.png'

const Header = () => {
  return (
    <div>

      <img id='band' src={ Photo } alt='Band' />

      <h1 className='title'>MUSIC<span id='forKids' style={{color: '#FFA723'}}>4KIDS</span></h1>

      <h1 className='title' id='subtitle'>Let's make some music!</h1>

      <div>
            <button className="btn modeOptions" onClick={
              () => {
                document.getElementById('start').classList.add('hidden')
              }
            }>TUTORIAL</button>
        </div>
        <div>
            <button className="btn modeOptions">FREE STYLE</button>
        </div>
    </div>   
  )
}

export default Header