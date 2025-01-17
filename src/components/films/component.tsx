import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { Pagination } from "../pagination/component";
import { Film } from "../film/component";
import { FilmT } from "../../types/types";
import { Loading } from "../loading/component";
import { useSearchParams } from "react-router-dom";
import { getFilmBySearch } from "../../api/fetch";

export const Films = () => {
  const dispatch = useAppDispatch();
  const isNewRating = useAppSelector((state) => state.app.isNewRating);
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
  }, [query, isNewRating]);

  if (status === "fulfilled" && films.length === 0) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          width: "100%",
          fontSize: "24px",
          fontWeight: "bold",
          height: "100%",
        }}>
        Film not found
      </div>
    );
  }
  if (status === "rejected" && films.length === 0) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          width: "100%",
          fontSize: "24px",
          fontWeight: "bold",
          height: "100%",
        }}>
        Server dosn't response
      </div>
    );
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
