import { createPortal } from "react-dom";
import styles from "./styles.module.css";
import classNames from "classnames";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { setLoginModal, setPassword, setUser, setUsername } from "../../features/appSlice";
import close from "../../icons/close.png";
import { login } from "../../api/fetch";

export const LoginModal = () => {
  const dispatch = useAppDispatch();
  const loginModal = useAppSelector((state) => state.app.loginModal);
  const username = useAppSelector((state) => state.app.username);
  const password = useAppSelector((state) => state.app.password);
  const loginStatus = useAppSelector((state) => state.app.loginStatus);

  const onClose = () => {
    dispatch(setLoginModal(false));
    document.body.classList.remove(styles.no_scroll);
  };
  if (loginModal) {
    document.body.classList.add(styles.no_scroll);
  } else {
    document.body.classList.remove(styles.no_scroll);
  }

  const handleLogin = () => {
    const data = {
      username: username,
      password: password,
    };
    dispatch(login(data)).then((res) => {
      if (res.payload.token) {
        dispatch(setUser(true));
      } else {
        alert("Please try again");
      }
      onClose();
    });
  };

  return createPortal(
    <>
      <div
        onClick={onClose}
        className={classNames(styles.root, {
          [styles.interactive]: !!onClose,
        })}
      />
      {loginStatus === "pending" ? (
        <div className={classNames(styles.loading)}>loading...</div>
      ) : (
        <div className={classNames(styles.modal)}>
          <div className={classNames(styles.header)}>
            <p className={classNames(styles.title)}>Авторизация</p>
            <button onClick={onClose} className={classNames(styles.close_btn)}>
              <img className={classNames(styles.close_icon)} src={close} alt="close icon" />
            </button>
          </div>
          <div className={classNames(styles.inputs_box)}>
            <label className={classNames(styles.login_label)} htmlFor="login">
              <p>
                Логин <span className={classNames(styles.span)}>*</span>
              </p>
              <input
                value={username}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  dispatch(setUsername(e.target.value))
                }
                className={classNames(styles.login_input)}
                type="text"
                id="login"
                placeholder="Введите логин"
                required
              />
            </label>
            <label className={classNames(styles.password_label)} htmlFor="password">
              <p>
                Пароль <span className={classNames(styles.span)}>*</span>
              </p>
              <input
                value={password}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  dispatch(setPassword(e.target.value))
                }
                className={classNames(styles.password_input)}
                type="password"
                id="password"
                placeholder="Введите пароль"
                required
              />
            </label>
          </div>
          <div className={classNames(styles.btns_box)}>
            <button onClick={handleLogin} className={classNames(styles.login_btn)}>
              Войти
            </button>
            <button onClick={onClose} className={classNames(styles.logout_btn)}>
              Отменить
            </button>
          </div>
        </div>
      )}
    </>,
    document.body
  );
};
