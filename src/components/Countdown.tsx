import { useRef, useState } from 'react'
import { useEffect } from 'react'

function Countdown() {
    const [date, setDate] = useState<string>("")
    const storedInterval = useRef<number>()

    const eventDate = new Date('2024-02-28T19:00:00+02:00')
    const updateCountdown = () => {
        const timeLeft = eventDate.valueOf() - new Date().valueOf()
        const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24))
        const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
        const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60))
        const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000)
        setDate(`${days}d ${hours}h ${minutes}m ${seconds}s`)
    }

    useEffect(() => {
        const interval = setInterval(() => {
          updateCountdown()
        }, 1000);
        storedInterval.current = interval
        updateCountdown()

        return () => clearInterval(storedInterval.current)
      }, []);
    
    setInterval(() => {
      updateCountdown()
    }, 1000)

    return (
    <div>
        <h2>{date}</h2>
    </div>
    )
}

export default Countdown
