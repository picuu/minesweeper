import { configureStore } from '@reduxjs/toolkit'
import gameStatusReducer from '@/lib/slices/gameStatus/gameStatusSlice.js'
import remainingFlagsReducer from '@/lib/slices/remainingFlagsSlice/remainingFlagsSlice.js'

export const makeStore = () => {
  return configureStore({
    reducer: {
      gameStatus: gameStatusReducer,
      remainingFlags: remainingFlagsReducer
    }
  })
}
