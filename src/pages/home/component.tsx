import { Films } from "../../components/films/component";
import { Genres } from "../../components/genres/component";
import { Search } from "../../components/search/component";
import { Years } from "../../components/years/component";

export const Home = () => {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 3fr" }}>
      <nav>
        <h4>Фильтр</h4>
        <Genres />
        <Years />
      </nav>
      <div>
        <Search />
        <Films />
      </div>
    </div>
  );
};
