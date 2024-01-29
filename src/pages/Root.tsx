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
        <div className="scroll-wizards-container">
          <img src="/WizardL.png" className='wizard wizard-left'/>
          <img src="/WizardR.png" className='wizard wizard-right'/>
          <div className='scroll-container'>  
            <img src='/ScrollTopNew.png' className='scroll-top'/>
            <div className='scroll-center animated-scroll-piece'>
              <Countdown/>
              {localization("rootPageText")}
              <div className="scroll-bottom-padding"/>
            </div>
            <img src='/ScrollBottomNew.png' className='scroll-bottom animated-scroll-piece'/>
            <div className='cauldron'>
              <div className='cauldron-left'/>
              <div className='cauldron-center'/>
              <div className='cauldron-right'/>
            </div>
          </div>
        </div>
      </main>
  </div>
  )
}

export default Root
