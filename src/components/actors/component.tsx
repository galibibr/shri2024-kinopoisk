import classNames from "classnames";
import { Actor } from "../actor/component";
import styles from "./styles.module.css";

interface ActorT {
  name: string;
  photo: string; // base64 img
}

export const Actors = ({ actors }: { actors: ActorT[] }) => {
  return (
    <div className={classNames(styles.container)}>
      {actors?.map((actor, index) => (
        <Actor key={index} actor={actor} />
      ))}
    </div>
  );
};
