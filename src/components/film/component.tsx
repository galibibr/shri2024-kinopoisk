import type { FilmT } from "../../types/types";

export const Film: ({ film }: { film: FilmT }) => JSX.Element = ({ film }: { film: FilmT }) => {
  return <div>{film.title}</div>;
};
