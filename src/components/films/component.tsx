import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { getFilmBySearch, setPage } from "../../features/appSlice";
import { Pagination } from "../pagination/component";
import { Film } from "../film/component";
import { FilmT } from "../../types/types";

export const Films = () => {
  const dispatch = useAppDispatch();
  const { search_result: films, total_pages }: { search_result: FilmT[]; total_pages: number } =
    useAppSelector((state) => state.app.data);
  const title: string = useAppSelector((state) => state.app.title);
  const page: number = useAppSelector((state) => state.app.page);
  const status: string = useAppSelector((state) => state.app.status);

  useEffect(() => {
    const query = (title && `title=${title}`) + `${title && "&"}page=${page}`;
    setTimeout(() => {
      dispatch(getFilmBySearch(query));
    }, 1000);
  }, [title, page]);

  if (status === "fulfilled" && films.length === 0) {
    return <div>Film not found</div>;
  }

  return (
    <div>
      {status === "fulfilled" ? (
        <div>
          {films.map((film: FilmT) => (
            <Film key={film.id} film={film} />
          ))}
          <Pagination
            page={page}
            total_pages={total_pages}
            previous={() => dispatch(setPage(page - 1))}
            next={() => dispatch(setPage(page + 1))}
          />
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};
