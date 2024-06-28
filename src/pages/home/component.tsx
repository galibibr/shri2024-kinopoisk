import { Films } from "../../components/films/component";

export const Home = () => {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 3fr" }}>
      <nav>
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
      <Films />
    </div>
  );
};
