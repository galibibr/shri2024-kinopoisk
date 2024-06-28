import { setTitle } from "../../features/appSlice";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";

export const Search = () => {
  const dispatch = useAppDispatch();
  const title: string = useAppSelector((state) => state.app.title);

  return (
    <input
      type="search"
      value={title}
      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setTitle(e.target.value));
      }}
    />
  );
};
