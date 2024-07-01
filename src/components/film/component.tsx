import classNames from "classnames";
import type { FilmT } from "../../types/types";
import styles from "./styles.module.css";
import { Rating } from "../rating/component";
import { Link } from "react-router-dom";

export const Film: ({ film, user }: { film: FilmT; user: boolean }) => JSX.Element = ({
  film,
  user,
}: {
  film: FilmT;
  user: boolean;
}) => {
  type Rating = { id: string; rating: number };
  const ratings: Rating[] = JSON.parse(localStorage.getItem("ratings") || "[]");
  const ratingObj: Rating | undefined = ratings.find(
    (e: { id: string; rating: number }) => e.id === film.id
  );

  return (
    <div className={classNames(styles.container)}>
      <Link to={`movie/${film.id}`}>
        <img className={classNames(styles.poster)} src={film.poster} alt={film.title} />
      </Link>
      <div className={classNames(styles.right_box)}>
        <div className={classNames(styles.main)}>
          <Link to={`movie/${film.id}`}>
            <p className={classNames(styles.title)}>{film.title}</p>
          </Link>
          <div className={classNames(styles.grid)}>
            <p className={classNames(styles.genre)}>Жанр</p>
            <p className={classNames(styles.genre_v)}>{film.genre}</p>
            <p className={classNames(styles.release_year)}>Год выпуска</p>
            <p className={classNames(styles.release_year_v)}>{film.release_year}</p>
            <p className={classNames(styles.description)}>Описание</p>
            <p className={classNames(styles.description_v)}>{film.description}</p>
          </div>
        </div>
        {user && <Rating filmId={film.id} rating={ratingObj?.rating} />}
      </div>
    </div>
  );
};
