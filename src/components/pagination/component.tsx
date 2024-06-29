import classNames from "classnames";
import styles from "./styles.module.css";
import arrowNext from "../../icons/arrow-right.png";
import arrowPrev from "../../icons/arrow-left.png";

export const Pagination = ({
  page,
  total_pages,
  previous,
  next,
}: {
  page: number;
  total_pages: number;
  previous: () => void;
  next: () => void;
}) => {
  return (
    <div className={classNames(styles.container)}>
      <button
        className={classNames(styles.btn, {
          [styles.disabled]: page === 1,
        })}
        onClick={previous}
        disabled={page === 1}>
        <img className={classNames(styles.arrow)} src={arrowPrev} alt="arrow left" />
      </button>
      {page}
      <button
        className={classNames(styles.btn, {
          [styles.disabled]: page === total_pages,
        })}
        onClick={next}
        disabled={page === total_pages}>
        <img className={classNames(styles.arrow)} src={arrowNext} alt="arrow right" />
      </button>
    </div>
  );
};
