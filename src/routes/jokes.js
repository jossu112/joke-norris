import "../style.css";
import { useState, useEffect } from "react";

import { API_URL } from "../conf.js";
import { getJSON } from "../helpers";
import { JokesObjectRedux } from "../helpers";
import RenderJoke from "../components/renderJoke";
import OutputFilter from "../components/outputFilter";
import JokeListItem from "../components/jokeListItem";
import DeletedJokes from "../components/deletedJokes";
import Paginate from "../components/pagination";
import CategoriesList from "../components/categoriesList";

function Jokes() {
  const [category, setCategory] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState(false);
  const [categoryOutputFilter, setCategoryOutputFilter] = useState("all");
  const [showDeleted, setShowDeleted] = useState(false);
  const jokesObjectRedux = JokesObjectRedux();

  // Get categories list
  useEffect(() => {
    getJSON(`${API_URL}categories`).then((res) => {
      setCategory(res);
    });
  }, []);

  // PAGINATION

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(3);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;

  const paginate = (pageNumber, el) => {
    setCurrentPage(pageNumber);
    document
      .querySelectorAll(".active")
      .forEach((page) => page?.classList.remove("active"));

    document.querySelector(`${el}`)?.classList.add("active");
  };

  function getJokesOnPage() {
    return jokesObjectRedux
      .map((joke) =>
        showDeleted === true ? joke.deleted : joke.saved ? { ...joke } : null
      )
      .filter((result) => result !== null)
      .map((res) => {
        return res;
      })
      .filter((result) =>
        categoryOutputFilter === "all" || result === ""
          ? result
          : result?.category === categoryOutputFilter
      ).length;
  }
  let factCount = getJokesOnPage();

  const previousPage = () => {
    if (currentPage !== 1) {
      paginate(currentPage - 1, `.page-number-${currentPage - 1}`);
    }
  };

  const nextPage = () => {
    if (currentPage !== Math.ceil(factCount / postsPerPage)) {
      paginate(currentPage + 1, `.page-number-${currentPage + 1}`);
    }
  };

  return (
    <div className="jokes">
      <CategoriesList
        category={category}
        setCategoryFilter={setCategoryFilter}
      />
      <div>
        <ul className="new-joke">
          <RenderJoke
            jokesObjectRedux={jokesObjectRedux}
            categoryFilter={categoryFilter}
            setCategoryFilter={setCategoryFilter}
          />
        </ul>
      </div>
      <div>
        <OutputFilter
          jokesObjectRedux={jokesObjectRedux}
          setCategoryOutputFilter={setCategoryOutputFilter}
          categoryOutputFilter={categoryOutputFilter}
          showDeleted={showDeleted}
          setShowDeleted={setShowDeleted}
          setCategoryFilter={setCategoryFilter}
          paginate={paginate}
          getJokesOnPage={getJokesOnPage}
        />
      </div>
      <div>
        {showDeleted ? (
          <DeletedJokes
            jokesObjectRedux={jokesObjectRedux}
            categoryOutputFilter={categoryOutputFilter}
            setCategoryOutputFilter={setCategoryOutputFilter}
            indexOfFirstPost={indexOfFirstPost}
            indexOfLastPost={indexOfLastPost}
            factCount={factCount}
          />
        ) : (
          <JokeListItem
            jokesObjectRedux={jokesObjectRedux}
            categoryOutputFilter={categoryOutputFilter}
            setCategoryOutputFilter={setCategoryOutputFilter}
            indexOfFirstPost={indexOfFirstPost}
            indexOfLastPost={indexOfLastPost}
            factCount={factCount}
          />
        )}
      </div>
      <Paginate
        showDeleted={showDeleted}
        postsPerPage={postsPerPage}
        totalPosts={factCount}
        paginate={paginate}
        previousPage={previousPage}
        nextPage={nextPage}
        indexOfLastPost={indexOfLastPost}
        indexOfFirstPost={indexOfFirstPost}
        currentPage={currentPage}
      />
    </div>
  );
}

export default Jokes;
