import classNames from "classnames";
import { setTitle } from "../../features/appSlice";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import styles from "./styles.module.css";
import searchIcon from "../../icons/Icon.png";

export const Search = () => {
  const dispatch = useAppDispatch();
  const title: string = useAppSelector((state) => state.app.title);

  return (
    <label className={classNames(styles.label)} htmlFor="search">
      <input
        id="search"
        placeholder="Название фильма"
        className={classNames(styles.input)}
        type="search"
        value={title}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          dispatch(setTitle(e.target.value));
        }}
      />
      <img className={classNames(styles.search_icon)} src={searchIcon} alt="search icon" />
    </label>
  );
};
