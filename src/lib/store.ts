import { configureStore } from '@reduxjs/toolkit'
import gameStatusReducer from '@/lib/slices/gameStatus/gameStatusSlice.ts'
import remainingFlagsReducer from '@/lib/slices/remainingFlagsSlice/remainingFlagsSlice.ts'

export const makeStore = () => {
  return configureStore({
    reducer: {
      gameStatus: gameStatusReducer,
      remainingFlags: remainingFlagsReducer
    }
  })
}

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
