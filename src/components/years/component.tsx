import classNames from "classnames";
import styles from "./styles.module.css";
import { useState } from "react";
import icon from "../../icons/sicon.png";
import { useSearchParams } from "react-router-dom";

export const Years = () => {
  const YEARS: { [key: string]: string } = {
    "0": "Не выбран",
    "2009": "2009",
    "2008": "2008",
    "2007": "2007",
    "2006": "2006",
    "1990-2005": "1990-2005",
    "1950-1989": "1950-1989",
  };

  const [searchParams, setSearchParams] = useSearchParams();

  const [year, setYear] = useState<string>(
    searchParams.get("release_year") === "0"
      ? "Выберите год"
      : searchParams.get("release_year") || "Выберите год"
  );
  const [yearSelect, setYearSelect] = useState<boolean>(false);

  const handleSelect = (key: string) => {
    setYearSelect(false);
    setYear(YEARS[key]);
    setSearchParams((prev) => {
      prev.set("release_year", key);
      prev.set("page", "1");
      return prev;
    });
  };

  return (
    <div className={classNames(styles.container)}>
      <p className={classNames(styles.title)}>Год выпуска</p>

      <div
        onClick={() => setYearSelect(!yearSelect)}
        className={classNames(styles.select_box, {
          [styles.select_default]: year === "Выберите год",
        })}>
        <label>{year}</label>
        <img
          className={classNames(styles.icon, { [styles.active]: yearSelect })}
          src={icon}
          alt="icon"
        />
      </div>

      {yearSelect && (
        <div className={classNames(styles.options)}>
          {Object.keys(YEARS).map((key: string) => {
            return (
              <div
                onClick={() => {
                  handleSelect(key);
                }}
                key={key}
                className={classNames(styles.option)}>
                {YEARS[key]}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
