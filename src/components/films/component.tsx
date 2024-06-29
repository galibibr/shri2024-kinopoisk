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
  const status: string | null = useAppSelector((state) => state.app.status);
  const release_year: string = useAppSelector((state) => state.app.release_year);
  const genre: string = useAppSelector((state) => state.app.genre);
  const user = useAppSelector((state) => state.app.user);

  const query =
    (title ? `title=${title}` : "") +
    (page > 1 ? `${title ? "&" : ""}page=${page}` : "") +
    (release_year !== "0" ? `&release_year=${release_year}` : "") +
    (genre !== "0" ? `&genre=${genre}` : "");

  useEffect(() => {
    dispatch(getFilmBySearch(query));
  }, [query]);

  if (status === "fulfilled" && films.length === 0) {
    return <div>Film not found</div>;
  }
  if (status === "rejected" && films.length === 0) {
    return <div>Server dosn't response</div>;
  }

  return (
    <div style={{ width: "100%" }}>
      {status === "fulfilled" ? (
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {films.map((film: FilmT) => (
              <Film key={film.id} film={film} user={user} />
            ))}
          </div>
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
