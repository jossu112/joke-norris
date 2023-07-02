import "../style.css";
import { useState } from "react";

import { CAT_NOT_SET } from "../conf.js";

import { JokesObjectRedux } from "../helpers";

function FilterContent({ categoryOutputFilter, setCategoryOutputFilter }) {
  const jokesObjectRedux = JokesObjectRedux();
  const [placeholder, setPlaceholder] = useState(categoryOutputFilter);

  return (
    <div className="filter-content">
      <select
        className="filter-content-options"
        value={placeholder}
        onChange={(e) => setPlaceholder(e.target.value)}
      >
        <option value="">ALL</option>
        {jokesObjectRedux
          .map((joke) => (joke.saved ? { ...joke } : null))
          .filter((result) => result !== null)
          .map((joke) => joke.category)
          .filter((value, index, array) => array.indexOf(value) === index)

          .map((cat) => (
            <option key={cat} value={cat}>
              {cat ? cat.toUpperCase() : CAT_NOT_SET.toLocaleUpperCase()}
            </option>
          ))}
      </select>
      <button
        onClick={() => setCategoryOutputFilter(placeholder)}
        className="category-filter-btn-apply btn"
      >
        APPLY FILTER
      </button>
    </div>
  );
}

export default FilterContent;
