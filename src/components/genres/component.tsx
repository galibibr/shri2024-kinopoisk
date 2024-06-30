import classNames from "classnames";
import { useAppDispatch } from "../../hooks/hooks";
import { useState } from "react";
import icon from "../../icons/sicon.png";
import { setGenre } from "../../features/appSlice";
import styles from "./styles.module.css";

export const Genres = () => {
  type Genres = { [key: string]: string };
  const GENRES: Genres = {
    "0": "Не выбран",
    comedy: "Комедия",
    drama: "Драма",
    action: "Боевик",
    thriller: "Триллер",
    horror: "Ужасы",
    family: "Семейный",
    cartoon: "Анимированный",
    fantasy: "Фэнтези",
    romance: "Романтика",
    adventure: "Приключения",
    musical: "Мьюзикл",
    war: "Военный",
  };

  const [genre, setGenreS] = useState<string>("Выберите жанр");
  const [genreSelect, setGenreSelect] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  const handleSelect = (key: string) => {
    setGenreSelect(false);
    setGenreS(GENRES[key]);
    dispatch(setGenre(key));
  };

  return (
    <div className={classNames(styles.container)}>
      <p className={classNames(styles.title)}>Жанр</p>

      <div
        onClick={() => setGenreSelect(!genreSelect)}
        className={classNames(styles.select_box, {
          [styles.select_default]: genre === "Выберите жанр",
        })}>
        <label>{genre}</label>
        <img
          className={classNames(styles.icon, { [styles.active]: genreSelect })}
          src={icon}
          alt="icon"
        />
      </div>

      {genreSelect && (
        <div className={classNames(styles.options)}>
          {Object.keys(GENRES).map((key: string) => {
            return (
              <div
                onClick={() => {
                  handleSelect(key);
                }}
                key={key}
                className={classNames(styles.option)}>
                {GENRES[key]}
              </div>
            );
          })}
        </div>
      )}
      {/* <select
        name="genres"
        id="genres"
        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => dispatch(setGenre(e.target.value))}>
        {Object.keys(GENRES).map((key: string) => (
          <option key={key} value={key}>
            {GENRES[key]}
          </option>
        ))}
      </select> */}
    </div>
  );
};
