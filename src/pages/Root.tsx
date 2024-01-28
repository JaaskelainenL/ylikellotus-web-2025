import '../styles.css'
import Countdown from '../components/Countdown.tsx'
import { useContext } from 'react'
import { LocalizationContext } from '../context/context.tsx'

function Root() {

  const localization = useContext(LocalizationContext)

  return (
    <div>
      <main>
        <img src='/Logo.png' className='logo'/>
        <div className='scroll-container'>
          <img src='/ScrollTop.png'/>
          <div className='scroll-center'>
            {localization("rootPageText")}
          </div>
          <img src='/ScrollBottom.png' className='scroll-bottom'/>
          <img src='/CauldronRGB_Mobile.png' className='cauldron'/>
        </div>
        <div>
          <Countdown/>
        </div>
        <div>
        </div>
      </main>
  </div>
  )
}

export default Root
