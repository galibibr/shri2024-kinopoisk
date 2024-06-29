import { useParams } from "react-router-dom";
import styles from "./styles.module.css";
import classNames from "classnames";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { useEffect } from "react";
import { getFilmById } from "../../features/appSlice";
import { FullMovieInfo } from "../../types/types";
import { Rating } from "../../components/rating/component";
import { Actors } from "../../components/actors/component";

export const FilmPage = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.app.user);
  const film: FullMovieInfo | null = useAppSelector((state) => state.app.film);
  const statusGetById = useAppSelector((state) => state.app.statusGetById);
  const ratings = JSON.parse(localStorage.getItem("ratings") || "[]");
  const rating = ratings.find((e: { id: string; rating: number }) => e.id === film?.id)?.rating;

  const { id } = useParams();
  useEffect(() => {
    id && dispatch(getFilmById(id));
  }, [id]);

  if (statusGetById === "pending") {
    return <div>Loading...</div>;
  }

  return (
    <>
      {film ? (
        <div className={classNames(styles.container)}>
          <div className={classNames(styles.main)}>
            <img className={classNames(styles.poster)} src={film.poster} alt={film.title} />
            <div className={classNames(styles.right_box)}>
              <div className={classNames(styles.title_box)}>
                <p className={classNames(styles.title)}>{film.title}</p>
                {user && <Rating filmId={film.id} rating={rating} />}
              </div>
              <div className={classNames(styles.description_box)}>
                <p className={classNames(styles.other)}>
                  <b>Жанр: </b>
                  {/* {film.genre[0].toUpperCase() + film.genre.slice(1)} */}
                </p>
                <p className={classNames(styles.other)}>
                  <b>Год выпуска: </b>
                  {film.release_year}
                </p>
                <p className={classNames(styles.other)}>
                  <b>Рейтинг: </b>
                  {film.rating}
                </p>
                <p>
                  <b>Описание</b>
                </p>
                <p className={classNames(styles.description)}>{film.description}</p>
              </div>
            </div>
          </div>
          {/* Actors */}
          <p style={{ fontSize: "24px", fontWeight: "600" }}>Актеры</p>
          <div>
            <Actors film={film} />
          </div>
        </div>
      ) : (
        <div>Film not found</div>
      )}
    </>
  );
};
