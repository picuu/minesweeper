import '@/components/styles/statusButton.css'
import { useAppSelector } from '@/lib/hooks.ts'

export function StatusButton() {
  const { gameStatus } = useAppSelector((state) => state.gameStatus)

  const getFace = (status: string) => {
    if (status === 'won') {
      return { fileName: 'winFace', altText: 'win face' }
    } else if (status === 'lost') {
      return { fileName: 'deadFace', altText: 'dead face' }
    } else {
      return { fileName: 'happyFace', altText: 'happy face' }
    }
  }

  const { fileName, altText } = getFace(gameStatus)

  return (
    <button data-testid="status-button" className="status-button">
      <img src={`/faces/${fileName}.png`} alt={altText} />
    </button>
  )
}
