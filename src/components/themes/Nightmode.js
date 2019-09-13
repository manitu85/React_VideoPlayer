import React from 'react'
import StyledNightmode  from '../styles/StyledNightmode'

const Nightmode = ({ NightModeCallback, nightMode}) =>  (
  <StyledNightmode>
    <span>Nightmode: </span>
    <label className='switch'>
      <input 
        type='checkbox'
        checked={nightMode}
        onChange={NightModeCallback}
      />
      <span className='slider round' />
    </label>
  </StyledNightmode>
 
  )


export default Nightmode