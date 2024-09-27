import '@/components/styles/mineCounter.css'
import { useAppSelector } from '@/lib/hooks.ts'

export function MineCounter() {
  const { remainingFlags } = useAppSelector((state) => state.remainingFlags)

  const generateDigits = () => {
    let numberOfMines = Number(remainingFlags)

    let isNegative = false
    if (numberOfMines < 0) {
      numberOfMines *= -1
      isNegative = true
    }

    let firstDigit = Math.floor((numberOfMines % 1000) / 100)
    let secondDigit = Math.floor((numberOfMines % 100) / 10)
    const thirdDigit: number = Math.floor(numberOfMines % 10)

    if (isNegative) {
      if (numberOfMines >= 10) {
        return { firstDigit: '-', secondDigit, thirdDigit }
      } else {
        return { firstDigit, secondDigit: '-', thirdDigit }
      }
    } else return { firstDigit, secondDigit, thirdDigit }
  }

  const { firstDigit, secondDigit, thirdDigit } = generateDigits()

  return (
    <div className="mineCounter" data-testid="mineCounter">
      <img src={`/numbers/${firstDigit}.png`} alt={`${firstDigit}`} />
      <img src={`/numbers/${secondDigit}.png`} alt={`${secondDigit}`} />
      <img src={`/numbers/${thirdDigit}.png`} alt={`${thirdDigit}`} />
    </div>
  )
}
