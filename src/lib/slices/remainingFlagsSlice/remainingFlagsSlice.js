import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  remainingFlags: 0
}

export const remainingFlagsSlice = createSlice({
  name: 'remainingFlags',
  initialState,
  reducers: {
    tagCell: (state) => {
      state.remainingFlags = state.remainingFlags - 1
    },
    untagCell: (state) => {
      state.remainingFlags = state.remainingFlags + 1
    },
    setRemainingFlags: (state, action) => {
      state.remainingFlags = action.payload
    }
  }
})

export const { tagCell, untagCell, setRemainingFlags } = remainingFlagsSlice.actions
export default remainingFlagsSlice.reducer
