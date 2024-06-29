import classNames from "classnames";
import styles from "./styles.module.css";
import userIcon from "../../icons/person.png";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { setLoginModal } from "../../features/appSlice";
import { LoginModal } from "../login-modal/component";

export const Header = () => {
  const loginModal = useAppSelector((state) => state.app.loginModal);
  const dispatch = useAppDispatch();
  const token = false;
  const handleOpenLoginModal = () => {
    dispatch(setLoginModal(true));
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
            <button className={classNames(styles.logout_btn)}>Выйти</button>
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
