import { render, screen, fireEvent } from '@testing-library/react'
import Game from '@/components/game.tsx'
import StoreProvider from '@/app/StoreProvider.tsx'

const directions = [
  { offsetX: 0, offsetY: -1 },
  { offsetX: 0, offsetY: 1 },
  { offsetX: -1, offsetY: 0 },
  { offsetX: 1, offsetY: 0 },
  { offsetX: -1, offsetY: -1 },
  { offsetX: -1, offsetY: +1 },
  { offsetX: +1, offsetY: -1 },
  { offsetX: +1, offsetY: +1 }
]

export function openTheGame() {
  render(
    <StoreProvider>
      <Game />
    </StoreProvider>
  )
}

export function mineFieldDimensionsValidation(rows: number, columns: number) {
  const cells = getMinefieldCells()
  return cells.length === rows * columns
}

function getMinefieldCells() {
  return screen.getAllByTestId('minefield-cell', { exact: false })
}

function getMinefieldCell(rowPosition: number, colPosition: number) {
  return screen.getByTestId('minefield-cell cell-row' + rowPosition + '-col' + colPosition, { exact: true })
}

export function areAllCellsCovered(): boolean {
  let result = true
  const cells = getMinefieldCells()
  cells.forEach((cell) => {
    if (!cell.classList.contains('covered')) {
      result = false
    }
  })
  return result
}

export function areAllCellsDisabled(): boolean {
  const cells = getMinefieldCells() as Array<HTMLButtonElement>
  return cells.every((cell) => cell.tagName === 'DIV' || cell.disabled)
}

export function areAllCellsEnabled(): boolean {
  const cells = getMinefieldCells() as Array<HTMLButtonElement>
  return cells.every((cell) => cell.tagName === 'BUTTON' && !cell.disabled)
}

export function setMockData(data: string): void {
  data = data.trim()

  fireEvent.keyDown(screen.getByTestId('minefield'), {
    key: 'm',
    ctrlKey: true,
    repeat: false
  })

  const textInput = screen.getByTestId('mock-data-input')
  const submitButton = screen.getByTestId('mock-data-submit')

  fireEvent.change(textInput, { target: { value: data } })
  fireEvent.click(submitButton)
}

export function uncoverCell(rowPosition: number, colPosition: number): void {
  fireEvent.click(getMinefieldCell(rowPosition, colPosition))
}

export function tagCell(rowPosition: number, colPosition: number): void {
  fireEvent.contextMenu(getMinefieldCell(rowPosition, colPosition))
}

export function tagCellAsMined(rowPosition: number, colPosition: number): void {
  if (isNotTagged(rowPosition, colPosition)) {
    fireEvent.contextMenu(getMinefieldCell(rowPosition, colPosition))
  } else if (isTaggedAsInconclusive(rowPosition, colPosition)) {
    fireEvent.contextMenu(getMinefieldCell(rowPosition, colPosition))
    fireEvent.contextMenu(getMinefieldCell(rowPosition, colPosition))
  }
}

export function tagCellAsInconclusive(rowPosition: number, colPosition: number): void {
  if (isNotTagged(rowPosition, colPosition)) {
    fireEvent.contextMenu(getMinefieldCell(rowPosition, colPosition))
    fireEvent.contextMenu(getMinefieldCell(rowPosition, colPosition))
  } else if (isTaggedAsMined(rowPosition, colPosition)) {
    fireEvent.contextMenu(getMinefieldCell(rowPosition, colPosition))
  }
}

export function untagCell(rowPosition: number, colPosition: number): void {
  if (isNotTagged(rowPosition, colPosition)) return

  if (isTaggedAsMined(rowPosition, colPosition)) fireEvent.contextMenu(getMinefieldCell(rowPosition, colPosition))

  fireEvent.contextMenu(getMinefieldCell(rowPosition, colPosition))
}

export function isCellUncovered(rowPosition: number, colPosition: number): boolean {
  const cell = getMinefieldCell(rowPosition, colPosition)
  if (cell.classList.contains('covered')) {
    return false
  }
  return true
}

export function isCellDisabled(rowPosition: number, colPosition: number): boolean {
  const cell = getMinefieldCell(rowPosition, colPosition)
  return cell.tagName === 'DIV'
}

export function hasHighlightedMine(): boolean {
  let result = false
  const cells = getMinefieldCells()

  cells.forEach((cell) => {
    if (cell.classList.contains('highlighted')) {
      result = true
    }
  })

  return result
}

export function isHighlightedMine(rowPosition: number, colPosition: number): boolean {
  const cell = getMinefieldCell(rowPosition, colPosition)
  return cell.classList.contains('highlighted')
}

