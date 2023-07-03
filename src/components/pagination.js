import * as React from "react";

function Paginate({
  postsPerPage,
  totalPosts,
  paginate,
  previousPage,
  nextPage,
  indexOfLastPost,
  indexOfFirstPost,
}) {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="pagination-container">
      {totalPosts > postsPerPage ? (
        <ul className="pagination">
          {totalPosts < postsPerPage || indexOfFirstPost === 0 ? null : (
            <li onClick={previousPage} className="page-number previous">
              Prev
            </li>
          )}

          {pageNumbers.map((number) => (
            <li
              number={number}
              key={number}
              className={`page-number page-number-${number}`}
              onClick={() => {
                paginate(number, `.page-number-${number}`);
              }}
            >
              {number}
            </li>
          ))}

          {totalPosts <= postsPerPage ||
          indexOfLastPost - totalPosts >= 0 ? null : (
            <li onClick={nextPage} className="page-number next">
              Next
            </li>
          )}
        </ul>
      ) : null}
    </div>
  );
}

export default Paginate;
