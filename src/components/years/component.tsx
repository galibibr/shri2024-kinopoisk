import { setRealiseYear } from "../../features/appSlice";
import { useAppDispatch } from "../../hooks/hooks";

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

  const dispatch = useAppDispatch();

  return (
    <div>
      <select
        name="years"
        id="years"
        onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
          dispatch(setRealiseYear(e.target.value))
        }>
        {Object.keys(YEARS).map((key: string) => (
          <option key={key} value={key}>
            {YEARS[key]}
          </option>
        ))}
      </select>
    </div>
  );
};
