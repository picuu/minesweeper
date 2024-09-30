import '@/components/styles/timer.css'
import { useTimer } from '@/customHooks/useTimer'
import { useAppSelector } from '@/lib/hooks.ts'

export function Timer() {
  const { gameStatus } = useAppSelector((state) => state.gameStatus)
  const time = useTimer({ maxValue: 999, restart: gameStatus === 'waiting', start: gameStatus === 'playing' })

  const firstDigit: number = Math.floor((time % 1000) / 100)
  const secondDigit: number = Math.floor((time % 100) / 10)
  const thirdDigit: number = Math.floor(time % 10)

  return (
    <div className="timer" data-testid="timer">
      <img src={`/numbers/${firstDigit}.png`} alt={`${firstDigit}`} />
      <img src={`/numbers/${secondDigit}.png`} alt={`${secondDigit}`} />
      <img src={`/numbers/${thirdDigit}.png`} alt={`${thirdDigit}`} />
    </div>
  )
}
