import React from "react";

function CategoriesList({ category, setCategoryFilter }) {
  return (
    <aside className="category-list">
      <ul>
        <li>
          <button
            className="btn btn-random"
            onClick={() => setCategoryFilter("")}
          >
            Random fact
          </button>
        </li>
        {category.map((cat) => (
          <li key={cat}>
            <button
              className="btn btn-category"
              onClick={() => setCategoryFilter(cat)}
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
}

export default CategoriesList;
