export interface FilmT {
   description: string;
   genre: string;
   id: string;
   poster: string;
   rating: string;
   release_year: number;
   title: string;
}
export interface Actor {
   name: string;
   photo: string; // base64 img
}

export interface FullMovieInfo {
   id: string;
   title: string;
   description: string;
   release_year: number;
   poster: string; //base64 img
   genre: string;
   rating: string; //float
   total_rates_count: string; //int
   actors: Actor[];
}