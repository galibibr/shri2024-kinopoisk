import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { ActionReducerMapBuilder, PayloadAction } from '@reduxjs/toolkit'
import { FilmT } from '../types/types';
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

type Data = {
   search_result: FilmT[] | []
   total_pages: number
}
type AppT = {
   release_year: string,
   genre: string,
   page: number
   title: string
   status: string
   error: string | null
   data: Data
}

const initialState: AppT = {
   release_year: '0',
   genre: '0',
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
      setTitle: (state: AppT, action: PayloadAction<string>) => {
         state.title = action.payload
      },
      setPage: (state: AppT, action: PayloadAction<number>) => {
         state.page = action.payload
      },
      setRealiseYear: (state: AppT, action: PayloadAction<string>) => {
         state.release_year = action.payload
      },
      setGenre: (state: AppT, action: PayloadAction<string>) => {
         state.genre = action.payload
      }
   },
   extraReducers: (builder: ActionReducerMapBuilder<AppT>) => {
      builder.addCase(getFilmBySearch.pending, (state: AppT) => {
         state.status = 'pending';
         state.error = null
      })
      builder.addCase(getFilmBySearch.fulfilled, (state: AppT, action) => {
         state.status = 'fulfilled'
         state.data = action.payload
      })
      builder.addCase(getFilmBySearch.rejected, (state: AppT) => { state.status = 'rejected' })
   }
})

// Action creators are generated for each case reducer function
export const { setTitle, setPage, setRealiseYear, setGenre } = appSlice.actions

// export const selectApp = (state: RootState) => state.app.value

export default appSlice.reducer