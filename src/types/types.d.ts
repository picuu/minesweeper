export interface MinefieldProps {
  numberOfRows: number
  numberOfColumns: number
  numberOfMines: number
  mockData: string
}

export interface CellType {
  y: number
  x: number
  isMine: boolean
  isCovered: boolean
  numberOfMinesAround: number
}

export type BoardType = Array<Array<CellType>>

export type TimeoutType = ReturnType<typeof setTimeout>
