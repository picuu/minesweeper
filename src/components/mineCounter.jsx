import '@/components/styles/mineCounter.css'
import { useSelector } from 'react-redux'

export function MineCounter () {
  const { remainingFlags } = useSelector(state => state.remainingFlags)
  const numberOfMines = () => Number(remainingFlags)

  const firstDigit = parseInt((numberOfMines() % 1000) / 100)
  const secondDigit = parseInt((numberOfMines() % 100) / 10)
  const thirdDigit = parseInt(numberOfMines() % 10)

  return (
    <div className='mineCounter' data-testid='mineCounter'>
      <img src={`/numbers/${firstDigit}.png`} alt={firstDigit} />
      <img src={`/numbers/${secondDigit}.png`} alt={secondDigit} />
      <img src={`/numbers/${thirdDigit}.png`} alt={thirdDigit} />
    </div>
  )
}
