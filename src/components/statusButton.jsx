import '@/components/styles/statusButton.css'
import { useSelector } from 'react-redux'

export function StatusButton () {
  const { gameStatus } = useSelector(state => state.gameStatus)

  const getFace = (status) => {
    if (status === 'waiting' || status === 'playing') {
      return { fileName: 'happyFace', altText: 'happy face' }
    } else if (status === 'won') {
      return { fileName: 'winFace', altText: 'win face' }
    } else if (status === 'lost') {
      return { fileName: 'deadFace', altText: 'dead face' }
    }
  }

  const { fileName, altText } = getFace(gameStatus)

  return (
    <button data-testid='status-button' className='status-button'>
      <img src={`/faces/${fileName}.png`} alt={altText} />
    </button>
  )
}
