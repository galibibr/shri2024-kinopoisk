import classNames from "classnames";
import styles from "./styles.module.css";
interface ActorT {
  name: string;
  photo: string; // base64 img
}
export const Actor = ({ actor }: { actor: ActorT }) => {
  return (
    <div className={classNames(styles.container)}>
      <img className={classNames(styles.actor_img)} src={actor.photo} alt={actor.name} />
      <p className={classNames(styles.actor_name)}>{actor.name}</p>
    </div>
  );
};
