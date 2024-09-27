import './styles/minefield.css'
import { useState, useEffect } from 'react'
import * as dataHelper from './helper/mineFieldData.ts'
import Cell from '@/components/cell.tsx'

import { useAppDispatch, useAppSelector } from '@/lib/hooks.ts'
import { playGame, winGame, loseGame } from '@/lib/slices/gameStatus/gameStatusSlice.ts'
import { setRemainingFlags } from '@/lib/slices/remainingFlagsSlice/remainingFlagsSlice.ts'

import type { BoardType, MinefieldProps } from '@/types/types.d.ts'

export default function Minefield({ numberOfRows = 9, numberOfColumns = 9, numberOfMines = 10, mockData }: MinefieldProps) {
  const [minefieldData, setMinefieldData] = useState<BoardType>([])
  const [cellsToUncover, setCellsToUncover] = useState(-1)
  const { gameStatus } = useAppSelector((state) => state.gameStatus)
  const dispatch = useAppDispatch()

  const directions = [
    { offsetX: 0, offsetY: -1 },
    { offsetX: 0, offsetY: 1 },
    { offsetX: -1, offsetY: 0 },
    { offsetX: 1, offsetY: 0 },
    { offsetX: -1, offsetY: -1 },
    { offsetX: -1, offsetY: 1 },
    { offsetX: 1, offsetY: -1 },
    { offsetX: 1, offsetY: 1 }
  ]

  function uncoverNeighborCells(row: number, column: number, newMinefieldData: BoardType) {
    let counter = 0
    const newNumberOfRows = newMinefieldData.length
    const newNumberOfColumns = newMinefieldData[0].length

    for (let i = 0; i < directions.length; i += 1) {
      const newRow = row + directions[i].offsetY
      const newColumn = column + directions[i].offsetX

      if (newRow >= 1 && newRow <= newNumberOfRows && newColumn >= 1 && newColumn <= newNumberOfColumns) {
        const cell = newMinefieldData[newRow - 1][newColumn - 1]

        if (cell.isCovered) {
          cell.isCovered = false
          counter++

          if (cell.numberOfMinesAround === 0) {
            counter += uncoverNeighborCells(newRow, newColumn, newMinefieldData)
          }
        }
      }
    }
    return counter
  }

  function onClick(row: number, column: number) {
    const newMinefieldData: BoardType = [...minefieldData]
    let uncoveredCells
    if (newMinefieldData[row - 1][column - 1].isCovered === true) {
      newMinefieldData[row - 1][column - 1].isCovered = false
    }
    if (newMinefieldData[row - 1][column - 1].isMine) {
      dispatch(loseGame())
    } else {
      if (newMinefieldData[row - 1][column - 1].numberOfMinesAround === 0) {
        uncoveredCells = uncoverNeighborCells(row, column, newMinefieldData) + 1
      } else {
        uncoveredCells = 1
      }
      if (cellsToUncover - uncoveredCells === 0) {
        dispatch(winGame())
      } else {
        if (gameStatus === 'waiting') dispatch(playGame())
      }
      setCellsToUncover(cellsToUncover - uncoveredCells)
    }
    setMinefieldData(newMinefieldData)
  }

  useEffect(() => {
    if (gameStatus !== 'waiting') return

    let preData
    if (mockData.includes('|')) {
      mockData = dataHelper.parseMockDataToString(mockData)
    }
    if (dataHelper.validateMockData(mockData)) {
      preData = dataHelper.getMinefieldFromMockData(mockData)
      setCellsToUncover(dataHelper.getNumberOfCellsToUncover(preData))
    } else {
      preData = dataHelper.getMinefield(numberOfRows, numberOfColumns)
      dataHelper.minefieldMining(preData, numberOfMines)
      setCellsToUncover(numberOfColumns * numberOfRows - numberOfMines)
    }
    dataHelper.minefieldNumbering(preData)
    setMinefieldData(preData)

    dispatch(setRemainingFlags(dataHelper.getNumberOfMines(preData)))
  }, [mockData, gameStatus])

  return (
    <div data-testid="minefield">
      {/* <div data-testid='mockdata-title'>Mock data: {mockData}</div>
      <div>minefieldData.length:{minefieldData.length}</div> */}
      {minefieldData.map((row, rowIndex) => (
        <div className="minefield-row" data-testid="minefield-row" key={rowIndex}>
          {row.map((cell, cellIndex) => (
            <Cell
              key={cellIndex}
              rowPosition={rowIndex + 1}
              colPosition={cellIndex + 1}
              hasMine={cell.isMine}
              numberOfMinesAround={cell.numberOfMinesAround}
              onClick={onClick}
              isCovered={cell.isCovered}
            />
          ))}
        </div>
      ))}
    </div>
  )
}
