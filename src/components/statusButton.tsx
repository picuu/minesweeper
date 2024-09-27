import '@/components/styles/statusButton.css'
import { MouseEvent } from 'react'
import { waitGame } from '@/lib/slices/gameStatus/gameStatusSlice.ts'
import { useAppSelector, useAppDispatch } from '@/lib/hooks.ts'

export function StatusButton() {
  const { gameStatus } = useAppSelector((state) => state.gameStatus)
  const dispatch = useAppDispatch()

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    dispatch(waitGame())
  }

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
    <button data-testid="status-button" className="status-button" onClick={handleClick}>
      <img src={`/faces/${fileName}.png`} alt={altText} />
    </button>
  )
}
