import { useParams } from "react-router-dom";

export const FilmPage = () => {
  const { id } = useParams();
  return <div>FilmPage: {id}</div>;
};
