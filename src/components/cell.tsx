// import './styles/cell.css'
import { MouseEvent, useEffect, useState } from 'react'
import { MinefieldCell, MinefieldCellUncovered } from './styled/MinefieldCell.ts'

import { decreaseRemainingFlags, increaseRemainingFlags } from '@/lib/slices/remainingFlagsSlice/remainingFlagsSlice.ts'
import { playGame } from '@/lib/slices/gameStatus/gameStatusSlice.ts'
import { useAppDispatch, useAppSelector } from '@/lib/hooks.ts'

import type { CellProps } from '@/types/types.d.ts'

export default function Cell({ rowPosition, colPosition, hasMine, numberOfMinesAround, isCovered, onClick }: CellProps) {
  const [isTagged, setIsTagged] = useState('')
  const { gameStatus } = useAppSelector((state) => state.gameStatus)
  const dispatch = useAppDispatch()

  function handleClick(e: MouseEvent<HTMLButtonElement>) {
    e.preventDefault()
    if (!isTagged) {
      onClick(rowPosition, colPosition)
    }
  }

  function handleContextMenu(e: MouseEvent<HTMLButtonElement>) {
    e.preventDefault()
    if (gameStatus === 'playing' || gameStatus === 'waiting') {
      if (gameStatus === 'waiting') dispatch(playGame())

      let newState = ''
      if (isTagged === '') {
        newState = 'mined'
        dispatch(decreaseRemainingFlags())
      } else if (isTagged === 'mined') {
        newState = 'inconclusive'
        dispatch(increaseRemainingFlags())
      } else {
        newState = ''
      }

      setIsTagged(newState)
    }
  }

  useEffect(() => {
    if (gameStatus !== 'waiting') return

    setIsTagged('')
  }, [gameStatus])

  function getUncoveredCell() {
    return (
      <MinefieldCellUncovered
        data-testid={`minefield-cell cell-row${rowPosition}-col${colPosition}`}
        className={`minefield-cell ${hasMine && 'highlighted'}`}
      >
        {getUncoveredCellImage()}
      </MinefieldCellUncovered>
    )
  }

  function getUncoveredCellImage() {
    let imgSource
    let altText

    if (hasMine) {
      if (isCovered) {
        imgSource = '/tiles/bombCell.png'
        altText = 'Mine'
      } else {
        imgSource = '/tiles/detonateBombCell.png'
        altText = 'Explosion'
      }
    } else {
      imgSource = `/tiles/cell${numberOfMinesAround}.png`
      if (numberOfMinesAround === 0) {
        altText = 'Empty cell'
      } else {
        altText = 'Number of adjacent mines: ' + numberOfMinesAround
      }
    }

    return <img src={imgSource} alt={altText} />
  }

  if (!isCovered || (gameStatus === 'lost' && hasMine)) {
    return getUncoveredCell()
  } else {
    return (
      <MinefieldCell
        onClick={handleClick}
        onContextMenu={handleContextMenu}
        data-testid={`minefield-cell cell-row${rowPosition}-col${colPosition}`}
        className="minefield-cell covered"
        disabled={gameStatus !== 'playing' && gameStatus !== 'waiting'}
      >
        {((hasMine && gameStatus === 'won') || (isTagged === 'mined' && gameStatus === 'playing')) && (
          <img src="/tiles/flagCell.png" alt="Flaged cell" />
        )}
        {isTagged === 'mined' && !hasMine && gameStatus === 'lost' && (
          <img src="/tiles/notBombCell.png" alt="Wrongly tagged mine" />
        )}
        {isTagged === 'inconclusive' && <img src="/tiles/inconclusiveCell.png" alt="Inconclusive cell" />}
      </MinefieldCell>
    )
  }
}