function isAltTextInCell(rowPosition: number, colPosition: number, altText: string): boolean {
  const cell = getMinefieldCell(rowPosition, colPosition)
  const images = cell.getElementsByTagName('img')
  if (images.length !== 1) {
    return false
  } else {
    const imgAltText = images[0].alt
    return imgAltText === altText
  }
}

export function isNumber(rowPosition: number, colPosition: number, number: number): boolean {
  return isAltTextInCell(rowPosition, colPosition, 'Number of adjacent mines: ' + number)
}

export function isCellEmpty(rowPosition: number, colPosition: number): boolean {
  return isAltTextInCell(rowPosition, colPosition, 'Empty cell')
}

export function isMine(rowPosition: number, colPosition: number): boolean {
  return isAltTextInCell(rowPosition, colPosition, 'Mine')
}

export function isTaggedAsMined(rowPosition: number, colPosition: number): boolean {
  return isAltTextInCell(rowPosition, colPosition, 'Flaged cell')
}

export function isTaggedAsInconclusive(rowPosition: number, colPosition: number): boolean {
  return isAltTextInCell(rowPosition, colPosition, 'Inconclusive cell')
}

export function isWronglyTaggedMine(rowPosition: number, colPosition: number): boolean {
  return isAltTextInCell(rowPosition, colPosition, 'Wrongly tagged mine')
}
export function isNotTagged(rowPosition: number, colPosition: number): boolean {
  return (
    !isAltTextInCell(rowPosition, colPosition, 'Flaged cell') && !isAltTextInCell(rowPosition, colPosition, 'Inconclusive cell')
  )
}

export function areCellsInARowUncovered(rowNumber: number): boolean {
  let result = true
  const cells = screen.getAllByTestId('minefield-cell cell-row' + rowNumber + '-col', { exact: false })

  cells.forEach((cell) => {
    if (cell.classList.contains('covered')) {
      result = false
    }
  })

  return result
}

export function areCellsInARowCovered(rowNumber: number): boolean {
  let result = true
  const cells = screen.getAllByTestId('minefield-cell cell-row' + rowNumber + '-col', { exact: false })

  cells.forEach((cell) => {
    if (!cell.classList.contains('covered')) {
      result = false
    }
  })

  return result
}

export function areCellsAroundACellUncovered(rowPosition: number, colPosition: number): boolean {
  let result = true

  for (const direction of directions) {
    const newRowPosition = Number(rowPosition) + direction.offsetY
    const newColPosition = Number(colPosition) + direction.offsetX
    const cell = screen.getByTestId('minefield-cell cell-row' + newRowPosition + '-col' + newColPosition, {
      exact: true
    })

    if (cell) {
      if (cell.classList.contains('covered')) {
        result = false
      }
    }
  }

  return result
}

/* ---------------------------------------------------------------------------------------------- */

function getStatusButton() {
  return screen.getByTestId('status-button', { exact: true })
}

function getTimer() {
  return screen.getByTestId('timer', { exact: true })
}

function getMineCounter() {
  return screen.getByTestId('mineCounter', { exact: true })
}

function isAltTextInStatusButton(altText: string): boolean {
  const statusButton = getStatusButton()
  const images = statusButton.getElementsByTagName('img')
  if (images.length !== 1) {
    return false
  } else {
    const imgAltText = images[0].alt
    return imgAltText === altText
  }
}

export function isHappyFace(): boolean {
  return isAltTextInStatusButton('happy face')
}

export function isWinFace(): boolean {
  return isAltTextInStatusButton('win face')
}

export function isDeadFace(): boolean {
  return isAltTextInStatusButton('dead face')
}

export function getTimerValue(): number {
  const timer = getTimer()

  const images = timer.getElementsByTagName('img')
  if (images.length < 3) return 0
  else {
    let timerValue = Number(images[images.length - 1].alt)
    timerValue = timerValue + 10 * Number(images[images.length - 2].alt)
    timerValue = timerValue + 100 * Number(images[images.length - 3].alt)

    return timerValue
  }
}

export function getMineCounterValue(): number | boolean {
  const counter = getMineCounter()

  const images = counter.getElementsByTagName('img')
  if (images.length < 3) return false
  else {
    let isNegative = false
    const checkNegative = (value: string) => {
      if (value === '-') {
        isNegative = true
        return 0
      } else return Number(value)
    }

    const firstDigit = images[images.length - 1].alt
    const secondDigit = checkNegative(images[images.length - 2].alt)
    const thirdDigit = checkNegative(images[images.length - 3].alt)

    let counterValue = Number(firstDigit)
    counterValue = counterValue + 10 * secondDigit
    counterValue = counterValue + 100 * thirdDigit

    if (isNegative) return counterValue * -1
    return counterValue
  }
}

export function clickStatusButton(): void {
  const btn = getStatusButton()
  fireEvent.click(btn)
}
