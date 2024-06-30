import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { ActionReducerMapBuilder, PayloadAction } from '@reduxjs/toolkit'
import { FilmT, FullMovieInfo } from '../types/types';
// import { RootState } from '../store/store';

export const getFilmBySearch = createAsyncThunk(
   'films/getFilmBySearch',
   async (q: string) => {
      try {
         const response = await fetch(`http://localhost:3030/api/v1/search?${q}`);
         const result = await response.json();
         if (result.search_result && localStorage.getItem("token")) {
            const newRatings = result.search_result.map((film: FilmT) => {
               return { id: film.id, rating: 0 };
            });
            type Rating = {
               id: string;
               rating: number;
            };
            if (localStorage.getItem("ratings")) {
               const ratings: Rating[] = JSON.parse(localStorage.getItem("ratings") || "[]");
               newRatings.forEach((film: Rating) => {
                  const idRat = ratings.map((e: Rating) => e["id"]);
                  if (!idRat.includes(film["id"])) {
                     ratings.push(film);
                  }
               });
               localStorage.setItem("ratings", JSON.stringify(ratings));
            } else {
               localStorage.setItem("ratings", JSON.stringify(newRatings));
            }
         }
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
export const rateMovie = createAsyncThunk(
   'film/rateMovie',
   async (data: { movieId: string, user_rate: number }) => {
      console.log(data)

      try {
         const response = await fetch(`http://localhost:3030/api/v1/rateMovie`, {
            method: 'POST',
            headers: {
               'Content-Type': 'application/json',
               'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify(data)
         })
         const result = await response.json();
         console.log(result)
         return result
      } catch (error) {
         console.error(error)
      }
   }
)
export const getFilmById = createAsyncThunk(
   'film/getFilmById',
   async (id: string) => {
      try {
         const response = await fetch(`http://localhost:3030/api/v1/movie/${id}`);
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
   loginModal: boolean
   genre: string,
   page: number
   title: string
   status: string | null
   statusGetById: string | null
   loginStatus: string | null
   error: string | null
   data: Data
   username: string
   password: string
   user: boolean
   film: FullMovieInfo | null
}

const initialState: AppT = {
   release_year: '0',
   loginModal: false,
   genre: '0',
   page: 1,
   title: '',
   status: null,
   statusGetById: null,
   loginStatus: null,
   error: null,
   data: { search_result: [], total_pages: 0 },
   username: '',
   password: '',
   user: localStorage.getItem("token") ? true : false,
   film: null
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
      builder.addCase(login.rejected, (state: AppT) => {
         state.loginStatus = 'rejected'
         state.user = false
      })
      // Ratu Movie
      builder.addCase(rateMovie.fulfilled, () => {
         console.log('fulfilled');
      })
   }
})

// Action creators are generated for each case reducer function
export const { setTitle, setUser, setLoginStatus, setUsername, setPassword, setLoginModal, setPage, setRealiseYear, setGenre } = appSlice.actions

// export const selectApp = (state: RootState) => state.app.value

export default appSlice.reducer