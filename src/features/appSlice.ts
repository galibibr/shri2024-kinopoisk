import { createSlice } from '@reduxjs/toolkit'
import type { ActionReducerMapBuilder, PayloadAction } from '@reduxjs/toolkit'
import { FilmT, FullMovieInfo } from '../types/types';
import { getFilmById, getFilmBySearch, login, rateMovie } from '../api/fetch';
// import { RootState } from '../store/store';

type Data = {
   search_result: FilmT[] | []
   total_pages: number
}
type AppT = {
   loginModal: boolean
   status: string | null
   statusGetById: string | null
   loginStatus: string | null
   error: string | null
   loginError: string | undefined
   data: Data
   username: string
   password: string
   user: boolean
   film: FullMovieInfo | null
   isNewRating: number
}

const initialState: AppT = {
   loginModal: false,
   status: null,
   statusGetById: null,
   loginStatus: null,
   error: null,
   loginError: undefined,
   data: { search_result: [], total_pages: 0 },
   username: '',
   password: '',
   user: localStorage.getItem("token") ? true : false,
   film: null,
   isNewRating: 0
}

export const appSlice = createSlice({
   name: 'app',
   initialState,
   reducers: {
      setLoginModal: (state: AppT, action: PayloadAction<boolean>) => {
         state.loginModal = action.payload
      },
      setUsername: (state: AppT, action: PayloadAction<string>) => {
         state.username = action.payload
      },
      setPassword: (state: AppT, action: PayloadAction<string>) => {
         state.password = action.payload
      },
      setLoginStatus: (state: AppT, action: PayloadAction<string | null>) => {
         state.loginStatus = action.payload
      },
      setUser: (state: AppT, action: PayloadAction<boolean>) => {
         state.user = action.payload
      },
      setIsNewRating: (state: AppT, action: PayloadAction<number>) => {
         state.isNewRating = action.payload
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
      builder.addCase(getFilmById.rejected, (state: AppT) => { state.status = 'rejected' })
      // Get by ID
      builder.addCase(getFilmById.pending, (state: AppT) => {
         state.statusGetById = 'pending';
         state.error = null
      })
      builder.addCase(getFilmById.fulfilled, (state: AppT, action) => {
         state.statusGetById = 'fulfilled'
         state.film = action.payload
      })
      builder.addCase(getFilmBySearch.rejected, (state: AppT) => { state.statusGetById = 'rejected' })
      // Login
      builder.addCase(login.pending, (state: AppT) => {
         state.loginStatus = 'pending';
         state.error = null
      })
      builder.addCase(login.fulfilled, (state: AppT, action) => {
         state.loginStatus = 'fulfilled'
         if (action.payload.token) {
            state.user = true
         }
      })
      builder.addCase(login.rejected, (state: AppT, action) => {
         state.loginStatus = 'rejected'
         state.loginError = action.error.message
         state.user = false
      })
      // Ratu Movie
      builder.addCase(rateMovie.fulfilled, () => {
         console.log('fulfilled');
      })
   }
})

// Action creators are generated for each case reducer function
export const { setUser, setIsNewRating, setLoginStatus, setUsername, setPassword, setLoginModal } = appSlice.actions

// export const selectApp = (state: RootState) => state.app.value

export default appSlice.reducer