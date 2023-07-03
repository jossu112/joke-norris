import "../style.css";
import { useState } from "react";

import { useDispatch } from "react-redux";
import { JokesObjectRedux } from "../helpers";
import EditJokeModal from "./editJokeModal";
import Paginate from "./pagination";

// Render saved jokes
function JokeListItem({ categoryOutputFilter }) {
  const [editJokeId, setEditJokeId] = useState("");
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();
  const jokesObjectRedux = JokesObjectRedux();

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(3);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;

  const paginate = (pageNumber, el) => {
    setCurrentPage(pageNumber);
    const pages = document.querySelectorAll(".active");
    pages.forEach((page) => page.classList.remove("active"));

    const page = document.querySelector(`${el}`);
    page.classList.add("active");
  };

  if (jokesObjectRedux.length === 0) return;

  let factCount = 0;
  function getJokesOnPage() {
    factCount = jokesObjectRedux
      .map((joke) => (joke.saved ? { ...joke } : null))
      .filter((result) => result !== null)
      .filter((result) =>
        categoryOutputFilter === ""
          ? result
          : result.category === categoryOutputFilter
      ).length;
  }
  getJokesOnPage();

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

  function deleteJoke(jokeId) {
    dispatch({ type: "jokes/saveAndDelete", idPayload: jokeId });
  }

  return (
    <>
      <ul className="rendered-jokes">
        {jokesObjectRedux
          .map((joke) => (joke.saved ? { ...joke } : null))
          .filter((result) => result !== null)
          .filter((result) =>
            categoryOutputFilter === ""
              ? result
              : result.category === categoryOutputFilter
          )

          .sort(
            (date1, date2) =>
              new Date(date2.fetchTime) - new Date(date1.fetchTime)
          )
          .slice(indexOfFirstPost, indexOfLastPost)
          .map((joke) => (
            <li className="rendered-joke" key={joke.id}>
              <div>
                <p className="joke-description">{joke.text}</p>
              </div>
              <div className="actions">
                <button className="btn" onClick={() => deleteJoke(joke.id)}>
                  DELETE
                </button>
                <button
                  className="btn"
                  onClick={() => {
                    setShowModal(true);
                    setEditJokeId(joke.id);
                  }}
                >
                  EDIT
                </button>
                <span className="rendered-category">
                  {joke.category ? joke.category : "RANDOM"}
                </span>
              </div>
            </li>
          ))}

        {showModal ? (
          <div className="modal-window">
            <EditJokeModal
              setShowModal={setShowModal}
              editJokeId={editJokeId}
            />
          </div>
        ) : null}
      </ul>

      <Paginate
        postsPerPage={postsPerPage}
        totalPosts={factCount}
        paginate={paginate}
        previousPage={previousPage}
        nextPage={nextPage}
        indexOfLastPost={indexOfLastPost}
        indexOfFirstPost={indexOfFirstPost}
      />
    </>
  );
}

export default JokeListItem;
