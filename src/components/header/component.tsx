import classNames from "classnames";
import styles from "./styles.module.css";
import userIcon from "../../icons/person.png";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { getFilmBySearch, setLoginModal, setUser } from "../../features/appSlice";
import { LoginModal } from "../login-modal/component";
import { useEffect } from "react";

export const Header = () => {
  const loginModal = useAppSelector((state) => state.app.loginModal);
  const user = useAppSelector((state) => state.app.user);
  const dispatch = useAppDispatch();
  const token = localStorage.getItem("token");

  const handleOpenLoginModal = () => {
    dispatch(setLoginModal(true));
  };

  useEffect(() => {
    dispatch(getFilmBySearch(""));
  }, [user]);

  const handleLogout = () => {
    dispatch(setUser(false));
    localStorage.removeItem("token");
  };

  return (
    <header className={classNames(styles.header)}>
      <p className={classNames(styles.logo)}>Фильмопоиск</p>
      <div className={classNames(styles.auth_box)}>
        {token ? (
          <>
            <div className={classNames(styles.user_boxicon_div)}>
              <img className={classNames(styles.user_icon)} src={userIcon} alt="user icon" />
            </div>
            <button onClick={handleLogout} className={classNames(styles.logout_btn)}>
              Выйти
            </button>
          </>
        ) : (
          <button onClick={handleOpenLoginModal} className={classNames(styles.login_btn)}>
            Войти
          </button>
        )}
      </div>
      {loginModal && <LoginModal />}
    </header>
  );
};
