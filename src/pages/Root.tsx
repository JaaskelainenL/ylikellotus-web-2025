import '../styles.css'
import Countdown from '../components/Countdown.tsx'
import { useContext, useState } from 'react'
import { LocalizationContext } from '../context/context.tsx'

function Root() {

  const localization = useContext(LocalizationContext)

  return (
    <div>
      <main>
        <img src='/Logo.png' className='logo'/>
        <div className='scroll-container'>
          <img src='/ScrollTop.png'/>
          <div className='scroll-center animated-scroll-piece'>
            <Countdown/>
            {localization("rootPageText")}
          </div>
          <img src='/ScrollBottom.png' className='scroll-bottom animated-scroll-piece'/>
          <div className='cauldron'>
            <div className='cauldron-left'/>
            <div className='cauldron-center'/>
            <div className='cauldron-right'/>
          </div>
        </div>
      </main>
  </div>
  )
}

export default Root
