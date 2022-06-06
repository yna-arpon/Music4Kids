import React from 'react'
import Photo from './img.png'

const Header = () => {
  return (
    <div>
      <div>
        <img className='band' src={ Photo } alt='Band' />
        <h1 className='title'>MUSIC<span className='forKids' style={{color: '#FFA723'}}>4KIDS</span></h1>
        <h1 className='subtitle'>Let's make some music!</h1>
      </div>
    </div>   
  )
}

export default Header