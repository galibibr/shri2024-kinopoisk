import classNames from "classnames";
import styles from "./styles.module.css";

export const Loading = () => {
  return (
    <div className={classNames(styles.container)}>
      <div className={classNames(styles.lds_default)}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};
