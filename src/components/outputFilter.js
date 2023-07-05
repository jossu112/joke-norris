import "../style.css";
import { useState } from "react";
import FilterContent from "./filterContent";

function OutputFilter({
  categoryOutputFilter,
  setCategoryOutputFilter,
  showDeleted,
  setShowDeleted,
  setCategoryFilter,
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
          showDeleted={showDeleted}
          setShowDeleted={setShowDeleted}
          setCategoryFilter={setCategoryFilter}
        />
      ) : null}
    </div>
  );
}

export default OutputFilter;
