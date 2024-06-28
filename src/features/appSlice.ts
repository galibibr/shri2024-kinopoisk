import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
// import { RootState } from '../store/store';

export const getFilmBySearch = createAsyncThunk(
   'films/getFilmBySearch',
   async (q: string) => {
      try {
         const response = await fetch(`http://localhost:3030/api/v1/search?${q}`);
         const result = await response.json();
         return result
      } catch (error) {
         console.error(error)
      }
   }
)



const initialState: {
   page: number,
   title: string,
   status: string,
   error: string | null,
   data: { search_result: [], total_pages: number }
} = {
   page: 1,
   title: '',
   status: 'pending',
   error: null,
   data: { search_result: [], total_pages: 0 }
}

export const appSlice = createSlice({
   name: 'app',
   initialState,
   reducers: {
      setTitle: (state, action: PayloadAction<string>) => {
         state.title = action.payload
      },
      setPage: (state, action: PayloadAction<number>) => {
         state.page = action.payload
      },
   },
   extraReducers: (builder) => {
      builder.addCase(getFilmBySearch.pending, (state) => {
         state.status = 'pending';
         state.error = null
      })
      builder.addCase(getFilmBySearch.fulfilled, (state, action) => {
         state.status = 'fulfilled'
         state.data = action.payload
      })
      builder.addCase(getFilmBySearch.rejected, (state) => { state.status = 'rejected' })
   }
})

// Action creators are generated for each case reducer function
export const { setTitle, setPage } = appSlice.actions

// export const selectApp = (state: RootState) => state.app.value

export default appSlice.reducer