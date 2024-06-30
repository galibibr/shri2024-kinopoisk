import classNames from "classnames";
import styles from "./styles.module.css";
import searchIcon from "../../icons/Icon.png";
import { useDebounce } from "../../hooks/use-debounce";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

export const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const title = searchParams.get("title") || "";

  const [titleNow, setTitleNow] = useState(title);
  const debounceSearch = useDebounce(titleNow);

  useEffect(() => {
    setSearchParams((prev) => {
      prev.set("title", titleNow);
      return prev;
    });
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
