import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  gameStatus: 'waiting'
}

export const gameStatusSlice = createSlice({
  name: 'gameStatus',
  initialState,
  reducers: {
    waitGame: (state) => {
      state.gameStatus = 'waiting'
    },
    playGame: (state) => {
      state.gameStatus = 'playing'
    },
    winGame: (state) => {
      state.gameStatus = 'won'
    },
    loseGame: (state) => {
      state.gameStatus = 'lost'
    }
  }
})

export const { waitGame, playGame, winGame, loseGame } = gameStatusSlice.actions
export default gameStatusSlice.reducer
