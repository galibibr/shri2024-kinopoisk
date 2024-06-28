import { Outlet } from "react-router-dom";

export const Layout = () => {
  return (
    <div>
      <header style={{ border: "1px solid black", padding: "10px" }}>
        Фильмопоиск <button>Войти</button>
      </header>
      <Outlet />
    </div>
  );
};
