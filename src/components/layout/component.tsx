import { Outlet } from "react-router-dom";
import { Header } from "../header/component";

export const Layout = () => {
  return (
    <div>
      <Header />
      <Outlet />
    </div>
  );
};
