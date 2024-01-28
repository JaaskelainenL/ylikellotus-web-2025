import { useEffect, useRef, useState } from 'react'
import '../styles.css'

function Game() {

    const [clicks, setClicks] = useState<number>(0)
    const [timeLeft, setTimeLeft] = useState<number>(0)

    const timeInterval = useRef<number | null>(null)

    const clicksPerBottle = 10
    const time = 15

    useEffect(() => {
        return () => handleGameEnd()
      }, []);
    

    function handleGameEnd() {
        if (timeInterval.current != null) {
            clearInterval(timeInterval.current)
            timeInterval.current = null
        }
    }

    function setUpInterval() {
        setClicks(0)
        setTimeLeft(time)
        timeInterval.current = setInterval(() => {
            if (timeLeft - 1 <= 0) {
                handleGameEnd()
            }
            else {
                setTimeLeft((time) => time - 1)
            }
        }, 1000)
    }

    function onBottleClick() {
        if (timeInterval.current == null) {
            setUpInterval()
        }
        setClicks(clicks + 1)
    }

    return (
        <div>
            <div>
                <h1>
                    Kellotuspeli
                </h1>
                <p>
                    Kuka on nopein kellottaja? Klikkaa pulloa mahdollisimman nopeasti ja 
                    voita virtuaalikellotuksen mestaruus!
                </p>
            </div>
            <div>
                <p>Pulloja kellotettu: {Math.floor(clicks / clicksPerBottle)}</p>
                <p>Aikaa jäljellä: {timeLeft} sekuntia</p>
                <img className='bottle' src='/bottle.png' onClick={() => onBottleClick()}/>
            </div>
        </div>
    )
}

export default Game
