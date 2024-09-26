import '@/components/styles/timer.css'
import { useEffect, useRef, useState } from 'react'
import { useAppSelector } from '@/lib/hooks'

type TimeoutType = ReturnType<typeof setTimeout>

export function Timer() {
  const { gameStatus } = useAppSelector((state) => state.gameStatus)
  const timer = useRef<TimeoutType>()
  const [time, setTime] = useState(0)

  useEffect(() => {
    if (gameStatus === 'waiting') return

    if (gameStatus === 'playing') {
      timer.current = setInterval(() => {
        setTime((pre) => (pre < 999 ? pre + 1 : pre))
      }, 1000)
    } else {
      clearInterval(timer.current)
    }

    return () => clearInterval(timer.current)
  }, [gameStatus])

  const firstDigit: number = Math.round((time % 1000) / 100)
  const secondDigit: number = Math.round((time % 100) / 10)
  const thirdDigit: number = Math.round(time % 10)

  return (
    <div className="timer" data-testid="timer">
      <img src={`/numbers/${firstDigit}.png`} alt={`${firstDigit}`} />
      <img src={`/numbers/${secondDigit}.png`} alt={`${secondDigit}`} />
      <img src={`/numbers/${thirdDigit}.png`} alt={`${thirdDigit}`} />
    </div>
  )
}
