import "../style.css";
import { useState } from "react";

import { useDispatch } from "react-redux";
import { JokesObjectRedux } from "../helpers";
import EditJokeModal from "./editJokeModal";
import Paginate from "./pagination";

// Render saved jokes
function JokeListItem({
  categoryOutputFilter,
  indexOfFirstPost,
  indexOfLastPost,
  setCategoryOutputFilter,
  factCount,
}) {
  const [editJokeId, setEditJokeId] = useState("");
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();
  const jokesObjectRedux = JokesObjectRedux();

  if (jokesObjectRedux.length === 0) return;

  function deleteJoke(jokeId, joke) {
    dispatch({
      type: "jokes/saveAndDelete",
      idPayload: jokeId,
      textPayload: joke,
      deletedPayload: true,
    });

    if (factCount <= 1) setCategoryOutputFilter("all");
  }

  return (
    <>
      <ul className="rendered-jokes">
        {jokesObjectRedux
          .map((joke) => (joke.saved ? { ...joke } : null))
          .filter((result) => result !== null)
          .filter((result) =>
            categoryOutputFilter === "all"
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
                <button
                  className="btn"
                  onClick={() => {
                    deleteJoke(joke.id, joke.text);
                  }}
                >
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
    </>
  );
}

export default JokeListItem;
