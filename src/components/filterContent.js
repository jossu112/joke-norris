import "../style.css";
import { useState } from "react";
import CheckboxButton from "./checkboxButton";

import { CAT_NOT_SET } from "../conf.js";

import { JokesObjectRedux } from "../helpers";

function FilterContent({
  categoryOutputFilter,
  setCategoryOutputFilter,
  showDeleted,
  setShowDeleted,
  setCategoryFilter,
}) {
  const jokesObjectRedux = JokesObjectRedux();
  const [placeholder, setPlaceholder] = useState(categoryOutputFilter);

  function initialize() {
    console.log("init");
    setCategoryOutputFilter("all");
    setPlaceholder("all");
  }

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
            // // // showDeleted === true
            // // // ? joke.deleted
            // // // :
            // joke.deleted ? { ...joke } : null
            (showDeleted ? joke.deleted : joke.saved) ? { ...joke } : null
          )
          .filter((result) => result !== null)

          // .map((joke) => console.log(joke))
          .map((joke) => joke.category)

          // GET UNIQUE VALUES
          .filter((value, index, array) => array.indexOf(value) === index)
          // .map((cat) => (cat ? cat : () => initialize()))
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
      />
    </div>
  );
}

export default FilterContent;
