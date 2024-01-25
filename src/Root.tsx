import './styles.css'
import Countdown from './components/Countdown'
import { useContext } from 'react'
import { LocalizationContext } from './context/context'

function Root() {

  const languageContext = useContext(LocalizationContext)

  return (
    <div>
    <div>
      <main>
        <div>
          <Countdown/>
        </div>
        <div>
          {languageContext("rootPageText")}
        </div>
      </main>
    </div>
  </div>
  )
}

export default Root
