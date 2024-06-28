import React from "react";

export const Pagination = ({ page, total_pages, previous, next }) => {
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
