import classNames from "classnames";
import { setTitle } from "../../features/appSlice";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import styles from "./styles.module.css";
import searchIcon from "../../icons/Icon.png";
import { useDebounce } from "../../hooks/use-debounce";
import { useEffect, useState } from "react";

export const Search = () => {
  const dispatch = useAppDispatch();
  const title: string = useAppSelector((state) => state.app.title);
  const [titleNow, setTitleNow] = useState(title);
  const debounceSearch = useDebounce(titleNow);

  useEffect(() => {
    dispatch(setTitle(debounceSearch));
  }, [debounceSearch]);

  return (
    <label className={classNames(styles.label)} htmlFor="search">
      <input
        id="search"
        placeholder="Название фильма"
        className={classNames(styles.input)}
        type="search"
        value={titleNow}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setTitleNow(e.target.value);
        }}
      />
      <img className={classNames(styles.search_icon)} src={searchIcon} alt="search icon" />
    </label>
  );
};
