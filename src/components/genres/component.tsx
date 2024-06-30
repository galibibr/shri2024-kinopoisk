import classNames from "classnames";
import { useState } from "react";
import icon from "../../icons/sicon.png";
import styles from "./styles.module.css";
import { useSearchParams } from "react-router-dom";

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
  const [searchParams, setSearchParams] = useSearchParams();

  const [genre, setGenreS] = useState<string>(
    searchParams.get("genre") === "0"
      ? "Выберите жанр"
      : searchParams.get("genre") || "Выберите жанр"
  );
  const [genreSelect, setGenreSelect] = useState<boolean>(false);

  const handleSelect = (key: string) => {
    setGenreSelect(false);
    setGenreS(GENRES[key]);
    setSearchParams((prev) => {
      prev.set("genre", key);
      prev.set("page", "1");
      return prev;
    });
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
    </div>
  );
};
