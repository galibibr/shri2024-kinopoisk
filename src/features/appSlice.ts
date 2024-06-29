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
export const login = createAsyncThunk(
   'user/login',
   async (data: { username: string, password: string }) => {
      try {
         const response = await fetch(`http://localhost:3030/api/v1/login`, {
            method: 'POST',
            headers: {
               'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
         });
         const result = await response.json();
         if (result.token) {
            localStorage.setItem('token', result.token)
         }
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
   loginModal: boolean
   genre: string,
   page: number
   title: string
   status: string | null
   loginStatus: string | null
   error: string | null
   data: Data
   username: string
   password: string
   user: boolean
}

const initialState: AppT = {
   release_year: '0',
   loginModal: false,
   genre: '0',
   page: 1,
   title: '',
   status: null,
   loginStatus: null,
   error: null,
   data: { search_result: [], total_pages: 0 },
   username: '',
   password: '',
   user: localStorage.getItem("token") ? true : false
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
      },
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
      builder.addCase(login.rejected, (state: AppT) => {
         state.loginStatus = 'rejected'
         state.user = false
      })
   }
})

// Action creators are generated for each case reducer function
export const { setTitle, setUser, setLoginStatus, setUsername, setPassword, setLoginModal, setPage, setRealiseYear, setGenre } = appSlice.actions

// export const selectApp = (state: RootState) => state.app.value

export default appSlice.reducer