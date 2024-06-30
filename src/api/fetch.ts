import { createAsyncThunk } from "@reduxjs/toolkit";
import { FilmT } from "../types/types";

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
