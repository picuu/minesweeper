import '@/components/styles/timer.css'
import { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'

export function Timer () {
  const { gameStatus } = useSelector(state => state.gameStatus)
  const timer = useRef()
  const [time, setTime] = useState(0)

  useEffect(() => {
    if (gameStatus === 'waiting') return

    if (gameStatus === 'playing') {
      timer.current = setInterval(() => {
        setTime(pre => pre + 1)
      }, 1000)
    } else {
      clearInterval(timer.current)
    }

    return () => clearInterval(timer.current)
  }, [gameStatus])

  const firstDigit = parseInt((time % 1000) / 100)
  const secondDigit = parseInt((time % 100) / 10)
  const thirdDigit = parseInt(time % 10)

  return (
    <div className='timer' data-testid='timer'>
      <img src={`/numbers/${firstDigit}.png`} alt={firstDigit} />
      <img src={`/numbers/${secondDigit}.png`} alt={secondDigit} />
      <img src={`/numbers/${thirdDigit}.png`} alt={thirdDigit} />
    </div>
  )
}
