import "../style.css";
import { useState } from "react";
import CheckboxButton from "./checkboxButton";

import { CAT_NOT_SET } from "../conf.js";

function FilterContent({
  categoryOutputFilter,
  setCategoryOutputFilter,
  showDeleted,
  setShowDeleted,
  paginate,
  factCount,
  getJokesOnPage,
  jokesObjectRedux,
}) {
  const [placeholder, setPlaceholder] = useState(categoryOutputFilter);

  return (
    <div className="filter-content">
      <select
        className="filter-content-options"
        value={placeholder}
        onChange={(e) => setPlaceholder(e.target.value)}
      >
        <option value="all">ALL</option>
        {jokesObjectRedux
          .map((joke) =>
            (showDeleted ? joke.deleted : joke.saved) ? { ...joke } : null
          )
          .filter((result) => result !== null)

          .map((joke) => joke.category)

          // GET UNIQUE VALUES
          .filter((value, index, array) => array.indexOf(value) === index)
          .map((cat) => (
            <option key={cat} value={cat}>
              {cat ? cat.toUpperCase() : CAT_NOT_SET.toLocaleUpperCase()}
            </option>
          ))}
      </select>
      <button
        onClick={() => {
          setCategoryOutputFilter(placeholder);
          // setPlaceholder(placeholder);
        }}
        className="category-filter-btn-apply btn"
      >
        APPLY FILTER
      </button>
      <CheckboxButton
        showDeleted={showDeleted}
        setShowDeleted={setShowDeleted}
        setCategoryOutputFilter={setCategoryOutputFilter}
        setPlaceholder={setPlaceholder}
        paginate={paginate}
        factCount={factCount}
        getJokesOnPage={getJokesOnPage}
      />
    </div>
  );
}

export default FilterContent;
