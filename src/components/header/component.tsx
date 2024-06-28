import classNames from "classnames";
import styles from "./styles.module.css";
import userIcon from "../../icons/person.png";

export const Header = () => {
  const token = false;
  return (
    <header className={classNames(styles.header)}>
      <p className={classNames(styles.logo)}>Фильмопоиск</p>
      <div className={classNames(styles.auth_box)}>
        {token ? (
          <>
            <div className={classNames(styles.user_boxicon_div)}>
              <img className={classNames(styles.user_icon)} src={userIcon} alt="user icon" />
            </div>
            <button className={classNames(styles.logout_btn)}>Выйти</button>
          </>
        ) : (
          <button className={classNames(styles.login_btn)}>Войти</button>
        )}
      </div>
    </header>
  );
};
