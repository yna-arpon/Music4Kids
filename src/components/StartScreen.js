import React from 'react'
import Photo from './band.png'
import Vector1 from './vector1.png'
import Vector2 from './vector2.png'

const Header = () => {
  return (
    <div>
      <div className='vector1'> 
        <img src={ Vector1 } alt='vector1' />
      </div>
      <div className='vector2'>
        <img  src = { Vector2 } alt='vector2' />
      </div>
      <img className='band' src={ Photo } alt='Band' />
      <h1 className='title'>MUSIC<span className='forKids' style={{color: '#FFA723'}}>4KIDS</span></h1>
      <h1 className='subtitle'>Let's make some music!</h1>
    </div>   
  )
}

export default Header