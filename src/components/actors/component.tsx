import { FullMovieInfo } from "../../types/types";
import styles from "./styles.module.css";

export const Actors = ({ film }: { film: FullMovieInfo }) => {
  return (
    <div>
      {film?.actors.map((actor) => (
        <p key={actor.name}>{actor.name}</p>
      ))}
    </div>
  );
};
