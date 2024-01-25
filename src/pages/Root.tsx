import '../styles.css'
import Countdown from '../components/Countdown.tsx'
import { useContext } from 'react'
import { LocalizationContext } from '../context/context.tsx'

function Root() {

  const languageContext = useContext(LocalizationContext)

  return (
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
  )
}

export default Root
