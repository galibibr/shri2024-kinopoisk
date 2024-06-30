import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { getFilmById, rateMovie } from "../../api/fetch";
import { FaRegStar } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import { setIsNewRating } from "../../features/appSlice";

export const Rating = ({ filmId, rating = 0 }: { filmId: string; rating?: number }) => {
  const dispatch = useAppDispatch();
  const isNewRating = useAppSelector((state) => state.app.isNewRating);
  const [index, setIndex] = useState(0);

  type Rating = { id: string; rating: number };

  interface Star {
    value: number;
    isHover: boolean;
    isActive: boolean;
  }
  let arr: Star[] = [
    { value: 1, isHover: false, isActive: false },
    { value: 2, isHover: false, isActive: false },
    { value: 3, isHover: false, isActive: false },
    { value: 4, isHover: false, isActive: false },
    { value: 5, isHover: false, isActive: false },
  ];
  arr = arr.map((e: Star) => {
    if (e.value <= rating) return { ...e, isActive: true };
    if (e.value <= index) return { ...e, isHover: true };
    else return e;
  });

  const handleRating = (el: number) => {
    const ratings: Rating[] = JSON.parse(localStorage.getItem("ratings") || "[]");
    const newRatings = ratings.map((e: Rating) => {
      if (e.id === filmId) {
        return { ...e, rating: el };
      } else return e;
    });
    dispatch(setIsNewRating(isNewRating + 1));
    localStorage.setItem("ratings", JSON.stringify(newRatings));
    dispatch(rateMovie({ movieId: filmId, user_rate: el }));
    dispatch(getFilmById(filmId));
  };
  return (
    <div style={{ display: "flex", alignItems: "start" }}>
      {arr.map((e: Star) => (
        <div
          onClick={() => {
            handleRating(e.value);
          }}
          onMouseEnter={() => setIndex(e.value)}
          onMouseLeave={() => setIndex(0)}
          key={e.value}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            cursor: "pointer",
            gap: "8px",
            paddingLeft: "4px",
            paddingRight: "4px",
          }}>
          {e.isActive ? (
            <FaStar style={{ color: "#FF5500" }} />
          ) : e.isHover ? (
            <FaStar style={{ color: "#ABABAB" }} />
          ) : (
            <FaRegStar style={{ color: "#ABABAB" }} />
          )}
          <p style={{ color: e.isHover ? "#ABABAB" : "#000000", fontSize: "14px" }}>{e.value}</p>
        </div>
      ))}
    </div>
  );
};
