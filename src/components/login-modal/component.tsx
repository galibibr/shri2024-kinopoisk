import { createPortal } from "react-dom";
import styles from "./styles.module.css";
import classNames from "classnames";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { setLoginModal } from "../../features/appSlice";
import close from "../../icons/close.png";

export const LoginModal = () => {
  const dispatch = useAppDispatch();
  const loginModal = useAppSelector((state) => state.app.loginModal);
  const onClose = () => {
    dispatch(setLoginModal(false));
    document.body.classList.remove(styles.no_scroll);
  };
  if (loginModal) {
    document.body.classList.add(styles.no_scroll);
  } else {
    document.body.classList.remove(styles.no_scroll);
  }

  return createPortal(
    <>
      <div
        onClick={onClose}
        className={classNames(styles.root, {
          [styles.interactive]: !!onClose,
        })}
      />
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
              className={classNames(styles.password_input)}
              type="password"
              id="password"
              placeholder="Введите пароль"
              required
            />
          </label>
        </div>
        <div className={classNames(styles.btns_box)}>
          <button className={classNames(styles.login_btn)}>Войти</button>
          <button onClick={onClose} className={classNames(styles.logout_btn)}>
            Отменить
          </button>
        </div>
      </div>
    </>,
    document.body
  );
};
