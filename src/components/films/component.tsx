import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { getFilmBySearch, setPage, setTitle } from "../../features/appSlice";
import { Pagination } from "../pagination/component";
import { Film } from "../film/component";

export const Films = () => {
  const dispatch = useAppDispatch();
  const { search_result, total_pages } = useAppSelector((state) => state.app.data);
  const title = useAppSelector((state) => state.app.title);
  const page = useAppSelector((state) => state.app.page);
  const status = useAppSelector((state) => state.app.status);

  const query = (title && `title=${title}`) + `${title && "&"}page=${page}`;

  useEffect(() => {
    dispatch(getFilmBySearch(query));
  }, [title, page]);

  return (
    <div>
      <input type="search" value={title} onChange={(e) => dispatch(setTitle(e.target.value))} />

      {status === "fulfilled" ? (
        <div>
          {search_result.map((film) => (
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
