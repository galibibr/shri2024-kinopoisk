import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { getFilmBySearch } from "../../features/appSlice";
import { Pagination } from "../pagination/component";
import { Film } from "../film/component";
import { FilmT } from "../../types/types";
import { Loading } from "../loading/component";
import { useSearchParams } from "react-router-dom";

export const Films = () => {
  const dispatch = useAppDispatch();
  const { search_result: films, total_pages }: { search_result: FilmT[]; total_pages: number } =
    useAppSelector((state) => state.app.data);
  const [searchParams, setSearchParams] = useSearchParams();

  const title = searchParams.get("title") || "";
  const page = Number(searchParams.get("page")) || 1;
  const release_year = searchParams.get("release_year") || "0";
  const genre = searchParams.get("genre") || "0";

  const status: string | null = useAppSelector((state) => state.app.status);
  const user = useAppSelector((state) => state.app.user);

  const titleQuery = title ? `title=${title}` : "";
  const pageQuery = page > 0 ? `${title ? "&" : ""}page=${page}` : "";
  const releaseYearQuery = release_year !== "0" ? `&release_year=${release_year}` : "";
  const genreQuery = genre !== "0" ? `&genre=${genre}` : "";

  const query = titleQuery + pageQuery + releaseYearQuery + genreQuery;

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
            previous={() => {
              setSearchParams((prev) => {
                prev.set("page", String(page - 1));
                return prev;
              });
            }}
            next={() => {
              setSearchParams((prev) => {
                prev.set("page", String(page + 1));
                return prev;
              });
            }}
          />
        </div>
      ) : (
        <Loading />
      )}
    </div>
  );
};
