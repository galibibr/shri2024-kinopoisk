import { setGenre } from "../../features/appSlice";
import { useAppDispatch } from "../../hooks/hooks";

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
  const dispatch = useAppDispatch();

  return (
    <div>
      <p>Genre</p>
      <select
        name="genres"
        id="genres"
        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => dispatch(setGenre(e.target.value))}>
        {Object.keys(GENRES).map((key: string) => (
          <option key={key} value={key}>
            {GENRES[key]}
          </option>
        ))}
      </select>
    </div>
  );
};
