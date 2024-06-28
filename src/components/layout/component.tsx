import { Outlet } from "react-router-dom";
import { Header } from "../header/component";
import classNames from "classnames";
import styles from "./styles.module.css";

export const Layout = () => {
  return (
    <div className={classNames(styles.layout)}>
      <Header />
      <main className={classNames(styles.outlet)}>
        <Outlet />
      </main>
    </div>
  );
};
