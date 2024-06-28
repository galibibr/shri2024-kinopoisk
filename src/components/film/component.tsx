import classNames from "classnames";
import type { FilmT } from "../../types/types";
import styles from "./styles.module.css";
import { Rating } from "../rating/component";

export const Film: ({ film }: { film: FilmT }) => JSX.Element = ({ film }: { film: FilmT }) => {
  return (
    <div className={classNames(styles.container)}>
      <img className={classNames(styles.poster)} src={film.poster} alt={film.title} />
      <div className={classNames(styles.right_box)}>
        <div className={classNames(styles.main)}>
          <p className={classNames(styles.title)}>{film.title}</p>
          <div className={classNames(styles.grid)}>
            <p className={classNames(styles.genre)}>Жанр</p>
            <p className={classNames(styles.genre_v)}>{film.genre}</p>
            <p className={classNames(styles.release_year)}>Год выпуска</p>
            <p className={classNames(styles.release_year_v)}>{film.release_year}</p>
            <p className={classNames(styles.description)}>Описание</p>
            <p className={classNames(styles.description_v)}>{film.description}</p>
          </div>
        </div>
        <Rating rating={film.rating} />
      </div>
    </div>
  );
};
