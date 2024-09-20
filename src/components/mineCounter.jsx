import '@/components/styles/mineCounter.css'
import { useSelector } from 'react-redux'

export function MineCounter () {
  const { remainingFlags } = useSelector(state => state.remainingFlags)

  const generateDigits = () => {
    let numberOfMines = Number(remainingFlags)

    let isNegative = false
    if (numberOfMines < 0) {
      numberOfMines *= -1
      isNegative = true
    }

    let firstDigit = parseInt((numberOfMines % 1000) / 100)
    let secondDigit = parseInt((numberOfMines % 100) / 10)
    const thirdDigit = parseInt(numberOfMines % 10)

    if (isNegative) {
      if (numberOfMines >= 10) {
        firstDigit = '-'
      } else {
        secondDigit = '-'
      }
    }

    return { firstDigit, secondDigit, thirdDigit }
  }

  const { firstDigit, secondDigit, thirdDigit } = generateDigits()

  return (
    <div className='mineCounter' data-testid='mineCounter'>
      <img src={`/numbers/${firstDigit}.png`} alt={firstDigit} />
      <img src={`/numbers/${secondDigit}.png`} alt={secondDigit} />
      <img src={`/numbers/${thirdDigit}.png`} alt={thirdDigit} />
    </div>
  )
}
