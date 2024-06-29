import classNames from "classnames";
import styles from "./styles.module.css";
import { TiStarFullOutline } from "react-icons/ti";
import { useState } from "react";

export const Rating = ({ filmId, rating = 0 }: { filmId: string; rating?: number }) => {
  const [index, setIndex] = useState(rating);

  type Rating = { id: string; rating: number };

  const handleRating = (el: number) => {
    const ratings: Rating[] = JSON.parse(localStorage.getItem("ratings") || "[]");
    const newRatings = ratings.map((e: Rating) => {
      if (e.id === filmId) {
        return { ...e, rating: el };
      } else return e;
    });
    localStorage.setItem("ratings", JSON.stringify(newRatings));
  };
  return (
    <div className={classNames(styles.container)}>
      {[1, 2, 3, 4, 5].map((el) => (
        <div
          onClick={() => {
            setIndex(el);
            handleRating(el);
          }}
          key={el}
          className={classNames(styles.item_box)}>
          <TiStarFullOutline
            className={classNames(styles.star, {
              [styles.active]: el <= index,
            })}
          />
          <p
            className={classNames({
              [styles.active_text]: el <= index,
            })}>
            {el}
          </p>
        </div>
      ))}
    </div>
  );
};
