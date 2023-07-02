import "../style.css";
import { useState, useEffect } from "react";

import { API_URL } from "../conf.js";
import { getJSON } from "../helpers";
import RenderJoke from "../components/renderJoke";
import CategoryOutputFilter from "../components/categoryOutputFilter";
import JokeListItem from "../components/jokeListItem";

function Jokes() {
  const [category, setCategory] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState(false);
  const [categoryOutputFilter, setCategoryOutputFilter] = useState("");

  useEffect(() => {
    getJSON(`${API_URL}categories`).then((res) => {
      setCategory(res);
    });
  }, []);

  return (
    <div className="jokes">
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
      <div>
        <ul className="new-joke">
          <RenderJoke
            categoryFilter={categoryFilter}
            setCategoryFilter={setCategoryFilter}
          />
        </ul>
      </div>
      <div>
        <CategoryOutputFilter
          setCategoryOutputFilter={setCategoryOutputFilter}
          categoryOutputFilter={categoryOutputFilter}
        />
      </div>
      <div>
        <JokeListItem categoryOutputFilter={categoryOutputFilter} />
      </div>
    </div>
  );
}

export default Jokes;
