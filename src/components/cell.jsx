import { useState } from 'react'
import './styles/cell.css'

import { useSelector, useDispatch } from 'react-redux'
import { decreaseRemainingFlags, increaseRemainingFlags } from '@/lib/slices/remainingFlagsSlice/remainingFlagsSlice.ts'
import { playGame } from '@/lib/slices/gameStatus/gameStatusSlice.ts'

export default function Cell({ rowPosition, colPosition, hasMine, numberOfMinesAround, isCovered, onClick }) {
  const [isTagged, setIsTagged] = useState('')
  const { gameStatus } = useSelector((state) => state.gameStatus)
  const dispatch = useDispatch()

  function handleClick(e) {
    e.preventDefault()
    if (!isTagged) {
      onClick(rowPosition, colPosition)
    }
  }

  function handleContextMenu(e) {
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

  function getUncoveredCell() {
    return (
      <div
        data-testid={`minefield-cell cell-row${rowPosition}-col${colPosition}`}
        className={`minefield-cell ${hasMine && 'highlighted'}`}
      >
        {getUncoveredCellImage()}
      </div>
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
      <button
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
      </button>
    )
  }
}
