import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store/store';

export interface AppSlice {
   value: number
}

const initialState: AppSlice = {
   value: 0,
}

export const appSlice = createSlice({
   name: 'app',
   initialState,
   reducers: {
      increment: (state) => {
         state.value += 1
      },
      decrement: (state) => {
         state.value -= 1
      },
      incrementByAmount: (state, action: PayloadAction<number>) => {
         state.value += action.payload
      },
   },
})

// Action creators are generated for each case reducer function
export const { increment, decrement, incrementByAmount } = appSlice.actions

export const selectApp = (state: RootState) => state.app.value

export default appSlice.reducer