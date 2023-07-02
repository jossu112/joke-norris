import "../style.css";
import { useState } from "react";
import FilterContent from "./filterContent";

function CategoryOutputFilter({
  categoryOutputFilter,
  setCategoryOutputFilter,
}) {
  const [showFilter, setShowFilter] = useState(false);

  return (
    <div className="filter-selector">
      <div>
        <button
          onClick={() => setShowFilter(!showFilter)}
          className="category-filter-btn btn"
        >
          FILTER
        </button>
      </div>
      {showFilter ? (
        <FilterContent
          setCategoryOutputFilter={setCategoryOutputFilter}
          categoryOutputFilter={categoryOutputFilter}
        />
      ) : null}
    </div>
  );
}

export default CategoryOutputFilter;
