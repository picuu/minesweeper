import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  remainingFlags: 0
}

export const remainingFlagsSlice = createSlice({
  name: 'remainingFlags',
  initialState,
  reducers: {
    decreaseRemainingFlags: (state) => {
      state.remainingFlags = state.remainingFlags - 1
    },
    increaseRemainingFlags: (state) => {
      state.remainingFlags = state.remainingFlags + 1
    },
    setRemainingFlags: (state, action) => {
      state.remainingFlags = action.payload
    }
  }
})

export const { decreaseRemainingFlags, increaseRemainingFlags, setRemainingFlags } = remainingFlagsSlice.actions
export default remainingFlagsSlice.reducer
