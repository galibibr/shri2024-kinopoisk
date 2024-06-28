export const Pagination = ({
  page,
  total_pages,
  previous,
  next,
}: {
  page: number;
  total_pages: number;
  previous: () => void;
  next: () => void;
}) => {
  return (
    <div>
      <button onClick={previous} disabled={page === 1}>
        -
      </button>
      {page}
      <button onClick={next} disabled={page === total_pages}>
        +
      </button>
    </div>
  );
};
