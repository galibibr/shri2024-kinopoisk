import classNames from "classnames";
import { setRealiseYear } from "../../features/appSlice";
import { useAppDispatch } from "../../hooks/hooks";
import styles from "./styles.module.css";
import { useState } from "react";
import icon from "../../icons/sicon.png";

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

  const [year, setYear] = useState<string>("Выберите год");
  const [yearSelect, setYearSelect] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  const handleSelect = (key: string) => {
    setYearSelect(false);
    setYear(YEARS[key]);
    dispatch(setRealiseYear(key));
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
      {/* <select
        className={classNames(styles.select)}
        name="years"
        id="years"
        onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
          dispatch(setRealiseYear(e.target.value))
        }>
        <option disabled selected>
          Выберите год
        </option>
        {Object.keys(YEARS).map((key: string) => (
          <option className={classNames(styles.option)} key={key} value={key}>
            {YEARS[key]}
          </option>
        ))}
      </select> */}
    </div>
  );
};
