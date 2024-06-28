import { increment } from "../../features/appSlice";
import { RootState } from "../../store/store";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";

export const Home = () => {
  const count = useAppSelector((state: RootState) => state.app.value);
  const dispatch = useAppDispatch();

  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 3fr" }}>
      <nav>
        <h1 onClick={() => dispatch(increment())}>{count}</h1>
        <h4>Фильтр</h4>
        <p>Genre</p>
        <select name="genre" id="genre">
          <option value="genre">genre 1</option>
          <option value="genre">genre 2</option>
        </select>
        <p>Year</p>
        <select name="year" id="year">
          <option value="year">year 1</option>
          <option value="year">year 2</option>
        </select>
      </nav>
      <div>
        <input type="search" placeholder="Название фильма" />
        films
      </div>
    </div>
  );
};
